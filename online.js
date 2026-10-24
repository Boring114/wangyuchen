// 联机对战客户端
// 服务器地址自动推导：页面和 WebSocket 由同一个服务器/隧道提供
const ONLINE_SERVER = (() => {
    const qs = new URLSearchParams(location.search);
    if (qs.get('server')) return qs.get('server');
    if (location.protocol === 'file:') return 'ws://127.0.0.1:8090';
    if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') return 'ws://127.0.0.1:8090';
    return (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host;
})();

let ws = null;
let onlineRoomId = null;
let onlineTeam = null;

function connectOnline() {
    document.getElementById('lobbyScreen').classList.remove('hidden');
    document.getElementById('modeSelectScreen').classList.add('hidden');
}

document.getElementById('onlineBtn').addEventListener('click', () => {
    if (gameState.battleDeck.length < 10) {
        alert('联机对战需要携带至少10张卡牌才能开局，请先在卡包中添加卡牌！');
        return;
    }
    if (gameState.battleDeck.some(c => c.trainingOnly)) {
        alert('出战卡组包含训练木偶，仅可在训练营模式使用，请先在卡组中移除！');
        return;
    }
    connectOnline();
});
document.getElementById('lobbyBackBtn').addEventListener('click', () => {
    document.getElementById('lobbyScreen').classList.add('hidden');
    document.getElementById('modeSelectScreen').classList.remove('hidden');
});

document.getElementById('createRoomBtn').addEventListener('click', () => {
    const pw = document.getElementById('roomPassword').value.trim();
    if (!pw) { alert('请设置密码'); return; }
    tryConnect(() => {
        ws.send(JSON.stringify({ type: 'create', password: pw }));
    });
});

document.getElementById('joinRoomBtn').addEventListener('click', () => {
    const id = document.getElementById('joinRoomId').value.trim().toUpperCase();
    const pw = document.getElementById('joinPassword').value.trim();
    if (!id || !pw) { alert('请输入房间号和密码'); return; }
    tryConnect(() => {
        ws.send(JSON.stringify({ type: 'join', roomId: id, password: pw }));
    });
});

// 随机匹配:自动匹配同时在匹配的玩家
let matching = false;
document.getElementById('matchBtn').addEventListener('click', () => {
    if (matching) {
        alert('正在匹配中,请稍候...');
        return;
    }
    if (gameState.battleDeck.length < 10) {
        alert('联机对战需要携带至少10张卡牌才能开局，请先在卡包中添加卡牌！');
        return;
    }
    if (gameState.battleDeck.some(c => c.trainingOnly)) {
        alert('出战卡组包含训练木偶，仅可在训练营模式使用，请先在卡组中移除！');
        return;
    }
    matching = true;
    tryConnect(() => {
        document.getElementById('lobbyStatus').textContent = '匹配中... 等待其他玩家';
        ws.send(JSON.stringify({ type: 'match' }));
    });
});

function tryConnect(cb) {
    if (ws && ws.readyState === 1) { cb(); return; }
    document.getElementById('lobbyStatus').textContent = '连接中...';
    ws = new WebSocket(ONLINE_SERVER);
    ws.onopen = () => {
        document.getElementById('lobbyStatus').textContent = '已连接';
        cb();
    };
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'matching') {
            document.getElementById('lobbyStatus').textContent = '匹配中... 等待其他玩家';
        }
        if (data.type === 'matchFound') {
            matching = false;
            onlineTeam = data.team;
            document.getElementById('lobbyTeam').style.display = '';
            document.getElementById('lobbyTeamName').textContent = data.team === 'red' ? '红方' : '蓝方';
            document.getElementById('lobbyStatus').textContent = '匹配成功！开始游戏中...';
            startOnlineGame();
        }
        if (data.type === 'chat') {
            // 显示对方聊天消息
            const cm = document.getElementById('chatMessages');
            const msg = document.createElement('div');
            msg.className = 'chat-msg chat-msg-opp';
            msg.textContent = data.text;
            cm.appendChild(msg);
            setTimeout(() => {
                msg.classList.add('chat-msg-out');
                setTimeout(() => { if (msg.parentNode) msg.parentNode.removeChild(msg); }, 500);
            }, 1500);
        }
        if (data.type === 'fx') {
            // 所有特效统一暂存:等同步应用后再播放(避免被同步重建棋盘清除,保证对方完整看到)
            _fxQueue.push(data.fx);
            clearTimeout(_fxQueueTimer);
            _fxQueueTimer = setTimeout(flushFxQueue, 900);
        }
        if (data.type === 'roomCreated') {
            onlineRoomId = data.roomId;
            onlineTeam = data.team;
            document.getElementById('roomCode').textContent = data.roomId;
            document.getElementById('roomCodeDisplay').style.display = '';
            document.getElementById('lobbyTeam').style.display = '';
            document.getElementById('lobbyTeamName').textContent = '红方';
            document.getElementById('lobbyStatus').textContent = '等待对手加入...';
        }
        if (data.type === 'joined') {
            onlineTeam = data.team;
            document.getElementById('lobbyTeam').style.display = '';
            document.getElementById('lobbyTeamName').textContent = '蓝方';
            document.getElementById('lobbyStatus').textContent = '已加入！开始游戏中...';
            // 加入成功直接开始(无需等房主ready,双方同时进入对局)
            startOnlineGame();
        }
        if (data.type === 'opponentJoined') {
            document.getElementById('lobbyStatus').textContent = '对手已加入！开始游戏中...';
            startOnlineGame();
        }
        if (data.type === 'allReady' || data.type === 'opponentJoined') {
            if (onlineTeam === 'blue' && data.type === 'allReady') {
                startOnlineGame();
            }
        }
        if (data.type === 'gameState') {
            // 接收对方游戏状态
            const gs = JSON.parse(data.state);
            if (onlineTeam === 'blue') {
                // 蓝方接收红方状态并合并
                gameState.units = gs.units.map(u => ({...u, team: u.team === 'red' ? 'red' : 'blue'}));
                applyMirrorFromSync(gs);
                applyHaiyueFromSync(gs);
                gameState.redBaseHp = gs.redBaseHp;
                gameState.blueBaseHp = gs.blueBaseHp;
                gameState.redEnergy = gs.redEnergy;
                gameState.blueEnergy = gs.blueEnergy;
                gameState.maxEnergy = gs.maxEnergy || gameState.maxEnergy;
                gameState.blueMaxEnergy = gs.blueMaxEnergy || gs.maxEnergy || gameState.blueMaxEnergy || gameState.maxEnergy;
                gameState.turnNumber = gs.turnNumber;
                gameState.spikeNets = gs.spikeNets || [];
                gameState.craters = gs.craters || [];
                gameState.rageZones = gs.rageZones || [];
                gameState.knightZones = gs.knightZones || [];
                gameState.iceFields = gs.iceFields || [];
                gameState.windZones = gs.windZones || [];
                gameState.fireZones = gs.fireZones || [];
                gameState.stormDomains = gs.stormDomains || [];
                gameState.erinRings = gs.erinRings || [];
                if (typeof renderErinRings === "function") renderErinRings();
                gameState.sasukeFlames = gs.sasukeFlames || [];
                gameState.beeSmokes = gs.beeSmokes || [];
                if (typeof renderSasukeFlames === 'function') renderSasukeFlames();
                if (typeof renderBeeSmokes === 'function') renderBeeSmokes();
                gameState.currentTurn = gs.currentTurn || 'blue';
                updateEnergyDisplay();
                updateBaseHpDisplay();
                updateTurnIndicator();
                // 操作方启动回合计时,等待方显示对方回合
                if (gameState.currentTurn === onlineTeam) startTimer();
                else { stopTimer(); document.getElementById('timer').textContent = '对方回合'; }
                initBoard();
                gameState.units.forEach(u => renderUnit(u));
                if (typeof renderSpikeNets === 'function') renderSpikeNets();
                if (typeof renderCraters === 'function') renderCraters();
                if (typeof renderRageZones === 'function') renderRageZones();
                if (typeof renderKnightZones === 'function') renderKnightZones();
                if (typeof renderIceFields === 'function') renderIceFields();
                if (typeof renderWindZones === 'function') renderWindZones();
                if (typeof renderFireZones === 'function') renderFireZones();
                if (typeof renderStormDomains === 'function') renderStormDomains();
                gameState.units.forEach(u => { if (u._infernoLaserTarget && typeof showInfernoLaser === 'function') { const tar = gameState.units.find(x => x.id === u._infernoLaserTarget); if (tar) showInfernoLaser(u, tar); } });
                gameState.units.forEach(u => { if (u.poisonTurns > 0 && typeof updatePoisonVisual === 'function') updatePoisonVisual(u); if (u.treeBound && typeof updateTreeVisual === 'function') updateTreeVisual(u); });
                gameState.units.forEach(u => { const uel = gameState.board[u.row] && gameState.board[u.row][u.col] && gameState.board[u.row][u.col].querySelector('.unit'); if (uel) { if (u._magicShield) uel.classList.add('magic-shield'); if ((u._shieldHp || 0) > 0) uel.classList.add('guard-shield'); if ((u._haiyueMarkTurns || 0) > 0) uel.classList.add('haiyue-marked'); if (u._stoneWall) uel.classList.add('stone-bubble'); } });
                flushFxQueue();
            } else {
                // 红方接收蓝方状态(蓝方回合结束后回合流转回红方)
                gameState.units = gs.units.map(u => ({...u}));
                applyMirrorFromSync(gs);
                applyHaiyueFromSync(gs);
                gameState.redBaseHp = gs.redBaseHp;
                gameState.blueBaseHp = gs.blueBaseHp;
                gameState.redEnergy = gs.redEnergy;
                gameState.blueEnergy = gs.blueEnergy;
                gameState.maxEnergy = gs.maxEnergy || gameState.maxEnergy;
                gameState.blueMaxEnergy = gs.blueMaxEnergy || gs.maxEnergy || gameState.blueMaxEnergy || gameState.maxEnergy;
                gameState.turnNumber = gs.turnNumber;
                gameState.spikeNets = gs.spikeNets || [];
                gameState.craters = gs.craters || [];
                gameState.rageZones = gs.rageZones || [];
                gameState.knightZones = gs.knightZones || [];
                gameState.iceFields = gs.iceFields || [];
                gameState.windZones = gs.windZones || [];
                gameState.fireZones = gs.fireZones || [];
                gameState.stormDomains = gs.stormDomains || [];
                gameState.erinRings = gs.erinRings || [];
                if (typeof renderErinRings === "function") renderErinRings();
                gameState.sasukeFlames = gs.sasukeFlames || [];
                gameState.beeSmokes = gs.beeSmokes || [];
                if (typeof renderSasukeFlames === 'function') renderSasukeFlames();
                if (typeof renderBeeSmokes === 'function') renderBeeSmokes();
                gameState.currentTurn = gs.currentTurn || 'red';
                updateEnergyDisplay();
                updateBaseHpDisplay();
                updateTurnIndicator();
                // 操作方启动回合计时,等待方显示对方回合
                if (gameState.currentTurn === onlineTeam) startTimer();
                else { stopTimer(); document.getElementById('timer').textContent = '对方回合'; }
                initBoard();
                gameState.units.forEach(u => renderUnit(u));
                if (typeof renderSpikeNets === 'function') renderSpikeNets();
                if (typeof renderCraters === 'function') renderCraters();
                if (typeof renderRageZones === 'function') renderRageZones();
                if (typeof renderKnightZones === 'function') renderKnightZones();
                if (typeof renderIceFields === 'function') renderIceFields();
                if (typeof renderWindZones === 'function') renderWindZones();
                if (typeof renderFireZones === 'function') renderFireZones();
                if (typeof renderStormDomains === 'function') renderStormDomains();
                gameState.units.forEach(u => { if (u._infernoLaserTarget && typeof showInfernoLaser === 'function') { const tar = gameState.units.find(x => x.id === u._infernoLaserTarget); if (tar) showInfernoLaser(u, tar); } });
                gameState.units.forEach(u => { if (u.poisonTurns > 0 && typeof updatePoisonVisual === 'function') updatePoisonVisual(u); if (u.treeBound && typeof updateTreeVisual === 'function') updateTreeVisual(u); });
                gameState.units.forEach(u => { const uel = gameState.board[u.row] && gameState.board[u.row][u.col] && gameState.board[u.row][u.col].querySelector('.unit'); if (uel) { if (u._magicShield) uel.classList.add('magic-shield'); if ((u._shieldHp || 0) > 0) uel.classList.add('guard-shield'); if ((u._haiyueMarkTurns || 0) > 0) uel.classList.add('haiyue-marked'); if (u._stoneWall) uel.classList.add('stone-bubble'); } });
                flushFxQueue();
            }
        }
        if (data.type === 'opponentLeft') {
            alert('对手断开连接');
            goToStartScreen();
        }
        if (data.type === 'error') {
            alert(data.msg);
        }
    };
    ws.onclose = () => { document.getElementById('lobbyStatus').textContent = '连接断开'; };
    ws.onerror = () => { document.getElementById('lobbyStatus').textContent = '无法连接服务器'; };
}

function startOnlineGame() {
    gameState.aiMode = false;
    gameState.onlineMode = true;
    // 联机对战使用正常能量与回合计时(非训练模式)
    gameState.maxEnergy = 20;
    gameState.redMaxEnergy = 20;
    gameState.blueMaxEnergy = 20;
    document.getElementById('lobbyScreen').classList.add('hidden');
    // 蓝方视角:棋盘上下翻转(蓝方在下、红方在上);红方保持默认视角
    document.getElementById('gameScreen').classList.toggle('blue-view', onlineTeam === 'blue');
    if (onlineTeam === 'blue') {
        // 蓝方视角:信息栏上下对调(红方信息在上方、蓝方信息在下方,与翻转后的棋盘一致)
        const parent = document.getElementById('gameScreen');
        const bp = document.querySelector('.blue-player');
        const rp = document.querySelector('.red-player');
        const board = document.querySelector('.game-board-container');
        if (bp && rp && board) {
            parent.insertBefore(rp, board);
            parent.appendChild(bp);
        }
    }
    startGame();
    // 红方先手
    if (onlineTeam === 'blue') {
        // 蓝方等待红方操作
    }
}

// 技能/法术特效队列:等同步应用后再播放(避免被同步重建棋盘清除特效)
let _fxQueue = [];
let _fxQueueTimer = null;
function flushFxQueue() {
    if (_fxQueueTimer) { clearTimeout(_fxQueueTimer); _fxQueueTimer = null; }
    if (_fxQueue.length === 0) return;
    const q = _fxQueue; _fxQueue = [];
    window._fxSyncing = true;
    q.forEach(fx => {
        try {
            if (fx.kind === 'deployText') showHeroDeployText({ row: fx.row, col: fx.col }, fx.msg, fx.color, fx.duration);
            else if (fx.kind === 'critText') showCritText(fx.row, fx.col, fx.msg);
            else if (fx.kind === 'attack') showOnlineAttackFx(fx.fromR, fx.fromC, fx.toR, fx.toC);
            else if (fx.kind === 'skill') playSkillFx(fx);
        } catch (e) {}
    });
    window._fxSyncing = false;
}

// 播放对方同步的技能动画:用真实单位对象调用原版动画函数(完整重放),缺失则用光效兜底
function playSkillFx(fx) {
    try {
        const findU = (r, c) => gameState.units.find(x => x.row === r && x.col === c && !x._removing);
        const u = findU(fx.row, fx.col) || { row: fx.row, col: fx.col, team: fx.team, currentHp: 1, maxHp: 1, attack: 1, armor: 0 };
        const t = findU(fx.toR, fx.toC) || { row: fx.toR, col: fx.toC, team: fx.team === 'red' ? 'blue' : 'red', currentHp: 1, maxHp: 1, attack: 1, armor: 0 };
        switch (fx.skill) {
            case 'shinra': if (typeof showShinraVisual === 'function') showShinraVisual(u.row, u.col, u.shinraRange || 3, fx.team); else showSkillFlashFx(fx.row, fx.col, '#9b59b6', 50); break;
            case 'bansho': if (typeof showBanshoVisual === 'function') showBanshoVisual(u); else showSkillFlashFx(fx.row, fx.col, '#3498db', 40); break;
            case 'chibaku': if (typeof showChibakuVisual === 'function') showChibakuVisual(u); else showSkillFlashFx(fx.row, fx.col, '#e74c3c', 60); break;
            case 'woodDragon': if (typeof showWoodDragonVisual === 'function') showWoodDragonVisual(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#27ae60', 50); break;
            case 'godPalm': if (typeof showGodPalm === 'function') showGodPalm(u, false); else showSkillFlashFx(fx.row, fx.col, '#f1c40f', 60); break;
            case 'susanoo': if (typeof renderSusanooVisual === 'function') { if (u._susanooActive === undefined) u._susanooActive = true; renderSusanooVisual(u); } else showSkillFlashFx(fx.row, fx.col, '#8e44ad', 55); break;
            case 'elephant': if (typeof showGuyElephantVisual === 'function') showGuyElephantVisual(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 55); break;
            case 'night': if (typeof showNightGuyVisual === 'function') showNightGuyVisual(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#c0392b', 55); break;
            case 'hook': if (typeof showDeepBlueHookVisual === 'function') showDeepBlueHookVisual(u, t); else showSkillFlashFx(fx.row, fx.col, '#3498db', 45); break;
            case 'fateWheel': if (typeof showFateWheelVisual === 'function') showFateWheelVisual(); else showSkillFlashFx(fx.row, fx.col, '#e67e22', 55); break;
            case 'lvbuLanding': if (typeof showLvbuLandingVisual === 'function') showLvbuLandingVisual(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#f39c12', 50); break;
            case 'dodgeText': showDodgeText(fx.toR, fx.toC); break;
            case 'halfHpText': if (typeof showHalfHpText === 'function') showHalfHpText(u); break;
            case 'lightning': if (typeof showLightningStrike === 'function') showLightningStrike(t); else showSkillFlashFx(fx.toR, fx.toC, '#f1c40f', 45); break;
            case 'firePillar': if (typeof showFirePillar === 'function') showFirePillar(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 45); break;
            case 'stormClaw': if (typeof showStormCracks === 'function') showStormCracks(fx.row, fx.col); else showSkillFlashFx(fx.row, fx.col, '#5aa9ff', 55); break;
            case 'stormBreath': if (typeof showStormDomain === 'function') showStormDomain({ id: 'rx_' + Date.now(), row: fx.row, col: fx.col, team: fx.team }); else showSkillFlashFx(fx.row, fx.col, '#5aa9ff', 60); break;
            case 'bullet_black': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'black'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_purple': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'purple'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_blue': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'blue'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_green': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'green'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_red': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'red'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_arrow': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'arrow'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_spike': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'spike'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'bullet_tesla': if (typeof showBulletFx === 'function') showBulletFx(fx.row, fx.col, fx.toR, fx.toC, 'tesla'); else showSkillFlashFx(fx.toR, fx.toC, '#ffffff', 25); break;
            case 'haiyueWave': if (typeof showHaiyueWaveFx === 'function') showHaiyueWaveFx(u); else showSkillFlashFx(fx.row, fx.col, '#4aa8ff', 50); break;
            case 'haiyueOrb': if (typeof showHaiyueOrbFx === 'function') showHaiyueOrbFx(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#4aa8ff', 35); break;
            case 'haiyueLink': if (typeof showHaiyueLinkFx === 'function') showHaiyueLinkFx(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#9fe8ff', 45); break;
            case 'haiyueMark': showSkillFlashFx(fx.toR, fx.toC, '#8fdcff', 30); break;
            case 'yjDog': if (typeof showYjDogFx === 'function') showYjDogFx(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#ffd75e', 30); break;
            case 'yjCharge': if (typeof showSkillFlashFx === 'function') showSkillFlashFx(fx.toR, fx.toC, '#ffd75e', 45); break;
            case 'yjSweep': if (typeof showYjSweepFx === 'function') showYjSweepFx(u); else showSkillFlashFx(fx.row, fx.col, '#ffd75e', 40); break;
            case 'yjLaser': if (typeof showYjLaserFx === 'function') showYjLaserFx(u, [{ dr: fx.team === 'red' ? -1 : 1, dc: 0 }]); else showSkillFlashFx(fx.row, fx.col, '#ffd75e', 40); break;
            case 'taiyiBomb': if (typeof showSkillFlashFx === 'function') showSkillFlashFx(fx.row, fx.col, '#2ecc71', 80); break;
            case 'taiyiHand': if (typeof showSkillFlashFx === 'function') showSkillFlashFx(fx.toR, fx.toC, '#2ecc71', 45); break;
            case 'hurricane': if (typeof showHurricaneFx === 'function') showHurricaneFx(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#7ec8ff', 60); break;
            case 'zepBomb': if (typeof showZepBombFx === 'function') showZepBombFx(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#ff9800', 45); break;
            case 'zepFire': if (typeof showZepFireFx === 'function') showZepFireFx(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#ff5722', 55); break;
            case 'zepDarts': if (typeof showZepDartsFx === 'function') showZepDartsFx(fx.row, fx.col); else showSkillFlashFx(fx.row, fx.col, '#cfd8dc', 45); break;
            case 'zepDeath': if (typeof showZepDeathFx === 'function') showZepDeathFx(fx.row, fx.col); else showSkillFlashFx(fx.row, fx.col, '#ff6f00', 70); break;
            case 'missile': if (typeof showMissile === 'function') showMissile(u); else showSkillFlashFx(fx.toR, fx.toC, '#e67e22', 40); break;
            case 'dragonChain': if (typeof showDragonChain === 'function') showDragonChain(u, t, [t]); else showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC); break;
            case 'madaraFx': if (typeof showMadaraAttackFX === 'function') showMadaraAttackFX(u, t); else showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC); break;
            case 'madaraCounter': if (typeof showCounterFX === 'function') showCounterFX(u); else showSkillFlashFx(fx.row, fx.col, '#8e44ad', 40); break;
            case 'minerTunnel': if (typeof showMinerTunnel === 'function') showMinerTunnel(u); else showSkillFlashFx(fx.row, fx.col, '#7f8c8d', 40); break;
            case 'sandstorm': if (typeof showSandstorm === 'function') showSandstorm(u); else showSkillFlashFx(fx.row, fx.col, '#d4ac0d', 45); break;
            case 'goldPollen': if (typeof showGoldPollen === 'function') showGoldPollen(u); else showSkillFlashFx(fx.row, fx.col, '#f1c40f', 40); break;
            case 'treeEffect': if (typeof showTreeEffect === 'function') showTreeEffect(u); else showSkillFlashFx(fx.row, fx.col, '#27ae60', 40); break;
            case 'erinBullet': if (typeof showErinBullet === 'function') showErinBullet(u, t); else showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC); break;
            case 'infernoLaser': if (typeof showInfernoLaser === 'function') { const tar = gameState.units.find(x => x.id === u._infernoLaserTarget); if (tar) showInfernoLaser(u, tar); } else showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC); break;
            case 'goldenDragon': if (typeof showGoldenDragon === 'function') { const d = showGoldenDragon(u); setTimeout(() => { if (d && d.parentNode) d.remove(); }, 1500); } else showSkillFlashFx(fx.row, fx.col, '#f1c40f', 50); break;
            case 'hashiDragon': if (typeof showGoldenDragon === 'function') { const d2 = showGoldenDragon(u); setTimeout(() => { if (d2 && d2.parentNode) d2.remove(); }, 2200); } else showSkillFlashFx(fx.row, fx.col, '#f1c40f', 50); break;
            case 'hashiGolem': if (typeof showHashiWoodGolem === 'function') { showHashiWoodGolem(u); showHashiBluePillars(u); } else showSkillFlashFx(fx.row, fx.col, '#3498db', 50); break;
            case 'hashiBind': if (typeof showTreeEffect === 'function') showTreeEffect(t); else showSkillFlashFx(fx.toR, fx.toC, '#8b5a2b', 40); break;
            case 'hashiFlower': if (typeof showTreeEffect === 'function') showTreeEffect(t); if (typeof showGoldPollen === 'function') showGoldPollen(t); break;
            case 'hashiDots': if (typeof showHashiBlackDots === 'function') showHashiBlackDots(t); else showSkillFlashFx(fx.toR, fx.toC, '#111111', 40); break;
            case 'mirrorSkill': if (typeof showMirrorSkillVisual === 'function') showMirrorSkillVisual(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#f1c40f', 50); break;
case 'counterGolem': if (typeof showGolemVisual === 'function') showGolemVisual(u, t); else showSkillFlashFx(fx.toR, fx.toC, '#27ae60', 40); break;
case 'bluePillar': if (typeof showBluePillar === 'function') showBluePillar(u); else showSkillFlashFx(fx.row, fx.col, '#3498db', 45); break;
            case 'spellFireball': if (typeof showFireballVisual === 'function') showFireballVisual(fx.toR, fx.toC, 1); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 50); break;
            case 'spellRage': if (typeof showRageVisual === 'function') showRageVisual(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#e67e22', 45); break;
            case 'spellLog': if (typeof showLogVisual === 'function') showLogVisual(fx.toR, fx.toC, fx.team === 'red' ? -1 : 1); else showSkillFlashFx(fx.toR, fx.toC, '#8b5a2b', 45); break;
            case 'spellHeal': if (typeof showHealVisual === 'function') showHealVisual(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#27ae60', 40); break;
            case 'spellMoon': showSkillFlashFx(fx.toR, fx.toC, '#8e44ad', 50); break;
            case 'spellMissile': if (typeof showMissileSpellVisual === 'function') showMissileSpellVisual(t); else showSkillFlashFx(fx.toR, fx.toC, '#e67e22', 40); break;
            case 'spellShield': showSkillFlashFx(fx.row, fx.col, '#95a5a6', 35); break;
            case 'spellMagicShield': showSkillFlashFx(fx.row, fx.col, '#9b59b6', 35); break;
            case 'spellStoneWall': showSkillFlashFx(fx.row, fx.col, '#8b5a2b', 35); break;
            case 'doom': if (typeof showDoomMushroom === 'function') showDoomMushroom(u); else showSkillFlashFx(fx.row, fx.col, '#c0392b', 55); break;
            case 'pierce': showPierceSkillFX(fx.toR, fx.toC); break;
            case 'spike': showSkillFlashFx(fx.row, fx.col, '#3498db', 50); break;
            case 'lvbuSlash': if (typeof showLvbuSlash === 'function') showLvbuSlash(u); else showSkillFlashFx(fx.toR, fx.toC, '#f39c12', 45); break;
            case 'sasukeSusanoo': { const uel = gameState.board[u.row] && gameState.board[u.row][u.col] ? gameState.board[u.row][u.col].querySelector(`.unit[data-unit-id="${u.id}"]`) : null; if (uel) uel.classList.add('sasuke-susanoo'); break; }
            case 'sasukeArrow': { const dr = Math.sign(fx.toR - fx.row), dc = Math.sign(fx.toC - fx.col); if (typeof showSasukeArrow === 'function') { showSasukeArrow(u, dr, dc, 1500); setTimeout(() => { if (typeof showSasukeBoom === 'function') showSasukeBoom(u, dr, dc); }, 1500); } else showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC); break; }
            case 'sasukeFlame': if (typeof showSkillFlashFx === 'function') showSkillFlashFx(fx.toR, fx.toC, '#1a1a1a', 60); break;
            case 'princeGuard': { const dir = fx.team === 'red' ? -1 : 1; if (typeof showGuardCharge === 'function') showGuardCharge(u, dir, fx.toR, fx.toC, 800); else showSkillFlashFx(fx.toR, fx.toC, '#f1c40f', 50); break; }
            case 'madaraPoJun': { const dr = Math.sign(fx.toR - fx.row), dc = Math.sign(fx.toC - fx.col); if (typeof showMadaraPoJunFX === 'function') showMadaraPoJunFX(u, dr, dc); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 50); break; }
            case 'madaraRanbu': if (typeof showMadaraRanbuFX === 'function') showMadaraRanbuFX(u); else showSkillFlashFx(fx.row, fx.col, '#e74c3c', 60); break;
            case 'madaraJump': if (typeof showMadaraJumpFX === 'function') showMadaraJumpFX(u); else showSkillFlashFx(fx.row, fx.col, '#e74c3c', 45); break;
            case 'madaraStomp': if (typeof showMadaraStompFX === 'function') showMadaraStompFX(fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 50); break;
            case 'madaraMeteor': if (typeof showMeteorButton === 'function') showMeteorButton(u, false, true); else showSkillFlashFx(fx.row, fx.col, '#8e44ad', 60); break;
            case 'beeSmokeBomb': if (typeof showBeeSmokeBombFx === 'function') showBeeSmokeBombFx(fx.row, fx.col, fx.toR, fx.toC); else showSkillFlashFx(fx.toR, fx.toC, '#9aa7b5', 50); break;
            case 'beeSmokeScreen': if (typeof showBeeDroneFx === 'function') showBeeDroneFx(fx.row, fx.col, fx.team); else showSkillFlashFx(fx.row, fx.col, '#333333', 45); break;
            case 'glacier': if (typeof showGlacierFX === 'function') showGlacierFX(); else showSkillFlashFx(fx.row, fx.col, '#3498db', 50); break;
            default: showOnlineAttackFx(fx.row, fx.col, fx.toR, fx.toC);
        }
    } catch (e) { /* 动画播放失败不影响游戏 */ }
}

// 联机通用技能光效(冲击波圈/光芒),动画函数不可用时兜底
function showSkillFlashFx(row, col, color, size) {
    const board = document.getElementById('gameBoard');
    if (!board) return;
    const p = typeof cellCenterPx === 'function' ? cellCenterPx(row, col) : { x: col * 30 + 15, y: row * 26 + 13 };
    const ring = document.createElement('div');
    ring.className = 'skill-flash-fx';
    ring.style.left = (p.x - (size || 40)) + 'px';
    ring.style.top = (p.y - (size || 40)) + 'px';
    ring.style.width = (size || 40) * 2 + 'px';
    ring.style.height = (size || 40) * 2 + 'px';
    ring.style.borderColor = color || '#fff';
    board.appendChild(ring);
    setTimeout(() => { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 600);
}

// 神罗天征冲击波(接收方视觉)
function showShinraFx(u, t) {
    showSkillFlashFx(u.row, u.col, '#9b59b6', 50);
}
function showBanshoFx(u) { showSkillFlashFx(u.row, u.col, '#3498db', 40); }
function showChibakuFx(u) { showSkillFlashFx(u.row, u.col, '#e74c3c', 60); }
function showWoodDragonFx(u, t) { showSkillFlashFx(t.row, t.col, '#27ae60', 50); }
function showGodPalmFx(u) { showSkillFlashFx(u.row, u.col, '#f1c40f', 60); }
function showSusanooFx(u) { showSkillFlashFx(u.row, u.col, '#8e44ad', 55); }
function showGuyElephantFx(u, t) { showSkillFlashFx(t.row, t.col, '#e74c3c', 55); }
function showDoomFx(u) { showSkillFlashFx(u.row, u.col, '#c0392b', 55); }
function showSpikeNetFx(u) { showSkillFlashFx(u.row, u.col, '#3498db', 50); }
function showLvbuSlashFx(u, t) { showSkillFlashFx(t.row, t.col, '#f39c12', 45); }

// 播放对方同步的攻击动画:白色光点从攻击方飞向目标
function showOnlineAttackFx(r1, c1, r2, c2) {
    const board = document.getElementById('gameBoard');
    if (!board) return;
    const p1 = typeof cellCenterPx === 'function' ? cellCenterPx(r1, c1) : { x: c1 * 30 + 15, y: r1 * 26 + 13 };
    const p2 = typeof cellCenterPx === 'function' ? cellCenterPx(r2, c2) : { x: c2 * 30 + 15, y: r2 * 26 + 13 };
    const dot = document.createElement('div');
    dot.className = 'online-attack-fx';
    dot.style.left = p1.x + 'px';
    dot.style.top = p1.y + 'px';
    board.appendChild(dot);
    setTimeout(() => {
        dot.style.transition = 'all 0.25s linear';
        dot.style.left = p2.x + 'px';
        dot.style.top = p2.y + 'px';
    }, 20);
    setTimeout(() => { if (dot.parentNode) dot.parentNode.removeChild(dot); }, 500);
}

// 每次操作后同步状态(单位完整对象,含属性/技能字段,确保对方渲染正常)
function applyHaiyueFromSync(gs) {
    const p = gs.haiyueIllusionWorld;
    const tb = document.getElementById('haiyueToggleBtn');
    if (p && p.active) {
        const prevLocal = gameState.haiyueIllusion && gameState.haiyueIllusion.localView;
        gameState.haiyueIllusion = Object.assign({}, p, { localView: prevLocal || p.view || 'illusion' });
        const lv = gameState.haiyueIllusion.localView;
        const src = lv === 'illusion' ? p.illusionUnits : p.realUnits;
        if (src) gameState.units = src.map(u => ({...u}));
        document.body.classList.toggle('haiyue-illusion-view', lv === 'illusion');
        if (tb) { tb.classList.remove('hidden'); tb.textContent = lv === 'illusion' ? '查看现实棋盘' : '返回水月幻境'; }
        if (typeof renderHaiyueIllusion === 'function') setTimeout(() => { if (gameState.haiyueIllusion) renderHaiyueIllusion(); }, 0);
        const sb = document.getElementById('skipBtn');
        if (sb && lv === 'illusion') sb.style.display = 'none';
    } else if (gameState.haiyueIllusion) {
        gameState.haiyueIllusion = null;
        document.body.classList.remove('haiyue-illusion-view');
        const l = document.getElementById('haiyueIllusionLayer');
        if (l) l.remove();
        if (tb) tb.classList.add('hidden');
    }
}
function applyMirrorFromSync(gs) {
    if (gs.mirror && gs.mirror.active) {
        const prevLocal = gameState.mirror && gameState.mirror.localView;
        gameState.mirror = Object.assign({}, gs.mirror, { localView: prevLocal || gs.mirror.view || 'mirror' });
        const lv = gameState.mirror.localView;
        const src = lv === 'mirror' ? gs.mirror.mirrorUnits : gs.mirror.realUnits;
        if (src) gameState.units = src.map(u => ({...u}));
        document.body.classList.toggle('mirror-view', lv === 'mirror');
        const tb = document.getElementById('mirrorToggleBtn');
        if (tb) { tb.classList.remove('hidden'); tb.textContent = lv === 'mirror' ? '切换到现实世界' : '切换到镜像世界'; }
    } else {
        gameState.mirror = null;
        document.body.classList.remove('mirror-view');
        const tb = document.getElementById('mirrorToggleBtn');
        if (tb) tb.classList.add('hidden');
    }
}

function syncGameState() {
    if (!gameState.onlineMode || !ws || ws.readyState !== 1) return;
    // 镜像期间只有发起方负责同步,观战方不回传
    if (gameState.mirror && gameState.mirror.active && typeof onlineTeam !== 'undefined' && onlineTeam !== gameState.mirror.team) return;
    // 镜像世界:同时同步镜像/现实两套单位,供对方切换查看
    let unitsForSend = gameState.units.map(u => ({...u}));
    let mirrorPayload = null;
    if (gameState.mirror && gameState.mirror.active) {
        const m = gameState.mirror;
        if ((m.localView || m.view) === 'mirror') m.mirrorUnits = JSON.parse(JSON.stringify(gameState.units));
        else m.realUnits = JSON.parse(JSON.stringify(gameState.units));
        const lv = m.localView || m.view;
        unitsForSend = (lv === 'mirror' ? m.mirrorUnits : m.realUnits).map(u => ({...u}));
        mirrorPayload = {
            active: true, ownerId: m.ownerId, team: m.team, cameraId: m.cameraId,
            view: m.view, turnsLeft: m.turnsLeft, savedBaseHp: m.savedBaseHp,
            mirrorUnits: m.mirrorUnits, realUnits: m.realUnits
        };
    }
    // 水月幻境:同步幻境/现实两套单位
    let haiyuePayload = null;
    if (gameState.haiyueIllusion && gameState.haiyueIllusion.active) {
        const ill = gameState.haiyueIllusion;
        if ((ill.localView || ill.view) === 'illusion') ill.illusionUnits = JSON.parse(JSON.stringify(gameState.units));
        else ill.realUnits = JSON.parse(JSON.stringify(gameState.units));
        const lv = ill.localView || ill.view;
        unitsForSend = ((lv === 'illusion' ? ill.illusionUnits : ill.realUnits) || []).map(u => ({...u}));
        haiyuePayload = {
            active: true, ownerId: ill.ownerId, targetId: ill.targetId, team: ill.team,
            center: ill.center, halvesLeft: ill.halvesLeft, view: ill.view,
            illusionUnits: ill.illusionUnits, realUnits: ill.realUnits,
            visible: ill.visible
        };
    }
    ws.send(JSON.stringify({
        type: 'gameState',
        state: JSON.stringify({
            units: unitsForSend,
            mirror: mirrorPayload,
            redBaseHp: gameState.redBaseHp,
            blueBaseHp: gameState.blueBaseHp,
            redEnergy: gameState.redEnergy,
            blueEnergy: gameState.blueEnergy,
            maxEnergy: gameState.maxEnergy,
            blueMaxEnergy: gameState.blueMaxEnergy || gameState.maxEnergy,
            turnNumber: gameState.turnNumber,
            currentTurn: gameState.currentTurn,
            spikeNets: gameState.spikeNets || [],
            craters: gameState.craters || [],
            rageZones: gameState.rageZones || [],
            knightZones: gameState.knightZones || [],
            iceFields: gameState.iceFields || [],
            windZones: gameState.windZones || [],
            fireZones: gameState.fireZones || [],
            stormDomains: gameState.stormDomains || [],
            erinRings: gameState.erinRings || [],
            sasukeFlames: gameState.sasukeFlames || [],
            beeSmokes: gameState.beeSmokes || [],
            haiyueIllusionWorld: haiyuePayload
        })
    }));
}

// 每次操作后调用同步（在endTurn末尾加 syncGameState()）
const origEndTurn = endTurn;
endTurn = function() {
    origEndTurn();
    syncGameState();
};

const origStartGame = startGame;
startGame = function() {
    origStartGame();
    if (gameState.onlineMode) {
        document.getElementById('skipBtn').style.display = '';
    }
};
