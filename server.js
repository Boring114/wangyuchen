// 联机服务器：同一端口同时提供游戏静态页面 + WebSocket 对战
// 本地运行: node server.js  (默认 8090)
// 部署: Render/Railway 的 PORT 环境变量同样生效

const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const ROOT = __dirname;
const PORT = parseInt(process.env.PORT || '8090', 10);

const rooms = {}; // roomId -> { password, players: [], state }
const matchQueue = []; // 随机匹配等待队列

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
    // 防止目录穿越
    const filePath = path.normalize(path.join(ROOT, urlPath));
    const rel = path.relative(ROOT, filePath);
    // 防止目录穿越 / 访问隐藏目录(.cowork-temp 等)
    if (rel.startsWith('..') || path.isAbsolute(rel) || rel.split(path.sep).some(seg => seg.startsWith('.'))) {
        res.writeHead(403);
        res.end('403');
        return;
    }
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 ' + urlPath);
            return;
        }
        const mime = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        const range = req.headers.range;
        if (range && /^bytes=/.test(range)) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10) || 0;
            const end = parts[1] ? parseInt(parts[1], 10) : data.length - 1;
            if (start >= data.length || end >= data.length) {
                res.writeHead(416, { 'Content-Range': 'bytes */' + data.length });
                res.end();
                return;
            }
            const chunk = data.subarray(start, end + 1);
            res.writeHead(206, {
                'Content-Type': mime,
                'Content-Range': 'bytes ' + start + '-' + end + '/' + data.length,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunk.length,
                'Cache-Control': 'no-cache'
            });
            res.end(chunk);
            return;
        }
        res.writeHead(200, {
            'Content-Type': mime,
            'Content-Length': data.length,
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'no-cache'
        });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

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
                ws.userRoom = roomId;
                ws.userTeam = 'red';
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
                ws.userRoom = data.roomId;
                ws.userTeam = 'blue';
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
            else if (data.type === 'fx' && (userRoom || ws.userRoom)) {
                // 转发特效事件给对方(对面播放同样动画)
                const room = rooms[userRoom || ws.userRoom];
                if (!room) return;
                room.players.forEach(p => {
                    if (p.ws !== ws && p.ws.readyState === 1) {
                        p.ws.send(JSON.stringify({ type: 'fx', fx: data.fx }));
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
        } catch (e) {}
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

server.listen(PORT, () => console.log('Server running on port ' + PORT));
