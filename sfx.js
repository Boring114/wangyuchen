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
            try { a.load(); } catch (e) {}
            a.setAttribute('playsinline', '');
            a.className = 'sfx-audio-node';
            a.style.display = 'none';
            try { if (document.body) document.body.appendChild(a); } catch (e) {}
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
        reynolds_jackson_deploy: 'audio/sfx/reynolds_jackson_deploy.mp3',
        spec_squad_deploy: 'audio/sfx/spec_squad_deploy.mp3',
        yogg_saron_deploy: 'audio/sfx/yogg_saron_deploy.mp3',
        yogg_fate_deploy: 'audio/sfx/yogg_fate_deploy.mp3',
        guff_deploy: 'audio/sfx/guff_deploy.mp3',
        storm_dragon_death: 'audio/sfx/storm_dragon_death.mp3',
        eagle_fire: 'audio/sfx/eagle_fire.mp3',
        eagle_impact: 'audio/sfx/eagle_impact.mp3',
        eagle_activate: 'audio/sfx/eagle_activate.mp3',
        dirty_rat_deploy: 'audio/sfx/dirty_rat_deploy.mp3',
        undead_giant_deploy: 'audio/sfx/undead_giant_deploy.mp3',
        undead_giant_attack: 'audio/sfx/undead_giant_attack.mp3',
        asala_deploy: 'audio/sfx/asala_deploy.mp3',
        asala_attack: 'audio/sfx/asala_attack.mp3',
        dragon_baby_deploy: 'audio/sfx/dragon_baby_deploy.mp3',
        blowdart_goblin_deploy: 'audio/sfx/blowdart_goblin_deploy.mp3',
        blowdart_goblin_attack: 'audio/sfx/blowdart_goblin_attack.mp3',
        hog_rider_deploy: 'audio/sfx/hog_rider_deploy.mp3',
        golem_deploy: 'audio/sfx/golem_deploy.mp3',
        heal_fairy_deploy: 'audio/sfx/heal_fairy_deploy.mp3',
        fisherman_deploy: 'audio/sfx/fisherman_deploy.mp3',
        pain_shinra: 'audio/sfx/pain_shinra.mp3',
        pain_bansho: 'audio/sfx/pain_bansho.mp3',
        pain_chibaku: 'audio/sfx/pain_chibaku.mp3',
        shangbole_deploy: 'audio/sfx/shangbole_deploy.mp3'
    };
    // ===== 等响度归一化:按文件峰值自动配平,所有音效听起来一样响 =====
    const sfxPeakCache = {};   // name -> 峰值(0~1)
    const SFX_TARGET_PEAK = 0.55;
    let decodeCtx = null;
    function getDecodeCtx() {
        if (!decodeCtx) {
            try { decodeCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { decodeCtx = null; }
        }
        return decodeCtx;
    }
    function sfxUrlOf(name) {
        return (window.SFX_FILES && window.SFX_FILES[name]) ? window.SFX_FILES[name] : ('audio/sfx/' + name + '.wav');
    }
    async function measurePeak(name) {
        if (sfxPeakCache[name] !== undefined) return sfxPeakCache[name];
        sfxPeakCache[name] = null; // 防止重复请求
        try {
            const ctx = getDecodeCtx();
            if (!ctx) return null;
            const res = await fetch(sfxUrlOf(name));
            const buf = await res.arrayBuffer();
            const audio = await ctx.decodeAudioData(buf);
            let peak = 0;
            for (let ch = 0; ch < audio.numberOfChannels; ch++) {
                const data = audio.getChannelData(ch);
                for (let i = 0; i < data.length; i += 8) {
                    const v = Math.abs(data[i]);
                    if (v > peak) peak = v;
                }
            }
            sfxPeakCache[name] = peak || 0;
            return sfxPeakCache[name];
        } catch (e) {
            sfxPeakCache[name] = 0;
            return 0;
        }
    }
    // ===== 把过轻的音效重新渲染成标准响度的 WAV(浏览器端离线渲染) =====
    const sfxBlobUrl = {};   // name -> blob url
    const sfxLoudBusy = {};
    function encodeWav(buffer, softClip) {
        const numCh = buffer.numberOfChannels;
        const len = buffer.length;
        const sr = buffer.sampleRate;
        const bytes = 44 + len * numCh * 2;
        const ab = new ArrayBuffer(bytes);
        const view = new DataView(ab);
        const writeStr = (off, str) => { for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i)); };
        writeStr(0, 'RIFF');
        view.setUint32(4, bytes - 8, true);
        writeStr(8, 'WAVE');
        writeStr(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numCh, true);
        view.setUint32(24, sr, true);
        view.setUint32(28, sr * numCh * 2, true);
        view.setUint16(32, numCh * 2, true);
        view.setUint16(34, 16, true);
        writeStr(36, 'data');
        view.setUint32(40, len * numCh * 2, true);
        let off = 44;
        const chans = [];
        for (let c = 0; c < numCh; c++) chans.push(buffer.getChannelData(c));
        for (let i = 0; i < len; i++) {
            for (let c = 0; c < numCh; c++) {
                let v = chans[c][i];
                if (softClip) v = Math.tanh(v); // 软削波:提升响度又不破音
                v = Math.max(-1, Math.min(1, v));
                view.setInt16(off, v < 0 ? v * 0x8000 : v * 0x7FFF, true);
                off += 2;
            }
        }
        return new Blob([ab], { type: 'audio/wav' });
    }
    // 归一化时额外再放大的倍数(软削波保证不破音)
    const SFX_LOUDIFY_EXTRA = {};
    async function buildLoudVersion(name) {
        if (sfxBlobUrl[name] || sfxLoudBusy[name]) return;
        sfxLoudBusy[name] = true;
        try {
            const peak = sfxPeakCache[name];
            if (!peak || peak >= 0.85) return;
            const res = await fetch(sfxUrlOf(name));
            const arr = await res.arrayBuffer();
            const ctx = getDecodeCtx();
            if (!ctx) return;
            const audio = await ctx.decodeAudioData(arr);
            const extra = SFX_LOUDIFY_EXTRA[name] || 1;
            const gain = Math.min(60, (0.9 / peak) * extra);
            const off = new OfflineAudioContext(audio.numberOfChannels, audio.length, audio.sampleRate);
            const src = off.createBufferSource();
            src.buffer = audio;
            const g = off.createGain();
            g.gain.value = gain;
            src.connect(g);
            g.connect(off.destination);
            src.start(0);
            const rendered = await off.startRendering();
            const blob = encodeWav(rendered, extra > 1);
            sfxBlobUrl[name] = URL.createObjectURL(blob);
            if (cache[name]) delete cache[name]; // 下次播放用新文件重建
        } catch (e) {
        } finally {
            sfxLoudBusy[name] = false;
        }
    }
    window.sfxGetBlobs = function () { return sfxBlobUrl; };
    window.sfxNormalizeAll = function () { /* 已停用:改用原始文件播放,避免 blob 兼容问题 */ };
    // 个别音效的额外增益(在统一响度基础上微调)
    const SFX_GAIN_BOOST = {
        madara_deploy: 1.35,
        madara_musou: 1.35,
        madara_meteor: 1.35,
        reynolds_deploy: 1.35,
        spec_squad_deploy: 0.62,
        eagle_fire: 2.2,
        eagle_impact: 2.2,
        eagle_activate: 2.2
    };
    // 用户在"音效设置"里的单卡增益(0~2)
    function userGain(name) {
        try {
            const raw = localStorage.getItem("chessSfxGains");
            if (raw) {
                const map = JSON.parse(raw);
                if (map && typeof map[name] === "number") return Math.max(0, Math.min(2, map[name]));
            }
        } catch (e) {}
        return 1;
    }
    const SFX_HEADROOM = 0.48; // 留出提升余量
    function gainFor(name) {
        const boost = (SFX_GAIN_BOOST[name] || 1) * userGain(name);
        const peak = sfxPeakCache[name];
        if (!peak) return Math.max(0, Math.min(2, boost * SFX_HEADROOM));
        if (peak >= 0.85) return Math.max(0, Math.min(2.5, boost * 0.5)); // 满响度文件不再补偿
        return Math.max(0, Math.min(4, (SFX_TARGET_PEAK / peak) * boost * SFX_HEADROOM));
    }
    window.sfxGetPeaks = function () { return sfxPeakCache; };
    window.sfxMeasureAll = function () {
        const names = Object.keys(window.SFX_FILES || {});
        names.forEach(n => { measurePeak(n); });
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
    window.playSfx = function (name, volume, force) {
        if (!name) return;
        try {
            const base = (typeof volume === 'number') ? volume : 1;
            const vol = force ? base : (base * sfxVolume() * gainFor(name));
            if (vol <= 0) return;
            const url = sfxUrlOf(name); // 统一用原始文件,避免 blob 在部分设备无法播放
            let entry = cache[name];
            if (!entry || entry.url !== url) {
                entry = cache[name] = makePool(url);
                entry.url = url;
            }
            const a = entry.pool[entry.idx++ % entry.pool.length];
            a.volume = Math.max(0, Math.min(1, vol));
            try { a.currentTime = 0; } catch (e) {}
            // 首次播放时音频可能还没解码完,等 canplay 再播(否则第一遍会没声)
            function doPlay() {
                try {
                    const p = a.play();
                    if (p && p.catch) {
                        p.catch(() => {
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
            }
            // 未就绪时:等 canplay,同时 260ms 后兜底再试一次(不重新 load,避免打断已解锁的元素)
            let _played = false;
            const oncePlay = () => { if (_played) return; _played = true; doPlay(); };
            if (a.readyState < 2) {
                a.addEventListener("canplay", oncePlay, { once: true });
                setTimeout(oncePlay, 260);
            } else {
                oncePlay();
            }
        } catch (e) {}
    };
    // 移动端:首次触摸时静音试播一次,解锁所有音频元素
    // 解锁:只做轻量标记(不再预建/预播所有元素,避免卡顿)
    window.unlockAllSfxPools = function () {};
    window.unlockAudio = function () {};

    // 停止所有正在播放的音效(退出对局/试听前)
    // 预加载指定音效(开局前先把可能用到的音效下载好,避免播到一半卡顿)
    window.preloadSfx = function (names) {
        (names || []).forEach(name => {
            try {
                const url = sfxUrlOf(name);
                let entry = cache[name];
                if (!entry || entry.url !== url) {
                    entry = cache[name] = makePool(url);
                    entry.url = url;
                }
            } catch (e) {}
        });
    };
    // 闲时把音效文件预热到浏览器缓存(不创建音频元素,只走 HTTP 缓存)
    window.prefetchAllSfx = async function () {
        const names = Object.keys(window.SFX_FILES || {});
        for (const n of names) {
            try { await fetch(sfxUrlOf(n), { cache: "force-cache" }); } catch (e) {}
        }
    };
    window.stopAllSfx = function () {
        try {
            Object.keys(cache).forEach(k => {
                const entry = cache[k];
                if (!entry || !entry.pool) return;
                entry.pool.forEach(a => { try { a.pause(); a.currentTime = 0; } catch (e) {} });
            });
        } catch (e) {}
    };
    // 试听:先停掉上一次,再播放本次
    window.previewSfx = function (name) {
        window.stopAllSfx();
        window.playSfx(name);
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

    // 启动后提前归一化,避免第一次播放还是原始小声版本
    setTimeout(function () { try { if (window.prefetchAllSfx) window.prefetchAllSfx(); } catch (e) {} }, 2500);
})();