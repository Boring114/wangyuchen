const cellW = 30; const cellH = 26;const BOARD_ROWS = 28;
const BOARD_COLS = 24;

// 卡牌数据
const cardLibrary = [
    {
        id: 'normal_person',
        name: '非常普通的人',
        attack: 1,
        hp: 1,
        moveRange: 3,
        attackRange: 1,
        cost: 1,
        artwork: 'black-dot',
        description: "他真的非常普通。"
    },
    {
        id: 'cavalry',
        name: '骑兵',
        attack: 1,
        hp: 2,
        moveRange: 8,
        attackRange: 2,
        cost: 3,
        artwork: 'cavalry',
        description: "冲锋起来伤害高。",
        chargeMove: 5,
        chargeDamage: 3
    },
    {
        id: 'musketeer',
        name: '火枪手',
        attack: 2,
        hp: 1,
        moveRange: 3,
        attackRange: 5,
        cost: 2,
        artwork: 'musketeer',
        description: "一个白板射手。"
    },
    {
        id: 'heavy_knight',
        name: '重甲骑士',
        attack: 2,
        hp: 2,
        armor: 1,
        moveRange: 1,
        attackRange: 1,
        cost: 4,
        artwork: 'heavy-knight',
        description: "他很笨重，但是装甲很厚。"
    },
    {
        id: 'asala_soldier',
        name: '阿萨拉士兵',
        attack: 1,
        hp: 1,
        moveRange: 3,
        attackRange: 4,
        cost: 2,
        artwork: 'asala',
        description: "你丫完了，我说的！一个大飞踹给你李宁踹开线了，再一枪爆头。",
        meleeAttack: 2,
        meleeRange: 1,
        rangedCrit: true
    },
    {
        id: 'saeed',
        name: '赛伊德',
        attack: 3,
        hp: 3,
        armor: 1,
        moveRange: 5,
        attackRange: 5,
        cost: 8,
        artwork: 'saeed',
        description: "你掉进陷阱了！拥有百分之50的暴击率，每回合受到第一次攻击时闪避该攻击，闪避每回合只有一次，当其受到伤害后，发射火焰弩反击敌人并留下燃烧弹。",
        hero: true,
        meleeAttack: 2,
        meleeRange: 1,
        dodge: true,
        critChance: 0.5,
        counterAttack: 2
    },
    {
        id: 'warden_gherros',
        name: '典狱长·格赫罗斯',
        attack: 5,
        hp: 6,
        armor: 2,
        armorPen: 1,
        moveRange: 5,
        attackRange: 5,
        cost: 13,
        artwork: 'warden',
        description: "自带亲卫队，自身降到半血以下暴击率由百分之50提升至百分之100。",
        hero: true,
        heroDeployText: '立即肃清，一个都不能放过！',
        halfHpText: '典狱长实力受损！',
        heroDeployColor: '#e74c3c',
        critChance: 0.5,
        summon: true
    },
    {
        id: 'raven',
        name: '渡鸦',
        attack: 3,
        hp: 5,
        armor: 1,
        moveRange: 4,
        attackRange: 4,
        cost: 15,
        artwork: 'raven',
        description: "近距离可处决敌人，同时拥有强力的亲卫队，半血以下释放烟雾弹，略微阻挡对方视野。",
        hero: true,
        heroDeployText: '欢迎来到阿萨拉，欢迎来到游乐园！',
        halfHpText: '狩猎开始了！',
        critChance: 0.5,
        executionRange: 2,
        halfHpSmoke: 5,
        summon: true,
        summonGuardType: 'raven_guard'
    },
    {
        id: 'light_tank',
        name: '轻型坦克',
        attack: 2,
        hp: 4,
        armor: 1,
        moveRange: 5,
        attackRange: 5,
        cost: 6,
        artwork: 'light-tank',
        description: "很普通的坦克，有溅射伤害。",
        splashRadius: 1
    },
    {
        id: 'ice_sprite',
        name: '冰雪精灵',
        attack: 1,
        hp: 1,
        moveRange: 11,
        attackRange: 2,
        cost: 1,
        artwork: 'ice-sprite',
        description: "可爱的精灵，一般搭配着速猪食用。",
        oneShot: true,
        freeze: true
    },
    {
        id: 'madara',
        name: '宇智波斑·神驹佑将',
        attack: 2,
        hp: 8,
        armor: 1,
        moveRange: 6,
        attackRange: 3,
        cost: 18,
        artwork: 'madara',
        description: "普通攻击前方竖向三格，敌人近距离攻击时他自动反击3×3范围内敌军并跃起跳向敌军造成大范围伤害，每次攻击到敌人会积攒能量，能量≥4的时候双击释放技能进入无双状态，额外增加攻击次数和移动距离，5，6能量时无双状态结束后自动释放奥义，召唤陨石砸下伤害大范围敌军。",
        hero: true,
        heroDeployText: '吾不可阻挡！',
        heroDeployColor: '#e74c3c',
        heroDeployDuration: 2000,
        aoeAttack: true,
        madaraBurn: 3,
        madaraEnergy: 0,
        madaraMaxEnergy: 6,
        musouAttacks: 0,
        musouMove: 10,
        inMusou: false,
        musouAttacksMax: 8
    },
    {
        id: 'kai',
        name: '铠',
        attack: 3,
        hp: 6,
        armor: 1,
        moveRange: 6,
        attackRange: 1,
        cost: 11,
        artwork: 'kai',
        description: "一万暴击！每回合攻击两次，第二次是用来回血的飞镖，可弹射。双击使用大招，获得护甲，生命值，攻击力的加成。",
        critChance: 0.5,
        kaiAttacks: 0,
        kaiShurikenRange: 4,
        kaiShurikenBounce: 3,
        kaiShurikenMax: 3,
        kaiUltUsed: false,
        kaiUltCooldown: 0,
        kaiUltActive: false,
        kaiUltDuration: 0,
        kaiUltAttack: 1,
        kaiUltArmor: 2,
        kaiUltHp: 2
    },
    {
        id: 'cattail',
        name: '猫尾草',
        attack: 1,
        hp: 3,
        moveRange: 0,
        attackRange: 99,
        cost: 4,
        artwork: 'cattail',
        description: "普通的猫，但是全屏攻击，真实伤害！",
        armorPen: 99
    },
    {
        id: 'electric_pea',
        name: '超级电能豌豆·5阶',
        attack: 4,
        hp: 3,
        moveRange: 0,
        attackRange: 99,
        cost: 12,
        artwork: 'electric-pea',
        description: "至尊平a，闪电连锁！",
        lineAttack: true,
        chainRange: 5,
        chainDamage: 2,
        electricHit: []
    },
    {
        id: 'energy_collector',
        name: '能量收集器',
        attack: 0,
        hp: 3,
        moveRange: 0,
        attackRange: 0,
        cost: 3,
        artwork: 'energy-collector',
        description: "作用一目了然。",
        building: true,
        energyBoost: 1
    },
    {
        id: 'miner',
        name: '掘地矿工',
        attack: 1,
        hp: 3,
        moveRange: 4,
        attackRange: 1,
        cost: 3,
        artwork: 'miner',
        description: "削弱矿工。",
        miner: true
    },
    {
        id: 'reynolds',
        name: '孤胆游侠·雷诺',
        attack: 2,
        hp: 3,
        armorPen: 1,
        moveRange: 5,
        attackRange: 4,
        cost: 17,
        artwork: 'reynolds',
        description: "登场让所有敌人都消失哦。",
        deployEffect: true,
        hero: true,
        heroDeployText: '你想跟我拼枪？那你可要小心了！',
        heroDeployColor: '#f1c40f',
        heroDeployDuration: 2500
    },
    {
        id: 'lightning_dragon',
        name: '雷电飞龙',
        attack: 5,
        hp: 6,
        moveRange: 4,
        attackRange: 4,
        cost: 8,
        artwork: 'lightning-dragon',
        description: "千万不要无脑一字划。",
        flying: true,
        chainAttack: true,
        chainMax: 5,
        chainDist: 3
    },
    {
        id: 'pain_tendo',
        name: '佩恩·天道',
        attack: 0,
        hp: 5,
        moveRange: 5,
        attackRange: 0,
        cost: 10,
        artwork: 'pain',
        description: "一回合大范围神罗天征，一回合万象天引超强吸力。",
        abilityPhase: 0,
        abilityTimer: 0,
        shinraRange: 4,
        shinraDamage: 2,
        banshoRange: 2,
        banshoDamage: 1,
        painEnergy: 0,
        painMaxEnergy: 4
    },
    {
        id: 'big_pekka',
        name: '大皮卡',
        attack: 5,
        hp: 6,
        moveRange: 2,
        attackRange: 2,
        cost: 7,
        artwork: 'pekka',
        description: "白板但是力气大。"
    },
    {
        id: 'asala_flamer',
        name: '阿萨拉喷火兵',
        attack: 2,
        hp: 3,
        armor: 1,
        moveRange: 4,
        attackRange: 4,
        cost: 4,
        artwork: 'asala-flamer',
        description: '我要把你烧焦！',
        fireAttack: true,
        burnDamage: 2
    },
    {
        id: 'factory_manager',
        name: '厂长',
        attack: 0,
        hp: 6,
        moveRange: 4,
        attackRange: 2,
        cost: 11,
        artwork: 'factory-manager',
        description: '就像第五人格里一样，厂长来到了这个地方依旧可以两下平a将对方打倒',
        percentAttack: 0.5,
        charcoalCount: 0,
        charcoalMax: 2
    }
];

// 游戏状态
const gameState = {
    // 卡包相关
    cardCollection: [...cardLibrary],
    battleDeck: [],
    
    // 游戏相关
    board: [],
    units: [],
    currentTurn: 'red', // 'red' 或 'blue'
    turnNumber: 1,
    redEnergy: 1,
    blueEnergy: 1,
    maxEnergy: 20,
    redBaseHp: 50,
    blueBaseHp: 50,
    timer: 45,
    selectedUnit: null,
    selectedCell: null,
    deployMode: false,
    deployPosition: null,
    deployTargetRow: null,
    deployTargetCol: null,
    moveUsed: {},
    attackedUnits: new Set(),
    fireZones: [],
    smokeZones: [],
    winner: null
};

// DOM 元素
const startScreen = document.getElementById('startScreen');
const cardPackScreen = document.getElementById('cardPackScreen');
const gameScreen = document.getElementById('gameScreen');
const startBtn = document.getElementById('startBtn');
const cardPackBtn = document.getElementById('cardPackBtn');
const backBtn = document.getElementById('backBtn');
const exitBtn = document.getElementById('exitBtn');
const skipBtn = document.getElementById('skipBtn');
const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const redEnergyBar = document.getElementById('redEnergy');
const blueEnergyBar = document.getElementById('blueEnergy');
const redEnergyText = document.getElementById('redEnergyText');
const blueEnergyText = document.getElementById('blueEnergyText');
const redBaseHpBar = document.getElementById('redBaseHp');
const blueBaseHpBar = document.getElementById('blueBaseHp');
const redHpText = document.getElementById('redHpText');
const blueHpText = document.getElementById('blueHpText');
const blueTurnIndicator = document.getElementById('blueTurnIndicator');
const redTurnIndicator = document.getElementById('redTurnIndicator');
const gameOverModal = document.getElementById('gameOverModal');
const winnerText = document.getElementById('winnerText');
const restartBtn = document.getElementById('restartBtn');

// 卡包界面元素
const cardCollectionTab = document.getElementById('cardCollectionTab');
const battleDeckTab = document.getElementById('battleDeckTab');
const cardCollection = document.getElementById('cardCollection');
const battleDeck = document.getElementById('battleDeck');
const cardGrid = document.getElementById('cardGrid');
const deckList = document.getElementById('deckList');
const deckCount = document.getElementById('deckCount');
const cardInfoPanel = document.getElementById('cardInfoPanel');
const cardName = document.getElementById('cardName');
const cardAttack = document.getElementById('cardAttack');
const cardHp = document.getElementById('cardHp');
const cardMove = document.getElementById('cardMove');
const cardRange = document.getElementById('cardRange');
const cardCost = document.getElementById('cardCost');

// 部署弹窗
const deployModal = document.getElementById('deployModal');
const battleDeckGrid = document.getElementById('battleDeckGrid');
const closeDeployModal = document.getElementById('closeDeployModal');

let timerInterval = null;

// 初始化预览棋盘
function initPreviewBoard() {
    const previewBoard = document.querySelector('.preview-board');
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = `preview-cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`;
            previewBoard.appendChild(cell);
        }
    }
}

// 初始化游戏棋盘
function initBoard() {
    gameBoard.innerHTML = '';
    gameState.board = [];
    
    for (let row = 0; row < BOARD_ROWS; row++) {
        const rowArray = [];
        for (let col = 0; col < BOARD_COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // 棋盘格子颜色交替
            if ((row + col) % 2 === 0) {
                cell.classList.add('light');
            }
            
            // 中心分界线（在第13行底部）
            if (row === 13) {
                cell.classList.add('center-line-bottom');
            }
            
            // 蓝方大本营：行0-2，列10-13
            if (row >= 0 && row <= 2 && col >= 10 && col <= 13) {
                cell.classList.add('blue-base');
                if (row === 1 && (col === 11 || col === 12)) {
                    cell.classList.add('blue-base-center');
                }
            }
            
            // 红方大本营：行25-27，列10-13
            if (row >= 25 && row <= 27 && col >= 10 && col <= 13) {
                cell.classList.add('red-base');
                if (row === 26 && (col === 11 || col === 12)) {
                    cell.classList.add('red-base-center');
                }
            }
            
            cell.addEventListener('click', handleCellClick);
    cell.addEventListener('dblclick', handleCellDblClick);
            gameBoard.appendChild(cell);
            rowArray.push(cell);
        }
        gameState.board.push(rowArray);
    }
    
    // 添加大本营血量显示覆盖层
    const blueOverlay = document.createElement('div');
    blueOverlay.id = 'blueBaseOverlay';
    blueOverlay.className = 'base-hp-overlay blue-base-overlay';
    gameBoard.appendChild(blueOverlay);
    
    const redOverlay = document.createElement('div');
    redOverlay.id = 'redBaseOverlay';
    redOverlay.className = 'base-hp-overlay red-base-overlay';
    gameBoard.appendChild(redOverlay);
    
    // 设置初始 HP 值
    blueOverlay.textContent = gameState.blueBaseHp;
    redOverlay.textContent = gameState.redBaseHp;
}

// 处理格子点击
function handleCellClick(e) {
    if (gameState.gameOver) return;
    
    // 点击可能落在 .unit 等子元素上，用 closest 向上找到 .cell
    const cell = e.target.closest('.cell');
    if (!cell) return;
    
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // 部署模式（已选择卡牌后，再次点击格子部署——作为备用入口）
    if (gameState.deployMode && gameState.deployPosition !== null) {
        // 检查是否可部署（矿工全图可部署）
        const card = gameState.battleDeck[gameState.deployPosition];
        const isMiner = card && card.miner;
        let isValidPosition;
        if (isMiner) {
            isValidPosition = !isBlueBase(row, col) && !isRedBase(row, col);
        } else if (gameState.currentTurn === 'red') {
            isValidPosition = row >= 14 && !isRedBase(row, col);
        } else {
            isValidPosition = row <= 13 && !isBlueBase(row, col);
        }
        
        if (isValidPosition) {
            const unitAtPos = gameState.units.find(u => u.row === row && u.col === col);
            if (!unitAtPos) {
                deployUnit(row, col);
            }
        }
        closeDeployModalFunc();
        return;
    }
    
    // 行动模式 - 点击选中的单位可以移动到的格子
    if (gameState.selectedUnit && cell.classList.contains('movable')) {
        moveUnit(row, col);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    
    // 行动模式 - 点击可攻击的目标
    if (gameState.selectedUnit && cell.classList.contains('attackable')) {
        // 额外检查：目标是否在敌方烟雾中
        if (isCellSmokedFor(row, col, gameState.currentTurn)) {
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
        const targetUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (targetUnit && targetUnit.team !== gameState.currentTurn) {
            attackUnit(targetUnit);
        } else if (gameState.selectedUnit.team === 'red' && isBlueBase(row, col)) {
            // 红方攻击蓝方大本营
            attackBase(true);
        } else if (gameState.selectedUnit.team === 'blue' && isRedBase(row, col)) {
            // 蓝方攻击红方大本营
            attackBase(false);
        }
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    
    // 点击己方单位进入行动模式
    const clickedUnit = gameState.units.find(u => u.row === row && u.col === col);
    if (clickedUnit && clickedUnit.team === gameState.currentTurn) {
        if (clickedUnit.frozen) {
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
        // Pain 能力激活：再次点击已选中的 Pain
        if (clickedUnit.shinraRange && clickedUnit === gameState.selectedUnit) {
            activatePainAbility(clickedUnit);
            return;
        }
        // 马斑天下无双：4格能量+再次点击
        if (clickedUnit.madaraMaxEnergy && clickedUnit === gameState.selectedUnit && (clickedUnit.madaraEnergy||0) >= 4) {
            activateMusou(clickedUnit);
            return;
        }
        // 铠大招：双击激活不灭魔躯（冷却结束且未激活时可用）
        if (clickedUnit.kaiShurikenRange && clickedUnit === gameState.selectedUnit && !clickedUnit.kaiUltActive && (clickedUnit.kaiUltCooldown||0) === 0) {
            activateKaiUlt(clickedUnit);
            return;
        }
        // 厂长双击召唤木炭
        if (clickedUnit.percentAttack && clickedUnit === gameState.selectedUnit && (clickedUnit.charcoalCount||0) < (clickedUnit.charcoalMax||2)) {
            summonCharcoal(clickedUnit);
            return;
        }
        clearHighlights();
        gameState.selectedUnit = clickedUnit;
        showActionMode(clickedUnit);
        return;
    }
    
    // 点击空白格子进入部署模式
    const hasUnit = gameState.units.some(u => u.row === row && u.col === col);
    if (!hasUnit) {
        // 检查是否可部署（矿工全图可部署，除大本营12格）
        const hasMiner = gameState.battleDeck.some(c => c.miner);
        let isInOwnZone;
        if (hasMiner) {
            isInOwnZone = !isBlueBase(row, col) && !isRedBase(row, col);
        } else if (gameState.currentTurn === 'red') {
            isInOwnZone = row >= 14 && !isRedBase(row, col);
        } else {
            isInOwnZone = row <= 13 && !isBlueBase(row, col);
        }
        
        if (isInOwnZone) {
            openDeployModal(row, col);
        }
    }
    
    // 清除选择
    clearHighlights();
    gameState.selectedUnit = null;
}

// 显示行动模式
function showActionMode(unit) {
    // 冰冻单位无法行动
    if (unit.frozen) return;
    
    // 显示可移动范围（只要还有剩余移动点数）
    const used = gameState.moveUsed[unit.id] || 0;
    if (used < unit.moveRange) {
        showMovableRange(unit);
    }
    
    // 显示可攻击目标
    if (!gameState.attackedUnits.has(unit.id)) {
        // 铠飞镖攻击时使用飞镖射程
        if (unit.kaiShurikenRange && unit.kaiAttacks >= 1) {
            const orig = unit.attackRange;
            unit.attackRange = unit.kaiShurikenRange;
            showAttackableTargets(unit);
            unit.attackRange = orig;
        } else {
            showAttackableTargets(unit);
        }
    }
}

// 显示可移动范围
function showMovableRange(unit) {
    const { row, col, moveRange } = unit;
    const used = gameState.moveUsed[unit.id] || 0;
    const remaining = moveRange - used;
    
    for (let dr = -moveRange; dr <= moveRange; dr++) {
        for (let dc = -moveRange; dc <= moveRange; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isValidPosition(newRow, newCol)) {
                // 曼哈顿距离
                const distance = Math.abs(dr) + Math.abs(dc);
                if (distance > 0 && distance <= remaining) {
                    const cell = gameState.board[newRow][newCol];
                    // 检查是否有其他单位
                    const hasUnit = gameState.units.some(u => u.row === newRow && u.col === newCol);
                    // 检查是否是大本营（双方大本营均不可进入）
                    const isBase = isBlueBase(newRow, newCol) || isRedBase(newRow, newCol);
                    if (!hasUnit && !isBase) {
                        cell.classList.add('movable');
                    }
                }
            }
        }
    }
}

// 显示可攻击目标
function showAttackableTargets(unit) {
    const { row, col, attackRange } = unit;
    
    for (let dr = -attackRange; dr <= attackRange; dr++) {
        for (let dc = -attackRange; dc <= attackRange; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isValidPosition(newRow, newCol)) {
                const distance = Math.abs(dr) + Math.abs(dc);
                if (distance > 0 && distance <= attackRange) {
                    const targetUnit = gameState.units.find(u => u.row === newRow && u.col === newCol);
                    if (targetUnit && targetUnit.team !== unit.team) {
                        // 空军只能被特定兵种攻击
                        if (targetUnit.flying) {
                            const canHitAir = ['musketeer','saeed','warden_gherros','cattail','electric_pea','reynolds','pain_tendo','lightning_dragon','asala_flamer'];
                            if (!canHitAir.includes(unit.cardId)) continue;
                        }
                        // 电大只能攻击前方3列
                        if (unit.lineAttack) {
                            const forward = unit.team === 'red' ? -1 : 1;
                            if ((newRow - row) * forward <= 0 || Math.abs(newCol - col) > 1) continue;
                        }
                        // 烟雾中的敌人不可攻击
                        if (!isCellSmokedFor(newRow, newCol, unit.team)) {
                            const cell = gameState.board[newRow][newCol];
                            cell.classList.add('attackable');
                        }
                    }
                    
                    // 检查大本营
                    if (unit.team === 'red' && isBlueBase(newRow, newCol)) {
                        const cell = gameState.board[newRow][newCol];
                        cell.classList.add('attackable');
                    }
                    if (unit.team === 'blue' && isRedBase(newRow, newCol)) {
                        const cell = gameState.board[newRow][newCol];
                        cell.classList.add('attackable');
                    }
                }
            }
        }
    }
}

// 部署单位
function deployUnit(row, col) {
    if (gameState.deployPosition === null) return;
    
    const cardIndex = gameState.deployPosition;
    const card = gameState.battleDeck[cardIndex];
    
    if (!card) return;
    
    // 非矿工卡不能部署在敌方半场/大本营
    if (!card.miner) {
        const isBase = isBlueBase(row, col) || isRedBase(row, col);
        if (isBase) { alert('大本营内不可部署！'); return; }
        if (gameState.currentTurn === 'red' && row <= 13) { alert('矿工以外的卡不能部署在敌方半场！'); return; }
        if (gameState.currentTurn === 'blue' && row >= 14) { alert('矿工以外的卡不能部署在敌方半场！'); return; }
    } else {
        if (isBlueBase(row, col) || isRedBase(row, col)) { alert('大本营内不可部署！'); return; }
    }
    const unitAtPos = gameState.units.find(u => u.row === row && u.col === col);
    if (unitAtPos) {
        alert('该位置已有单位！');
        return;
    }
    
    // 检查能量
    const currentEnergy = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
    if (currentEnergy < card.cost) {
        alert('能量不足！');
        return;
    }
    
    // 创建单位
    const unit = {
        id: `${card.id}_${Date.now()}`,
        cardId: card.id,
        name: card.name,
        attack: card.attack,
        maxHp: card.hp,
        currentHp: card.hp,
        moveRange: card.moveRange,
        attackRange: card.attackRange,
        artwork: card.artwork,
        chargeMove: card.chargeMove || 0,
        chargeDamage: card.chargeDamage || 0,
        armor: card.armor || 0,
        meleeAttack: card.meleeAttack || 0,
        meleeRange: card.meleeRange || 0,
        rangedCrit: card.rangedCrit || false,
        rangedCritUsed: false,
        hero: card.hero || false,
        dodge: card.dodge || false,
        dodgeUsed: false,
        counterAttack: card.counterAttack || 0,
        counterUsed: false,
        burnTurns: 0,
        critChance: card.critChance || 0,
        armorPen: card.armorPen || 0,
        halfHpTriggered: false,
        halfHpText: card.halfHpText || '',
        heroDeployText: card.heroDeployText || '',
        heroDeployColor: card.heroDeployColor || '',
        heroDeployDuration: card.heroDeployDuration || 3500,
        summon: card.summon || false,
        splashRadius: card.splashRadius || 0,
        oneShot: card.oneShot || false,
        freeze: card.freeze || false,
        frozen: false,
        abilityPhase: card.abilityPhase || 0,
        abilityTimer: card.abilityTimer || 0,
        shinraRange: card.shinraRange || 0,
        shinraDamage: card.shinraDamage || 0,
        banshoRange: card.banshoRange || 0,
        banshoDamage: card.banshoDamage || 0,
        painEnergy: card.painEnergy || 0,
        painMaxEnergy: card.painMaxEnergy || 0,
        aoeAttack: card.aoeAttack || false,
        madaraBurn: card.madaraBurn || 0,
        madaraEnergy: card.madaraEnergy || 0,
        madaraMaxEnergy: card.madaraMaxEnergy || 0,
        musouAttacks: card.musouAttacks || 0,
        musouMove: card.musouMove || 0,
        inMusou: card.inMusou || false,
        musouAttacksMax: card.musouAttacksMax || 0,
        kaiAttacks: card.kaiAttacks || 0,
        kaiShurikenRange: card.kaiShurikenRange || 0,
        kaiShurikenBounce: card.kaiShurikenBounce || 0,
        kaiShurikenMax: card.kaiShurikenMax || 0,
        kaiUltUsed: card.kaiUltUsed || false,
        kaiUltCooldown: card.kaiUltCooldown || 0,
        kaiUltActive: card.kaiUltActive || false,
        kaiUltDuration: card.kaiUltDuration || 0,
        kaiUltAttack: card.kaiUltAttack || 0,
        kaiUltArmor: card.kaiUltArmor || 0,
        kaiUltHp: card.kaiUltHp || 0,
        lineAttack: card.lineAttack || false,
        chainRange: card.chainRange || 0,
        chainDamage: card.chainDamage || 0,
        electricHit: [],
        building: card.building || false,
        miner: card.miner || false,
        deployEffect: card.deployEffect || false,
        flying: card.flying || false,
        fireAttack: card.fireAttack || false,
        burnDamage: card.burnDamage || 1,
        percentAttack: card.percentAttack || 0,
        charcoalCount: card.charcoalCount || 0,
        charcoalMax: card.charcoalMax || 0,
        chainAttack: card.chainAttack || false,
        chainMax: card.chainMax || 0,
        chainDist: card.chainDist || 0,
        executionRange: card.executionRange || 0,
        halfHpSmoke: card.halfHpSmoke || 0,
        summonGuardType: card.summonGuardType || '',
        lastMoveDist: 0,
        team: gameState.currentTurn,
        row,
        col
    };
    
    gameState.units.push(unit);
    
    // 扣除能量
    if (gameState.currentTurn === 'red') {
        gameState.redEnergy -= card.cost;
        updateEnergyDisplay();
    } else {
        gameState.blueEnergy -= card.cost;
        updateEnergyDisplay();
    }
    
    // 不从出战卡组移除，局内可以无限放置（只要能量够）
    
    // 关闭部署弹窗
    closeDeployModalFunc();
    
    // 矿工地道特效（延迟渲染）
    if (unit.miner) {
        const dist = Math.max(Math.abs(unit.row - (unit.team === 'red' ? 26 : 1)), Math.abs(unit.col - 15));
        const bends = Math.max(1, Math.min(6, Math.floor(dist / 5) + 1));
        const tunnelTime = bends * 300;
        showMinerTunnel(unit);
        setTimeout(() => renderUnit(unit), tunnelTime);
        return;
    }
    
    // 渲染单位
    renderUnit(unit);
    
    // 英雄登场特效
    if (unit.hero) {
        showHeroDeployText(unit, unit.heroDeployText, unit.heroDeployColor, unit.heroDeployDuration);
    }
    
    // 雷诺沙尘暴+回血
    if (unit.deployEffect) {
        // 回血
        if (unit.team === 'red') {
            gameState.redBaseHp = Math.min(50, gameState.redBaseHp + 5);
        } else {
            gameState.blueBaseHp = Math.min(50, gameState.blueBaseHp + 5);
        }
        updateBaseHpDisplay();
        // 吹走所有敌方单位（含建筑）——延迟消除，随沙尘暴
        const enemyUnits = gameState.units.filter(u => u.id !== unit.id && u.team !== unit.team);
        const fromTop = unit.team === 'red'; // 红方沙暴从下往上
        const maxRow = 29;
        enemyUnits.forEach(eu => {
            const progress = fromTop ? (maxRow - eu.row) / maxRow : eu.row / maxRow;
            const delay = 300 + progress * 1800; // 配合2秒动画
            setTimeout(() => {
                const u = gameState.units.find(gu => gu.id === eu.id);
                if (u) removeUnit(u);
            }, delay);
        });
        // 沙尘暴特效
        showSandstorm(unit);
    }
    
    // 召唤亲卫队
    if (unit.summon) {
        summonWardenGuards(unit);
    }
}

// 移动单位
function moveUnit(row, col) {
    if (!gameState.selectedUnit) return;
    
    const unit = gameState.selectedUnit;
    const oldRow = unit.row;
    const oldCol = unit.col;
    
    // 更新位置
    unit.row = row;
    unit.col = col;
    
    // 累计已用移动点数（曼哈顿距离），允许分次移动
    const distance = Math.abs(row - oldRow) + Math.abs(col - oldCol);
    gameState.moveUsed[unit.id] = (gameState.moveUsed[unit.id] || 0) + distance;
    unit.lastMoveDist = distance;
    
    // 更新UI
    const oldCell = gameState.board[oldRow][oldCol];
    const newCell = gameState.board[row][col];
    
    const unitElement = oldCell.querySelector('.unit');
    if (unitElement) {
        oldCell.removeChild(unitElement);
        newCell.appendChild(unitElement);
    }
    
    // 更新烟雾可见性
    updateSmokeVisibility();
    
    // 踏入火焰区域
    checkFireZoneBurn(unit);
}

// 攻击单位
function attackUnit(target) {
    if (!gameState.selectedUnit) return;
    
    const attacker = gameState.selectedUnit;
    
    // === 处决：切比雪夫距离 ≤ executionRange 秒杀 ===
    if (attacker.executionRange) {
        const dist = Math.max(Math.abs(attacker.row - target.row), Math.abs(attacker.col - target.col));
        if (dist <= attacker.executionRange) {
            target.currentHp = 0;
            gameState.attackedUnits.add(attacker.id);
            attacker.lastMoveDist = 0;
            showCritText(target.row, target.col, '处决');
            removeUnit(target);
            checkGameOver();
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
    }
    
    // === 闪避机制：被攻击方首次受击时翻滚闪避 ===
    if (target.dodge && !target.dodgeUsed) {
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];  // 上下左右
        const valid = dirs.filter(([dr,dc]) => {
            const nr = target.row + dr;
            const nc = target.col + dc;
            return isValidPosition(nr, nc)
                && !gameState.units.some(u => u.row === nr && u.col === nc)
                && !isBlueBase(nr, nc) && !isRedBase(nr, nc);
        });
        if (valid.length > 0) {
            const [dr, dc] = valid[Math.floor(Math.random() * valid.length)];
            const oldRow = target.row, oldCol = target.col;
            target.row += dr;
            target.col += dc;
            // 移动 DOM 元素
            const oldCell = gameState.board[oldRow][oldCol];
            const newCell = gameState.board[target.row][target.col];
            const unitEl = oldCell.querySelector('.unit');
            if (unitEl) { oldCell.removeChild(unitEl); newCell.appendChild(unitEl); }
            target.dodgeUsed = true;
            // 显示闪避文字特效
            showDodgeText(oldRow, oldCol);
            // 攻击方仍算已攻击
            gameState.attackedUnits.add(attacker.id);
            attacker.lastMoveDist = 0;
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
    }
    
    // 计算攻击距离
    const dist = Math.abs(attacker.row - target.row) + Math.abs(attacker.col - target.col);
    
    // 铠飞镖攻击：固定1伤不暴击，跳过正常伤害
    if (attacker.kaiShurikenRange && attacker.kaiAttacks >= 1) {
        target.currentHp -= 1;
        updateUnitHp(target);
        if (target.currentHp <= 0) removeUnit(target);
        // 不进入正常伤害流程
    } else {
    // 百分比攻击
    if (attacker.percentAttack) {
        // 第一击扣一半（向上取整），确保两击必杀
        if (target.maxHp === target.currentHp && target.currentHp > 2) {
            damage = Math.ceil(target.currentHp * attacker.percentAttack);
        } else {
            damage = target.currentHp; // 第二击直接清空
        }
    } else if (attacker.meleeAttack && dist <= attacker.meleeRange) {
        // 近战攻击
        damage = attacker.meleeAttack;
    } else {
        // 远程攻击
        damage = attacker.attack;
        // 首次远程暴击
        if (attacker.rangedCrit && !attacker.rangedCritUsed) {
            damage *= 2;
            attacker.rangedCritUsed = true;
            showCritText(target.row, target.col);
        }
        // 概率暴击
        if (attacker.critChance && Math.random() < attacker.critChance) {
            damage *= 2;
            showCritText(target.row, target.col);
        }
    }
    
    // 冲锋机制
    if (attacker.chargeDamage && attacker.lastMoveDist >= attacker.chargeMove) {
        damage = attacker.chargeDamage;
    }
    
    // 护甲减伤（考虑穿甲）
    const effectiveArmor = Math.max(0, (target.armor || 0) - (attacker.armorPen || 0));
    const actualDamage = Math.max(0, damage - effectiveArmor);
    target.currentHp -= actualDamage;
    
    // 赛伊德反击：首次受真实伤害触发，3×3燃烧
    if (target.counterAttack && !target.counterUsed && actualDamage > 0) {
        target.counterUsed = true;
        attacker.currentHp -= target.counterAttack;
        updateUnitHp(attacker);
        showCritText(attacker.row, attacker.col, '燃烧');
        // 以被击敌人为中心3×3范围燃烧
        gameState.units.forEach(e => {
            if (e.team === target.team) return;
            const d = Math.max(Math.abs(e.row - attacker.row), Math.abs(e.col - attacker.col));
            if (d <= 1) {
                if (e.burnTurns <= 0) e.burnTurns = 3;
                updateBurnVisual(e);
            }
        });
        attacker.burnTurns = 3;
        updateBurnVisual(attacker);
        // 创建3×3火焰区域
        gameState.fireZones.push({
            row: attacker.row, col: attacker.col, turns: 3
        });
        renderFireZones();
        if (attacker.currentHp <= 0) removeUnit(attacker);
    }
    
    // 马斑反击：被1格距离攻击时3×3 AoE反伤+燃烧
    if (target.aoeAttack && !target.madaraCounted) {
        const atkDist = Math.max(Math.abs(attacker.row - target.row), Math.abs(attacker.col - target.col));
        if (atkDist <= 1) {
            // 红色环绕特效
            showCounterFX(target);
            gameState.units.forEach(e => {
                if (e.team === target.team) return;
                const d = Math.max(Math.abs(e.row - target.row), Math.abs(e.col - target.col));
                if (d <= 1) {
                    e.currentHp -= 2;
                    updateUnitHp(e);
                    if (e.burnTurns <= 0) e.burnTurns = 3;
                    updateBurnVisual(e);
                    if (e.currentHp <= 0) removeUnit(e);
                }
            });
            target.madaraEnergy = Math.min(target.madaraMaxEnergy, (target.madaraEnergy || 0) + 1);
            renderEnergyBar(target, gameState.board[target.row][target.col].querySelector('.unit'));
            // 跳向最近敌人 + 重击 + 火柱
            madaraJumpAndPillar(target);
        }
    }
    target.madaraCounted = false;
    
    // 半血触发（仅典狱长/渡鸦等有此特效的单位）
    if (target.maxHp && target.currentHp > 0 && target.currentHp <= target.maxHp / 2 && (target.halfHpText || target.halfHpSmoke)) {
        showHalfHpText(target);
    }
    
    // 铠双次攻击处理（if 块结束：跳过正常伤害后直接进入）
    }
    if (attacker.kaiShurikenRange) {
        attacker.kaiAttacks = (attacker.kaiAttacks || 0) + 1;
        if (attacker.kaiAttacks === 2 && !attacker.kaiShurikenDone) {
            attacker.kaiShurikenDone = true;
            const shurikenTargets = [target.id];
            let current = target;
            while (shurikenTargets.length < attacker.kaiShurikenMax) {
                let next = null, minDist = Infinity;
                gameState.units.forEach(e => {
                    if (e.team === attacker.team || shurikenTargets.includes(e.id)) return;
                    const d = Math.max(Math.abs(e.row - current.row), Math.abs(e.col - current.col));
                    if (d <= attacker.kaiShurikenBounce && d < minDist) { next = e; minDist = d; }
                });
                if (!next) break;
                shurikenTargets.push(next.id);
                current = next;
            }
            // 动画+顺序伤害 (跳过主目标，主目标已在普通攻击中受伤)
            animateShuriken(attacker, shurikenTargets);
        }
    }
    
    // 马斑 AoE：攻击范围内所有敌军 + 施加燃烧 + 能量
    if (attacker.aoeAttack) {
        const aoeR = attacker.attackRange;
        const forward = attacker.team === 'red' ? -1 : 1;
        // 攻击特效：红色箭头
        showMadaraAttackFX(attacker, target);
        gameState.units.forEach(e => {
            if (e.id === target.id || e.team === attacker.team) return;
            // 前方竖向3格
            const colSame = e.col === attacker.col;
            const rowDiff = (e.row - attacker.row) * forward;
            if (colSame && rowDiff > 0 && rowDiff <= aoeR) {
                e.currentHp -= Math.max(0, attacker.attack - ((e.armor || 0) - (attacker.armorPen || 0)));
                updateUnitHp(e);
                if (e.burnTurns <= 0) e.burnTurns = attacker.madaraBurn;
                updateBurnVisual(e);
                if (e.currentHp <= 0) removeUnit(e);
            }
        });
        if (target.burnTurns <= 0) target.burnTurns = attacker.madaraBurn;
        updateBurnVisual(target);
        if (!attacker.inMusou) {
            attacker.madaraEnergy = Math.min(attacker.madaraMaxEnergy, (attacker.madaraEnergy || 0) + 1);
            renderEnergyBar(attacker, gameState.board[attacker.row][attacker.col].querySelector('.unit'));
        }
    }
    
    // 标记已攻击（天下无双/铠双攻期间不限制）
    if (attacker.inMusou) {
        attacker.musouAttacks = (attacker.musouAttacks || 0) + 1;
        if (attacker.musouAttacks >= attacker.musouAttacksMax) {
            attacker.inMusou = false;
            attacker.moveRange -= attacker.musouMove;
            attacker.attack = Math.floor(attacker.attack / 2);
            const ue = gameState.board[attacker.row][attacker.col].querySelector('.unit');
            if (ue) ue.classList.remove('kai-ult', 'musou-form');
            if ((attacker.madaraEnergy||0) >= 1 && (attacker.madaraEnergy||0) <= 2) showMeteorButton(attacker);
            attacker.madaraEnergy = 0;
            renderEnergyBar(attacker, gameState.board[attacker.row][attacker.col].querySelector('.unit'));
            gameState.attackedUnits.add(attacker.id);
        }
    } else if (attacker.kaiShurikenRange && attacker.kaiAttacks < 2) {
        // 铠第一击后不标记，允许第二击
    } else {
        gameState.attackedUnits.add(attacker.id);
    }
    
    // 更新目标血量显示
    updateUnitHp(target);
    
    // 检查目标是否死亡
    if (target.currentHp <= 0) {
        removeUnit(target);
    }
    
    // 冰冻效果
    if (attacker.freeze && target.currentHp > 0) {
        target.frozen = true;
        showCritText(target.row, target.col, '冰冻');
        updateFrozenVisual(target);
        // 厂长被冻召唤木炭
        if (target.percentAttack && (target.charcoalCount||0) < (target.charcoalMax||2)) {
            summonCharcoal(target);
        }
    }
    
    // 一次性兵种：攻击后自毁
    if (attacker.oneShot) {
        removeUnit(attacker);
    }
    
    // 电大直线攻击+闪电链（顺序伤害+线特效）
    if (attacker.lineAttack) {
        attacker.electricHit = [];
        attacker._baseHit = false;
        const forward = attacker.team === 'red' ? -1 : 1;
        let lineTargets = [];
        // 正前方3列扫描（只收集，不立即伤害）
        for (let r = attacker.row + forward; attacker.team === 'red' ? r >= 0 : r < 30; r += forward) {
            for (let c = attacker.col - 1; c <= attacker.col + 1; c++) {
                if (!isValidPosition(r, c)) continue;
                const u = gameState.units.find(e => e.row === r && e.col === c && e.team !== attacker.team && !attacker.electricHit.includes(e.id));
                if (u) { lineTargets.push(u); attacker.electricHit.push(u.id); }
                if (!attacker._baseHit && ((attacker.team === 'red' && isBlueBase(r, c)) || (attacker.team === 'blue' && isRedBase(r, c)))) {
                    attacker._baseHit = true;
                    if (attacker.team === 'red') gameState.blueBaseHp -= 1;
                    else gameState.redBaseHp -= 1;
                    updateBaseHpDisplay();
                }
            }
        }
        // 闪电链收集（不立即伤害）
        let allChainTargets = [];
        const chainR = attacker.chainRange;
        lineTargets.forEach(lt => {
            gameState.units.forEach(e => {
                if (e.team === attacker.team || attacker.electricHit.includes(e.id)) return;
                const d = Math.max(Math.abs(e.row - lt.row), Math.abs(e.col - lt.col));
                if (d <= chainR) {
                    attacker.electricHit.push(e.id);
                    allChainTargets.push({ from: lt, to: e });
                }
            });
        });
        // 技能：10%概率扇形5闪电球
        if (Math.random() < 0.1) {
            const toward = attacker.team === 'red' ? -1 : 1;
            const dirs = [[toward,0],[toward,-1],[toward,1],[toward,-2],[toward,2]];
            const board = document.getElementById('gameBoard');
            dirs.forEach(d => {
                const ball = document.createElement('div');
                ball.className = 'electric-bullet';
                ball.style.left = (attacker.col*23+6) + 'px';
                ball.style.top = (attacker.row*23+6) + 'px';
                ball.style.transition = 'all 0.5s linear';
                let br = attacker.row + d[0], bc = attacker.col + d[1], targetU = null;
                while (isValidPosition(br, bc)) {
                    const eu = gameState.units.find(e => e.row === br && e.col === bc && e.team !== attacker.team);
                    if (eu && !targetU) targetU = eu;
                    br += d[0]; bc += d[1];
                }
                br -= d[0]; bc -= d[1];
                board.appendChild(ball);
                setTimeout(() => { ball.style.left = (bc*23+6)+'px'; ball.style.top = (br*23+6)+'px'; }, 50);
                setTimeout(() => {
                    if (targetU) {
                        targetU.currentHp -= 2;
                        updateUnitHp(targetU);
                        if (targetU.currentHp <= 0) removeUnit(targetU);
                    }
                    ball.remove();
                }, 550);
            });
        }
        // 子弹+闪电链特效（顺序伤害）
        showElectricBullet(attacker, lineTargets, allChainTargets);
    }
    
    // 溅射伤害
    if (attacker.splashRadius) {
        applySplashDamage(target, attacker);
    }
    
    // 雷电飞龙连锁攻击
    if (attacker.chainAttack) {
        applyChainAttack(attacker, target);
    }
    
    // 喷火兵燃烧
    if (attacker.fireAttack) {
        target.burnTurns = 3;
        target.burnDamage = attacker.burnDamage || 2;
        updateBurnVisual(target);
        showCritText(target.row, target.col, '火焰');
    }
    
    // 检查游戏结束
    checkGameOver();
}

// 攻击大本营
function attackBase(isBlueBase) {
    if (!gameState.selectedUnit) return;
    
    const attacker = gameState.selectedUnit;
    
    // 计算攻击距离（取最近的大本营格子）
    const baseRow = isBlueBase ? 1 : 26;
    const baseCol = 15;
    const dist = Math.abs(attacker.row - baseRow) + Math.abs(attacker.col - baseCol);
    
    // 决定攻击模式
    let damage;
    if (attacker.meleeAttack && dist <= attacker.meleeRange) {
        damage = attacker.meleeAttack;
    } else {
        damage = attacker.attack;
        if (attacker.rangedCrit && !attacker.rangedCritUsed) {
            damage *= 2;
            attacker.rangedCritUsed = true;
            showCritText(baseRow, baseCol);
        }
        if (attacker.critChance && Math.random() < attacker.critChance) {
            damage *= 2;
            showCritText(isBlueBase ? 1 : 26, 15);
        }
    }
    
    // 冲锋机制
    if (attacker.chargeDamage && attacker.lastMoveDist >= attacker.chargeMove) {
        damage = attacker.chargeDamage;
    }
    attacker.lastMoveDist = 0;
    
    if (isBlueBase) {
        gameState.blueBaseHp -= damage;
        updateBaseHpDisplay();
    } else {
        gameState.redBaseHp -= damage;
        updateBaseHpDisplay();
    }
    
    // 标记已攻击
    gameState.attackedUnits.add(attacker.id);
    
    // 检查游戏结束
    checkGameOver();
}

// 检查游戏结束
function checkGameOver() {
    if (gameState.redBaseHp <= 0) {
        gameState.gameOver = true;
        gameState.winner = 'blue';
        showGameOver();
    } else if (gameState.blueBaseHp <= 0) {
        gameState.gameOver = true;
        gameState.winner = 'red';
        showGameOver();
    }
}

// 显示游戏结束
function showGameOver() {
    stopTimer();
    winnerText.textContent = gameState.winner === 'red' ? '红方获胜！' : '蓝方获胜！';
    gameOverModal.classList.remove('hidden');
}

// 移除单位
function removeUnit(unit) {
    const cell = gameState.board[unit.row][unit.col];
    const unitElement = cell.querySelector('.unit');
    if (unitElement) {
        cell.removeChild(unitElement);
    }
    gameState.units = gameState.units.filter(u => u.id !== unit.id);
}

// 更新单位血量显示
function updateUnitHp(unit) {
    const cell = gameState.board[unit.row][unit.col];
    const hpFill = cell.querySelector('.unit-hp-fill');
    if (hpFill) {
        const percentage = Math.max(0, (unit.currentHp / unit.maxHp) * 100);
        hpFill.style.width = `${percentage}%`;
    }
}

// 渲染单位
function renderUnit(unit) {
    const cell = gameState.board[unit.row][unit.col];
    
    // 移除已存在的单位
    const existingUnit = cell.querySelector('.unit');
    if (existingUnit) {
        cell.removeChild(existingUnit);
    }
    
    const unitElement = document.createElement('div');
    const artworkClass = unit.artwork ? `art-${unit.artwork}` : '';
    unitElement.className = `unit ${unit.team} ${artworkClass}`;
    unitElement.dataset.unitId = unit.id;
    
    // 添加血量条（使用独立类名，避免被通用 .hp-bar 的 150px 宽样式影响）
    const hpBar = document.createElement('div');
    hpBar.className = 'unit-hp-bar';
    const hpFill = document.createElement('div');
    hpFill.className = 'unit-hp-fill';
    hpFill.style.width = `${Math.max(0, (unit.currentHp / unit.maxHp) * 100)}%`;
    hpBar.appendChild(hpFill);
    unitElement.appendChild(hpBar);
    
    // 标记已攻击的单位
    if (gameState.attackedUnits.has(unit.id)) {
        unitElement.classList.add('has-attacked');
    }
    
    cell.appendChild(unitElement);
    
    // 马斑/佩恩能量条（嵌在单位内部，跟随移动）
    if (unit.madaraMaxEnergy || unit.painMaxEnergy) renderEnergyBar(unit, unitElement);
    
    // 铠大招紫色特效
    if (unit.kaiUltActive) unitElement.classList.add('kai-ult');
    
    // 冰冻/烟雾可见性
    if (unit.frozen) updateFrozenVisual(unit);
    if (unit.burnTurns > 0) updateBurnVisual(unit);
    updateSmokeVisibility();
}

// 英雄登场漂浮文字
function showHeroDeployText(unit, message, color, duration) {
    const cell = gameState.board[unit.row][unit.col];
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = message || '你掉进陷阱了！';
    if (color) text.style.color = color;
    const ms = duration || 3500;
    text.style.animation = `heroFloat ${ms}ms ease-out forwards`;
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, ms);
}

// 召唤典狱长亲卫队
function summonWardenGuards(warden) {
    const offsets = [[0,-2],[0,-1],[0,2],[0,1]];  // 左2、左1、右2、右1
    const team = warden.team;
    const isRaven = warden.summonGuardType === 'raven_guard';
    const guardStats = isRaven ? {
        name: '渡鸦亲卫队', attack: 5, maxHp: 4, currentHp: 4,
        armor: 1, armorPen: 1, moveRange: 4, attackRange: 2, artwork: 'raven-guard'
    } : {
        name: '亲卫队', attack: 2, maxHp: 3, currentHp: 3,
        armor: 1, moveRange: 3, attackRange: 4, critChance: 0.5, artwork: 'guard'
    };
    offsets.forEach(([dr, dc]) => {
        const row = warden.row + dr;
        const col = warden.col + dc;
        if (!isValidPosition(row, col)) return;
        if (gameState.units.some(u => u.row === row && u.col === col)) return;
        if (isBlueBase(row, col) || isRedBase(row, col)) return;
        
        const guard = {
            id: `guard_${Date.now()}_${Math.random()}`,
            team, row, col, artwork: null,
            ...guardStats
        };
        gameState.units.push(guard);
        renderUnit(guard);
    });
}

// 半血触发文字
function showHalfHpText(unit) {
    if (!('halfHpTriggered' in unit)) return; // 仅典狱长有此属性
    if (unit.halfHpTriggered) return;
    unit.halfHpTriggered = true;
    unit.critChance = 1.0;
    const cell = gameState.board[unit.row][unit.col];
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = unit.halfHpText || '典狱长实力受损！';
    text.style.color = '#e74c3c';
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 2000);
    if (unit.halfHpSmoke) deploySmoke(unit.row, unit.col, unit.halfHpSmoke, unit.team);
}

// 更新冰冻视觉效果
function updateFrozenVisual(unit) {
    const cell = gameState.board[unit.row][unit.col];
    const unitEl = cell.querySelector('.unit');
    if (!unitEl) return;
    if (unit.frozen) {
        unitEl.classList.add('frozen');
    } else {
        unitEl.classList.remove('frozen');
    }
}

// 更新燃烧视觉效果
function updateBurnVisual(unit) {
    const cell = gameState.board[unit.row][unit.col];
    const unitEl = cell.querySelector('.unit');
    if (!unitEl) return;
    if (unit.burnTurns > 0) {
        unitEl.classList.add('burning');
    } else {
        unitEl.classList.remove('burning');
    }
}

// Pain 技能激活
function activatePainAbility(pain) {
    // 4格能量释放地爆天星
    if ((pain.painEnergy || 0) >= (pain.painMaxEnergy || 4) && !gameState.attackedUnits.has(pain.id)) {
        chibakuTensei(pain);
        gameState.attackedUnits.add(pain.id);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (gameState.attackedUnits.has(pain.id)) return;
    
    // 一回合两次技能：先万象天引，后神罗天征
    if (!pain._banshoUsed) {
        banshoTenin(pain);
        pain._banshoUsed = true;
    } else if (!pain._shinraUsed && pain.abilityTimer <= 0) {
        shinraTensei(pain);
        pain._shinraUsed = true;
        gameState.attackedUnits.add(pain.id);
    } else {
        return;
    }
    clearHighlights();
    gameState.selectedUnit = null;
}

function shinraTensei(pain) {
    // 清除旧特效
    if (pain.shinraCovers) {
        pain.shinraCovers.forEach(c => { if (c.parentNode) c.remove(); });
        pain.shinraCovers = [];
    }
    const radius = pain.shinraRange;
    pain.shinraCovers = [];
    // 范围特效（持续至技能结束）
    for (let r = pain.row - radius; r <= pain.row + radius; r++) {
        for (let c = pain.col - radius; c <= pain.col + radius; c++) {
            if (!isValidPosition(r, c)) continue;
            const dist = Math.max(Math.abs(r - pain.row), Math.abs(c - pain.col));
            if (dist <= radius) {
                const cover = document.createElement('div');
                cover.className = 'shinra-cover';
                gameState.board[r][c].appendChild(cover);
                pain.shinraCovers.push(cover);
            }
        }
    }
    // AoE 伤害
    pain._shinraHits = 0;
    gameState.units.forEach(u => {
        if (u.team === pain.team) return;
        const dist = Math.max(Math.abs(u.row - pain.row), Math.abs(u.col - pain.col));
        if (dist <= radius) {
            u.currentHp -= pain.shinraDamage;
            updateUnitHp(u);
            showCritText(u.row, u.col, '神罗');
            if (u.currentHp <= 0) removeUnit(u);
            pain._shinraHits++;
        }
    });
    // 攻击大本营
    if (pain.team === 'red') {
        for (let r = 0; r <= 2; r++) for (let c = 10; c <= 13; c++) {
            const dist = Math.max(Math.abs(r - pain.row), Math.abs(c - pain.col));
            if (dist <= radius) { gameState.blueBaseHp -= pain.shinraDamage; updateBaseHpDisplay(); }
        }
    } else {
        for (let r = 25; r <= 27; r++) for (let c = 10; c <= 13; c++) {
            const dist = Math.max(Math.abs(r - pain.row), Math.abs(c - pain.col));
            if (dist <= radius) { gameState.redBaseHp -= pain.shinraDamage; updateBaseHpDisplay(); }
        }
    }
    pain.abilityTimer = 2;
    pain.shinraSkipNext = true;
    // 神罗天征文字特效
    if (pain._shinraText) { pain._shinraText.remove(); }
    if (pain._banshoText) { pain._banshoText.remove(); pain._banshoText = null; }
    const shinraText = document.createElement('div');
    shinraText.className = 'hero-deploy-text';
    shinraText.textContent = '神罗天征';
    shinraText.style.color = '#7ec8f8';
    shinraText.style.animation = 'heroFloat 30s ease-out forwards';
    gameState.board[pain.row][pain.col].appendChild(shinraText);
    pain._shinraText = shinraText;
    // 伤害时已计numShinraHits，这里结算能量
    if (pain._shinraHits > 0) { pain.painEnergy = Math.min(pain.painMaxEnergy, (pain.painEnergy || 0) + 1); renderEnergyBar(pain, gameState.board[pain.row][pain.col].querySelector('.unit')); }
    checkGameOver();
}

function banshoTenin(pain) {
    const team = pain.team;
    const forward = team === 'red' ? -1 : 1;
    // 拉扯前方 5x5
    pain._banshoHits = 0;
    // 万象天引文字
    if (pain._banshoText) pain._banshoText.remove();
    const banshoText = document.createElement('div');
    banshoText.className = 'hero-deploy-text';
    banshoText.textContent = '万象天引';
    banshoText.style.color = '#8b0000';
    banshoText.style.animation = 'heroFloat 1.5s ease-out forwards';
    gameState.board[pain.row][pain.col].appendChild(banshoText);
    pain._banshoText = banshoText;
    setTimeout(() => { if (pain._banshoText === banshoText) { banshoText.remove(); pain._banshoText = null; } }, 1500);
    for (let dr = 0; dr <= pain.banshoRange * 2; dr++) {
        for (let dc = -pain.banshoRange; dc <= pain.banshoRange; dc++) {
            const tr = pain.row + forward * (dr + 1);
            const tc = pain.col + dc;
            if (!isValidPosition(tr, tc)) continue;
            const u = gameState.units.find(uu => uu.row === tr && uu.col === tc && uu.team !== team);
            if (!u) continue;
            // 伤害+能量（无论拉没拉到）
            u.currentHp -= pain.banshoDamage;
            updateUnitHp(u);
            showCritText(u.row, u.col, '万象');
            if (u.currentHp <= 0) removeUnit(u);
            pain._banshoHits++;
            // 尝试拉到最近空位
            let placed = false;
            for (let pr = 1; pr <= dr + 1; pr++) {
                const nr = pain.row + forward * pr;
                if (!isValidPosition(nr, u.col)) break;
                if (gameState.units.some(uu => uu.row === nr && uu.col === u.col)) continue;
                if (isBlueBase(nr, u.col) || isRedBase(nr, u.col)) continue;
                const oldCell = gameState.board[u.row][u.col];
                const newCell = gameState.board[nr][u.col];
                const unitEl = oldCell.querySelector('.unit');
                if (unitEl) { oldCell.removeChild(unitEl); newCell.appendChild(unitEl); }
                u.row = nr;
                placed = true;
                break;
            }
        }
    }
    pain.abilityPhase = 0;
    if (pain._banshoHits > 0) { pain.painEnergy = Math.min(pain.painMaxEnergy, (pain.painEnergy || 0) + 1); renderEnergyBar(pain, gameState.board[pain.row][pain.col].querySelector(".unit")); }
    pain._banshoHits = 0;
}

// 马斑天下无双
function activateMusou(madara) {
    gameState.attackedUnits.delete(madara.id);
    madara.inMusou = true;
    madara.musouAttacks = 0;
    madara.moveRange += madara.musouMove;
    madara.attack *= 2;
    madara.madaraEnergy = Math.max(0, (madara.madaraEnergy||0) - 4);
    renderEnergyBar(madara, gameState.board[madara.row][madara.col].querySelector('.unit'));
    // 显示文字
    const cell = gameState.board[madara.row][madara.col];
    const unitEl = cell.querySelector('.unit');
    if (unitEl) {
        unitEl.classList.add('kai-ult');
        unitEl.classList.add('musou-form');
    }
    const text = document.createElement('div');
    text.className = 'musou-text';
    text.textContent = '天下无双';
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 1500);
    // 保持选中，立即显示行动范围
    clearHighlights();
    showActionMode(madara);
}

// 马斑跳跃重击 + 火柱
function madaraJumpAndPillar(madara) {
    const enemies = gameState.units.filter(e => e.team !== madara.team);
    if (enemies.length === 0) return;
    let nearest = null, minDist = Infinity;
    enemies.forEach(e => {
        const d = Math.max(Math.abs(e.row - madara.row), Math.abs(e.col - madara.col));
        if (d <= 4 && d < minDist) { nearest = e; minDist = d; }
    });
    if (!nearest) return;
    
    // 延迟0.8s等反击环放完再跳
    setTimeout(() => {
    const oldCell = gameState.board[madara.row][madara.col];
    const unitEl = oldCell.querySelector('.unit');
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[0,0]];
    let placed = false;
    for (const [dr, dc] of dirs) {
        const nr = nearest.row + dr, nc = nearest.col + dc;
        if (!isValidPosition(nr, nc)) continue;
        if (gameState.units.some(u => u.row === nr && u.col === nc)) continue;
        if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
        madara.row = nr; madara.col = nc;
        const newCell = gameState.board[nr][nc];
        if (unitEl) { oldCell.removeChild(unitEl); newCell.appendChild(unitEl); }
        placed = true; break;
    }
    
    // 重击
    nearest.currentHp -= 1;
    updateUnitHp(nearest);
    if (nearest.burnTurns <= 0) nearest.burnTurns = 3;
    updateBurnVisual(nearest);
    if (nearest.currentHp <= 0) removeUnit(nearest);
    
    // 火柱（无论跳跃成功与否都显示）
    showFirePillar(nearest.row, nearest.col);
    
    // 火柱伤害
    setTimeout(() => {
        let hitAny = false;
        gameState.units.forEach(e => {
            if (e.team === madara.team) return;
            const d = Math.max(Math.abs(e.row - nearest.row), Math.abs(e.col - nearest.col));
            if (d <= 1) {
                e.currentHp -= 3;
                updateUnitHp(e);
                if (e.currentHp <= 0) removeUnit(e);
                hitAny = true;
            }
        });
        if (hitAny && !madara.inMusou) {
            madara.madaraEnergy = Math.min(madara.madaraMaxEnergy, (madara.madaraEnergy || 0) + 1);
            renderEnergyBar(madara, gameState.board[madara.row][madara.col].querySelector('.unit'));
        }
    }, 800);
    }, 800);
}

// 火柱特效
function showFirePillar(row, col) {
    const board = document.getElementById('gameBoard');
    const cellSize = cellW, cH = cellH, radius = 1;
    const pillar = document.createElement('div');
    pillar.className = 'fire-pillar';
    pillar.style.left = ((col - radius) * cellSize) + 'px';
    pillar.style.top = ((row - radius) * cH + cH) + 'px';
    pillar.style.width = ((radius * 2 + 1) * cellSize) + 'px';
    pillar.style.height = ((radius * 2 + 1) * cH) + 'px';
    board.appendChild(pillar);
    setTimeout(() => pillar.remove(), 1000);
}

// 飞镖弹射动画
function animateShuriken(attacker, shurikenTargets) {
    const board = document.getElementById('gameBoard');
    const shuriken = document.createElement('div');
    shuriken.textContent = '⎯';
    shuriken.style.cssText = 'position:absolute;color:#27ae60;font-size:18px;font-weight:900;z-index:25;pointer-events:none;animation:shurikenSpin 0.4s linear infinite;transition:left 0.3s,top 0.3s';
    let startX = attacker.col * cellW + cellW / 2;
    let startY = attacker.row * cellH + cellH / 2;
    shuriken.style.left = startX + 'px';
    shuriken.style.top = startY + 'px';
    board.appendChild(shuriken);
    
    let delay = 100;
    for (let i = 0; i < shurikenTargets.length; i++) {
        const id = shurikenTargets[i];
        const u = gameState.units.find(e => e.id === id);
        if (!u) continue;
        ((unit, d) => {
            setTimeout(() => {
                shuriken.style.left = (unit.col * cellW + cellW / 2) + 'px';
                shuriken.style.top = (unit.row * cellH + cellH / 2) + 'px';
            }, d);
            setTimeout(() => {
                const dmg = 1;
                unit.currentHp -= dmg;
                updateUnitHp(unit);
                if (unit.currentHp <= 0) removeUnit(unit);
            }, d + 300);
        })(u, delay);
        delay += 500;
    }
    
    const totalDelay = delay + 300;
    setTimeout(() => { shuriken.style.left = startX + 'px'; shuriken.style.top = startY + 'px'; }, delay);
    setTimeout(() => {
        shuriken.remove();
        attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + 2);
        updateUnitHp(attacker);
    }, totalDelay);
}

// 雷诺沙尘暴特效
function showSandstorm(unit) {
    const board = document.getElementById('gameBoard');
    const storm = document.createElement('div');
    storm.className = 'sandstorm';
    const fromTop = unit.team === 'red';
    storm.style.top = fromTop ? '690px' : '-200px';
    board.appendChild(storm);
    setTimeout(() => {
        storm.style.top = fromTop ? '-200px' : '690px';
    }, 100);
    setTimeout(() => storm.remove(), 2500);
}

// 矿工地道特效（弯曲土道）
function showMinerTunnel(miner) {
    const board = document.getElementById('gameBoard');
    const cs = cellW;
    const baseR = miner.team === 'red' ? 26 : 1;
    const baseC = 11;
    // 分段弯曲路径（距离越远弯越多，1-6弯，只朝前180°转弯）
    const dist = Math.max(Math.abs(miner.row - baseR), Math.abs(miner.col - baseC));
    const bends = Math.max(1, Math.min(6, Math.floor(dist / 5) + 1));
    const steps = bends;
    const rStep = (miner.row - baseR) / (steps + 1);
    const cStep = (miner.col - baseC) / (steps + 1);
    const points = [[baseC * cs + cs/2, baseR * cs + cs/2]];
    // 前进方向的垂直方向
    const forwardLen = Math.sqrt(rStep*rStep + cStep*cStep) || 1;
    const pr = -cStep / forwardLen, pc = rStep / forwardLen; // 垂直矢量
    const wobble = Math.min(3, Math.floor(dist / 8) + 1);
    for (let i = 1; i <= steps; i++) {
        const cr = baseR + rStep * i;
        const cc = baseC + cStep * i;
        const offset = (Math.random() * 2 - 1) * wobble;
        const rr = Math.round(Math.max(0, Math.min(29, cr + pr * offset)));
        const rc = Math.round(Math.max(0, Math.min(29, cc + pc * offset)));
        points.push([rc * cs + cs/2, rr * cs + cs/2]);
    }
    points.push([miner.col * cs + cs/2, miner.row * cs + cs/2]);
    let delay = 0;
    for (let i = 1; i < points.length; i++) {
        ((x1, y1, x2, y2, d) => {
            setTimeout(() => {
                const dx = x2 - x1, dy = y2 - y1;
                const len = Math.sqrt(dx*dx + dy*dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const seg = document.createElement('div');
                seg.className = 'miner-tunnel';
                seg.style.left = x1 + 'px';
                seg.style.top = y1 + 'px';
                seg.style.width = len + 'px';
                seg.style.transform = 'rotate(' + angle + 'deg)';
                seg.style.transformOrigin = '0 0';
                board.appendChild(seg);
                setTimeout(() => seg.remove(), 1500);
            }, d);
        })(points[i-1][0], points[i-1][1], points[i][0], points[i][1], delay);
        delay += 300;
    }
}

function showElectricBullet(unit, lineTargets, allChainTargets) {
    const board = document.getElementById('gameBoard');
    const cs = cellW;
    const forward = unit.team === 'red' ? -1 : 1;
    
    // 子弹
    const bullet = document.createElement('div');
    bullet.className = 'electric-bullet';
    bullet.style.left = (unit.col * cs + 6) + 'px';
    bullet.style.top = (unit.row * cs + 6) + 'px';
    board.appendChild(bullet);
    
    // 飞向路径末端
    let destR = unit.team === 'red' ? 0 : 29, destC = unit.col;
    const totalDist = Math.abs(destR - unit.row);
    
    setTimeout(() => {
        bullet.style.transition = 'all 0.8s linear';
        bullet.style.left = (destC * cs + 6) + 'px';
        bullet.style.top = (destR * cs + 6) + 'px';
    }, 50);
    
    // 顺序伤害：子弹经过敌人时扣血
    lineTargets.forEach((u, i) => {
        const dist = Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col));
        const delay = (dist / totalDist) * 800 + 100;
        setTimeout(() => {
            u.currentHp -= unit.attack;
            updateUnitHp(u);
            if (u.currentHp <= 0) removeUnit(u);
        }, delay);
    });
    
    // 闪电链特效：from→to 画线 + 延迟伤害
    allChainTargets.forEach((ct, i) => {
        const pFrom = ct.from, pTo = ct.to;
        const delay = 1000 + i * 250;
        setTimeout(() => {
            const x1 = pFrom.col * cs + cs / 2, y1 = pFrom.row * cs + cs / 2;
            const x2 = pTo.col * cs + cs / 2, y2 = pTo.row * cs + cs / 2;
            const dx = x2 - x1, dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const line = document.createElement('div');
            line.className = 'lightning-line';
            line.style.left = x1 + 'px';
            line.style.top = y1 + 'px';
            line.style.width = len + 'px';
            line.style.transform = 'rotate(' + angle + 'deg)';
            line.style.transformOrigin = '0 0';
            board.appendChild(line);
            setTimeout(() => line.remove(), 700);
            // 链伤害在线出现时造成
            pTo.currentHp -= unit.chainDamage;
            updateUnitHp(pTo);
            if (pTo.currentHp <= 0) removeUnit(pTo);
        }, delay);
    });
    
    setTimeout(() => { bullet.remove(); }, 1000);
}

// 地爆天星
function chibakuTensei(pain) {
    pain.painEnergy = 0;
    renderEnergyBar(pain, gameState.board[pain.row][pain.col].querySelector('.unit'));
    const board = document.getElementById('gameBoard');
    const ball = document.createElement('div');
    ball.className = 'chibaku-ball';
    ball.style.left = (pain.col * cellW) + 'px';
    ball.style.top = (pain.row * cellH) + 'px';
    board.appendChild(ball);
    const bx = 11 * cellW, by = 13 * cellH;
    setTimeout(() => { ball.style.left = bx + 'px'; ball.style.top = by + 'px'; }, 100);
    
    // 收集敌方，移入board层飞行
    const enemies = gameState.units.filter(e => e.team !== pain.team);
    if (enemies.length === 0) { setTimeout(() => ball.remove(), 4000); return; }
    const enemyElements = [];
    
    enemies.forEach((e, i) => {
        const oldCell = gameState.board[e.row][e.col];
        const el = oldCell.querySelector('.unit');
        if (!el) return;
        enemyElements.push({ unit: e, el: el });
        // 脱离cell，挂到board上
        oldCell.removeChild(el);
        el.style.position = 'absolute';
        el.style.left = (e.col * cellW + cellW/2 - 10) + 'px';
        el.style.top = (e.row * cellH + cellH/2 - 10) + 'px';
        el.style.transition = 'all 3s ease-in';
        el.style.zIndex = '30';
        board.appendChild(el);
        
        // 环绕黑球分布（紧贴）
        const angle = (i / enemies.length) * Math.PI * 2;
        const rad = 0.7; // 紧贴球边
        const tx = bx + Math.cos(angle) * rad * cellW;
        const ty = by + Math.sin(angle) * rad * cellH;
        const startDelay = 300 + i * 80;
        setTimeout(() => {
            el.style.left = tx + 'px';
            el.style.top = ty + 'px';
        }, startDelay);
    });
    
    // 等所有敌人到位后再伤害+下落
    const lastStart = 300 + (enemyElements.length - 1) * 80;
    const flyTime = 3200; // 飞行时间
    const landTime = lastStart + flyTime + 300;
    
    // 落地位置生成
    function genLandingSpots(count) {
        const spots = []; const taken = new Set();
        taken.add(pain.row + ',' + pain.col);
        for (let ring = 0; ring < 20 && spots.length < count; ring++) {
            for (let dr = -ring; dr <= ring; dr++) {
                for (let dc = -ring; dc <= ring; dc++) {
                    if (spots.length >= count) break;
                    if (Math.max(Math.abs(dr), Math.abs(dc)) !== ring) continue;
                    const nr = 13 + dr, nc = 11 + dc;
                    if (!isValidPosition(nr, nc)) continue;
                    if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
                    if (taken.has(nr + ',' + nc)) continue;
                    taken.add(nr + ',' + nc);
                    spots.push({ r: nr, c: nc });
                }
            }
        }
        return spots;
    }
    
    // 统一伤害+落地（先伤害，再为幸存者分配落点）
    setTimeout(() => {
        // 先统一扣血
        enemyElements.forEach(ee => {
            ee.unit.currentHp -= 4; updateUnitHp(ee.unit);
        });
        // 筛选幸存者
        const survivors = enemyElements.filter(ee => ee.unit.currentHp > 0);
        // 为幸存者生成不重叠落点
        const spots = genLandingSpots(survivors.length);
        // 移除死亡单位
        enemyElements.forEach(ee => {
            if (ee.unit.currentHp <= 0) { removeUnit(ee.unit); ee.el.remove(); }
        });
        // 幸存者下落
        survivors.forEach((ee, i) => {
            const s = spots[i];
            if (!s) return;
            ee.unit.row = s.r; ee.unit.col = s.c;
            const nc2 = gameState.board[s.r][s.c];
            ee.el.style.cssText = '';
            ee.el.parentNode?.removeChild(ee.el);
            nc2.appendChild(ee.el);
        });
    }, landTime);
    
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = '地爆天星';
    text.style.color = '#1a1a2e';
    gameState.board[pain.row][pain.col].appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, landTime - 500);
    setTimeout(() => ball.remove(), landTime + 200);
}
// 马斑攻击特效：红色＞箭头
function showMadaraAttackFX(attacker, target) {
    const board = document.getElementById('gameBoard');
    const arrow = document.createElement('div');
    arrow.textContent = '＞';
    const angle = attacker.team === 'red' ? -90 : 90; // 红方向上，蓝方向下
    arrow.style.cssText = 'position:absolute;color:#e74c3c;font-size:28px;font-weight:900;z-index:25;pointer-events:none;text-shadow:0 0 4px rgba(231,76,60,0.8);transform:rotate('+angle+'deg)';
    board.appendChild(arrow);
    
    const cellSize = cellW; const cH = cellH;
    const startX = attacker.col * cellSize + cellSize / 2;
    const startY = attacker.row * cellSize + cellSize / 2;
    const endX = target.col * cellSize + cellSize / 2;
    const endY = target.row * cellSize + cellSize / 2;
    
    const duration = 300;
    const start = performance.now();
    function animate(now) {
        const t = Math.min(1, (now - start) / duration);
        arrow.style.left = (startX + (endX - startX) * t - 6) + 'px';
        arrow.style.top = (startY + (endY - startY) * t - 7) + 'px';
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            arrow.remove();
        }
    }
    requestAnimationFrame(animate);
}

// 马斑反击特效：红色环绕圈
function showCounterFX(madara) {
    const board = document.getElementById('gameBoard');
    const ring = document.createElement('div');
    ring.className = 'counter-ring';
    const cellSize = cellW; const cH = cellH;
    ring.style.left = (madara.col * cellSize + cellSize / 2 - 18) + 'px';
    ring.style.top = (madara.row * cH + cH / 2 - 18) + 'px';
    board.appendChild(ring);
    setTimeout(() => ring.remove(), 1500);
}

// 陨石
function showMeteorButton(u) {
    // 找最近敌人
    const enemies = gameState.units.filter(e => e.team !== u.team);
    let target = u, minDist = Infinity;
    enemies.forEach(e => {
        const d = Math.max(Math.abs(e.row - u.row), Math.abs(e.col - u.col));
        if (d < minDist) { target = e; minDist = d; }
    });
    
    showCritText(target.row, target.col, '陨石');
    const board = document.getElementById('gameBoard');
    const cellSize = cellW, radius = 2;
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteor.style.left = ((target.col - radius) * cellSize) + 'px';
    meteor.style.top = '-120px';
    meteor.style.width = ((radius * 2 + 1) * cellSize) + 'px';
    meteor.style.height = ((radius * 2 + 1) * cellSize) + 'px';
    board.appendChild(meteor);
    setTimeout(() => {
        meteor.style.top = ((target.row - radius) * cellSize) + 'px';
    }, 50);
    setTimeout(() => { meteor.remove(); }, 900);
    setTimeout(() => {
        gameState.units.forEach(e => {
            if (e.team === u.team) return;
            const d = Math.max(Math.abs(e.row - target.row), Math.abs(e.col - target.col));
            if (d <= 2) {
                e.currentHp -= 4;
                updateUnitHp(e);
                if (e.currentHp <= 0) removeUnit(e);
            }
        });
    }, 1000);
}

// 铠大招：不灭魔躯
function activateKaiUlt(kai) {
    kai.kaiUltUsed = true;
    kai.kaiUltActive = true;
    kai.kaiUltDuration = 2;
    kai.armor += kai.kaiUltArmor;
    kai.attack += kai.kaiUltAttack;
    kai.currentHp += kai.kaiUltHp;
    kai.maxHp += kai.kaiUltHp;
    kai.critChance = 1.0;
    const cell = gameState.board[kai.row][kai.col];
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = '不灭魔躯';
    text.style.color = '#e74c3c';
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 2000);
    const unitEl = cell.querySelector('.unit');
    if (unitEl) unitEl.classList.add('kai-ult');
    gameState.attackedUnits.delete(kai.id);
    clearHighlights();
    gameState.selectedUnit = null;
}

// 烟雾弹特效
function deploySmoke(centerRow, centerCol, radius, team) {
    for (let r = centerRow - radius; r <= centerRow + radius; r++) {
        for (let c = centerCol - radius; c <= centerCol + radius; c++) {
            if (!isValidPosition(r, c)) continue;
            const cell = gameState.board[r][c];
            if (!cell.querySelector('.smoke-cover')) {
                const cover = document.createElement('div');
                cover.className = 'smoke-cover';
                cover.dataset.smokeTeam = team;
                cell.appendChild(cover);
            }
        }
    }
    updateSmokeVisibility();
    gameState.smokeZones.push({ row: centerRow, col: centerCol, radius: radius, team: team, turns: 3 });
}

// 更新烟雾中单位的可见性
function updateSmokeVisibility() {
    gameState.units.forEach(unit => {
        const cell = gameState.board[unit.row][unit.col];
        const covers = cell.querySelectorAll('.smoke-cover');
        const unitEl = cell.querySelector(`.unit[data-unit-id="${unit.id}"]`);
        if (!unitEl) return;
        // 如果烟雾是敌方放的，自己的兵应可见(z-index > cover)
        let hidden = false;
        covers.forEach(cv => {
            if (cv.dataset.smokeTeam === unit.team) hidden = true;
        });
        unitEl.style.zIndex = hidden ? '10' : '20';
    });
}

// 溅射伤害
function applySplashDamage(target, attacker) {
    const radius = attacker.splashRadius;
    gameState.units.forEach(u => {
        if (u.id === target.id) return;
        if (u.team === attacker.team) return;
        const dist = Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col));
        if (dist <= radius) {
            const penArmor = Math.max(0, (u.armor || 0) - (attacker.armorPen || 0));
            u.currentHp -= Math.max(0, attacker.attack - penArmor);
            updateUnitHp(u);
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
}

// 暴击文字特效
function showCritText(row, col, msg) {
    const cell = gameState.board[row][col];
    const text = document.createElement('div');
    text.className = 'crit-text';
    text.textContent = msg || '暴击!';
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 800);
}

// 火焰区域渲染
function renderFireZones() {
    document.querySelectorAll('.fire-zone').forEach(fz => fz.remove());
    gameState.fireZones.forEach(fz => {
        for (let r = fz.row - 1; r <= fz.row + 1; r++) {
            for (let c = fz.col - 1; c <= fz.col + 1; c++) {
                if (!isValidPosition(r, c)) continue;
                const cover = document.createElement('div');
                cover.className = 'fire-zone';
                gameState.board[r][c].appendChild(cover);
            }
        }
    });
}

// 检查单位是否踏入火焰区域
function checkFireZoneBurn(unit) {
    gameState.fireZones.forEach(fz => {
        const d = Math.max(Math.abs(unit.row - fz.row), Math.abs(unit.col - fz.col));
        if (d <= 1) {
            if (unit.burnTurns <= 0) unit.burnTurns = 3;
            updateBurnVisual(unit);
        }
    });
}

// 雷电飞龙连锁攻击（收集后动画伤害）
function applyChainAttack(attacker, target) {
    const hit = [target.id];
    const chainTargets = [];
    let current = target, count = 0;
    while (count < attacker.chainMax - 1) {
        let next = null, minDist = Infinity;
        gameState.units.forEach(e => {
            if (e.team === attacker.team || hit.includes(e.id)) return;
            const d = Math.max(Math.abs(e.row - current.row), Math.abs(e.col - current.col));
            if (d <= attacker.chainDist && d < minDist) { next = e; minDist = d; }
        });
        if (!next) break;
        hit.push(next.id);
        chainTargets.push({ from: current, to: next });
        current = next;
        count++;
    }
    // 动画+延迟伤害
    showDragonChain(attacker, target, chainTargets);
}

// 飞龙闪电链特效
function showDragonChain(attacker, target, chainTargets) {
    const board = document.getElementById('gameBoard');
    const cs = cellW;
    chainTargets.forEach((ct, i) => {
        const pFrom = ct.from, pTo = ct.to;
        const delay = 300 + i * 350;
        setTimeout(() => {
            const x1 = pFrom.col * cs + cs / 2, y1 = pFrom.row * cs + cs / 2;
            const x2 = pTo.col * cs + cs / 2, y2 = pTo.row * cs + cs / 2;
            const dx = x2 - x1, dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const line = document.createElement('div');
            line.className = 'dragon-chain';
            line.style.left = x1 + 'px';
            line.style.top = y1 + 'px';
            line.style.width = len + 'px';
            line.style.transform = 'rotate(' + angle + 'deg)';
            line.style.transformOrigin = '0 0';
            board.appendChild(line);
            setTimeout(() => line.remove(), 700);
            // 线连到时造成伤害
            pTo.currentHp -= attacker.attack;
            updateUnitHp(pTo);
            if (pTo.currentHp <= 0) removeUnit(pTo);
        }, delay);
    });
}

// 厂长召唤木炭
function summonCharcoal(manager) {
    manager.charcoalCount = (manager.charcoalCount || 0) + 1;
    const offsets = [[-1,0],[1,0],[0,-1],[0,1],[0,0]];
    const team = manager.team;
    for (const [dr, dc] of offsets) {
        const nr = manager.row + dr, nc = manager.col + dc;
        if (!isValidPosition(nr, nc)) continue;
        if (gameState.units.some(u => u.row === nr && u.col === nc)) continue;
        if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
        const charcoal = {
            id: 'charcoal_' + Date.now(), name: '木炭',
            attack: 0, maxHp: 9999, currentHp: 9999,
            moveRange: 4, attackRange: 2, team, row: nr, col: nc,
            percentAttack: 0.5, charcoal: true, charcoalTurns: 1,
            artwork: 'charcoal'
        };
        gameState.units.push(charcoal);
        renderUnit(charcoal);
        break;
    }
    clearHighlights();
    gameState.selectedUnit = null;
}

// 闪避文字特效
function showDodgeText(row, col) {
    const cell = gameState.board[row][col];
    const text = document.createElement('div');
    text.className = 'dodge-text';
    text.textContent = '闪避';
    cell.appendChild(text);
    setTimeout(() => { text.classList.add('fading'); }, 1000);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 1500);
}

// 清除过期烟雾
function clearExpiredSmoke() {
    const activeZones = new Set();
    gameState.smokeZones.forEach(sz => {
        for (let r = sz.row - sz.radius; r <= sz.row + sz.radius; r++) {
            for (let c = sz.col - sz.radius; c <= sz.col + sz.radius; c++) {
                if (isValidPosition(r, c)) activeZones.add(r + ',' + c);
            }
        }
    });
    document.querySelectorAll('.smoke-cover').forEach(cv => {
        const cell = cv.parentElement;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (!activeZones.has(row + ',' + col)) cv.remove();
    });
    updateSmokeVisibility();
}

// 马斑/佩恩能量条
function renderEnergyBar(unit, container) {
    let bar = container.querySelector('.madara-energy-bar');
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'madara-energy-bar';
        container.appendChild(bar);
    }
    bar.innerHTML = '';
    const maxE = unit.madaraMaxEnergy || unit.painMaxEnergy || 0;
    const curE = unit.madaraEnergy || unit.painEnergy || 0;
    for (let i = 0; i < maxE; i++) {
        const dot = document.createElement('div');
        dot.className = i < curE ? 'energy-dot filled' : 'energy-dot';
        bar.appendChild(dot);
    }
}

// 清除高亮
function clearHighlights() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('movable', 'attackable', 'selected');
    });
}

// 检查是否有效位置
function isValidPosition(row, col) {
    return row >= 0 && row < BOARD_ROWS && col >= 0 && col < BOARD_COLS;
}

// 检查格子是否被敌方烟雾覆盖
function isCellSmokedFor(row, col, team) {
    const cell = gameState.board[row]?.[col];
    if (!cell) return false;
    const covers = cell.querySelectorAll('.smoke-cover');
    for (const cv of covers) {
        if (cv.dataset.smokeTeam !== team) return true;
    }
    return false;
}

// 检查是否是蓝方大本营
function isBlueBase(row, col) {
    return row >= 0 && row <= 2 && col >= 10 && col <= 13;
}

// 检查是否是红方大本营
function isRedBase(row, col) {
    return row >= 25 && row <= 27 && col >= 10 && col <= 13;
}

// 更新能量显示
function updateEnergyDisplay() {
    const redPercentage = (gameState.redEnergy / gameState.maxEnergy) * 100;
    const bluePercentage = (gameState.blueEnergy / gameState.maxEnergy) * 100;
    
    redEnergyBar.style.width = `${redPercentage}%`;
    blueEnergyBar.style.width = `${bluePercentage}%`;
    
    redEnergyText.textContent = `能量: ${gameState.redEnergy}/${gameState.maxEnergy}`;
    blueEnergyText.textContent = `能量: ${gameState.blueEnergy}/${gameState.maxEnergy}`;
}

// 更新大本营血量显示
function updateBaseHpDisplay() {
    const redPercentage = (gameState.redBaseHp / 50) * 100;
    const bluePercentage = (gameState.blueBaseHp / 50) * 100;
    
    redBaseHpBar.style.width = `${redPercentage}%`;
    blueBaseHpBar.style.width = `${bluePercentage}%`;
    
    redHpText.textContent = gameState.redBaseHp;
    blueHpText.textContent = gameState.blueBaseHp;
    
    // 更新棋盘上的基地 HP 覆盖数字
    const blueOverlay = document.getElementById('blueBaseOverlay');
    const redOverlay = document.getElementById('redBaseOverlay');
    if (blueOverlay) blueOverlay.textContent = gameState.blueBaseHp;
    if (redOverlay) redOverlay.textContent = gameState.redBaseHp;
}

// 开始计时器
function startTimer() {
    stopTimer();
    gameState.timer = 45;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        gameState.timer--;
        updateTimerDisplay();
        
        if (gameState.timer <= 0) {
            endTurn();
        }
    }, 1000);
}

// 停止计时器
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// 更新计时器显示
function updateTimerDisplay() {
    timerDisplay.textContent = `${gameState.timer}秒`;
    
    if (gameState.timer <= 10) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
}

// 结束回合
function endTurn() {
    stopTimer();
    clearHighlights();
    gameState.selectedUnit = null;
    gameState.deployMode = false;
    
    const prevTurn = gameState.currentTurn;
    
    // 切换回合
    if (gameState.currentTurn === 'red') {
        gameState.currentTurn = 'blue';
        gameState.blueEnergy = Math.min(gameState.turnNumber + 1, gameState.maxEnergy);
        // 能量收集器加成
        const blueBoost = gameState.units.filter(u => u.team === 'blue' && u.building).length;
        gameState.blueEnergy = Math.min(gameState.blueEnergy + blueBoost, gameState.maxEnergy);
    } else {
        gameState.currentTurn = 'red';
        gameState.turnNumber++;
        gameState.redEnergy = Math.min(gameState.turnNumber, gameState.maxEnergy);
        const redBoost = gameState.units.filter(u => u.team === 'red' && u.building).length;
        gameState.redEnergy = Math.min(gameState.redEnergy + redBoost, gameState.maxEnergy);
    }
    
    // 重置移动和攻击状态
    gameState.moveUsed = {};
    gameState.attackedUnits.clear();
    
    // 重置远程暴击和闪避标记
    // 天下无双结束
    gameState.units.forEach(u => {
        if (u.inMusou && u.team === prevTurn) {
            u.inMusou = false;
            u.moveRange -= u.musouMove;
            u.attack = Math.floor(u.attack / 2);
            const ue = gameState.board[u.row][u.col].querySelector('.unit');
            if (ue) ue.classList.remove('kai-ult', 'musou-form');
            if ((u.madaraEnergy||0) >= 1 && (u.madaraEnergy||0) <= 2) showMeteorButton(u);
            u.madaraEnergy = 0;
            renderEnergyBar(u, gameState.board[u.row][u.col].querySelector('.unit'));
        }
    });
    // 木炭消失
    gameState.units = gameState.units.filter(u => {
        if (u.charcoal) {
            u.charcoalTurns = (u.charcoalTurns || 1) - 1;
            if (u.charcoalTurns <= 0) {
                const parent = gameState.units.find(pu => pu.percentAttack && pu.team === u.team);
                if (parent) parent.charcoalCount = Math.max(0, (parent.charcoalCount||1) - 1);
                removeUnit(u);
                return false;
            }
        }
        return true;
    });
    gameState.units.forEach(u => { u.kaiAttacks = 0; u.kaiShurikenDone = false; u.electricHit = []; u._banshoUsed = false; u._shinraUsed = false; });
    
    // 铠大招冷却递减
    gameState.units.forEach(u => { if (u.kaiUltCooldown > 0) u.kaiUltCooldown--; });
    
    // 铠大招持续2回合后结束
    gameState.units.forEach(u => {
        if (u.kaiUltActive) {
            u.kaiUltDuration--;
            if (u.kaiUltDuration <= 0) {
                u.kaiUltActive = false;
                u.kaiUltCooldown = 1;
                u.armor -= u.kaiUltArmor;
                u.attack -= u.kaiUltAttack;
                u.critChance = 0.5;
                const unitEl = gameState.board[u.row][u.col].querySelector('.unit');
                if (unitEl) unitEl.classList.remove('kai-ult');
            }
        }
    });
    
    gameState.units.forEach(u => { u.rangedCritUsed = false; u.dodgeUsed = false; });
    gameState.units.forEach(u => { if (u.team === prevTurn) { u.frozen = false; updateFrozenVisual(u); } });
    
    // 燃烧伤害：每回合灼烧1点
    gameState.units.forEach(u => {
        if (u.burnTurns > 0) {
            u.currentHp -= (u.burnDamage || 1);
            updateUnitHp(u);
            u.burnTurns--;
            if (u.burnTurns <= 0) updateBurnVisual(u);
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
    
    // 神罗天征持续伤害（己方回合末跳过，敌方回合末伤害+清特效）
    gameState.units.forEach(u => {
        if (u.shinraRange && u.abilityTimer > 0) {
            if (!u.shinraSkipNext) {
                gameState.units.forEach(e => {
                    if (e.team === u.team) return;
                    const dist = Math.max(Math.abs(e.row - u.row), Math.abs(e.col - u.col));
                    if (dist <= u.shinraRange) {
                        e.currentHp -= u.shinraDamage;
                        updateUnitHp(e);
                        if (e.currentHp <= 0) removeUnit(e);
                    }
                });
            }
            u.shinraSkipNext = false;
            u.abilityTimer--;
            if (u.abilityTimer <= 0) {
                u.abilityPhase = 1;
                if (u.shinraCovers) {
                    u.shinraCovers.forEach(c => { if (c.parentNode) c.remove(); });
                    u.shinraCovers = [];
                }
                if (u._shinraText) { u._shinraText.remove(); u._shinraText = null; }
            }
        }
    });
    
    // 更新UI
    updateEnergyDisplay();
    updateTurnIndicator();
    
    // 重新渲染所有单位
    gameState.units.forEach(unit => {
        renderUnit(unit);
    });
    
    // 火焰区域递减+重绘
    gameState.fireZones = gameState.fireZones.filter(fz => { fz.turns--; return fz.turns > 0; });
    renderFireZones();
    
    // 烟雾区域递减+清除
    gameState.smokeZones = gameState.smokeZones.filter(sz => {
        sz.turns--;
        return sz.turns > 0;
    });
    clearExpiredSmoke();
    
    // 开始新回合计时
    startTimer();
    
    // AI模式：蓝色回合自动AI行动
    if (gameState.aiMode && gameState.currentTurn === 'blue') {
        setTimeout(aiTurn, 500);
    }
}

// 更新回合指示器
function updateTurnIndicator() {
    if (gameState.currentTurn === 'red') {
        redTurnIndicator.classList.add('active');
        blueTurnIndicator.classList.remove('active');
    } else {
        blueTurnIndicator.classList.add('active');
        redTurnIndicator.classList.remove('active');
    }
    // AI模式下蓝方回合隐藏跳过按钮
    if (gameState.aiMode && gameState.currentTurn === 'blue') {
        skipBtn.style.display = 'none';
    } else {
        skipBtn.style.display = '';
    }
}

// 打开部署弹窗
function openDeployModal(row, col) {
    gameState.deployMode = true;
    gameState.deployPosition = null;
    
    // 保存目标部署位置
    gameState.deployTargetRow = row;
    gameState.deployTargetCol = col;
    
    // 更新弹窗中的卡牌列表
    updateDeployModalCards();
    
    deployModal.classList.remove('hidden');
}

// 更新部署弹窗中的卡牌
function updateDeployModalCards() {
    battleDeckGrid.innerHTML = '';
    
    const currentEnergy = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
    
    // 敌方半场只显示矿工
    const targetRow = gameState.deployTargetRow;
    const isEnemyHalf = (gameState.currentTurn === 'red' && targetRow <= 13) || (gameState.currentTurn === 'blue' && targetRow >= 14);
    
    gameState.battleDeck.forEach((card, index) => {
        if (isEnemyHalf && !card.miner) return;
        const cardElement = document.createElement('div');
        cardElement.className = `battle-deck-card ${currentEnergy < card.cost ? 'disabled' : ''}`;
        cardElement.dataset.index = index;
        cardElement.dataset.cost = card.cost;
        
        cardElement.innerHTML = `
            ${card.artwork ? `<div class="card-artwork art-${card.artwork}"></div>` : ''}
            <h4>${card.name}</h4>
            <div class="cost">${card.cost} 能量</div>
        `;
        
        battleDeckGrid.appendChild(cardElement);
    });
    
    if (gameState.battleDeck.length === 0) {
        battleDeckGrid.innerHTML = '<p style="color: #7f8c8d;">出战卡组为空</p>';
    }
}

// 关闭部署弹窗
function closeDeployModalFunc() {
    deployModal.classList.add('hidden');
    gameState.deployMode = false;
    gameState.deployPosition = null;
    gameState.deployTargetRow = null;
    gameState.deployTargetCol = null;
}

// 渲染卡包界面
function renderCardCollection() {
    cardGrid.innerHTML = '';
    
    gameState.cardCollection.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item' + (card.hero ? ' hero' : '');
        
        cardElement.innerHTML = `
            ${card.artwork ? `<div class="card-artwork art-${card.artwork}"></div>` : ''}
            <div class="card-cost-badge">${card.cost}</div>
            <h4>${card.name}</h4>
            <div class="card-actions">
                <button class="card-info-btn" data-card-id="${card.id}">信息</button>
                <button class="card-add-btn" data-card-id="${card.id}">出战</button>
            </div>
        `;
        
        // 信息按钮
        cardElement.querySelector('.card-info-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showCardInfo(card);
        });
        
        // 出战按钮
        const isDeployed = gameState.battleDeck.some(c => c.id === card.id);
        cardElement.querySelector('.card-add-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const btn = e.target;
            if (isDeployed) return;
            if (gameState.battleDeck.length >= 10) { alert('出战卡组已满（最多10张）'); return; }
            if (gameState.battleDeck.some(c => c.id === card.id)) { alert('每种卡只能带一张！'); return; }
            btn.textContent = '已出战';
            btn.disabled = true;
            addToBattleDeck(card);
        });
        if (isDeployed) {
            const btn = cardElement.querySelector('.card-add-btn');
            btn.textContent = '已出战';
            btn.disabled = true;
        }
        
        // 点击卡牌本身也显示信息
        cardElement.addEventListener('click', () => {
            showCardInfo(card);
        });
        
        cardGrid.appendChild(cardElement);
    });
}

// 显示卡牌信息
function showCardInfo(card) {
    cardName.textContent = card.name;
    cardAttack.textContent = card.attack;
    cardMove.textContent = card.moveRange;
    
    // HP + 护甲
    const hpLabel = document.querySelector('#cardHp').parentElement.querySelector('.label');
    hpLabel.textContent = '生命值:';
    let hpText = `${card.hp}`;
    if (card.armor) hpText += `（护甲 ${card.armor}）`;
    cardHp.textContent = hpText;
    
    // 攻击范围
    if (card.meleeAttack) {
        cardRange.textContent = `远:${card.attackRange}格 ${card.attack}伤  近:${card.meleeRange}格 ${card.meleeAttack}伤`;
    } else {
        cardRange.textContent = card.attackRange;
    }
    
    // 特殊属性汇集
    const features = [];
    if (card.critChance) features.push(`暴击 ${Math.round(card.critChance*100)}%`);
    if (card.rangedCrit) features.push('首次远程必暴击');
    if (card.armorPen) features.push(`穿甲 ${card.armorPen}`);
    if (card.splashRadius) features.push(`溅射 ${card.splashRadius}格`);
    if (card.chargeDamage) features.push(`冲锋≥${card.chargeMove}格 伤${card.chargeDamage}`);
    if (card.dodge) features.push('闪避');
    if (card.counterAttack) features.push(`反击${card.counterAttack}伤+燃烧3回合`);
    if (card.executionRange) features.push(`处决≤${card.executionRange}格`);
    if (card.summon) features.push('召唤亲卫队');
    if (card.oneShot) features.push('一次性');
    if (card.freeze) features.push('冰冻1回合');
    if (card.shinraRange) features.push(`神罗天征${card.shinraRange}格/万象天引`);
    if (card.aoeAttack) features.push('前方3格AoE+燃烧');
    if (card.madaraMaxEnergy) features.push(`能量${card.madaraMaxEnergy}格→天下无双/陨石`);
    if (card.kaiShurikenRange) features.push(`双攻/飞镖弹射${card.kaiShurikenMax}人+回血`);
    if (card.lineAttack) features.push(`直线3列射击/闪电链${card.chainDamage}伤`);
    if (card.hero) features.push('英雄');
    
    const costLabel = document.querySelector('#cardCost').parentElement.querySelector('.label');
    if (features.length > 0) {
        costLabel.textContent = '特性:';
        cardCost.textContent = `💰${card.cost}  |  ${features.join(' · ')}`;
    } else {
        costLabel.textContent = '能量花费:';
        cardCost.textContent = card.cost;
    }
    
    cardInfoPanel.classList.remove('hidden');
    
    // 卡牌介绍
    const descEl = document.getElementById('cardDesc');
    if (card.description && descEl) {
        descEl.textContent = card.description;
        descEl.style.display = '';
    } else if (descEl) {
        descEl.style.display = 'none';
    }
}

// 显示单位信息（双击棋盘上的单位）
function showUnitInfo(unit) {
    const used = gameState.moveUsed[unit.id] || 0;
    const remaining = Math.max(0, unit.moveRange - used);
    
    cardName.textContent = unit.name;
    cardAttack.textContent = unit.attack;
    cardHp.textContent = `${unit.currentHp} / ${unit.maxHp}`;
    cardMove.textContent = `${unit.moveRange}（剩余 ${remaining}）`;
    
    // 攻击范围信息
    if (unit.meleeAttack) {
        cardRange.textContent = `远:${unit.attackRange}格 ${unit.attack}伤  近:${unit.meleeRange}格 ${unit.meleeAttack}伤`;
    } else {
        cardRange.textContent = unit.attackRange;
    }
    cardCost.textContent = gameState.attackedUnits.has(unit.id) ? '已攻击' : '可攻击';
    
    // 状态区：护甲 / 冲锋 / 暴击
    const statContainer = document.querySelector('#cardCost').parentElement;
    const labelEl = statContainer.querySelector('.label');
    const extras = [];
    if (unit.armor) extras.push(`护甲:${unit.armor}`);
    if (unit.chargeDamage) extras.push(`冲锋 ≥${unit.chargeMove}格 伤${unit.chargeDamage}`);
    if (unit.rangedCrit) extras.push(`远程首击暴击×2`);
    if (unit.critChance) extras.push(`远程 ${Math.round(unit.critChance*100)}% 暴击`);
    if (unit.armorPen) extras.push(`穿甲:${unit.armorPen}`);
    if (unit.splashRadius) extras.push(`溅射:${unit.splashRadius}格`);
    if (unit.frozen) extras.push('❄冻结中');
    if (unit.burnTurns > 0) extras.push(`🔥燃烧 ${unit.burnTurns}回合`);
    if (extras.length > 0) {
        labelEl.textContent = '特性:';
        cardCost.textContent = extras.join(' | ');
    } else {
        labelEl.textContent = '状态:';
    }
    
    cardInfoPanel.classList.remove('hidden');
}

// 添加到出战卡组
function addToBattleDeck(card) {
    // 限制卡组大小（最多10张）
    if (gameState.battleDeck.length >= 10) {
        alert('出战卡组已满（最多10张）');
        return;
    }
    
    // 每种卡只能带一张
    const alreadyHasCard = gameState.battleDeck.some(c => c.id === card.id);
    if (alreadyHasCard) {
        alert('每种卡只能带一张！');
        return;
    }
    
    gameState.battleDeck.push({ ...card });
    updateBattleDeckDisplay();
    
    // 关闭信息面板
    cardInfoPanel.classList.add('hidden');
}

// 更新出战卡组显示
function updateBattleDeckDisplay() {
    deckCount.textContent = gameState.battleDeck.length;
    
    deckList.innerHTML = '';
    
    if (gameState.battleDeck.length === 0) {
        deckList.innerHTML = '<p style="color: #7f8c8d;">点击左侧卡牌添加到出战卡组</p>';
        return;
    }
    
    gameState.battleDeck.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'deck-card';
        
        cardElement.innerHTML = `
            <button class="remove-btn" data-index="${index}">×</button>
            <h5>${card.name}</h5>
        `;
        
        cardElement.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.target.textContent = '已移除';
            e.target.disabled = true;
            setTimeout(() => { removeFromBattleDeck(index); }, 400);
        });
        
        deckList.appendChild(cardElement);
    });
}

// 从出战卡组移除
function removeFromBattleDeck(index) {
    gameState.battleDeck.splice(index, 1);
    updateBattleDeckDisplay();
    renderCardCollection();
}

// 切换卡包标签页
function switchTab(tabName) {
    if (tabName === 'collection') {
        cardCollectionTab.classList.add('active');
        battleDeckTab.classList.remove('active');
        cardCollection.classList.remove('hidden');
        battleDeck.classList.add('hidden');
    } else {
        battleDeckTab.classList.add('active');
        cardCollectionTab.classList.remove('active');
        battleDeck.classList.remove('hidden');
        cardCollection.classList.add('hidden');
    }
    
    // 关闭信息面板
    cardInfoPanel.classList.add('hidden');
}

// 开始游戏
function startGame() {
    // 重置游戏状态
    gameState.units = [];
    gameState.currentTurn = 'red';
    gameState.turnNumber = 1;
    gameState.redEnergy = 1;
    gameState.blueEnergy = 1;
    gameState.redBaseHp = 50;
    gameState.blueBaseHp = 50;
    gameState.timer = 45;
    gameState.selectedUnit = null;
    gameState.deployMode = false;
    gameState.moveUsed = {};
    gameState.attackedUnits.clear();
    gameState.gameOver = false;
    gameState.winner = null;
    
    // 更新显示
    updateEnergyDisplay();
    updateBaseHpDisplay();
    updateTurnIndicator();
    updateTimerDisplay();
    
    // 初始化棋盘
    initBoard();
    
    // 切换界面 - 确保正确进入游戏界面
    startScreen.classList.add('hidden');
    cardPackScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    // 开始计时
    startTimer();
}

// 返回初始界面
function goToStartScreen() {
    stopTimer();
    cardInfoPanel.classList.add('hidden');
    startScreen.classList.remove('hidden');
    cardPackScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    gameOverModal.classList.add('hidden');
}

// 重新开始
function restartGame() {
    gameOverModal.classList.add('hidden');
    startGame();
}

// 事件监听
startBtn.addEventListener('click', () => {
    cardInfoPanel.classList.add('hidden');
    if (gameState.battleDeck.length === 0) {
        alert('请先在卡包中添加出战卡组！');
        return;
    }
    startScreen.classList.add('hidden');
    document.getElementById('modeSelectScreen').classList.remove('hidden');
});

cardPackBtn.addEventListener('click', () => {
    cardInfoPanel.classList.add('hidden');
    startScreen.classList.add('hidden');
    cardPackScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    renderCardCollection();
    updateBattleDeckDisplay();
});
backBtn.addEventListener('click', goToStartScreen);
exitBtn.addEventListener('click', goToStartScreen);
skipBtn.addEventListener('click', endTurn);
restartBtn.addEventListener('click', restartGame);
closeDeployModal.addEventListener('click', closeDeployModalFunc);


// 模式选择按钮
const modeSelectScreen = document.getElementById('modeSelectScreen');
document.getElementById('trainingBtn').addEventListener('click', () => {
    gameState.aiMode = false;
    modeSelectScreen.classList.add('hidden');
    startGame();
});
document.getElementById('aiBattleBtn').addEventListener('click', () => {
    gameState.aiMode = true;
    modeSelectScreen.classList.add('hidden');
    gameState.aiDeck = pickAIDeck();
    startGame();
    setTimeout(aiTurn, 1000);
});
document.getElementById('modeBackBtn').addEventListener('click', () => {
    modeSelectScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});

function pickAIDeck() { const s = [...cardLibrary].sort(() => Math.random()-0.5); return s.slice(0,10).map(c=>({...c})); }
function aiTurn() {
    if (gameState.gameOver || gameState.currentTurn !== 'blue') return;
    const aiDeck = gameState.aiDeck || [];
    const aiUnits = gameState.units.filter(u => u.team === 'blue');
    const energy = gameState.blueEnergy;
    const deployable = aiDeck.filter(c => c.cost <= energy && aiUnits.filter(u => u.cardId === c.id).length < 2);
    if (deployable.length > 0) {
        const card = deployable[Math.floor(Math.random() * deployable.length)];
        for (let row = 14; row >= 3; row--) {
            for (let col = 10; col <= 19; col++) {
                if (gameState.units.some(u => u.row === row && u.col === col)) continue;
                if (isBlueBase(row, col) || isRedBase(row, col)) continue;
                const unit = { id: card.id+'_'+Date.now(), cardId: card.id, name: card.name, attack: card.attack, maxHp: card.hp, currentHp: card.hp, moveRange: card.moveRange, attackRange: card.attackRange, artwork: card.artwork, armor: card.armor||0, team: 'blue', row, col, flying: card.flying||false };
                gameState.units.push(unit); renderUnit(unit);
                gameState.blueEnergy -= card.cost; updateEnergyDisplay();
                setTimeout(aiMoveAndAttack, 500); return;
            }
        }
    }
    aiMoveAndAttack();
}
function aiMoveAndAttack() {
    if (gameState.gameOver) return;
    const aiUnits = gameState.units.filter(u => u.team === 'blue');
    aiUnits.forEach(u => {
        if (gameState.attackedUnits.has(u.id)) return;
        const atkRng = u.attackRange || 1;
        
        // 1. 攻击范围内敌方单位
        let nearest = null, minD = Infinity;
        gameState.units.filter(e => e.team === 'red').forEach(e => {
            const d = Math.max(Math.abs(e.row-u.row), Math.abs(e.col-u.col));
            if (d <= atkRng && d < minD) { nearest = e; minD = d; }
        });
        if (nearest) {
            gameState.selectedUnit = u;
            attackUnit(nearest);
            gameState.selectedUnit = null;
            gameState.attackedUnits.add(u.id);
            return;
        }
        
        // 2. 攻击范围内红方大本营
        let inBaseRange = false;
        for (let r = 25; r <= 27; r++) for (let c = 10; c <= 13; c++) {
            const d = Math.max(Math.abs(r-u.row), Math.abs(c-u.col));
            if (d <= atkRng) { inBaseRange = true; break; }
        }
        if (inBaseRange) {
            gameState.selectedUnit = u;
            attackBase(false);
            gameState.selectedUnit = null;
            gameState.attackedUnits.add(u.id);
            return;
        }
        
        // 3. 向最近红方单位/大本营移动
        let targetR = 26, targetC = 11;
        let closestEnemy = null, cDist = Infinity;
        gameState.units.filter(e => e.team === 'red').forEach(e => {
            const d = Math.max(Math.abs(e.row-u.row), Math.abs(e.col-u.col));
            if (d < cDist) { closestEnemy = e; cDist = d; }
        });
        if (closestEnemy) { targetR = closestEnemy.row; targetC = closestEnemy.col; }
        
        const oldR = u.row, oldC = u.col, rng = u.moveRange;
        let br = u.row, bc = u.col, bd = Infinity;
        // 直接朝大本营走
        for (let dr = -rng; dr <= rng; dr++) for (let dc = -rng; dc <= rng; dc++) {
            if (Math.abs(dr)+Math.abs(dc) > rng) continue;
            const nr = u.row+dr, nc = u.col+dc;
            if (!isValidPosition(nr, nc)) continue;
            if (gameState.units.some(e => e.row===nr && e.col===nc)) continue;
            if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
            const d = Math.abs(nr-26)+Math.abs(nc-11);
            if (d < bd) { br = nr; bc = nc; bd = d; }
        }
        if (br !== oldR || bc !== oldC) {
            const oc = gameState.board[oldR][oldC], nc = gameState.board[br][bc];
            const el = oc.querySelector('.unit');
            if (el) { oc.removeChild(el); nc.appendChild(el); }
            u.row = br; u.col = bc;
            gameState.moveUsed[u.id] = (gameState.moveUsed[u.id]||0) + (Math.abs(br-oldR)+Math.abs(bc-oldC));
            // 移动后检测能否攻击
            let pn = null, pm = Infinity;
            gameState.units.filter(e => e.team === 'red').forEach(e => {
                const d = Math.max(Math.abs(e.row-u.row), Math.abs(e.col-u.col));
                if (d <= atkRng && d < pm) { pn = e; pm = d; }
            });
            if (pn) { gameState.selectedUnit = u; attackUnit(pn); gameState.selectedUnit = null; }
            else {
                let pi = false;
                for (let r = 25; r <= 27; r++) for (let c = 10; c <= 13; c++) {
                    if (Math.max(Math.abs(r-u.row), Math.abs(c-u.col)) <= atkRng) { pi = true; break; }
                }
                if (pi) { gameState.selectedUnit = u; attackBase(false); gameState.selectedUnit = null; }
            }
        }
        gameState.attackedUnits.add(u.id);
    });
    setTimeout(() => endTurn(), 1000);
}


// 双击棋盘上的单位显示信息面板
function handleCellDblClick(e) {
    const cell = e.currentTarget;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const unit = gameState.units.find(u => u.row === row && u.col === col);
    if (unit) {
        showUnitInfo(unit);
    }
}

// 长按棋盘单位显示卡牌式信息
let longPressTimer = null;
gameBoard.addEventListener('mousedown', startLongPress);
gameBoard.addEventListener('touchstart', startLongPress, {passive:true});
gameBoard.addEventListener('mouseup', cancelLongPress);
gameBoard.addEventListener('touchend', cancelLongPress);
gameBoard.addEventListener('mouseleave', cancelLongPress);

function startLongPress(e) {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const unit = gameState.units.find(u => u.row === row && u.col === col);
    if (!unit) return;
    longPressTimer = setTimeout(() => showUnitCardInfo(unit), 1500);
}
function cancelLongPress() { if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; } }

function showUnitCardInfo(unit) {
    cardName.textContent = unit.name;
    cardAttack.textContent = unit.attack;
    
    document.querySelector('#cardHp').parentElement.querySelector('.label').textContent = '生命值:';
    cardHp.textContent = (unit.currentHp < unit.maxHp ? unit.currentHp + ' / ' + unit.maxHp : String(unit.maxHp));
    
    cardMove.textContent = unit.moveRange;
    if (unit.meleeAttack) {
        cardRange.textContent = '远:' + unit.attackRange + '格 ' + unit.attack + '伤  近:' + unit.meleeRange + '格 ' + unit.meleeAttack + '伤';
    } else {
        cardRange.textContent = unit.attackRange;
    }
    
    const extras = [];
    if (unit.armor) extras.push('护甲:' + unit.armor);
    if (unit.flying) extras.push('空中单位');
    document.querySelector('#cardCost').parentElement.querySelector('.label').textContent = '状态:';
    cardCost.textContent = (gameState.attackedUnits.has(unit.id) ? '已攻击' : '可攻击') + (extras.length ? ' | ' + extras.join(' · ') : '');
    
    const descEl = document.getElementById('cardDesc');
    if (descEl) descEl.textContent = (unit.currentHp < unit.maxHp ? '已受伤' : '满血') + ' | ' + (unit.team === 'red' ? '红方' : '蓝方');
    
    cardInfoPanel.classList.remove('hidden');
}

// 部署弹窗卡牌点击——事件委托：在父容器上统一监听，取代逐卡牌绑定的 addEventListener
battleDeckGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.battle-deck-card');
    if (!card) return;
    
    const index = parseInt(card.dataset.index);
    const cost = parseInt(card.dataset.cost);
    const currentEnergy = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
    
    if (currentEnergy < cost) return;
    
    gameState.deployPosition = index;
    deployUnit(gameState.deployTargetRow, gameState.deployTargetCol);
    closeDeployModalFunc();
});

// 卡包标签切换
cardCollectionTab.addEventListener('click', () => switchTab('collection'));
battleDeckTab.addEventListener('click', () => switchTab('deck'));

// 点击页面其他地方关闭卡牌信息面板
document.addEventListener('click', (e) => {
    if (e.target.closest('.card-info-panel') || e.target.closest('.card-info-btn') || e.target.closest('.cell')) return;
    cardInfoPanel.classList.add('hidden');
});

// 初始化
initPreviewBoard();

// 导出用于调试
window.gameState = gameState;