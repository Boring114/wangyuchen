// 联机对战客户端
const ONLINE_SERVER = 'wss://319ac561.r17.cpolar.top';

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
                gameState.currentTurn = 'blue';
                updateEnergyDisplay();
                updateBaseHpDisplay();
                initBoard();
                gameState.units.forEach(u => renderUnit(u));
                // AI 用蓝方单位
                gameState.aiDeck = [
                    { id: 'red_owner', name: '红方指挥官', attack: 0, hp: 1, moveRange: 0, attackRange: 0, cost: 0 }
                ];
            } else {
                // 红方接收蓝方状态(蓝方回合结束后回合流转回红方)
                gameState.units = gs.units.map(u => ({...u}));
                gameState.redBaseHp = gs.redBaseHp;
                gameState.blueBaseHp = gs.blueBaseHp;
                gameState.redEnergy = gs.redEnergy;
                gameState.blueEnergy = gs.blueEnergy;
                gameState.turnNumber = gs.turnNumber;
                gameState.currentTurn = 'red';
                updateEnergyDisplay();
                updateBaseHpDisplay();
                initBoard();
                gameState.units.forEach(u => renderUnit(u));
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
    startGame();
    // 红方先手
    if (onlineTeam === 'blue') {
        // 蓝方等待红方操作
    }
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
            turnNumber: gameState.turnNumber
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
