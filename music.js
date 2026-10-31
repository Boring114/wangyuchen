// 背景音乐:主界面/卡包 与 对局内 双轨切换(平滑交叉淡入淡出,旧曲必定停止)
(function () {
    const tracks = {
        menu: new Audio('audio/bgm_menu6.wav'),
        battle: new Audio('audio/bgm_battle2.wav')
    };
    const volumes = { menu: 0.30, battle: 0.35 };
    // 主音量(设置里拖动调节,0-1)
    let master = 1;
    try { const sv = parseFloat(localStorage.getItem('chessVolume')); if (!isNaN(sv)) master = Math.max(0, Math.min(1, sv)); } catch (e) {}
    const targets = { menu: 0, battle: 0 };

    Object.keys(tracks).forEach(k => {
        tracks[k].loop = true;
        tracks[k].volume = 0;
        tracks[k].preload = 'auto';
    });

    let enabled = localStorage.getItem('chessMusic') !== 'off';
    let started = false;
    let current = 'menu';
    let lastToggleAt = 0;

    function btnEls() {
        return ['musicBtn', 'menuMusicBtn']
            .map(id => document.getElementById(id))
            .filter(Boolean);
    }

    function updateBtn() {
        btnEls().forEach(b => {
            b.textContent = enabled ? '♪ 音乐' : '♪ 关闭';
            b.classList.toggle('muted', !enabled);
            b.title = enabled ? '关闭背景音乐' : '开启背景音乐';
        });
    }

    function desiredTrack() {
        const g = document.getElementById('gameScreen');
        return g && !g.classList.contains('hidden') ? 'battle' : 'menu';
    }

    function applyTargets() {
        Object.keys(tracks).forEach(k => {
            targets[k] = (enabled && started && k === current) ? volumes[k] * master : 0;
        });
    }

    function playSafe(name) {
        const a = tracks[name];
        if (!a) return;
        const p = a.play();
        if (p && p.catch) p.catch(() => {});
    }

    function hardPauseOthers(keep) {
        Object.keys(tracks).forEach(k => {
            if (k === keep) return;
            tracks[k].pause();
            tracks[k].volume = 0;
            targets[k] = 0;
        });
    }

    // 统一的音量趋近器:目标为 0 的曲目降到 0 后立即暂停,避免双曲同播
    function tick() {
        Object.keys(tracks).forEach(k => {
            const a = tracks[k];
            const t = targets[k];
            const diff = t - a.volume;
            if (Math.abs(diff) < 0.004) {
                a.volume = t;
                if (t === 0 && !a.paused) a.pause();
                return;
            }
            a.volume = Math.max(0, Math.min(1, a.volume + diff * 0.15));
            if (t > 0 && a.paused) playSafe(k);
        });
    }
    setInterval(tick, 50);

    function start() {
        if (started || !enabled) return;
        started = true;
        current = desiredTrack();
        hardPauseOthers(current);
        tracks[current].volume = 0;
        applyTargets();
        playSafe(current);
    }

    function pauseAll() {
        Object.keys(tracks).forEach(k => { targets[k] = 0; });
        Object.keys(tracks).forEach(k => { tracks[k].pause(); tracks[k].volume = 0; });
    }

    function resume() {
        if (!enabled || !started) return;
        const name = desiredTrack();
        if (name !== current) {
            current = name;
            hardPauseOthers(name);
        }
        applyTargets();
        if (tracks[current].paused) playSafe(current);
    }

    function setScene(name) {
        if (name !== 'menu' && name !== 'battle') return;
        if (name !== current) {
            current = name;
            if (started && enabled) hardPauseOthers(name);
        }
        if (started && enabled) {
            applyTargets();
            if (tracks[current].paused) playSafe(current);
        }
    }

    function applySfxVolume() {
        try {
            if (window.cardSfx && Array.isArray(window.cardSfx.pool)) {
                window.cardSfx.pool.forEach(a => { a.volume = 0.5 * master; });
            }
        } catch (e) {}
    }
    window.chessMusic = {
        getVolume() { return master; },
        setVolume(v) {
            master = Math.max(0, Math.min(1, Number(v) || 0));
            try { localStorage.setItem("chessVolume", String(master)); } catch (e) {}
            applyTargets();
            applySfxVolume();
            return master;
        },
        toggle() {
            // 已经开播(music on)时点击必定静音;从未开播时点击则开始播放
            const turnOff = enabled && started;
            enabled = !turnOff;
            lastToggleAt = Date.now();
            localStorage.setItem('chessMusic', enabled ? 'on' : 'off');
            if (enabled) { start(); resume(); }
            else { pauseAll(); }
            updateBtn();
        },
        play: () => { start(); resume(); },
        pause: pauseAll,
        setScene: setScene,
        // 新对局:战斗曲从头播放
        restartBattle() {
            const a = tracks.battle;
            if (!a) return;
            current = 'battle';
            try { a.currentTime = 0; } catch (e) {}
            if (a.readyState === 0) {
                a.addEventListener('loadedmetadata', () => { try { a.currentTime = 0; } catch (e) {} }, { once: true });
            }
            if (!enabled) return;
            started = true;
            hardPauseOthers('battle');
            applyTargets();
            playSafe('battle');
        },
        syncScene() {
            const name = desiredTrack();
            if (name !== current) {
                setScene(name);
            } else if (started && enabled && targets[name] > 0 && tracks[name].paused) {
                playSafe(name);
            }
        },
        current: () => current,
        tracks: tracks,
        audio: tracks,
        isEnabled: () => enabled
    };

    document.addEventListener('pointerdown', (e) => {
        if (Date.now() - lastToggleAt < 250) return;
        const t = e && e.target;
        if (t && t.closest && t.closest('#musicBtn, #menuMusicBtn')) return;
        if (!started) start();
        else if (enabled) resume();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) pauseAll();
        else resume();
    });

    const screens = ['startScreen', 'modeSelectScreen', 'howToScreen', 'lobbyScreen', 'cardPackScreen', 'gameScreen'];
    const observer = new MutationObserver(() => {
        const name = desiredTrack();
        if (name !== current) setScene(name);
    });
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    });

    setInterval(() => { window.chessMusic.syncScene(); }, 500);

    btnEls().forEach(b => {
        b.addEventListener('click', (e) => { e.stopPropagation(); window.chessMusic.toggle(); });
    });

    updateBtn();
})();
