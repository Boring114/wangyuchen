// 卡牌点击音效(扑克牌甩动)
(function () {
    const URL = 'audio/card_click3.wav';
    const POOL_SIZE = 4;
    const pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
        const a = new Audio(URL);
        a.preload = 'auto';
        a.volume = 0.5;
        pool.push(a);
    }
    let idx = 0;

    window.playCardSfx = function () {
        try {
            const a = pool[idx++ % POOL_SIZE];
            a.currentTime = 0;
            a.playbackRate = 0.96 + Math.random() * 0.08;
            const p = a.play();
            if (p && p.catch) p.catch(() => {});
        } catch (e) {}
    };
    window.cardSfx = { pool: pool };
})();

// ===== 通用音效播放器 =====
// 用法:playSfx("card_xxx") 会播放 audio/sfx/card_xxx.wav(或 .mp3)
// 找不到文件时静默失败,不影响游戏
(function () {
    const cache = {};
    function makePool(url) {
        const pool = [];
        for (let i = 0; i < 4; i++) {
            const a = new Audio(url);
            a.preload = 'auto';
            pool.push(a);
        }
        return { pool, idx: 0 };
    }
    // 已存在的音效文件(名称 → 路径);未列出的按 audio/sfx/<name>.wav 处理
    window.SFX_FILES = {
        madara_deploy: 'audio/sfx/madara_deploy.mp3',
        madara_musou: 'audio/sfx/madara_musou.mp3',
        madara_meteor: 'audio/sfx/madara_meteor.mp3',
        yogg_deploy: 'audio/sfx/yogg_deploy.mp3',
        reynolds_deploy: 'audio/sfx/reynolds_deploy.mp3',
        reynolds_jackson_deploy: 'audio/sfx/reynolds_jackson_deploy.mp3'
    };
    function sfxVolume() {
        if (typeof window.chessSfxVolume === 'number') return Math.max(0, Math.min(1, window.chessSfxVolume));
        try {
            const v = parseFloat(localStorage.getItem('chessSfxVolume'));
            if (!isNaN(v)) return Math.max(0, Math.min(1, v));
        } catch (e) {}
        return 0.8;
    }
    window.getSfxVolume = sfxVolume;
    window.playSfx = function (name, volume) {
        if (!name) return;
        try {
            const vol = (typeof volume === 'number' ? volume : 1) * sfxVolume();
            if (vol <= 0) return;
            let entry = cache[name];
            if (!entry) {
                const url = (window.SFX_FILES && window.SFX_FILES[name]) ? window.SFX_FILES[name] : ('audio/sfx/' + name + '.wav');
                entry = cache[name] = makePool(url);
            }
            const a = entry.pool[entry.idx++ % entry.pool.length];
            a.volume = Math.min(1, vol);
            try { a.currentTime = 0; } catch (e) {}
            const p = a.play();
            if (p && p.catch) {
                p.catch(() => {
                    // 移动端自动播放被拦:等下一次用户手势再补播
                    const retry = () => {
                        document.removeEventListener("pointerdown", retry, true);
                        document.removeEventListener("touchstart", retry, true);
                        try { const p2 = a.play(); if (p2 && p2.catch) p2.catch(() => {}); } catch (e) {}
                    };
                    document.addEventListener("pointerdown", retry, true);
                    document.addEventListener("touchstart", retry, true);
                });
            }
        } catch (e) {}
    };
    // 移动端:首次触摸时静音试播一次,解锁所有音频元素
    window.unlockAudio = function () {
        try {
            Object.keys(cache).forEach(k => {
                const entry = cache[k];
                if (!entry || !entry.pool) return;
                entry.pool.forEach(a => {
                    try {
                        const prevVol = a.volume;
                        a.volume = 0;
                        const p = a.play();
                        if (p && p.then) p.then(() => { a.pause(); a.currentTime = 0; a.volume = prevVol; }).catch(() => { a.volume = prevVol; });
                        else { a.pause(); a.currentTime = 0; a.volume = prevVol; }
                    } catch (e) {}
                });
            });
        } catch (e) {}
    };
    window.stopSfx = function (name) {
        const entry = cache[name];
        if (!entry) return;
        entry.pool.forEach(a => { try { a.pause(); a.currentTime = 0; } catch (e) {} });
    };
    // 按卡牌 id 播放 audio/sfx/card_<id>.wav
    window.playCardSfxById = function (cardId, volume) {
        if (!cardId) return;
        window.playSfx('card_' + cardId, volume);
    };
})();