// 联机对战客户端
const ONLINE_SERVER = 'wss://4cd42114.r17.cpolar.top';

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
                gameState.redBaseHp = gs.redBaseHp;
                gameState.blueBaseHp = gs.blueBaseHp;
                gameState.redEnergy = gs.redEnergy;
                gameState.blueEnergy = gs.blueEnergy;
                gameState.turnNumber = gs.turnNumber;
                gameState.spikeNets = gs.spikeNets || [];
                gameState.craters = gs.craters || [];
                gameState.rageZones = gs.rageZones || [];
                gameState.knightZones = gs.knightZones || [];
                gameState.iceFields = gs.iceFields || [];
                gameState.windZones = gs.windZones || [];
                gameState.fireZones = gs.fireZones || [];
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
                gameState.units.forEach(u => { if (u._susanooActive && typeof renderSusanooVisual === 'function') renderSusanooVisual(u); });
                gameState.units.forEach(u => { if (u._infernoLaserTarget && typeof showInfernoLaser === 'function') { const tar = gameState.units.find(x => x.id === u._infernoLaserTarget); if (tar) showInfernoLaser(u, tar); } });
                gameState.units.forEach(u => { if (u.poisonTurns > 0 && typeof updatePoisonVisual === 'function') updatePoisonVisual(u); if (u.treeBound && typeof updateTreeVisual === 'function') updateTreeVisual(u); });
                gameState.units.forEach(u => { const uel = gameState.board[u.row] && gameState.board[u.row][u.col] && gameState.board[u.row][u.col].querySelector('.unit'); if (uel) { if (u._magicShield) uel.classList.add('magic-shield'); if ((u._shieldHp || 0) > 0) uel.classList.add('guard-shield'); if (u._stoneWall) uel.classList.add('stone-bubble'); } });
                flushFxQueue();
            } else {
                // 红方接收蓝方状态(蓝方回合结束后回合流转回红方)
                gameState.units = gs.units.map(u => ({...u}));
                gameState.redBaseHp = gs.redBaseHp;
                gameState.blueBaseHp = gs.blueBaseHp;
                gameState.redEnergy = gs.redEnergy;
                gameState.blueEnergy = gs.blueEnergy;
                gameState.turnNumber = gs.turnNumber;
                gameState.spikeNets = gs.spikeNets || [];
                gameState.craters = gs.craters || [];
                gameState.rageZones = gs.rageZones || [];
                gameState.knightZones = gs.knightZones || [];
                gameState.iceFields = gs.iceFields || [];
                gameState.windZones = gs.windZones || [];
                gameState.fireZones = gs.fireZones || [];
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
                gameState.units.forEach(u => { if (u._susanooActive && typeof renderSusanooVisual === 'function') renderSusanooVisual(u); });
                gameState.units.forEach(u => { if (u._infernoLaserTarget && typeof showInfernoLaser === 'function') { const tar = gameState.units.find(x => x.id === u._infernoLaserTarget); if (tar) showInfernoLaser(u, tar); } });
                gameState.units.forEach(u => { if (u.poisonTurns > 0 && typeof updatePoisonVisual === 'function') updatePoisonVisual(u); if (u.treeBound && typeof updateTreeVisual === 'function') updateTreeVisual(u); });
                gameState.units.forEach(u => { const uel = gameState.board[u.row] && gameState.board[u.row][u.col] && gameState.board[u.row][u.col].querySelector('.unit'); if (uel) { if (u._magicShield) uel.classList.add('magic-shield'); if ((u._shieldHp || 0) > 0) uel.classList.add('guard-shield'); if (u._stoneWall) uel.classList.add('stone-bubble'); } });
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
            case 'shinra': if (typeof showShinraVisual === 'function') showShinraVisual(u.row, u.col, u.shinraRange || 3); else showSkillFlashFx(fx.row, fx.col, '#9b59b6', 50); break;
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
            case 'bluePillar': if (typeof showBluePillar === 'function') showBluePillar(u); else showSkillFlashFx(fx.row, fx.col, '#3498db', 45); break;
            case 'spellFireball': if (typeof showFireballVisual === 'function') showFireballVisual(fx.toR, fx.toC, 1); else showSkillFlashFx(fx.toR, fx.toC, '#e74c3c', 50); break;
            case 'spellRage': showSkillFlashFx(fx.toR, fx.toC, '#e67e22', 45); break;
            case 'spellLog': showSkillFlashFx(fx.toR, fx.toC, '#8b5a2b', 45); break;
            case 'spellHeal': showSkillFlashFx(fx.toR, fx.toC, '#27ae60', 40); break;
            case 'spellMoon': showSkillFlashFx(fx.toR, fx.toC, '#8e44ad', 50); break;
            case 'spellMissile': if (typeof showMissileSpellVisual === 'function') showMissileSpellVisual(t); else showSkillFlashFx(fx.toR, fx.toC, '#e67e22', 40); break;
            case 'spellShield': showSkillFlashFx(fx.row, fx.col, '#95a5a6', 35); break;
            case 'spellMagicShield': showSkillFlashFx(fx.row, fx.col, '#9b59b6', 35); break;
            case 'spellStoneWall': showSkillFlashFx(fx.row, fx.col, '#8b5a2b', 35); break;
            case 'doom': if (typeof showDoomMushroom === 'function') showDoomMushroom(u); else showSkillFlashFx(fx.row, fx.col, '#c0392b', 55); break;
            case 'pierce': showPierceSkillFX(fx.toR, fx.toC); break;
            case 'spike': showSkillFlashFx(fx.row, fx.col, '#3498db', 50); break;
            case 'lvbuSlash': if (typeof showLvbuSlash === 'function') showLvbuSlash(u); else showSkillFlashFx(fx.toR, fx.toC, '#f39c12', 45); break;
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
function syncGameState() {
    if (!gameState.onlineMode || !ws || ws.readyState !== 1) return;
    ws.send(JSON.stringify({
        type: 'gameState',
        state: JSON.stringify({
            units: gameState.units.map(u => ({...u})),
            redBaseHp: gameState.redBaseHp,
            blueBaseHp: gameState.blueBaseHp,
            redEnergy: gameState.redEnergy,
            blueEnergy: gameState.blueEnergy,
            turnNumber: gameState.turnNumber,
            currentTurn: gameState.currentTurn,
            spikeNets: gameState.spikeNets || [],
            craters: gameState.craters || [],
            rageZones: gameState.rageZones || [],
            knightZones: gameState.knightZones || [],
            iceFields: gameState.iceFields || [],
            windZones: gameState.windZones || [],
            fireZones: gameState.fireZones || []
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
