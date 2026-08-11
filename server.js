// 联机服务器 - 部署到 Render.com / Railway
// package.json: { "name": "chessboard-server", "dependencies": { "ws": "^8.0" }, "scripts": { "start": "node server.js" } }

const { WebSocketServer } = require('ws');

const rooms = {}; // roomId -> { password, players: [], state }
const matchQueue = []; // 随机匹配等待队列

const wss = new WebSocketServer({ port: process.env.PORT || 8090 });

wss.on('connection', (ws) => {
    let userRoom = null;
    let userTeam = null;

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg.toString());

            if (data.type === 'match') {
                // 随机匹配:进入等待队列,凑齐两人自动配对
                if (!matchQueue.includes(ws)) matchQueue.push(ws);
                ws.send(JSON.stringify({ type: 'matching', msg: '匹配中...' }));
                if (matchQueue.length >= 2) {
                    const p1 = matchQueue.shift();
                    const p2 = matchQueue.shift();
                    const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
                    rooms[roomId] = { password: '', players: [{ ws: p1, ready: true }, { ws: p2, ready: true }], state: {} };
                    p1.userRoom = roomId; p2.userRoom = roomId;
                    p1.userTeam = 'red'; p2.userTeam = 'blue';
                    p1.send(JSON.stringify({ type: 'matchFound', roomId, team: 'red' }));
                    p2.send(JSON.stringify({ type: 'matchFound', roomId, team: 'blue' }));
                }
            }
            else if (data.type === 'create') {
                // 创建房间
                const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
                rooms[roomId] = { password: data.password, players: [{ ws, ready: false }], state: null };
                userRoom = roomId;
                userTeam = 'red';
                ws.send(JSON.stringify({ type: 'roomCreated', roomId, team: 'red' }));
            }
            else if (data.type === 'join') {
                const room = rooms[data.roomId];
                if (!room) { ws.send(JSON.stringify({ type: 'error', msg: '房间不存在' })); return; }
                if (room.password !== data.password) { ws.send(JSON.stringify({ type: 'error', msg: '密码错误' })); return; }
                if (room.players.length >= 2) { ws.send(JSON.stringify({ type: 'error', msg: '房间已满' })); return; }
                room.players.push({ ws, ready: false });
                userRoom = data.roomId;
                userTeam = 'blue';
                ws.send(JSON.stringify({ type: 'joined', team: 'blue' }));
                // 通知双方开始
                room.players[0].ws.send(JSON.stringify({ type: 'opponentJoined' }));
            }
            else if (data.type === 'chat' && (userRoom || ws.userRoom)) {
                // 转发聊天消息给对方
                const room = rooms[userRoom || ws.userRoom];
                if (!room) return;
                room.players.forEach(p => {
                    if (p.ws !== ws && p.ws.readyState === 1) {
                        p.ws.send(JSON.stringify({ type: 'chat', text: data.text }));
                    }
                });
            }
            else if (data.type === 'gameState' && (userRoom || ws.userRoom)) {
                // 转发游戏状态给对方
                const room = rooms[userRoom || ws.userRoom];
                if (!room) return;
                room.players.forEach(p => {
                    if (p.ws !== ws && p.ws.readyState === 1) {
                        p.ws.send(JSON.stringify({ type: 'gameState', state: data.state }));
                    }
                });
            }
            else if (data.type === 'ready' && userRoom) {
                const room = rooms[userRoom || ws.userRoom];
                const me = room.players.find(p => p.ws === ws);
                if (me) me.ready = true;
                if (room.players.every(p => p.ready)) {
                    room.players.forEach(p => p.ws.send(JSON.stringify({ type: 'allReady' })));
                }
            }
        } catch(e) {}
    });

    ws.on('close', () => {
        // 从匹配队列移除
        const qi = matchQueue.indexOf(ws);
        if (qi !== -1) matchQueue.splice(qi, 1);
        if ((userRoom || ws.userRoom) && rooms[userRoom || ws.userRoom]) {
            rooms[userRoom || ws.userRoom].players.forEach(p => {
                if (p.ws !== ws && p.ws.readyState === 1) {
                    p.ws.send(JSON.stringify({ type: 'opponentLeft' }));
                }
            });
            delete rooms[userRoom || ws.userRoom];
        }
    });
});

console.log('Server running on port', process.env.PORT || 8090);
