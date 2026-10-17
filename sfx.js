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
