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
        cost: 2,
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
        cost: 3,
        artwork: 'heavy-knight',
        description: "他很笨重,但是装甲很厚。"
    },
    {
        id: 'asala_soldier',
        name: '阿萨拉士兵',
        attack: 1,
        hp: 2,
        moveRange: 3,
        attackRange: 4,
        cost: 2,
        artwork: 'asala',
        description: "你丫完了,我说的!一个大飞踹给你李宁踹开线了,再一枪爆头。",
        meleeAttack: 2,
        meleeRange: 1,
        rangedCrit: true
    },
    {
        id: 'saeed',
        name: '赛伊德',
        attack: 3,
        hp: 4,
        armor: 1,
        moveRange: 5,
        attackRange: 5,
        cost: 8,
        artwork: 'saeed',
        description: "你掉进陷阱了!拥有百分之50的暴击率,每回合受到第一次攻击时闪避该攻击,闪避每回合只有一次,当其受到伤害后,发射火焰弩反击敌人并留下燃烧弹。",
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
        description: "自带亲卫队(攻2 血3 护甲1 移3 攻距4),自身降到半血以下暴击率由百分之50提升至百分之100。",
        hero: true,
        heroDeployText: '立即肃清,一个都不能放过!',
        halfHpText: '典狱长实力受损!',
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
        description: "近距离可处决敌人,亲卫队(攻5 血4 穿甲1 移4 攻距2 护甲1),半血以下释放烟雾弹,略微阻挡对方视野。",
        hero: true,
        heroDeployText: '欢迎来到阿萨拉,欢迎来到游乐园!',
        halfHpText: '狩猎开始了!',
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
        description: "很普通的坦克,有溅射伤害。",
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
        description: "可爱的精灵,一般搭配着速猪食用。",
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
        cost: 17,
        critChance: 0.25,
    artwork: 'madara',
        description: "普通攻击前方竖向三格,敌人近距离攻击时他自动反击3×3范围内敌军并跃起跳向敌军造成大范围伤害,每次攻击到敌人会积攒能量,能量≥4的时候双击释放技能进入无双状态,额外增加攻击次数和移动距离,5,6能量时无双状态结束后自动释放奥义,召唤陨石砸下伤害大范围敌军。",
        hero: true,
        heroDeployText: '吾不可阻挡!',
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
        description: "一万暴击!每回合攻击两次,第二次是用来回血的飞镖,可弹射。双击使用大招,获得护甲,生命值,攻击力的加成。",
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
        description: "普通的猫,但是全屏攻击,真实伤害!",
        armorPen: 99
    },
    {
        id: 'electric_pea',
        name: '超级电能豌豆·5阶',
        attack: 4,
        hp: 3,
        moveRange: 0,
        attackRange: 99,
        cost: 13,
        artwork: 'electric-pea',
        description: "至尊平a,闪电连锁!",
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
        attack: 2,
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
        heroDeployText: '你想跟我拼枪?那你可要小心了!',
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
        critChance: 0.3,
    artwork: 'pain',
        description: "一回合内可同时释放万象天引和神罗天征 拿到四颗豆的时候双击释放地爆天星",
        hero: true,
        heroDeployText: '让世界感受痛苦!',
        heroDeployColor: '#e74c3c',
        heroDeployDuration: 2000,
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
        name: '觉醒大皮卡',
        attack: 5,
        hp: 7,
        moveRange: 3,
        attackRange: 2,
        cost: 7,
        artwork: 'pekka',
        description: '觉醒的大皮卡!击杀敌人时回复3点生命,可超出上限,最高12点。',
        pekkaHeal: true
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
        description: '我要把你烧焦!',
        fireAttack: true,
        burnDamage: 2
    },
    {
        id: 'snow_monster',
        name: '大雪怪',
        attack: 2,
        hp: 8,
        moveRange: 3,
        attackRange: 2,
        cost: 9,
        artwork: 'snow-monster',
        description: '每受1伤召唤1个冰雪精灵',
        snowMonster: true
    },
    {
        id: 'gale',
        name: '疯狗·疾风',
        attack: 3,
        hp: 3,
        armor: 2,
        armorPen: 2,
        moveRange: 6,
        attackRange: 6,
        cost: 9,
        artwork: 'gale',
        description: '疯狗来了!',
        critChance: 0.3,
        dodge: true,
        counterAttack: 3,
        galeAnchor: null,
        galeSkillActive: false,
        galeSkillCD: 0, _isGale: true
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
        description: '就像第五人格里一样,厂长来到了这个地方依旧可以两下平a将对方打倒',
        percentAttack: 0.5,
        charcoalCount: 0,
        charcoalMax: 2
    },
    {
        id: 'demulan',
        name: '德穆兰',
        attack: 5,
        hp: 3,
        armor: 1,
        armorPen: 99,
        moveRange: 2,
        attackRange: 99,
        cost: 12,
        artwork: 'demulan',
        description: '老太来了!全图狙神',
        firstStrike: true,
        tankSpawn: true,
        hero: true,
        heroDeployText: '天空属于哈夫克!',
        heroDeployColor: '#1a1a1a',
        heroDeployDuration: 2000
    },
    {
        id: 'leisi',
        name: '雷斯',
        attack: 3,
        hp: 7,
        armor: 0,
        armorPen: 1,
        meleeAttack: 6,
        meleeRange: 1,
        moveRange: 4,
        attackRange: 3,
        cost: 10,
        artwork: 'leisi',
        description: '小心他的雷霆肘击!',
        hero: true,
        heroDeployText: '我要把你崩飞!',
        heroDeployColor: '#e74c3c',
        heroDeployDuration: 2000,
        leisiSpawn: true
    },
    {
        id: 'cop_car',
        name: '条子',
        attack: 0,
        hp: 4,
        armor: 1,
        moveRange: 10,
        attackRange: 0,
        cost: 13,
        artwork: 'cop-car',
        description: '白捷达 黑普桑 条子来了!',
        copSpawn: true
    },
    {
        id: 'dragon_baby',
        name: '觉醒飞龙宝宝',
        attack: 2,
        hp: 6,
        moveRange: 8,
        attackRange: 3,
        cost: 8,
        artwork: 'dragon-baby',
        description: '飞龙宝宝来这里吃它的烤肉大餐了!它可以产生给友军加移动距离,给敌军减移动距离的风阵',
        flying: true,
        splashRadius: 1,
        windForm: true
    },
    {
        id: 'erin',
        name: '艾琳',
        attack: 2,
        hp: 3,
        armorPen: 1,
        moveRange: 6,
        attackRange: 5,
        cost: 10,
        artwork: 'erin',
        description: '双发连击:黄弹4伤+黄圈,普攻后撤;命中计数6开技能(3伤×6);保命装免疫致命伤+3血护盾',
        erin: true
    },
    {
        id: 'blowdart_goblin',
        name: '觉醒吹箭哥布林',
        attack: 1,
        hp: 2,
        armorPen: 2,
        moveRange: 8,
        attackRange: 7,
        cost: 4,
        artwork: 'blowdart',
        description: '吹箭带毒!连续命中3次毒伤提升为2,5次提升为5!',
        blowdart: true
    },
    {
        id: 'training_dummy',
        name: '训练木偶',
        attack: 0,
        hp: 100,
        moveRange: 0,
        attackRange: 0,
        cost: 0,
        artwork: 'dummy',
        description: '训练木偶,不会移动不会攻击,只能挨打。',
        dummy: true,
        trainingOnly: true
    },
    {
        id: 'hashirama',
        name: '千手柱间·秽土转生',
        attack: 2,
        hp: 6,
        armor: 1,
        moveRange: 4,
        attackRange: 3,
        cost: 17,
        artwork: 'hashirama',
        description: '木遁·木人之术+树界降临!格挡反击!火之意志!',
        hashirama: true,
        hashiMaxEnergy: 6,
        critChance: 0.5,
        hero: true,
        heroDeployText: '没受伤吧?',
        heroDeployColor: '#000000',
        heroDeployDuration: 2000
    },
    {
        id: 'skull_army',
        name: '觉醒骷髅海',
        attack: 1,
        hp: 1,
        moveRange: 9,
        attackRange: 1,
        cost: 11,
        artwork: 'skull-army',
        description: '15个骷髅的军团!大哥护盾挡一次攻击,骷髅死亡变阴兵,大哥亡则阴兵尽灭。',
        skullArmy: true
    },
    {
        id: 'wither',
        name: '凋零',
        attack: 3,
        hp: 8,
        armor: 0,
        moveRange: 5,
        attackRange: 4,
        cost: 14,
        artwork: 'wither',
        flying: true,
        splashRadius: 1,
        wither: true,
        description: '空中单位,攻击溅射3×3。命中附加凋零毒(黑色,每回合1伤,不可叠加)。半血后双击进入冲撞模式:12格内选中敌人冲撞造成6伤(冲撞后仍可普攻)。'
    },
    {
        id: 'tesla',
        name: '觉醒特斯拉电磁塔',
        attack: 3,
        hp: 5,
        armor: 0,
        moveRange: 0,
        attackRange: 5,
        cost: 5,
        artwork: 'tesla',
        building: true,
        tesla: true,
        description: '建筑。攻击范围内没有敌人时缩进地底(图标半透明,敌人无法以它为攻击目标)。从地底现形时释放5×5紫色电圈:触碰的敌人受3伤。'
    },
    {
        id: 'black_zetsu',
        name: '黑绝',
        attack: 2,
        hp: 6,
        armor: 0,
        moveRange: 10,
        attackRange: 2,
        cost: 14,
        artwork: 'black_zetsu',
        hero: true,
        heroDeployText: '嘿嘿嘿嘿',
        heroDeployColor: '#000000',
        heroDeployDuration: 2000,
        blackZetsu: true,
        description: '部署到棋盘上后,移动到队友附近(2格内),点击黑绝可攻击或点击队友附身:队友获得暴击+20%、攻击+1、生命+2、移动+3。队友一回合移动超5格黑绝显现并承受伤害;队友死亡黑绝回归本体。双击本体跳向6格内敌人爆炸3伤。'
    },
    {
        id: 'golem',
        name: '戈仑石人',
        attack: 2,
        hp: 12,
        armor: 0,
        moveRange: 3,
        attackRange: 2,
        cost: 7,
        artwork: 'golem',
        golem: true,
        description: '死亡后分裂成两个小石头人(一左一右)。'
    },
    {
        id: 'elite_ice',
        name: '精英冰人',
        attack: 1,
        hp: 6,
        armor: 0,
        moveRange: 3,
        attackRange: 2,
        cost: 4,
        artwork: 'elite_ice',
        hero: true,
        heroDeployText: '',
        heroDeployColor: '#000000',
        heroDeployDuration: 1500,
        eliteIce: true,
        description: '金卡。双击制造5×5冰场(随自身移动,持续到敌方回合结束):接触冰场的敌人被冰冻,下一个敌方回合不能行动。被施加灼烧立即解冻。'
    },
    {
        id: 'mirror',
        name: '镜',
        attack: 3,
        hp: 4,
        armor: 1,
        moveRange: 7,
        attackRange: 2,
        cost: 11,
        artwork: 'mirror',
        critChance: 0.6,
        mirror: true,
        description: '60%暴击。攻击后以敌人为对称点召唤半透明分身(本体与分身可再同时攻击一次)。双击分身互换位置。双击本体选中4格内敌人开启镜面法阵:冲撞2伤+定身,创造圆形法阵(菱形镜片),点击敌人换位(经过敌人2伤穿甲1+镜片1真伤),每次换位回1血(上限+1)。冷却2回合。'
    },
    {
        id: 'super_knight',
        name: '觉醒超级骑士',
        attack: 3,
        hp: 8,
        armor: 0,
        moveRange: 4,
        attackRange: 2,
        cost: 9,
        artwork: 'super_knight',
        superKnight: true,
        description: '部署时对3×3范围敌人造成4伤并击退1格(霸体免疫)。攻击为范围攻击(目标+左右+后方4格),目标被击退4格。敌人距离3-5格时跃击:跳砸4伤,前方2×3敌人击退1格(霸体免疫)。每回合可攻击两次。'
    },
    {
        id: 'heal_fairy',
        name: '治疗精灵',
        attack: 0,
        hp: 1,
        moveRange: 10,
        attackRange: 2,
        cost: 2,
        artwork: 'heal_fairy',
        oneShot: true,
        healFairy: true,
        description: '一次性卡牌。选择队友或敌人跳向目标:以目标为中心3×3内友方恢复2生命、敌方受到1伤害,随后奶豆消失。'
    },
    {
        id: 'cannon',
        name: '加农炮',
        attack: 2,
        hp: 4,
        armor: 0,
        moveRange: 0,
        attackRange: 5,
        cost: 3,
        artwork: 'cannon',
        building: true,
        cannon: true,
        description: '建筑,不可移动。免疫所有击退击飞(冰冻仍可生效)。'
    },
    {
        id: 'doom_shroom',
        name: '毁灭菇',
        attack: 0,
        hp: 3,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 13,
        artwork: 'doom_shroom',
        doomShroom: true,
        description: '一次性·不可移动。己方回合双击引爆:以自身为中心7×7爆炸(7伤)后死亡,留下持续4回合的弹坑(仅掘地矿工可部署)。敌方回合被攻击致死也会爆炸。'
    },
    {
        id: 'small_shroom',
        name: '小喷菇',
        attack: 1,
        hp: 1,
        armor: 0,
        armorPen: 999,
        moveRange: 0,
        attackRange: 3,
        cost: 0,
        artwork: 'small_shroom',
        smallShroom: true,
        description: '不可移动,攻击距离3。穿甲无限(真实伤害)。每回合最多部署2个。'
    },
    {
        id: 'patroller',
        name: '巡视者',
        attack: 0,
        hp: 1,
        armor: 0,
        moveRange: 10,
        attackRange: 2,
        cost: 3,
        artwork: 'patroller',
        patroller: true,
        description: '功能性卡牌。选择攻击范围内一个敌人咬住:持续3回合无法移动,3回合后巡视者自动消失。'
    },
    {
        id: 'royal_guard',
        name: '觉醒皇家卫队',
        attack: 2,
        hp: 4,
        armor: 0,
        moveRange: 5,
        attackRange: 2,
        cost: 8,
        artwork: 'royal_guard',
        royalGuard: true,
        description: '部署6个皇家卫兵(横向排列,每两个间隔1格)。每个卫兵4血/2攻/移动5/攻击距离2,自带抵御3伤的护盾(破盾前本体不受伤害)。一回合内移动≥3格进入冲锋状态,伤害翻倍。'
    },
    {
        id: 'hog_rider',
        name: '野猪骑士',
        attack: 2,
        hp: 5,
        armor: 0,
        moveRange: 8,
        attackRange: 2,
        cost: 2,
        artwork: 'hog',
        hogRider: true,
        description: '机动性高。只能攻击建筑单位(加农炮/特斯拉/能量收集器等)和大本营。'
    },
    {
        id: 'elite_knight',
        name: '精英骑士',
        attack: 2,
        hp: 6,
        armor: 0,
        moveRange: 5,
        attackRange: 2,
        cost: 5,
        artwork: 'elite_knight',
        hero: true,
        heroDeployText: '',
        eliteKnight: true,
        description: '金卡。双击释放技能:以自身为中心发出7×7金色法阵,范围内敌人只能以骑士为攻击目标(持续到骑士死亡),并获得抵挡3伤的护盾。'
    },
    {
        id: 'fisherman',
        name: '渔夫',
        attack: 1,
        hp: 4,
        armor: 0,
        moveRange: 4,
        attackRange: 2,
        cost: 4,
        artwork: 'fisherman',
        fisherman: true,
        description: '双击使用技能:用船锚把11格内一个敌方单位拉到自己前方一格(不能拉建筑/飞行单位),使用后还能普通攻击一次。'
    },
    {
        id: 'fireball',
        name: '大火球',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 5,
        artwork: 'fireball',
        spell: true,
        spellDamage: 4,
        spellRadius: 1,
        baseDamage: 2,
        description: '法术卡·全图释放。点击任意格子,火球从天而降:以该格为中心的3×3范围造成4伤,大本营固定2伤。'
    },
    {
        id: 'yogg',
        name: '脱困古神·尤格-萨隆',
        attack: 9,
        hp: 5,
        armor: 0,
        moveRange: 2,
        attackRange: 3,
        cost: 20,
        artwork: 'yogg',
        hero: true,
        heroDeployText: '末日,终于降临了!',
        heroDeployColor: '#000',
        heroDeployDuration: 2000,
        yogg: true,
        description: '金卡。双击弹技能框:混沌统治(选一敌人变己方并拉至前方)/诱引狂乱(敌人互相攻击)/触须攒聚(获得混乱触须手牌)。三技能各一次,每回合限用1个,用完才能普攻。'
    },
    {
        id: 'yogg_saron',
        name: '尤格-萨隆',
        attack: 9,
        hp: 5,
        armor: 0,
        moveRange: 2,
        attackRange: 4,
        cost: 19,
        artwork: 'yogg_saron',
        hero: true,
        heroDeployText: '在死亡之神的面前屈服吧!',
        heroDeployColor: '#1e8449',
        heroDeployDuration: 2000,
        yoggSaron: true,
        description: '金卡。登场时:本局每使用过1个法术就随机释放1个法术(增益→随机队友,负面/伤害→随机敌人),逐个释放;法术很多时一次性释放完。'
    },
    {
        id: 'rage_spell',
        name: '狂暴法术',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 4,
        artwork: 'rage',
        spell: true,
        rage: true,
        rageRadius: 2,
        rageAttack: 2,
        rageMove: 2,
        description: '法术卡·全图释放。5×5范围内友军攻击力+2(技能每段伤害+2)、下一次移动距离+2,持续一个回合后消失。'
    },
    {
        id: 'log_spell',
        name: '复仇滚木',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 3,
        artwork: 'log',
        spell: true,
        log: true,
        logRange: 11,
        logDamage: 2,
        logPen: 1,
        baseDamage: 1,
        description: '法术卡·全图释放。选中格为滚木中间,滚木向前滚动11格(竖向3×11):经过的敌人受2伤(穿甲1)并沿滚动方向击退1格(不会重复受伤),大本营固定1伤。'
    },
    {
        id: 'leftover',
        name: '剩饭',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 3,
        artwork: 'leftover',
        spell: true,
        leftover: true,
        leftAtk: 1,
        leftHp: 1,
        description: '法术卡·全图释放。选择一个友军:攻击力+1、生命值+1(满血则加上限),技能每段伤害+1,加成永久生效。'
    },
    {
        id: 'stone_wall',
        name: '石墙守护',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 4,
        artwork: 'stone_wall',
        spell: true,
        stoneWall: true,
        description: '法术卡·全图释放。选择一个友军:下一个敌方回合无敌1回合(不受任何伤害,冰冻等效果仍正常),棕色泡泡包裹。'
    },
    {
        id: 'big_lightning',
        name: '大闪电',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 7,
        artwork: 'big_lightning',
        spell: true,
        bigLightning: true,
        lgtRadius: 2,
        lgtDamage: 5,
        lgtCount: 3,
        description: '法术卡·全图释放。选择队友或敌方单位作为生效点:以其为中心的5×5范围内生命值最高的3名敌人受闪电打击(5伤)。'
    },
    {
        id: 'chaos_tentacle',
        name: '混乱触须',
        attack: 1,
        hp: 1,
        armor: 0,
        moveRange: 0,
        attackRange: 3,
        cost: 4,
        artwork: 'tentacle',
        chaosTentacle: true,
        description: '不可移动,攻击距离3,不可对空。部署后自动释放一个随机法术:增益牌对随机队友释放,伤害牌对随机敌人释放。'
    },
    {
        id: 'reynolds_jackson',
        name: '雷诺·杰克逊',
        attack: 3,
        hp: 5,
        armor: 0,
        moveRange: 5,
        attackRange: 4,
        cost: 18,
        artwork: 'reynolds_jackson',
        hero: true,
        heroDeployText: '我们要发财了!',
        heroDeployColor: '#f1c40f',
        heroDeployDuration: 2000,
        reynoldsHeal: true,
        description: '金卡。登场为大本营回满生命值(50)。'
    },
    {
        id: 'magic_shield',
        name: '魔法护盾',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 4,
        artwork: 'magic_shield',
        spell: true,
        magicShield: true,
        description: '法术卡·全图释放。选择一个友军:免疫所有法术造成的效果与伤害(普通攻击/技能/燃烧/毒等不受影响),紫色护盾持续到该单位死亡。'
    },
    {
        id: 'heal_spell',
        name: '治疗术',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 6,
        artwork: 'heal',
        spell: true,
        heal: true,
        healAmount: 3,
        healRadius: 1,
        healMove: 1,
        description: '法术卡·全图释放。以选中格为中心的3×3范围内所有友军恢复3点生命(不超过上限),并获得+1移动范围(仅本回合)。'
    },
    {
        id: 'evil_moon',
        name: '邪月当空',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 20,
        artwork: 'evil_moon',
        spell: true,
        evilMoon: true,
        description: '法术卡·增益。随机挑选8个队友,随机变成花费≥10的卡(变出的卡若带亲卫队则召唤亲卫队)。'
    },
    {
        id: 'shield_spell',
        name: '护盾',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 4,
        artwork: 'shield',
        spell: true,
        shieldSpell: true,
        shieldAmount: 4,
        description: '法术卡·增益。选择一个队友:添加一个能承受4点伤害的护盾(可叠加)。'
    },
    {
        id: 'eagle_artillery',
        name: '天鹰火炮',
        attack: 0,
        hp: 10,
        armor: 0,
        moveRange: 0,
        attackRange: 99,
        cost: 15,
        artwork: 'eagle_artillery',
        building: true,
        eagleArtillery: true,
        description: '建筑·不可移动。敌方累计消耗40能量后开启。每回合可攻击3次:全图选敌(自身5×5为盲区),被选中敌人及其周围5×5范围受4伤。'
    },
    {
        id: 'dirty_rat',
        name: '卑劣的脏鼠',
        attack: 3,
        hp: 7,
        armor: 0,
        moveRange: 8,
        attackRange: 2,
        cost: 1,
        artwork: 'dirty_rat',
        dirtyRat: true,
        description: '打出时随机从敌方牌库召唤一张非法术牌到对方半场(尽量远离两边),召唤物属敌方阵营,亲卫队/登场效果/技能正常生效。'
    },
    {
        id: 'crog',
        name: '克罗格·环形山之王',
        attack: 6,
        hp: 5,
        armor: 0,
        moveRange: 3,
        attackRange: 2,
        cost: 17,
        artwork: 'crog',
        crog: true,
        description: '在场时己方回合结束:敌方所有在场卡牌攻击力/生命值变为1(不可逆转,克罗格死亡也不恢复)。克罗格死亡后新下的卡不受影响。被降攻敌人的技能每段伤害只能造成1点。'
    },
    {
        id: 'yogg_fate',
        name: '尤格-萨隆·命运主宰',
        attack: 9,
        hp: 5,
        armor: 0,
        moveRange: 2,
        attackRange: 2,
        cost: 17,
        artwork: 'yogg_fate',
        hero: true,
        yoggFate: true,
        description: '打出时若本局释放法术≥15次,转动命运之轮:随机获得1个命运技能(命运之手/血肉诅咒/夺心护目镜/神秘魔盒/吞噬之饥/燃烧权杖)。'
    },
    {
        id: 'lvbu',
        name: '吕布',
        attack: 2,
        hp: 6,
        armor: 2,
        moveRange: 4,
        attackRange: 3,
        cost: 16,
        artwork: 'lvbu',
        lvbu: true,
        critChance: 0.05,
        description: '双击进入技能栏:方天画斩(前方2×3范围3伤+附魔真伤)/贪狼之握(前方3×3汲取+护盾)/神魔降世(跳圆心5径圆4伤+护甲+1)。对血量低于50%敌人额外30%伤害。'
    },
    {
        id: 'missile_launch',
        name: '导弹发射',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 6,
        artwork: 'missile',
        spell: true,
        missileLaunch: true,
        minAtk: 5,
        description: '法术卡·全图释放。选择一个攻击力≥5的敌人,直接消灭它。'
    },
    {
        id: 'crazy_cannon',
        name: '疯狂大炮',
        attack: 1,
        hp: 1,
        armor: 0,
        moveRange: 2,
        attackRange: 8,
        cost: 2,
        artwork: 'crazy_cannon',
        crazyCannon: true,
        description: '每回合可直接攻击一次大本营(不消耗普攻),同时还能进行一次普通攻击。'
    },
    {
        id: 'rolling_stone',
        name: '滚石',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 2,
        artwork: 'rolling_stone',
        spell: true,
        rollingStone: true,
        maxAtk: 2,
        description: '法术卡·全图释放。选择一个攻击力≤2的敌人,直接消灭它。'
    },
    {
        id: 'viral_spread',
        name: '病毒式传播',
        attack: 0,
        hp: 0,
        armor: 0,
        moveRange: 0,
        attackRange: 0,
        cost: 4,
        artwork: 'viral_spread',
        spell: true,
        viralSpread: true,
        description: '法术卡·增益。所有己方单位获得狂热:一次攻击击杀敌人后可再攻击一次,连环击杀可连续攻击。'
    },
    {
        id: 'guy_death_gate',
        name: '迈特凯·死门',
        attack: 3,
        hp: 10,
        armor: 0,
        moveRange: 5,
        attackRange: 5,
        cost: 18,
        artwork: 'guy_death_gate',
        hero: true,
        heroDeployText: '第八死门...开！',
        heroDeployColor: '#c0392b',
        heroDeployDuration: 2000,
        guyDeathGate: true,
        guyMaxEnergy: 4,
        description: '单击冲撞攻击(每回合4次,每撞2次+1能量)。3格内有敌人时双击释放奥义夕象伍足(耗4能量)。血量≤5进入爆衣:攻击+2、技能每段+2,可双击选技能(夕象伍足/夜凯)。每回合自动扣1血(到5停止)。'
    },
    {
        id: 'madara_solve',
        name: '宇智波斑·秽土转生·解',
        attack: 0,
        hp: 7,
        armor: 1,
        moveRange: 5,
        attackRange: 0,
        cost: 16,
        artwork: 'madara_solve',
        critChance: 0.25,
        hero: true,
        heroDeployText: '你已经没有希望了。剩下来的......只有绝望而已',
        heroDeployColor: '#2980b9',
        heroDeployDuration: 2000,
        madaraSolve: true,
        solveEnergy: 0,
        solveMaxEnergy: 4,
        description: '25%暴击。一回合两个技能:木龙之术(选3×8内敌人,木龙冲3伤+俯冲3×3四伤+树缠)与火遁豪火灭却(3×6范围,树缠额外2伤)。技能命中+1能量,4能量双击开启完全体须佐能乎(霸体/无敌/推敌/子弹/十字斩),回合结束自动终极奥义(大剑5×5三伤×3)。敌方回合受击或冰冻/树缠时可双击开启特殊须佐(一局一次)。'
    }
];

// 卡牌按费用从低到高排序(新增卡也自动排进去)
cardLibrary.sort((a, b) => (a.cost || 0) - (b.cost || 0));

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
    windZones: [],
    iceFields: [],
    erinRings: [],
    missileMarks: [],
    craters: [],
    shroomCount: { red: 0, blue: 0 },
    knightZones: [],
    rageZones: [],
    spellsCastThisGame: 0,
    _fateWheelProgress: 0,
    energySpent: { red: 0, blue: 0 },
    _freeTentacles: 0,
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

            // 中心分界线(在第13行底部)
            if (row === 13) {
                cell.classList.add('center-line-bottom');
            }

            // 蓝方大本营:行0-2,列10-13
            if (row >= 0 && row <= 2 && col >= 10 && col <= 13) {
                cell.classList.add('blue-base');
                if (row === 1 && (col === 11 || col === 12)) {
                    cell.classList.add('blue-base-center');
                }
            }

            // 红方大本营:行25-27,列10-13
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

function createUnitFromCard(card, team, row, col) {
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
        leisiSpawn: card.leisiSpawn || false,
        copSpawn: card.copSpawn || false,
        windForm: card.windForm || false,
        erin: card.erin || false,
        pekkaHeal: card.pekkaHeal || false,
        blowdart: card.blowdart || false,
        dummy: card.dummy || false,
        hashirama: card.hashirama || false,
        hashiMaxEnergy: card.hashiMaxEnergy || 0,
        skullArmy: card.skullArmy || false,
        wither: card.wither || false,
        firstStrike: card.firstStrike || false,
        tankSpawn: card.tankSpawn || false,
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
        tesla: card.tesla || false,
        blackZetsu: card.blackZetsu || false,
        golem: card.golem || false,
        eliteIce: card.eliteIce || false,
        mirror: card.mirror || false,
        superKnight: card.superKnight || false,
        healFairy: card.healFairy || false,
        cannon: card.cannon || false,
        madaraSolve: card.madaraSolve || false,
        doomShroom: card.doomShroom || false,
        smallShroom: card.smallShroom || false,
        patroller: card.patroller || false,
        royalGuard: card.royalGuard || false,
        hogRider: card.hogRider || false,
        eliteKnight: card.eliteKnight || false,
        fisherman: card.fisherman || false,
        spell: card.spell || false,
        spellDamage: card.spellDamage || 0,
        spellRadius: card.spellRadius || 0,
        baseDamage: card.baseDamage || 0,
        yogg: card.yogg || false,
        yoggSaron: card.yoggSaron || false,
        rage: card.rage || false,
        rageRadius: card.rageRadius || 0,
        rageAttack: card.rageAttack || 0,
        rageMove: card.rageMove || 0,
        log: card.log || false,
        logRange: card.logRange || 0,
        logDamage: card.logDamage || 0,
        logPen: card.logPen || 0,
        leftover: card.leftover || false,
        leftAtk: card.leftAtk || 0,
        leftHp: card.leftHp || 0,
        stoneWall: card.stoneWall || false,
        bigLightning: card.bigLightning || false,
        lgtRadius: card.lgtRadius || 0,
        lgtDamage: card.lgtDamage || 0,
        lgtCount: card.lgtCount || 0,
        chaosTentacle: card.chaosTentacle || false,
        reynoldsHeal: card.reynoldsHeal || false,
        magicShield: card.magicShield || false,
        heal: card.heal || false,
        healAmount: card.healAmount || 0,
        healRadius: card.healRadius || 0,
        healMove: card.healMove || 0,
        evilMoon: card.evilMoon || false,
        shieldSpell: card.shieldSpell || false,
        shieldAmount: card.shieldAmount || 0,
        eagleArtillery: card.eagleArtillery || false,
        dirtyRat: card.dirtyRat || false,
        crog: card.crog || false,
        yoggFate: card.yoggFate || false,
        lvbu: card.lvbu || false,
        missileLaunch: card.missileLaunch || false,
        minAtk: card.minAtk || 0,
        crazyCannon: card.crazyCannon || false,
        rollingStone: card.rollingStone || false,
        maxAtk: card.maxAtk || 0,
        viralSpread: card.viralSpread || false,
        guyDeathGate: card.guyDeathGate || false,
        guyMaxEnergy: card.guyMaxEnergy || 0,
        solveEnergy: card.solveEnergy || 0,
        solveMaxEnergy: card.solveMaxEnergy || 0,
        miner: card.miner || false,
        deployEffect: card.deployEffect || false,
        flying: card.flying || false,
        fireAttack: card.fireAttack || false,
        snowMonster: card.snowMonster || false,
        galeAnchor: null,
        galeSkillActive: false,
        galeSkillCD: 0,
        _isGale: card._isGale || false,
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
        team: team,
        row,
        col
    };
    return unit;
}

// 处理格子点击
function handleCellClick(e) {
    if (gameState.gameOver) return;

    // 法术施放模式:点击任意非大本营格施放
    if (gameState._spellCasting) {
        const cell = e.target.closest('.cell');
        if (cell) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const card = gameState._spellCasting;
            // 友军目标法术(石墙/剩饭/魔法护盾):目标格必须是友军,否则不施放
            const friendlyTarget = !!(card.stoneWall || card.leftover || card.magicShield || card.shieldSpell);
            const hasFriendly = friendlyTarget && gameState.units.some(u => u.row === row && u.col === col && u.team === gameState.currentTurn && !u._removing);
            if (!isBlueBase(row, col) && !isRedBase(row, col) && (!friendlyTarget || hasFriendly)) {
                const curE = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
                // 命运之手:下回合己方法术牌花费为0,但0费法术本回合仅限使用1次
                let realCost = card.cost;
                if (gameState._fateFreeSpells) {
                    if (gameState._fateFreeUsed >= 1) {
                        alert('命运之手:0费法术本回合仅限使用1次');
                        gameState._spellCasting = null;
                        clearHighlights();
                        gameState.selectedUnit = null;
                        return;
                    }
                    realCost = 0;
                }
                if (curE >= realCost) {
                    if (gameState.currentTurn === 'red') gameState.redEnergy -= realCost;
                    else gameState.blueEnergy -= realCost;
                    updateEnergyDisplay();
                    // 累计能量消耗:天鹰火炮开启条件
                    gameState.energySpent[gameState.currentTurn] = (gameState.energySpent[gameState.currentTurn] || 0) + realCost;
                    checkEagleArtillery();
                    castSpell(card, row, col);
                    if (realCost === 0) gameState._fateFreeUsed = (gameState._fateFreeUsed || 0) + 1;
                }
            }
        }
        gameState._spellCasting = null;
        // 选目标类法术(导弹选敌/滚石选敌/查克拉选择)保留标记不清高亮
        if (!gameState._missileTargeting && !gameState._rollingStoneTargeting && !gameState._chakraTargeting) {
            clearHighlights();
        }
        gameState.selectedUnit = null;
        return;
    }

    // 部署弹框开着时点击棋盘:先关闭(不清选中,让本次点击继续处理--双击可正常触发技能)
    if (!deployModal.classList.contains('hidden')) {
        closeDeployModalFunc();
    }

    // 点击可能落在 .unit 等子元素上,用 closest 向上找到 .cell
    const cell = e.target.closest('.cell');
    if (!cell) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // 导弹发射选敌模式:点击攻击力≥5的敌人直接消灭
    if (gameState._missileTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.currentTurn && !tU.ghost && (tU.attack || 0) >= 5 && cell.classList.contains('tank-target')) {
            missileKill(tU);
        } else {
            gameState._missileTargeting = false;
            clearHighlights();
        }
        return;
    }
    // 滚石选敌模式:点击攻击力≤2的敌人直接消灭
    if (gameState._rollingStoneTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.currentTurn && !tU.ghost && (tU.attack || 0) <= 2 && cell.classList.contains('tank-target')) {
            rollingStoneKill(tU);
        } else {
            gameState._rollingStoneTargeting = false;
            clearHighlights();
        }
        return;
    }
    // 查克拉选择模式:点击标绿友方单位使用(+2能量)
    if (gameState._chakraTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU.chakraCd && cell.classList.contains('chakra-target')) {
            activateChakra(tU);
        }
        gameState._chakraTargeting = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 死门凯奥义选敌:点击3格内敌人释放奥义
    if (gameState.selectedUnit && gameState.selectedUnit.guyDeathGate && gameState.selectedUnit._guyUltTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.selectedUnit.team && !tU.ghost && cell.classList.contains('tank-target')) {
            if (gameState.selectedUnit._guyUltTargeting === 'night') guyNightGuy(gameState.selectedUnit, tU);
            else guyElephantStomp(gameState.selectedUnit, tU);
        } else {
            gameState.selectedUnit._guyUltTargeting = null;
            clearHighlights();
            gameState.selectedUnit = null;
        }
        return;
    }
    // 神魔降世选点:7格内点击落地(队友/敌人/空格均可)
    if (gameState.selectedUnit && gameState.selectedUnit.lvbu && gameState.selectedUnit._lvbuLanding) {
        if (Math.max(Math.abs(row - gameState.selectedUnit.row), Math.abs(col - gameState.selectedUnit.col)) <= 7 && !isBlueBase(row, col) && !isRedBase(row, col)) {
            lvbuLanding(gameState.selectedUnit, row, col);
        } else {
            gameState.selectedUnit._lvbuLanding = false;
            clearHighlights();
            gameState.selectedUnit = null;
        }
        return;
    }
    // 夺心护目镜:选3个敌方单位变己方(移到 row/col 定义后)
    if (gameState._fatePick) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState._fatePickUnit.team && !tU.ghost && !tU._removing && gameState._fatePick.picked < gameState._fatePick.count) {
            // 变己方 + 移回己方半场随机位置
            tU.team = gameState._fatePickUnit.team;
            const team = tU.team;
            for (let a = 0; a < 30; a++) {
                const r = team === 'red' ? 14 + Math.floor(Math.random() * 14) : Math.floor(Math.random() * 14);
                const c = 4 + Math.floor(Math.random() * 16);
                if (isBlueBase(r, c) || isRedBase(r, c)) continue;
                if (gameState.units.some(u => u.id !== tU.id && u.row === r && u.col === c)) continue;
                const oc = gameState.board[tU.row][tU.col];
                const el = oc.querySelector('.unit');
                if (el) { oc.removeChild(el); gameState.board[r][c].appendChild(el); }
                tU.row = r; tU.col = c;
                break;
            }
            renderUnit(tU);
            gameState._fatePick.picked++;
            if (gameState._fatePick.picked >= gameState._fatePick.count) {
                gameState._fatePick = null;
                gameState._fatePickUnit = null;
            }
            clearHighlights();
            if (gameState._fatePick) fateMindGoggles(gameState._fatePickUnit); // 重新标剩余敌人
            else gameState.selectedUnit = null;
            return;
        }
        gameState._fatePick = null;
        gameState._fatePickUnit = null;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 黑绝技能模式:选择6格内敌人,点其他处取消
    if (gameState.selectedUnit && gameState.selectedUnit.blackZetsu && gameState.selectedUnit._zetsuTargeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost) {
            const d = Math.abs(tCellUnit.row - gameState.selectedUnit.row) + Math.abs(tCellUnit.col - gameState.selectedUnit.col);
            if (d <= 6) {
                zetsuJumpAttack(gameState.selectedUnit, tCellUnit);
                return;
            }
        }
        gameState.selectedUnit._zetsuTargeting = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 石墙守护:选友军模式(全图友军标红)
    if (gameState._stoneWallTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) {
            applyStoneWall(tU);
        }
        gameState._stoneWallTargeting = false;
        gameState._stoneWallCard = null;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 剩饭法术:选友军模式(全图友军标红)
    if (gameState._leftoverTargeting) {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) {
            applyLeftover(tU);
        }
        gameState._leftoverTargeting = false;
        gameState._leftoverCard = null;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 凋零冲撞模式:选择12格内敌人,点其他处取消
    if (gameState.selectedUnit && gameState.selectedUnit.wither && gameState.selectedUnit._witherTargeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost) {
            const dist = Math.max(Math.abs(tCellUnit.row - gameState.selectedUnit.row), Math.abs(tCellUnit.col - gameState.selectedUnit.col));
            if (dist <= 12) {
                witherCharge(gameState.selectedUnit, tCellUnit);
                return;
            }
        }
        gameState.selectedUnit._witherTargeting = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 渔夫拉钩模式:选择11格内敌人(非建筑/非飞行),点其他处取消
    if (gameState.selectedUnit && gameState.selectedUnit.fisherman && gameState.selectedUnit._fisherTargeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost && !tCellUnit.building && !tCellUnit.flying) {
            const dist = Math.max(Math.abs(tCellUnit.row - gameState.selectedUnit.row), Math.abs(tCellUnit.col - gameState.selectedUnit.col));
            if (dist <= 11) {
                fishermanHook(gameState.selectedUnit, tCellUnit);
                return;
            }
        }
        gameState.selectedUnit._fisherTargeting = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 尤格萨隆·混沌统治选敌模式:点击任意敌人变为己方
    if (gameState.selectedUnit && gameState.selectedUnit.yogg && gameState.selectedUnit._yoggChaosTargeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost && !tCellUnit._removing) {
            yoggChaos(gameState.selectedUnit, tCellUnit);
            return;
        }
        gameState.selectedUnit._yoggChaosTargeting = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 治疗精灵:点击10格内任意单位(友方/敌方)跳向目标
    if (gameState.selectedUnit && gameState.selectedUnit.healFairy) {
        const tf = gameState.units.find(u => u.row === row && u.col === col);
        if (tf && tf.id !== gameState.selectedUnit.id) {
            const dd = Math.max(Math.abs(tf.row - gameState.selectedUnit.row), Math.abs(tf.col - gameState.selectedUnit.col));
            if (dd <= 2) {
                healFairyJump(gameState.selectedUnit, tf);
                return;
            }
        }
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 解斑:木龙之术选敌(3×8范围)
    if (gameState.selectedUnit && gameState.selectedUnit.madaraSolve && gameState.selectedUnit._solvePhase === 'dragon') {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.selectedUnit.team && !tU.ghost) {
            const dR = Math.abs(tU.row - gameState.selectedUnit.row), dC = Math.abs(tU.col - gameState.selectedUnit.col);
            if (dR <= 8 && dC <= 1) {
                solveWoodDragon(gameState.selectedUnit, tU);
                return;
            }
        }
        gameState.selectedUnit._solvePhase = null;
        document.querySelectorAll('.dragon-range').forEach(el => el.remove());
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 解斑:终极奥义选敌(6格内)
    if (gameState.selectedUnit && gameState.selectedUnit.madaraSolve && gameState.selectedUnit._solvePhase === 'meteor') {
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.selectedUnit.team && !tU.ghost) {
            const dM = Math.max(Math.abs(tU.row - gameState.selectedUnit.row), Math.abs(tU.col - gameState.selectedUnit.col));
            if (dM <= 6) {
                solveUltimateAttack(gameState.selectedUnit, tU);
                return;
            }
        }
        gameState.selectedUnit._solvePhase = null;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 点击镜的分身:互换位置
    const cloneOwner = gameState.units.find(u => u.mirror && u._mirrorClone && u._mirrorClone.row === row && u._mirrorClone.col === col);
    if (cloneOwner) {
        mirrorSwapWithClone(cloneOwner);
        return;
    }
    // 镜技能:换位阶段--直接点击定身敌人即可换位(无需先选中镜本体)
    const activeMirror = gameState.units.find(u => u.mirror && u._mirrorSkillTargetId);
    if (activeMirror) {
        const tgt = gameState.units.find(u => u.id === activeMirror._mirrorSkillTargetId);
        if (tgt && tgt.row === row && tgt.col === col && !tgt._removing && !tgt.ghost) {
            mirrorSwapOnce(activeMirror);
            return;
        }
    }
    // 镜技能:选敌阶段点击敌人(4格内)
    if (gameState.selectedUnit && gameState.selectedUnit.mirror && gameState.selectedUnit._mirrorSkillMode) {
        const tCellUnit2 = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit2 && tCellUnit2.team !== gameState.selectedUnit.team && !tCellUnit2.ghost) {
            const dd = Math.max(Math.abs(tCellUnit2.row - gameState.selectedUnit.row), Math.abs(tCellUnit2.col - gameState.selectedUnit.col));
            if (dd <= 4) {
                mirrorSkillStart(gameState.selectedUnit, tCellUnit2);
                return;
            }
        }
        gameState.selectedUnit._mirrorSkillMode = false;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 天鹰火炮攻击:点击标红敌人直接开炮(不需双击;开启且本回合次数未用完)
    if (gameState.selectedUnit && gameState.selectedUnit.eagleArtillery && gameState.selectedUnit._eagleActive && (gameState.selectedUnit._eagleAttacks || 0) < 3) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost && cell.classList.contains('tank-target')) {
            eagleArtilleryAttack(gameState.selectedUnit, tCellUnit);
            return;
        }
    }
    // 战车攻击模式:选择导弹目标(标红敌人),点其他处取消
    if (gameState.selectedUnit && gameState.selectedUnit.tank && gameState.selectedUnit._targeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost) {
            markMissileTarget(gameState.selectedUnit, tCellUnit);
        } else {
            gameState.selectedUnit._targeting = false;
            clearHighlights();
            gameState.selectedUnit = null;
        }
        return;
    }
    // 天鹰火炮攻击模式:点击标红敌人开炮
    if (gameState.selectedUnit && gameState.selectedUnit.eagleArtillery && gameState.selectedUnit._eagleTargeting) {
        const tCellUnit = gameState.units.find(u => u.row === row && u.col === col);
        if (tCellUnit && tCellUnit.team !== gameState.selectedUnit.team && !tCellUnit.ghost) {
            eagleArtilleryAttack(gameState.selectedUnit, tCellUnit);
        } else {
            gameState.selectedUnit._eagleTargeting = false;
            clearHighlights();
            gameState.selectedUnit = null;
        }
        return;
    }

    // 部署模式(已选择卡牌后,再次点击格子部署--作为备用入口)
    if (gameState.deployMode && gameState.deployPosition !== null) {
        // 检查是否可部署(矿工/法术卡全图可部署)
        const card = gameState.battleDeck[gameState.deployPosition];
        const isMiner = card && (card.miner || card.spell);
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
            if (!unitAtPos || card.spell) {
                deployUnit(row, col);
                closeDeployModalFunc();
                return;
            }
        }
        // 无法部署(有单位挡着等):清残留但不 return--继续走正常点击逻辑(选中/双击技能)
        gameState.deployMode = false;
        gameState.deployPosition = null;
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
        // 额外检查:目标是否在敌方烟雾中
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
        if (clickedUnit.frozen || clickedUnit.galeReviving) {
            // 解斑:冰冻/树缠时可双击开启特殊须佐(不耗能,一局一次)
            if (clickedUnit.madaraSolve && !clickedUnit._susanooActive && (clickedUnit.frozen || clickedUnit.treeBound) && !clickedUnit._solveSpecialUsed) {
                if (clickedUnit === gameState.selectedUnit) {
                    solveActivateSusanoo(clickedUnit, true);
                    return;
                }
                // 第一次点击:仅选中(等待第二次点击触发)
                gameState.selectedUnit = clickedUnit;
                showActionMode(clickedUnit);
                return;
            }
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
        // 黑绝:选中黑绝后点击2格内队友 → 直接附身(不弹部署框)
        if (gameState.selectedUnit && gameState.selectedUnit.blackZetsu && !gameState.selectedUnit._possessed && gameState.selectedUnit.team === gameState.currentTurn) {
            const tU = gameState.units.find(u => u.row === row && u.col === col);
            if (tU && tU.team === gameState.currentTurn && tU.id !== gameState.selectedUnit.id && !tU._possessed && !tU.blackZetsu) {
                const d = Math.max(Math.abs(tU.row - gameState.selectedUnit.row), Math.abs(tU.col - gameState.selectedUnit.col));
                if (d <= 2) {
                    possessUnit(gameState.selectedUnit, tU);
                    // 黑绝本体消失(已附身;队友死亡时黑绝会回归)
                    const zEl = gameState.board[gameState.selectedUnit.row][gameState.selectedUnit.col].querySelector('.unit');
                    if (zEl) zEl.remove();
                    gameState.units = gameState.units.filter(u => u.id !== gameState.selectedUnit.id);
                    gameState.selectedUnit = null;
                    clearHighlights();
                    return;
                }
            }
        }
        // 冰冻/定身单位双击不能使用技能和查克拉
        if (clickedUnit.frozen || clickedUnit.stunned) {
            clearHighlights();
            gameState.selectedUnit = clickedUnit;
            showActionMode(clickedUnit);
            return;
        }
        // Pain 能力激活:再次点击已选中的 Pain
        if (clickedUnit.shinraRange && clickedUnit === gameState.selectedUnit) {
            activatePainAbility(clickedUnit);
            return;
        }
        // 解斑:双击技能(能量/须佐/木龙/火遁/特殊须佐)
        if (clickedUnit.madaraSolve && clickedUnit === gameState.selectedUnit) {
            activateSolveAbility(clickedUnit);
            return;
        }
        // 马斑天下无双:4格能量+再次点击
        if (clickedUnit.madaraMaxEnergy && clickedUnit === gameState.selectedUnit && (clickedUnit.madaraEnergy||0) >= 4) {
            activateMusou(clickedUnit);
            return;
        }
        // 铠大招:双击激活不灭魔躯(冷却结束且未激活时可用)
        if (clickedUnit.kaiShurikenRange && clickedUnit === gameState.selectedUnit && !clickedUnit.kaiUltActive && (clickedUnit.kaiUltCooldown||0) === 0) {
            activateKaiUlt(clickedUnit);
            return;
        }
        // 厂长双击召唤木炭
        if (clickedUnit.percentAttack && clickedUnit === gameState.selectedUnit && (clickedUnit.charcoalCount||0) < (clickedUnit.charcoalMax||2)) {
            summonCharcoal(clickedUnit);
            return;
        }
        // 毁灭菇:己方回合双击引爆(7×7爆炸+留弹坑)
        if (clickedUnit.doomShroom && clickedUnit === gameState.selectedUnit && !clickedUnit._doomExploded) {
            doomShroomExplode(clickedUnit);
            return;
        }
        // 精英骑士:双击释放技能(7×7金色法阵嘲讽+3伤护盾,冷却2个己方回合)
        if (clickedUnit.eliteKnight && clickedUnit === gameState.selectedUnit && !clickedUnit._tauntSkillCd) {
            activateEliteKnightSkill(clickedUnit);
            return;
        }
        // 渔夫:双击进入拉钩模式(11格内非建筑非飞行敌人)
        if (clickedUnit.fisherman && clickedUnit === gameState.selectedUnit && !clickedUnit._fisherTargeting) {
            clickedUnit._fisherTargeting = true;
            enterFisherTargetMode(clickedUnit);
            return;
        }
        // 尤格萨隆:双击弹技能框(每回合限用1个技能;三个都用完后不再弹,只能普攻)
        if (clickedUnit.yogg && clickedUnit === gameState.selectedUnit && !clickedUnit._yoggSkillUsedThisTurn && ((clickedUnit._yoggSkill1Used||0) + (clickedUnit._yoggSkill2Used||0) + (clickedUnit._yoggSkill3Used||0) < 3)) {
            openYoggSkillModal(clickedUnit);
            return;
        }
        // 吕布:双击弹技能栏(三技能每回合各一次,用完仍可普攻)
        if (clickedUnit.lvbu && clickedUnit === gameState.selectedUnit) {
            openLvbuSkillModal(clickedUnit);
            return;
        }
        // 迈特凯·死门:双击释放奥义(3格内有敌人;爆衣+4能量弹技能框)
        if (clickedUnit.guyDeathGate && clickedUnit === gameState.selectedUnit) {
            if (guyDoubleClick(clickedUnit)) return;
        }
        // 疾风双击紧急回避
        if (clickedUnit._isGale && clickedUnit === gameState.selectedUnit && !clickedUnit.galeSkillActive && (clickedUnit.galeSkillCD||0) === 0) {
            activateGaleSkill(clickedUnit);
            return;
        }
        // 条子双击召唤警察
        if (clickedUnit.copSpawn && clickedUnit === gameState.selectedUnit) {
            spawnCops(clickedUnit);
            return;
        }
        // 艾琳技能:计数≥6双击激活
        if (clickedUnit.erin && clickedUnit === gameState.selectedUnit && !clickedUnit.erinSkillActive && (clickedUnit.erinCount||0) >= 6) {
            activateErinSkill(clickedUnit);
            return;
        }
        // 千手柱间技能:能量≥4双击(火之意志)
        if (clickedUnit.hashirama && clickedUnit === gameState.selectedUnit && (clickedUnit.hashiEnergy||0) >= 4) {
            activateHashiramaSkill(clickedUnit);
            return;
        }
        // 镜:双击开启镜像法阵(4格内有敌人)
        if (clickedUnit.mirror && clickedUnit === gameState.selectedUnit && !clickedUnit._mirrorSkillCd && !clickedUnit._mirrorSkillMode && !clickedUnit._mirrorSkillTargetId) {
            const hasEnemy4 = gameState.units.some(e => e.team !== clickedUnit.team && !e.ghost && Math.max(Math.abs(e.row - clickedUnit.row), Math.abs(e.col - clickedUnit.col)) <= 4);
            if (hasEnemy4) {
                clickedUnit._mirrorSkillMode = true;
                enterMirrorSkillMode(clickedUnit);
                return;
            } else if (!clickedUnit._mirrorSkillCd) {
                showHeroDeployText(clickedUnit, '4格内无敌人', '#888888', 1000);
            }
        }
        // 精英冰人:双击制造冰场(5×5,随自身移动)
        if (clickedUnit.eliteIce && clickedUnit === gameState.selectedUnit && !clickedUnit._iceSkillActive) {
            activateEliteIceSkill(clickedUnit);
            return;
        }
        // 天鹰火炮:双击进入攻击模式(开启且本回合次数未用完)
        if (clickedUnit.eagleArtillery && clickedUnit === gameState.selectedUnit && clickedUnit._eagleActive && (clickedUnit._eagleAttacks || 0) < 3) {
            enterEagleTargetMode(clickedUnit);
            return;
        }
        // 黑绝技能:双击进入跳跃爆炸模式(6格,一回合一次)
        if (clickedUnit.blackZetsu && clickedUnit === gameState.selectedUnit && !clickedUnit._zetsuSkillUsed && !clickedUnit._zetsuTargeting) {
            clickedUnit._zetsuTargeting = true;
            enterZetsuSkillMode(clickedUnit);
            return;
        }
        // 凋零:半血以下双击进入冲撞模式(12格)
        if (clickedUnit.wither && clickedUnit === gameState.selectedUnit && (clickedUnit.currentHp || 0) <= (clickedUnit.maxHp || 8) / 2 && !clickedUnit._witherCharged && !clickedUnit._witherTargeting) {
            clickedUnit._witherTargeting = true;
            enterWitherChargeMode(clickedUnit);
            return;
        }
        // 战车双击:进入攻击模式(全图标红选导弹目标,不显示字)
        if (clickedUnit.tank && clickedUnit === gameState.selectedUnit && !clickedUnit._targeting) {
            clickedUnit._targeting = true;
            enterTankTargetMode(clickedUnit);
            return;
        }
        clearHighlights();
        gameState.selectedUnit = clickedUnit;
        showActionMode(clickedUnit);
        return;
    }

    // 点击空白格子进入部署模式(手牌有法术卡时,有单位的格子也可施放法术)
    const hasUnit = gameState.units.some(u => u.row === row && u.col === col);
    const hasSpellCard = gameState.battleDeck.some(c => c.spell);
    if (!hasUnit || (hasUnit && hasSpellCard)) {
        // 检查是否可部署(矿工/法术卡全图可部署,除大本营12格)
        const hasMiner = gameState.battleDeck.some(c => c.miner);
        const hasSpell = gameState.battleDeck.some(c => c.spell);
        let isInOwnZone;
        if (hasMiner || hasSpell) {
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
    // 冰冻/定身无法行动
    if (unit.frozen || unit.stunned) return;

    // 天鹰火炮:未开启不显示任何攻击目标;开启后单击显示可攻击目标(全图、自身5×5盲区外)
    if (unit.eagleArtillery) {
        if (unit._eagleActive && (unit._eagleAttacks || 0) < 3) {
            gameState.units.forEach(u => {
                if (u.team === unit.team || u.ghost || u._removing) return;
                if (Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col)) <= 2) return;
                gameState.board[u.row][u.col].classList.add('tank-target');
            });
        }
        return;
    }
    // 疯狂大炮:每回合可直接攻击一次大本营(不消耗普攻),基地始终高亮(无论普攻是否已用)
    if (unit.crazyCannon && !unit._ccBaseAttacked) {
        for (let r = 0; r < BOARD_ROWS; r++) {
            for (let c = 0; c < BOARD_COLS; c++) {
                if (unit.team === 'red' && isBlueBase(r, c)) gameState.board[r][c].classList.add('attackable');
                if (unit.team === 'blue' && isRedBase(r, c)) gameState.board[r][c].classList.add('attackable');
            }
        }
    }
    // 显示可移动范围(只要还有剩余移动点数;被巡视者咬住无法移动)
    const used = gameState.moveUsed[unit.id] || 0;
    if (used < unit.moveRange && !unit.grabbed) {
        showMovableRange(unit);
    }
    // 黑绝:2格内队友标记为可附身目标
    if (unit.blackZetsu && !unit._possessed) {
        gameState.units.forEach(u => {
            if (u.team === unit.team && u.id !== unit.id && !u._possessed && !u.blackZetsu && Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col)) <= 2) {
                gameState.board[u.row][u.col].classList.add('ally-target');
            }
        });
    }

    // 显示可攻击目标(尤格萨隆:三个技能用完才能普攻)
    if (unit.yogg && ((unit._yoggSkill1Used||0) + (unit._yoggSkill2Used||0) + (unit._yoggSkill3Used||0) < 3)) {
        // 技能未用完:不显示攻击
    } else if (!gameState.attackedUnits.has(unit.id) || (unit.tankSpawn && (unit.demuAttacksUsed||0) < (unit.demuBonusAttacks||0)) || (unit.erin && (unit.erinSkillActive ? (unit.erinSkillAttacks||0) > 0 : (unit.erinAttacksUsed||0) < 2)) || (unit.blowdart && (unit.blowdartAttacksUsed||0) < 2) || (unit.hashirama && (unit.hashiAttacksUsed||0) < 2)) {
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

// 风阵移动修正:友军+4,敌军-3
function getWindMoveMod(unit) {
    var mod = 0;
    gameState.windZones.forEach(z => {
        if (Math.max(Math.abs(unit.row - z.row), Math.abs(unit.col - z.col)) <= 2) {
            if (z.team === unit.team) mod = Math.max(mod, 4);
            else mod = Math.min(mod, -3);
        }
    });
    return mod;
}

// 显示可移动范围
function showMovableRange(unit) {
    // 警车:警察下车时不可移动
    if (unit.copSpawn && unit.copsSpawned) return;
    const { row, col, moveRange } = unit;
    const used = gameState.moveUsed[unit.id] || 0;
    let remaining = moveRange - used + getWindMoveMod(unit) + (unit.erinMoveBonus||0) + (unit._rageMove||0) + (unit._healMove||0);
    if (remaining <= 0) return;
    // 循环边界用最大可达距离(防止加成后的移动范围被基础值截断)
    const maxReach = Math.max(moveRange, remaining);
    for (let dr = -maxReach; dr <= maxReach; dr++) {
        for (let dc = -maxReach; dc <= maxReach; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isValidPosition(newRow, newCol)) {
                // 曼哈顿距离
                const distance = Math.abs(dr) + Math.abs(dc);
                if (distance > 0 && distance <= remaining) {
                    const cell = gameState.board[newRow][newCol];
                    // 检查是否有其他单位
                    const hasUnit = gameState.units.some(u => u.row === newRow && u.col === newCol);
                    // 检查是否是大本营(双方大本营均不可进入)
                    const isBase = isBlueBase(newRow, newCol) || isRedBase(newRow, newCol);
                    if (!hasUnit && !isBase) {
                        if (unit.tank) { var master = gameState.units.find(function(u) { return u.id === unit.tankMaster; }); if (!master) return; var td = Math.max(Math.abs(newRow - master.row), Math.abs(newCol - master.col)); if (td > 4) continue; }
                        cell.classList.add('movable');
                    }
                }
            }
        }
    }
}

// 对空判定:飞行单位恒可对空;白名单含植物人(骷髅军团不在白名单,不能对空)
function canHitAirUnit(unit) {
    if (unit.flying) return true;
    return ['musketeer','saeed','warden_gherros','cattail','electric_pea','reynolds','reynolds_jackson','pain_tendo','lightning_dragon','asala_flamer','gale','demulan','hashirama','doom_shroom','crazy_cannon','yogg','yogg_saron','yogg_fate','guy_death_gate'].includes(unit.cardId);
}

// 显示可攻击目标
function showAttackableTargets(unit) {
    const { row, col } = unit;
    const attackRange = unit.superKnight ? 5 : (unit.hashirama ? ((unit.hashiAttacksUsed||0) === 0 ? 3 : 4) : unit.attackRange);
    // 嘲讽:法阵内敌方单位只能攻击精英骑士
    const taunter = getTaunter(unit);
    if (taunter) {
        if (Math.max(Math.abs(taunter.row - unit.row), Math.abs(taunter.col - unit.col)) <= attackRange) {
            gameState.board[taunter.row][taunter.col].classList.add('attackable');
        }
        return;
    }
    // 治疗精灵:可跳向2格内任意单位(队友或敌人,需走到目标旁)
    if (unit.healFairy) {
        gameState.units.forEach(u => {
            if (u.id === unit.id) return;
            if (Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col)) <= 2) {
                gameState.board[u.row][u.col].classList.add('attackable');
            }
        });
        return;
    }

    for (let dr = -attackRange; dr <= attackRange; dr++) {
        for (let dc = -attackRange; dc <= attackRange; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (isValidPosition(newRow, newCol)) {
                const distance = Math.abs(dr) + Math.abs(dc);
                if (distance > 0 && distance <= attackRange) {
                    const targetUnit = gameState.units.find(u => u.row === newRow && u.col === newCol);
                    // 隐藏中的巡视者(已咬住、图标消失)不可作为攻击目标
                    if (targetUnit && targetUnit.patroller && targetUnit._grabbing) continue;
                    // 野猪骑士:只能攻击建筑单位
                    if (unit.hogRider && targetUnit && !targetUnit.building) continue;
                    if (targetUnit && targetUnit.team !== unit.team && !targetUnit.ghost && !targetUnit.teslaHidden) {
                        // 空军只能被特定兵种攻击
                        if (targetUnit.flying) {
                            if (!canHitAirUnit(unit)) continue;
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

                    // 检查大本营(被巡视者咬住只能攻击敌人,不能打基地)
                    if (unit.team === 'red' && isBlueBase(newRow, newCol) && !unit.inMusou && !unit.grabbed) {
                        const cell = gameState.board[newRow][newCol];
                        cell.classList.add('attackable');
                    }
                    if (unit.team === 'blue' && isRedBase(newRow, newCol) && !unit.inMusou && !unit.grabbed) {
                        const cell = gameState.board[newRow][newCol];
                        cell.classList.add('attackable');
                    }
                }
            }
        }
    }
}

// 部署单位
// 中毒特效显示(绿/紫/红)
function updatePoisonVisual(unit) {
    const cell = gameState.board[unit.row][unit.col];
    const existing = cell.querySelector('.poison-badge');
    if (existing) existing.remove();
    if (unit.poisonTurns > 0 && unit.poisonLevel) {
        const badge = document.createElement('div');
        badge.className = 'poison-badge poison-lv' + unit.poisonLevel;
        badge.textContent = unit.poisonLevel === 1 ? '💚' : (unit.poisonLevel === 2 ? '💜' : '❤️');
        cell.appendChild(badge);
    }
}

// 艾琳:黄子弹特效
function showErinBullet(attacker, target) {
    const board = document.getElementById('gameBoard');
    const bullet = document.createElement('div');
    bullet.className = 'erin-bullet';
    bullet.style.left = (attacker.col * cellW + cellW/2) + 'px';
    bullet.style.top = (attacker.row * cellH + cellH/2) + 'px';
    board.appendChild(bullet);
    requestAnimationFrame(() => {
        bullet.style.left = (target.col * cellW + cellW/2) + 'px';
        bullet.style.top = (target.row * cellH + cellH/2) + 'px';
    });
    setTimeout(() => { if (bullet.parentNode) bullet.parentNode.removeChild(bullet); }, 400);
}

// 艾琳:黄圈(3×3边框8格)
function createErinRing(attacker, target) {
    gameState.erinRings.push({ row: target.row, col: target.col, team: attacker.team, turns: 2 });
    renderErinRings();
}
function renderErinRings() {
    document.querySelectorAll('.erin-ring').forEach(c => c.remove());
    gameState.erinRings.forEach(r => {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r.row + dr, nc = r.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const cover = document.createElement('div');
                cover.className = 'erin-ring';
                gameState.board[nr][nc].appendChild(cover);
            }
        }
    });
}

// 艾琳:普通攻击后撤2格
function erinRetreat(unit) {
    const dir = unit.team === 'red' ? 1 : -1;
    let targetRow = unit.row + dir * 2;
    const canStand = (r) => isValidPosition(r, unit.col) && !gameState.units.some(u => u.row === r && u.col === unit.col) && !isBlueBase(r, unit.col) && !isRedBase(r, unit.col);
    if (!canStand(targetRow)) targetRow = unit.row + dir;
    if (canStand(targetRow) && targetRow !== unit.row) {
        const oldCell = gameState.board[unit.row][unit.col];
        const newCell = gameState.board[targetRow][unit.col];
        const el = oldCell.querySelector('.unit');
        if (el) { oldCell.removeChild(el); newCell.appendChild(el); }
        unit.row = targetRow;
    }
}

// 艾琳:计数显示
function updateErinCounter(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.erin-counter');
    if (el) el.textContent = (unit.erinCount||0) + (unit.erinShield > 0 ? ' 🛡' + unit.erinShield : '');
}

// 艾琳:技能激活
function activateErinSkill(unit) {
    unit.erinSkillActive = true;
    unit.erinSkillAttacks = unit.erinCount || 6;
    unit.attackRange = 8;
    unit.moveRange = 10;
    showHeroDeployText(unit, '锁定目标!', '#f1c40f', 1500);
}
// 艾琳:技能结束(次数用完,数字清零)
function endErinSkill(unit) {
    unit.erinSkillActive = false;
    unit.attackRange = 5;
    unit.moveRange = 6;
    unit.erinSkillAttacks = 0;
    unit.erinCount = 0;
    unit.erinAttacksUsed = 2;
    updateErinCounter(unit);
}

// 千手柱间:暴击掷骰(50%几率伤害翻倍)
function rollCrit(attacker, baseDamage) {
    // 克罗格削弱:攻击力被降为1的敌人,技能每段伤害只能造成1点
    if (attacker._crogDebuffed) return 1;
    // 狂暴法术:技能每段伤害+2
    if (attacker._rageAttack) baseDamage += attacker._rageAttack;
    // 剩饭:技能每段伤害+1(永久)
    if (attacker._leftoverBuff) baseDamage += attacker._leftoverBuff;
    if (attacker.critChance && Math.random() < attacker.critChance) {
        showCritText(attacker.row, attacker.col, '暴击');
        return baseDamage * 2;
    }
    return baseDamage;
}

// 千手柱间:木人之术·金龙(周围3格所有敌人3次×2伤)
function goldenDragonAttack(attacker) {
    const dragonEl = showGoldenDragon(attacker);
    // 3段伤害逐段打出(环绕半径3格)
    for (let hit = 0; hit < 3; hit++) {
        setTimeout(() => {
            const a = gameState.units.find(x => x.id === attacker.id);
            if (!a) return;
            gameState.units.slice().forEach(u => {
                if (u.team === a.team || u._removing || u.ghost) return;
                const dist = Math.max(Math.abs(u.row - a.row), Math.abs(u.col - a.col));
                if (dist <= 3) {
                    u.currentHp -= rollCrit(a, 2);
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
        }, hit * 400);
    }
    // 环绕两圈(1.8s)后向前飞出:前方3×8区域2次×2伤(可暴击)
    setTimeout(() => {
        const a = gameState.units.find(x => x.id === attacker.id);
        if (!a) {
            // 植物人已死:移除残留的金龙特效
            if (dragonEl.parentNode) dragonEl.parentNode.removeChild(dragonEl);
            return;
        }
        flyGoldenDragon(a, dragonEl);
        const dir = a.team === 'red' ? -1 : 1;
        const r0 = dir === -1 ? a.row - 8 : a.row + 1;
        const r1 = dir === -1 ? a.row - 1 : a.row + 8;
        for (let hit = 0; hit < 2; hit++) {
            setTimeout(() => {
                const a2 = gameState.units.find(x => x.id === attacker.id);
                if (!a2) return;
                gameState.units.slice().forEach(u => {
                    if (u.team === a2.team || u._removing || u.ghost) return;
                    if (u.row >= Math.min(r0, r1) && u.row <= Math.max(r0, r1) && u.col >= a2.col - 1 && u.col <= a2.col + 1) {
                        u.currentHp -= rollCrit(a2, 2);
                        updateUnitHp(u);
                        if (u.currentHp <= 0) removeUnit(u);
                    }
                });
            }, hit * 400);
        }
    }, 1800);
}

// 千手柱间:第一次格挡反击(木人+蓝色光柱)
function counterGolem(target, attacker) {
    // 木人现身(攻击者身后)
    const dir = target.team === 'red' ? 1 : -1;
    const gr = attacker.row + dir;
    if (isValidPosition(gr, attacker.col) && !gameState.units.some(u => u.row === gr && u.col === attacker.col)) {
        const golem = document.createElement('div');
        golem.className = 'wood-golem';
        golem.textContent = '木';
        gameState.board[gr][attacker.col].appendChild(golem);
        setTimeout(() => { if (golem.parentNode) golem.parentNode.removeChild(golem); }, 1200);
    }
    // 木人打一下:1伤(可暴击)
    attacker.currentHp -= rollCrit(target, 1);
    updateUnitHp(attacker);
    if (attacker.currentHp <= 0) removeUnit(attacker);
    // 蓝色光柱:3×3两段×2伤(逐段打出)
    showBluePillar(attacker);
    for (let hit = 0; hit < 2; hit++) {
        setTimeout(() => {
            const t = gameState.units.find(x => x.id === target.id);
            if (!t) return;
            const atk2 = gameState.units.find(x => x.id === attacker.id) || attacker;
            gameState.units.slice().forEach(u => {
                if (u.team === t.team || u._removing || u.ghost) return;
                const dist = Math.max(Math.abs(u.row - atk2.row), Math.abs(u.col - atk2.col));
                if (dist <= 1) {
                    u.currentHp -= rollCrit(t, 2);
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
        }, hit * 400);
    }
}

// 千手柱间:第二次格挡反击(大树缠绕+花粉中毒)
function counterPollen(target, attacker) {
    showTreeEffect(attacker);
    showGoldPollen(attacker);
    showHeroDeployText(attacker, '花树界降临', '#8b5a2b', 1200);
    // 与树界降临相同的捆绑效果(棕色光晕,持续2回合)
    attacker.treeBound = true;
    attacker.treeBoundTurns = 2;
    updateTreeVisual(attacker);
    gameState.units.slice().forEach(u => {
        if (u.team === target.team || u._removing) return;
        const dist = Math.max(Math.abs(u.row - attacker.row), Math.abs(u.col - attacker.col));
        if (dist <= 1) {
            u.goblinHitThisTurn = true;
            u.poisonHits = (u.poisonHits || 0) + 1;
            u.poisonLevel = Math.max(u.poisonLevel || 0, 1);
            u.poisonTurns = 3;
            updatePoisonVisual(u);
        }
    });
}

// 千手柱间:技能(火之意志/大佛/神掌)
function activateHashiramaSkill(unit) {
    const golden = (unit.hashiEnergy||0) >= 5;
    const hits = golden ? ((unit.hashiEnergy||0) === 6 ? 5 : 4) : 3;
    showHeroDeployText(unit, '火之意志!!', '#e74c3c', 3000);
    showGodPalm(unit, golden);
    // 前方5×5(不含植物人本体):红方 row-5..row-1,蓝方 row+1..row+5
    const r0 = unit.team === 'red' ? unit.row - 5 : unit.row + 1;
    const r1 = unit.team === 'red' ? unit.row - 1 : unit.row + 5;
    // 神掌多段伤害逐段打出
    for (let hit = 0; hit < hits; hit++) {
        setTimeout(() => {
            const u2 = gameState.units.find(x => x.id === unit.id);
            if (!u2) return;
            gameState.units.slice().forEach(u => {
                if (u.team === u2.team || u._removing || u.ghost) return;
                if (u.row >= r0 && u.row <= r1 && u.col >= u2.col - 2 && u.col <= u2.col + 2) {
                    u.currentHp -= rollCrit(u2, 3);
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
        }, 1500 + hit * 400);
    }
    unit.hashiEnergy = 0;
    renderEnergyBar(unit, gameState.board[unit.row][unit.col].querySelector('.unit'));
}

// 视觉特效
function showGoldenDragon(unit) {
    const board = document.getElementById('gameBoard');
    const d = document.createElement('div');
    d.className = 'golden-dragon';
    d.style.left = (unit.col * cellW + cellW/2 - 50) + 'px';
    d.style.top = (unit.row * cellH + cellH/2 - 41) + 'px';
    board.appendChild(d);
    return d;
}
// 金龙转完后:拉直成一条直线(粗细=圆环粗细不变),直着向前飞出
function flyGoldenDragon(unit, el) {
    if (!el) return;
    const board = document.getElementById('gameBoard');
    const dir = unit.team === 'red' ? -1 : 1;
    const cx = unit.col * cellW + cellW/2;
    const cy = unit.row * cellH + cellH/2;
    // 拉直:圆环展开成一条直线(粗细约8px不变),长度=圆环周长≈260px,从植物人位置向前延伸
    el.style.animation = 'none';
    el.style.borderRadius = '8px';
    el.style.width = '16px';
    el.style.height = '260px';
    el.style.mask = 'none';
    el.style.webkitMask = 'none';
    el.style.background = 'linear-gradient(to top, rgba(255,215,0,0.95) 0%, rgba(255,215,0,0.6) 55%, rgba(255,215,0,0.15) 100%)';
    el.style.left = (cx - 8) + 'px';
    el.style.top = (dir === -1 ? cy - 260 : cy) + 'px';
    el.style.transition = 'top 0.8s ease-out, opacity 0.3s ease-out';
    board.appendChild(el);
    const targetTop = (dir === -1 ? cy - 260 - 8 * cellH : cy + 8 * cellH) + 'px';
    requestAnimationFrame(() => {
        el.style.top = targetTop;
        el.style.opacity = '0';
    });
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 1200);
}

function showBluePillar(attacker) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = attacker.row + dr, nc = attacker.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const p = document.createElement('div');
            p.className = 'blue-pillar';
            gameState.board[nr][nc].appendChild(p);
            setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 1500);
        }
    }
}
// 树界降临:常驻大树缠绕特效(随定身解除而消失)
function updateTreeVisual(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (!el) return;
    if (unit.treeBound) el.classList.add('bound-glow');
    else el.classList.remove('bound-glow');
}

// 金色花粉云雾:3×3范围金色光晕粒子
function showGoldPollen(attacker) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = attacker.row + dr, nc = attacker.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const p = document.createElement('div');
            p.className = 'gold-pollen';
            gameState.board[nr][nc].appendChild(p);
            setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 1500);
        }
    }
}

function showTreeEffect(unit) {
    const t = document.createElement('div');
    t.className = 'tree-effect';
    t.textContent = '🌳';
    gameState.board[unit.row][unit.col].appendChild(t);
    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 1200);
}
function showBuddha(unit, golden) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = unit.row + dr, nc = unit.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const b = document.createElement('div');
            b.className = golden ? 'buddha-gold' : 'buddha-brown';
            b.textContent = golden ? '☸' : '佛';
            gameState.board[nr][nc].appendChild(b);
            setTimeout(() => { if (b.parentNode) b.parentNode.removeChild(b); }, 1600);
        }
    }
}
// 火之意志:前方5×5大手按下,停留3秒
function showGodPalm(unit, golden) {
    const board = document.getElementById('gameBoard');
    const r0 = unit.team === 'red' ? unit.row - 5 : unit.row + 1;
    const hand = document.createElement('div');
    hand.className = golden ? 'god-palm god-palm-gold' : 'god-palm';
    hand.textContent = golden ? '✋' : '✋🏽';
    // 手掌覆盖前方5×5,落到5×5中心
    hand.style.left = ((unit.col - 2) * cellW) + 'px';
    hand.style.top = (r0 * cellH) + 'px';
    hand.style.width = (5 * cellW) + 'px';
    hand.style.height = (5 * cellH) + 'px';
    board.appendChild(hand);
    setTimeout(() => { if (hand.parentNode) hand.parentNode.removeChild(hand); }, 3000);
}

function flashUnitIcon(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (!el) return;
    el.classList.add('block-flash');
    setTimeout(() => el.classList.remove('block-flash'), 500);
}

// 觉醒骷髅海:召唤15骷髅军团(3×5,中间大哥)
function spawnSkullArmy(boss) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = boss.row + dr, nc = boss.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            // 不能溢出到对方半场(红方行≥14,蓝方行≤13),多余的直接消失
            if ((boss.row >= 14) ? nr < 14 : nr >= 14) continue;
            if (gameState.units.some(u => u.row === nr && u.col === nc)) continue;
            const sk = {id:'sk_'+Date.now()+'_'+Math.random(),cardId:'skull_army',name:'骷髅',attack:1,maxHp:1,currentHp:1,moveRange:9,attackRange:1,armor:0,armorPen:0,team:boss.team,row:nr,col:nc,artwork:'skull-soldier',skullSoldier:true,skullBossId:boss.id,ghost:false};
            gameState.units.push(sk);renderUnit(sk);
        }
    }
    // 大哥标记
    boss.skullBoss = true;
    boss.skullShield = true;
    updateSkullShieldVisual(boss);
}

// 阴兵视觉:半透明浅紫
function makeGhostVisual(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) el.classList.add('skull-ghost');
}

// 大哥护盾视觉
function updateSkullShieldVisual(boss) {
    const el = gameState.board[boss.row][boss.col].querySelector('.unit');
    if (!el) return;
    if (boss.skullShield) el.classList.add('skull-shield');
    else el.classList.remove('skull-shield');
}

// 战车攻击模式:全图标红敌人
function enterTankTargetMode(tank) {
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === tank.team || u.ghost) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
}

// 凋零冲撞模式:12格内敌人标红
function enterWitherChargeMode(unit) {
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === unit.team || u.ghost) return;
        const d = Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col));
        if (d <= 12) gameState.board[u.row][u.col].classList.add('tank-target');
    });
}

// 凋零冲撞:图标飞过去(动画非瞬移),造成6伤+凋零,保留普攻
function witherCharge(unit, target) {
    unit._witherTargeting = false;
    unit._witherCharged = true;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    const cell = gameState.board[unit.row][unit.col];
    const el = cell.querySelector('.unit');
    const fromR = unit.row, fromC = unit.col;
    if (!el) {
        unit.row = target.row; unit.col = target.col;
        renderUnit(unit);
        dealWitherChargeDamage(unit, target);
        return;
    }
    cell.removeChild(el);
    el.style.position = 'absolute';
    el.style.transform = 'none';
    el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
    el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
    el.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
    el.style.zIndex = '40';
    el.style.pointerEvents = 'none';
    board.appendChild(el);
    const tx = (target.col * cellW + cellW / 2 - 10) + 'px';
    const ty = (target.row * cellH + cellH / 2 - 10) + 'px';
    requestAnimationFrame(() => {
        el.style.left = tx;
        el.style.top = ty;
    });
    setTimeout(() => {
        dealWitherChargeDamage(unit, target);
        // 落点:目标死亡则占目标格,否则找目标旁最近空位(防重叠)
        let landR = target.row, landC = target.col;
        if (target.currentHp > 0) {
            let found = false;
            for (let rr = 1; rr <= 3 && !found; rr++) {
                for (let dr2 = -rr; dr2 <= rr && !found; dr2++) {
                    for (let dc2 = -rr; dc2 <= rr && !found; dc2++) {
                        if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr) continue;
                        const lr = target.row + dr2, lc = target.col + dc2;
                        if (!isValidPosition(lr, lc)) continue;
                        if (gameState.units.some(u => u.id !== unit.id && u.row === lr && u.col === lc)) continue;
                        if (isBlueBase(lr, lc) || isRedBase(lr, lc)) continue;
                        landR = lr; landC = lc; found = true;
                    }
                }
            }
        }
        unit.row = landR;
        unit.col = landC;
        el.style.cssText = '';
        if (el.parentNode) el.parentNode.removeChild(el);
        const ncell = gameState.board[unit.row][unit.col];
        ncell.appendChild(el);
        renderUnit(unit);
    }, 470);
}

// 冲撞结算:6伤+凋零
function dealWitherChargeDamage(unit, target) {
    if (!target || target._removing || target.ghost) return;
    target.currentHp -= 6;
    updateUnitHp(target);
    
    applyWitherEffect(target, unit);
    if (target.currentHp <= 0) removeUnit(target);
}

// 标记导弹目标(标记格子,非敌人)
function markMissileTarget(tank, enemy) {
    gameState.missileMarks.push({ row: enemy.row, col: enemy.col, team: tank.team, owner: tank.id });
    renderMissileMarks();
    tank._targeting = false;
    clearHighlights();
    gameState.selectedUnit = null;
}

// 黄色烟雾标记特效(3×3)
function renderMissileMarks() {
    document.querySelectorAll('.missile-smoke').forEach(el => el.remove());
    gameState.missileMarks.forEach(m => {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = m.row + dr, nc = m.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const s = document.createElement('div');
                s.className = 'missile-smoke';
                gameState.board[nr][nc].appendChild(s);
            }
        }
    });
}

// 导弹轰炸特效(红色长方体砸下)
function showMissile(m) {
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = m.row + dr, nc = m.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const ms = document.createElement('div');
            ms.className = 'missile-hit';
            gameState.board[nr][nc].appendChild(ms);
            setTimeout(() => { if (ms.parentNode) ms.parentNode.removeChild(ms); }, 900);
        }
    }
}

// 部署生效效果:金卡台词/沙尘暴/召唤类(玩家与AI共用)
function runDeployEffects(unit) {
    // 金卡登场特效
    if (unit.hero) {
        showHeroDeployText(unit, unit.heroDeployText, unit.heroDeployColor, unit.heroDeployDuration);
    }
    // 觉醒超级骑士:部署时对3×3范围敌人造成4伤并击退1格(霸体免疫)
    if (unit.superKnight) {
        gameState.units.slice().forEach(e => {
            if (e.team === unit.team || e.ghost || e._removing) return;
            if (Math.max(Math.abs(e.row - unit.row), Math.abs(e.col - unit.col)) <= 1) {
                e.currentHp -= 4;
                updateUnitHp(e);
                showCritText(e.row, e.col, '震撼');
                if (e.currentHp > 0) {
                    const dr = Math.sign(e.row - unit.row), dc = Math.sign(e.col - unit.col);
                    knockbackUnit(e, dr, dc, 1);
                }
                if (e.currentHp <= 0) removeUnit(e);
            }
        });
    }
    // 雷诺沙尘暴+回血
    if (unit.deployEffect) {
        if (unit.team === 'red') {
            gameState.redBaseHp = Math.min(50, gameState.redBaseHp + 5);
        } else {
            gameState.blueBaseHp = Math.min(50, gameState.blueBaseHp + 5);
        }
        updateBaseHpDisplay();
        const enemyUnits = gameState.units.filter(u => u.id !== unit.id && u.team !== unit.team);
        const fromTop = unit.team === 'red';
        const maxRow = 29;
        enemyUnits.forEach(eu => {
            const progress = fromTop ? (maxRow - eu.row) / maxRow : eu.row / maxRow;
            const delay = 300 + progress * 1800;
            setTimeout(() => {
                const u = gameState.units.find(gu => gu.id === eu.id);
                if (u) removeUnit(u);
            }, delay);
        });
        showSandstorm(unit);
    }
    // 德穆兰战车
    if (unit.tankSpawn) {
        [[0,-1],[0,1]].forEach(function(p) {
            var nr=unit.row+p[0],nc=unit.col+p[1];
            if(!isValidPosition(nr,nc))return;
            if(gameState.units.some(u => u.row === nr && u.col === nc))return;
            var tank={id:"tank_"+Date.now()+"_"+Math.random(),name:"战车",attack:3,maxHp:4,currentHp:4,armor:2,armorPen:1,moveRange:99,attackRange:3,team:unit.team,row:nr,col:nc,artwork:'tank',tank:true,tankMaster:unit.id};
            gameState.units.push(tank);renderUnit(tank);
        });
    }
    if (unit.summon) {
        summonWardenGuards(unit);
    }
    // 雷斯亲卫队
    if (unit.leisiSpawn) {
        summonLeisiGuards(unit);
    }
    // 觉醒骷髅海
    if (unit.skullArmy) {
        spawnSkullArmy(unit);
    }
    // 混乱触须:部署后自动释放一个随机法术(从全部法术池随机;增益对随机队友、伤害对随机敌人)
    if (unit.chaosTentacle) {
        const spells = cardLibrary.filter(c => c.spell);
        if (spells.length > 0) {
            const s = spells[Math.floor(Math.random() * spells.length)];
            setTimeout(() => castRandomSpell(s, unit), 300);
        }
    }
    // 雷诺·杰克逊:登场为大本营回满生命值(50)
    if (unit.reynoldsHeal) {
        if (unit.team === 'red') gameState.redBaseHp = 50;
        else gameState.blueBaseHp = 50;
        updateBaseHpDisplay();
    }
    // 尤格-萨隆:登场时本局每用过1个法术就随机释放1个法术(逐个放;跳过回合时剩余的一次性释放完)
    if (unit.yoggSaron) {
        const count = gameState.spellsCastThisGame || 0;
        if (count > 0) {
            const spells = cardLibrary.filter(c => c.spell);
            if (spells.length > 0) {
                const picks = [];
                for (let i = 0; i < count; i++) picks.push(spells[Math.floor(Math.random() * spells.length)]);
                if (!gameState._saronQueue) gameState._saronQueue = [];
                picks.forEach((s, i) => {
                    gameState._saronQueue.push({ spell: s, unit: unit });
                    setTimeout(() => {
                        const qi = gameState._saronQueue.findIndex(q => q.spell === s && q.unit === unit);
                        if (qi >= 0) gameState._saronQueue.splice(qi, 1);
                        if (!gameState._saronSkip) castRandomSpell(s, unit);
                    }, 400 * (i + 1));
                });
            }
        }
    }
    // 卑劣的脏鼠:登场显示文字 + 随机从敌方牌库召唤一张非法术牌到对方半场
    if (unit.dirtyRat) {
        showHeroDeployText(unit, '我不会说的!', '#000', 2000);
        if (!unit._dirtySummoned) dirtyRatSummon(unit);
    }
    // 尤格-萨隆·命运主宰:打出时若命运之轮进度≥15次,转动命运之轮
    if (unit.yoggFate) {
        if ((gameState._fateWheelProgress || 0) >= 15) {
            setTimeout(() => openFateWheel(unit), 300);
        }
    }
}

// ===== 尤格-萨隆命运之轮 =====
function openFateWheel(unit) {
    const pointer = document.querySelector('.fate-pointer');
    const idx = Math.floor(Math.random() * 6);
    pointer.style.transition = 'none';
    pointer.style.transform = 'rotate(0deg)';
    requestAnimationFrame(() => {
        pointer.style.transition = 'transform 3.2s cubic-bezier(0.15, 0.85, 0.25, 1)';
        // 指针指向第 idx 扇区中心(每扇区60°,扇区0中心在30°)
        const deg = 360 * 5 + (30 + idx * 60);
        pointer.style.transform = 'rotate(' + deg + 'deg)';
    });
    document.getElementById('fateWheelModal').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('fateWheelModal').classList.add('hidden');
        executeFateSkill(unit, idx);
    }, 3400);
}

function executeFateSkill(unit, idx) {
    // 转轮后重置进度:需重新释放15个法术才能再次转动
    gameState._fateWheelProgress = 0;
    switch (idx) {
        case 0: fateHand(unit); break;
        case 1: fateFlesh(unit); break;
        case 2: fateMindGoggles(unit); break;
        case 3: fateBox(unit); break;
        case 4: fateDevour(unit); break;
        case 5: fateScepter(unit); break;
    }
}

// 1. 命运之手:下回合己方法术牌花费为0(仅一回合)
function fateHand(unit) {
    gameState._fateFreeSpells = true;
    showHeroDeployText(unit, '命运之手:法术0费', '#f1c40f', 2000);
}

// 2. 血肉诅咒:从卡牌库随机3个非法术卡下在己方半场(效果保留)
function fateFlesh(unit) {
    const pool = cardLibrary.filter(c => !c.spell && !c.trainingOnly && !c.dirtyRat);
    const team = unit.team;
    for (let i = 0; i < 3; i++) {
        if (!pool.length) break;
        const card = pool[Math.floor(Math.random() * pool.length)];
        for (let a = 0; a < 30; a++) {
            const r = team === 'red' ? 14 + Math.floor(Math.random() * 14) : Math.floor(Math.random() * 14);
            const c = 4 + Math.floor(Math.random() * 16);
            if (isBlueBase(r, c) || isRedBase(r, c)) continue;
            if (gameState.units.some(u => u.row === r && u.col === c)) continue;
            const nu = createUnitFromCard(card, team, r, c);
            gameState.units.push(nu);
            renderUnit(nu);
            runDeployEffects(nu);
            break;
        }
    }
}

// 3. 夺心护目镜:选择3个敌方单位变己方,移回己方半场随机位置
function fateMindGoggles(unit) {
    if (!gameState._fatePick) gameState._fatePick = { count: 3, picked: 0 };
    gameState._fatePickUnit = unit;
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === unit.team || u.ghost || u._removing) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
}

// 4. 神秘魔盒:本局每用过1个法术随机释放1个(增益→队友、伤害→敌人),逐个放,回合结束全放完
function fateBox(unit) {
    const count = gameState.spellsCastThisGame || 0;
    const spells = cardLibrary.filter(c => c.spell);
    if (!spells.length || count <= 0) return;
    const picks = [];
    for (let i = 0; i < count; i++) picks.push(spells[Math.floor(Math.random() * spells.length)]);
    if (!gameState._saronQueue) gameState._saronQueue = [];
    picks.forEach((s, i) => {
        gameState._saronQueue.push({ spell: s, unit: unit });
        setTimeout(() => {
            const qi = gameState._saronQueue.findIndex(q => q.spell === s && q.unit === unit);
            if (qi >= 0) gameState._saronQueue.splice(qi, 1);
            if (!gameState._saronSkip) castRandomSpell(s, unit);
        }, 400 * (i + 1));
    });
}

// 5. 吞噬之饥:吞噬场上所有敌方单位,获得其攻击力和血量
function fateDevour(unit) {
    let atk = 0, hp = 0;
    gameState.units.slice().forEach(e => {
        if (e.team === unit.team || e.ghost || e._removing) return;
        atk += e.attack || 0;
        hp += e.maxHp || 0;
        removeUnit(e);
    });
    unit.attack = (unit.attack || 0) + atk;
    unit.maxHp = (unit.maxHp || 0) + hp;
    unit.currentHp = (unit.currentHp || 0) + hp;
    updateUnitHp(unit);
    renderUnit(unit);
    showHeroDeployText(unit, '吞噬之饥', '#c0392b', 2000);
}

// 6. 燃烧权杖:随机目标(任意单位/大本营)10伤,一次一次直到一方大本营归零
function fateScepter(unit) {
    let stop = false;
    const step = () => {
        if (stop || gameState.gameOver) return;
        const targets = [];
        gameState.units.forEach(u => { if (!u.ghost && !u._removing) targets.push({ type: 'unit', u }); });
        targets.push({ type: 'base', team: 'red' });
        targets.push({ type: 'base', team: 'blue' });
        const t = targets[Math.floor(Math.random() * targets.length)];
        if (t.type === 'unit') {
            t.u.currentHp -= 10;
            updateUnitHp(t.u);
            showCritText(t.u.row, t.u.col, '权杖');
            if (t.u.currentHp <= 0) removeUnit(t.u);
        } else {
            if (t.team === 'red') gameState.redBaseHp -= 10;
            else gameState.blueBaseHp -= 10;
            updateBaseHpDisplay();
            showCritText(1, 15, '权杖');
        }
        if (gameState.redBaseHp <= 0 || gameState.blueBaseHp <= 0) {
            stop = true;
            checkGameOver();
            return;
        }
        setTimeout(step, 600);
    };
    setTimeout(step, 400);
}

// 命运之手:法术0费处理(己方回合法术花费为0)
function dirtyRatSummon(unit) {
    const enemyDeck = gameState.battleDeck.filter(c => !c.spell && !c.trainingOnly && !c.dirtyRat); // 不能召唤脏鼠
    if (!enemyDeck.length) return;
    const card = enemyDeck[Math.floor(Math.random() * enemyDeck.length)];
    const enemyTeam = unit.team === 'red' ? 'blue' : 'red';
    for (let attempt = 0; attempt < 30; attempt++) {
        const r = enemyTeam === 'blue' ? Math.floor(Math.random() * 14) : 14 + Math.floor(Math.random() * 14);
        const c = 4 + Math.floor(Math.random() * 16); // 尽量远离棋盘两边(列4-19)
        if (isBlueBase(r, c) || isRedBase(r, c)) continue;
        if (gameState.units.some(u => u.row === r && u.col === c)) continue;
        const nu = createUnitFromCard(card, enemyTeam, r, c);
        if (nu.dirtyRat) nu._dirtySummoned = true; // 防无限递归
        gameState.units.push(nu);
        renderUnit(nu);
        // 只触发亲卫队(典狱长守卫/雷斯亲卫队/战车)与觉醒骷髅海,其它登场效果(命运转盘/金卡文字/雷诺回血等)不触发
        if (nu.summon) summonWardenGuards(nu);
        if (nu.leisiSpawn) summonLeisiGuards(nu);
        if (nu.skullArmy) spawnSkullArmy(nu);
        if (nu.tankSpawn) {
            [[0,-1],[0,1]].forEach(p => {
                const nr = nu.row + p[0], nc = nu.col + p[1];
                if (!isValidPosition(nr, nc)) return;
                if (gameState.units.some(u => u.row === nr && u.col === nc)) return;
                const tank = { id: 'tank_' + Date.now() + '_' + Math.random(), name: '战车', attack: 3, maxHp: 4, currentHp: 4, armor: 2, armorPen: 1, moveRange: 99, attackRange: 3, team: nu.team, row: nr, col: nc, artwork: 'tank', tank: true, tankMaster: nu.id };
                gameState.units.push(tank);
                renderUnit(tank);
            });
        }
        break;
    }
}

function deployUnit(row, col) {
    if (gameState.deployPosition === null) return;

    const cardIndex = gameState.deployPosition;
    const card = gameState.battleDeck[cardIndex];

    if (!card) return;

    // 法术卡:全图任意格直接施放(不创建单位)
    if (card.spell) {
        const curE = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
        if (curE < card.cost) { alert('能量不足!'); closeDeployModalFunc(); return; }
        if (gameState.currentTurn === 'red') gameState.redEnergy -= card.cost;
        else gameState.blueEnergy -= card.cost;
        updateEnergyDisplay();
        castSpell(card, row, col);
        closeDeployModalFunc();
        return;
    }

    // 训练木偶仅可在训练营模式使用(maxEnergy=500 是训练营专属,AI/联机/其他模式全部拦截)
    if (card.trainingOnly && gameState.maxEnergy < 500) {
        alert('训练木偶仅可在训练营模式中使用');
        closeDeployModalFunc();
        return;
    }

    // 弹坑内不可部署(掘地矿工除外)
    if ((gameState.craters || []).some(c => c.row === row && c.col === col) && !card.miner) {
        alert('弹坑内不可部署!');
        closeDeployModalFunc();
        return;
    }

    // 小喷菇:每回合最多部署2个
    if (card.smallShroom && (gameState.shroomCount[gameState.currentTurn] || 0) >= 2) {
        alert('小喷菇每回合最多部署2个!');
        closeDeployModalFunc();
        return;
    }

    // 非矿工卡不能部署在敌方半场/大本营(法术卡全图)
    if (!card.miner && !card.spell) {
        const isBase = isBlueBase(row, col) || isRedBase(row, col);
        if (isBase) { alert('大本营内不可部署!'); return; }
        if (gameState.currentTurn === 'red' && row <= 13) { alert('矿工以外的卡不能部署在敌方半场!'); return; }
        if (gameState.currentTurn === 'blue' && row >= 14) { alert('矿工以外的卡不能部署在敌方半场!'); return; }
    } else {
        if (isBlueBase(row, col) || isRedBase(row, col)) { alert('大本营内不可部署!'); return; }
    }
    const unitAtPos = gameState.units.find(u => u.row === row && u.col === col);
    if (unitAtPos) {
        alert('该位置已有单位!');
        return;
    }

    // 检查能量(尤格萨隆:每释放一个法术牌减1花费;混乱触须:免费计数内花费为0)
    const currentEnergy = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
    let cardCost = card.cost;
    if (card.yogg) cardCost = getYoggCost();
    if (card.chaosTentacle && gameState._freeTentacles > 0) cardCost = 0;
    if (currentEnergy < cardCost) {
        alert('能量不足!');
        return;
    }

    // 创建单位
    const unit = createUnitFromCard(card, gameState.currentTurn, row, col);

    // 小喷菇部署计数
    if (unit.smallShroom) {
        gameState.shroomCount[gameState.currentTurn] = (gameState.shroomCount[gameState.currentTurn] || 0) + 1;
    }
    // 混乱触须:消耗一次免费次数
    if (card.chaosTentacle && gameState._freeTentacles > 0) gameState._freeTentacles--;
    gameState.units.push(unit);

    // 扣除能量
    if (gameState.currentTurn === 'red') {
        gameState.redEnergy -= cardCost;
        updateEnergyDisplay();
    } else {
        gameState.blueEnergy -= cardCost;
        updateEnergyDisplay();
    }
    // 累计能量消耗:天鹰火炮开启条件(敌方花费40能量)
    gameState.energySpent[gameState.currentTurn] = (gameState.energySpent[gameState.currentTurn] || 0) + cardCost;
    checkEagleArtillery();
    // 导演部署后:法术减费机制回归原价(重新从20起算)
    if (card.yogg) gameState.spellsCastThisGame = 0;

    // 不从出战卡组移除,局内可以无限放置(只要能量够)

    // 关闭部署弹窗
    closeDeployModalFunc();

    // 觉醒皇家卫队:部署为6个横向卫兵(每两个间隔1格),本体不出现
    if (unit.royalGuard) {
        spawnRoyalGuards(unit);
        gameState.units = gameState.units.filter(u => u.id !== unit.id);
        return;
    }

    // 矿工地道特效(延迟渲染)
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

    // 部署生效效果(英雄台词/沙尘暴/召唤类--玩家与AI共用)
    runDeployEffects(unit);
}

// 移动单位
function moveUnit(row, col) {
    if (!gameState.selectedUnit) return;

    const unit = gameState.selectedUnit;
    // 被巡视者咬住:无法移动
    if (unit.grabbed) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    const oldRow = unit.row;
    const oldCol = unit.col;

    // 目的地已被占用则不能移动(防止警车压到警察等重叠)
    // 解斑须佐:目标格被敌人占则先推走(须佐推着敌人走)
    if (unit.madaraSolve && unit._susanooActive) {
        const blocker = gameState.units.find(u => u.row === row && u.col === col && u.id !== unit.id && u.team !== unit.team && !u.ghost && !u._removing);
        if (blocker) {
            const mdr = Math.sign(row - unit.row), mdc = Math.sign(col - unit.col);
            if (mdr !== 0 || mdc !== 0) knockbackUnit(blocker, mdr, mdc, 2);
        }
    }
    if (gameState.units.some(u => u.id !== unit.id && u.row === row && u.col === col)) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }

    // 更新位置
    unit.row = row;
    unit.col = col;

    // 累计已用移动点数(曼哈顿距离),允许分次移动
    const distance = Math.abs(row - oldRow) + Math.abs(col - oldCol);
    gameState.moveUsed[unit.id] = (gameState.moveUsed[unit.id] || 0) + distance;
    unit.lastMoveDist = distance;

    // 艾琳黄圈:出圈/进圈受伤(穿甲1)
    gameState.erinRings.forEach(r => {
        if (r.team === unit.team) return;
        const inOld = Math.max(Math.abs(oldRow - r.row), Math.abs(oldCol - r.col)) <= 1;
        const inNew = Math.max(Math.abs(row - r.row), Math.abs(col - r.col)) <= 1;
        if (inOld !== inNew) {
            unit.currentHp -= 1;
            updateUnitHp(unit);
            showCritText(row, col, '圈');
            if (unit.currentHp <= 0) removeUnit(unit);
        }
    });

    // 更新UI
    const oldCell = gameState.board[oldRow][oldCol];
    const newCell = gameState.board[row][col];

    const unitElement = oldCell.querySelector('.unit');
    if (unitElement) {
        oldCell.removeChild(unitElement);
        newCell.appendChild(unitElement);
    }

    // 镜分身镜像跟随:镜移动 d,分身反向移动 d(保持关于对称中心镜像)
    if (unit.mirror && unit._mirrorClone && unit._mirrorCenter) {
        const c = unit._mirrorCenter;
        const nr = 2 * c.row - unit.row;
        const nc = 2 * c.col - unit.col;
        if (isValidPosition(nr, nc)) {
            unit._mirrorClone.row = nr;
            unit._mirrorClone.col = nc;
            renderMirrorClone(unit);
        }
    }
    // 解斑须佐:移动推前方敌人(沿移动方向,逐格推直到离开须佐3×3)
    if (unit.madaraSolve && unit._susanooActive && unit.lastMoveDist > 0) {
        const mdr = Math.sign(unit.row - oldRow), mdc = Math.sign(unit.col - oldCol);
        gameState.units.slice().forEach(p => {
            if (p.team === unit.team || p.ghost || p._removing) return;
            if (p.row === unit.row && p.col === unit.col) return;
            // 须佐 3×3 内的敌人全部推走(沿移动方向,连锁推开挡路单位,直到离开须佐)
            if (Math.max(Math.abs(p.row - unit.row), Math.abs(p.col - unit.col)) > 1) return;
            for (let i = 1; i <= 3; i++) {
                if (Math.max(Math.abs(p.row - unit.row), Math.abs(p.col - unit.col)) > 1) break;
                if (!susanooPush(p, mdr, mdc)) break;
            }
        });
        // 须佐视觉跟随解斑
        renderSusanooVisual(unit);
    }
    // 精英冰人冰场随自己移动
    if (unit.eliteIce && unit._iceSkillActive) {
        gameState.iceFields.forEach(f => {
            if (f.owner === unit.id) { f.row = unit.row; f.col = unit.col; }
        });
        renderIceFields();
        freezeEnemiesInIce(gameState.iceFields.find(f => f.owner === unit.id));
    }
    // 黑绝显现:附身队友一回合移动超5格(光晕加重,承受伤害)
    if (unit._possessed && unit.zetsu && !unit.zetsu.revealed && (gameState.moveUsed[unit.id] || 0) > 5) {
        unit.zetsu.revealed = true;
        const uel2 = newCell.querySelector('.unit');
        if (uel2) uel2.classList.add('zetsu-revealed');
    }

    // 更新烟雾可见性
    updateSmokeVisibility();

    // 踏入火焰区域
    checkFireZoneBurn(unit);

    // 疾风弹力绳重绘
    if (unit.galeSkillActive && unit.galeAnchor) drawGaleRope(unit);
}

// 攻击单位
function attackUnit(target) {
    if (!gameState.selectedUnit) return;
    // 迈特凯·死门:冲撞攻击(冲过去撞3伤,每回合4次,每撞2次+1能量)
    if (gameState.selectedUnit.guyDeathGate) {
        guyChargeAttack(gameState.selectedUnit, target);
        return;
    }
    // 缩进地底的特斯拉电磁塔不可被攻击
    if (target.teslaHidden) return;
    // 隐藏中的巡视者(已咬住、图标消失)不可被攻击
    if (target.patroller && target._grabbing) return;

    const attacker = gameState.selectedUnit;
    let lastDamage = 0;

    // === 处决:切比雪夫距离 ≤ executionRange 秒杀 ===
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

    // === 闪避机制:被攻击方首次受击时翻滚闪避 ===
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
            // 疾风弹力绳跟随闪避
            if (target.galeSkillActive && target.galeAnchor) drawGaleRope(target);
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

    // 野猪骑士:只能攻击建筑单位(大本营走 attackBase)
    if (attacker.hogRider && !target.building) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }

    // 嘲讽:法阵内敌方单位必须攻击精英骑士
    const taunter = getTaunter(attacker);
    if (taunter && taunter.id !== target.id) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 尤格萨隆:三个技能用完才能普攻
    if (attacker.yogg && ((attacker._yoggSkill1Used||0) + (attacker._yoggSkill2Used||0) + (attacker._yoggSkill3Used||0) < 3)) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 天鹰火炮:未开启不能攻击
    if (attacker.eagleArtillery && !attacker._eagleActive) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }

    // 巡视者:咬住敌人(不造成伤害,持续3回合无法移动)
    if (attacker.patroller && !attacker._grabbing) {
        if (target.grabbed) {
            showHeroDeployText(target, '已被咬住', '#000', 1000);
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
        target.grabbed = { by: attacker.id, turns: 3 };
        attacker._grabbing = true;
        attacker._grabTarget = target.id;
        updateGrabVisual(target);
        // 巡视者咬住后从棋盘移除(图标消失、不再占格;grabbed 记录保留在目标上,3回合后自动清除)
        const pCell = gameState.board[attacker.row][attacker.col];
        const pEl = pCell ? pCell.querySelector('.unit') : null;
        if (pEl) pEl.remove();
        gameState.units = gameState.units.filter(u => u.id !== attacker.id);
        showHeroDeployText(target, '咬住!', '#000', 1200);
        gameState.attackedUnits.add(attacker.id);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }

    // 德穆兰首击:第一次攻击强制敌人剩1血
    if (attacker.firstStrike) {
        if (target.maxHp > 1 && target.currentHp > 1 && !target._firstStruck) {
            target._firstStruck = true;
            target.currentHp = Math.max(1, target.currentHp - attacker.attack);
            updateUnitHp(target);
            // 首击消耗本次攻击机会(德穆兰计入多段攻击次数,有加成则继续可攻击)
            if (attacker.tankSpawn) {
                attacker.demuAttacksUsed = (attacker.demuAttacksUsed || 0) + 1;
                if (attacker.demuAttacksUsed > (attacker.demuBonusAttacks || 0)) {
                    gameState.attackedUnits.add(attacker.id);
                }
            } else {
                gameState.attackedUnits.add(attacker.id);
            }
            attacker.lastMoveDist = 0;
            clearHighlights();
            gameState.selectedUnit = null;
            return;
        }
    }
    // 铠飞镖攻击:固定1伤不暴击,跳过正常伤害
    if (attacker.kaiShurikenRange && attacker.kaiAttacks >= 1) {
        target.currentHp -= 1;
        updateUnitHp(target);
        if (target.currentHp <= 0) removeUnit(target);
        // 不进入正常伤害流程
    } else {
    // 千手柱间:第一击木人之术·金龙,第二击树界降临
    if (attacker.hashirama) {
        if ((attacker.hashiAttacksUsed||0) === 0) {
            attacker.hashiAttacksUsed = 1;
            attacker.hashiEnergy = Math.min(6, (attacker.hashiEnergy||0) + 1);
            renderEnergyBar(attacker, gameState.board[attacker.row][attacker.col].querySelector('.unit'));
            goldenDragonAttack(attacker);
            damage = 0;
        } else {
            damage = rollCrit(attacker, 4);
            attacker.hashiAttacksUsed = 2;
            attacker.hashiEnergy = Math.min(6, (attacker.hashiEnergy||0) + 1);
            renderEnergyBar(attacker, gameState.board[attacker.row][attacker.col].querySelector('.unit'));
            target.stunned = true;
            target.stunnedTurns = 2;
            target.treeBound = true;
            target.treeBoundTurns = 2;
            updateTreeVisual(target);
            showHeroDeployText(target, '树界降临', '#8b5a2b', 1000);
        }
    } else
    // 艾琳特殊攻击(子弹4伤/普攻2伤+后撤/技能3伤)
    if (attacker.erin) {
        if (attacker.erinSkillActive) {
            damage = 3;
            attacker.erinCount = Math.max(0, (attacker.erinCount||0) - 1);
            attacker.erinSkillAttacks = Math.max(0, (attacker.erinSkillAttacks||0) - 1);
            updateErinCounter(attacker);
            if (attacker.erinCount <= 0) endErinSkill(attacker);
        } else if (!(attacker.erinAttacksUsed||0)) {
            damage = 4;
            showErinBullet(attacker, target);
            createErinRing(attacker, target);
            attacker.erinAttacksUsed = 1;
            attacker.erinCount = Math.min(12, (attacker.erinCount||0) + 1);
            updateErinCounter(attacker);
        } else {
            damage = attacker.attack;
            erinRetreat(attacker);
            attacker.erinAttacksUsed = 2;
            attacker.erinCount = Math.min(12, (attacker.erinCount||0) + 1);
            updateErinCounter(attacker);
            attacker.erinMoveBonus = 2;
            attacker.erinBonusPending = true;
        }
    } else
    // 觉醒超级骑士:距离<3普通范围攻击(目标+左右+后方4格,目标倒退4格);距离3-5跃击(4伤+前方2×3击退)
    if (attacker.superKnight) {
        const skDist = Math.max(Math.abs(target.row - attacker.row), Math.abs(target.col - attacker.col));
        if (skDist < 3) {
            const dr = Math.sign(target.row - attacker.row), dc = Math.sign(target.col - attacker.col);
            gameState.units.slice().forEach(u => {
                if (u.team === attacker.team || u.ghost || u._removing) return;
                const isT = u.id === target.id;
                const isSide = u.row === target.row && (u.col === target.col - 1 || u.col === target.col + 1);
                const isBack = u.row === target.row + dr && u.col === target.col + dc;
                if (isT || isSide || isBack) {
                    u.currentHp -= attacker.attack;
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
            // 目标被击飞4格(无视中间障碍,霸体免疫)
            if (target && !target._removing && target.currentHp > 0) flingUnit(target, dr, dc, 4);
            damage = 0;
        } else {
            superKnightLeap(attacker, target);
            damage = 0;
        }
    } else
    // 百分比攻击
    if (attacker.percentAttack) {
        // 第一击扣一半(向上取整),确保两击必杀
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
        // 镜:第二次攻击本体+分身同时攻击(伤害翻倍)
        if (attacker.mirror && attacker._mirrorSecond) damage *= 2;
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
    // 狂暴法术:攻击力+2
    if (attacker._rageAttack) damage += attacker._rageAttack;
    // 吕布:对血量低于50%的敌人额外造成30%伤害
    if (attacker.lvbu && target.currentHp < (target.maxHp || 1) * 0.5) {
        damage = Math.floor(damage * 1.3);
    }

    // 护甲减伤(考虑穿甲)--百分比攻击为真实伤害,无视护甲(保证两击必杀);吕布附魔为真实伤害(无视护甲)
    const effectiveArmor = (attacker.percentAttack || (attacker.lvbu && attacker._enchant)) ? 0 : Math.max(0, (target.armor || 0) - (attacker.armorPen || 0));
    let actualDamage = Math.max(0, damage - effectiveArmor);
    // 皇家卫兵冲锋:本回合移动≥3格 → 伤害翻倍(先翻倍再减护甲)
    if (attacker.royalGuard && (gameState.moveUsed[attacker.id] || 0) >= 3) {
        actualDamage *= 2;
        showCritText(target.row, target.col, '冲锋');
    }
    // 皇家卫兵护盾:先吸收伤害(护盾破后才能伤本体)
    if (target.royalGuard && target.guardShield > 0 && actualDamage > 0) {
        const absorbed = Math.min(target.guardShield, actualDamage);
        target.guardShield -= absorbed;
        actualDamage -= absorbed;
        showHeroDeployText(target, '护盾', '#f1c40f', 800);
        updateGuardShieldVisual(target);
    }
    // 精英骑士技能护盾:抵挡3伤
    if (target.eliteKnight && target._knightShield > 0 && actualDamage > 0) {
        const absorbed = Math.min(target._knightShield, actualDamage);
        target._knightShield -= absorbed;
        actualDamage -= absorbed;
        showCritText(target.row, target.col, '护盾');
        const kel = gameState.board[target.row][target.col].querySelector('.unit');
        if (kel && target._knightShield <= 0) kel.classList.remove('guard-shield');
    }
    // 吕布贪狼护盾:吸收伤害(吕布附魔攻击无视护盾)
    if (target.lvbu && target._lvbuShield > 0 && actualDamage > 0 && !(attacker.lvbu && attacker._enchant)) {
        const absorbed = Math.min(target._lvbuShield, actualDamage);
        target._lvbuShield -= absorbed;
        actualDamage -= absorbed;
        showCritText(target.row, target.col, '护盾');
        const lsel = gameState.board[target.row][target.col].querySelector('.unit');
        if (lsel && target._lvbuShield <= 0) lsel.classList.remove('guard-shield');
    }
    // 护盾法术:吸收4点伤害(可叠加)
    if (target._shieldHp > 0 && actualDamage > 0) {
        const absorbed = Math.min(target._shieldHp, actualDamage);
        target._shieldHp -= absorbed;
        actualDamage -= absorbed;
        showCritText(target.row, target.col, '护盾');
        const sel = gameState.board[target.row][target.col].querySelector('.unit');
        if (sel && target._shieldHp <= 0) sel.classList.remove('guard-shield');
    }
    // 艾琳保命装:护盾先吸收;致命伤害免疫并获得3血护盾(一次性)
    if (target.erin) {
        if (target.erinShield > 0) {
            var absorbed = Math.min(target.erinShield, actualDamage);
            target.erinShield -= absorbed;
            actualDamage -= absorbed;
            showCritText(target.row, target.col, '护盾');
            updateErinCounter(target);
        }
        if (actualDamage > 0 && target.currentHp - actualDamage <= 0 && !target.erinShieldUsed) {
            target.erinShieldUsed = true;
            target.erinShield = 3;
            actualDamage = 0;
            showHeroDeployText(target, '保命装!', '#f1c40f', 1500);
            updateErinCounter(target);
        }
    }
    // 千手柱间格挡:每回合前两次受击格挡并反击
    if (target.hashirama && actualDamage > 0 && (target.hashiBlocksUsed||0) < 2) {
        target.hashiBlocksUsed++;
        target.hashiEnergy = Math.min(6, (target.hashiEnergy||0) + 1);
        renderEnergyBar(target, gameState.board[target.row][target.col].querySelector('.unit'));
        actualDamage = 0;
        flashUnitIcon(target);
        if (target.hashiBlocksUsed === 1) {
            counterGolem(target, attacker);
        } else {
            counterPollen(target, attacker);
        }
    }
    // 骷髅大哥护盾:抵挡一次攻击(任何伤害,抵挡后护盾消失)
    if (target.skullBoss && target.skullShield && actualDamage > 0) {
        target.skullShield = false;
        actualDamage = 0;
        showHeroDeployText(target, '护盾抵挡', '#b39ddb', 1000);
        updateSkullShieldVisual(target);
    }
    // 阴兵无敌:免疫所有伤害
    if (target.ghost) actualDamage = 0;
    // 解斑须佐:无敌(可被选中但不受伤)
    if (target.madaraSolve && target._susanooActive) actualDamage = 0;
    // 解斑:敌方回合受击受伤 → 可双击开特殊须佐
    if (target.madaraSolve && !target._susanooActive && actualDamage > 0 && target.team !== gameState.currentTurn) {
        target._solveCanSpecial = true;
    }
    // 解斑反击:每回合第一次受击 → 火球自动追踪敌人(3×3火焰)→ 释放完后自动开启特殊须佐(一局一次,无需手动)
    if (target.madaraSolve && !target._susanooActive && actualDamage > 0 && !target._solveCountered) {
        target._solveCountered = true;
        solveCounterFire(target, attacker, () => {
            const mm = gameState.units.find(x => x.id === target.id);
            if (mm && !mm._susanooActive && !mm._solveSpecialUsed && !mm._removing) {
                solveActivateSusanoo(mm, true);
            }
        });
    }
    // 黑绝显现:敌方对该队友的攻击由黑绝承受
    if (target._possessed && target.zetsu && target.zetsu.revealed && actualDamage > 0) {
        target.zetsu.currentHp -= actualDamage;
        showCritText(target.row, target.col, '黑绝承受');
        if (target.zetsu.currentHp <= 0) {
            releaseZetsu(target);
            showHeroDeployText(target, '黑绝消亡!', '#000', 1500);
        }
        actualDamage = 0;
    }
    target.currentHp -= actualDamage;
    // 觉醒吹箭哥布林:命中附加中毒(连续命中升级)
    if (attacker.blowdart) {
        target.goblinHitThisTurn = true;
        target.poisonHits = (target.poisonHits || 0) + 1;
        target.poisonLevel = Math.max(target.poisonLevel || 0, target.poisonHits >= 5 ? 3 : (target.poisonHits >= 3 ? 2 : 1));
        target.poisonTurns = 3;
        updatePoisonVisual(target);
    }
    lastDamage = actualDamage;
    // 德穆兰受伤:本回合首次受伤+1次攻击
    if (target.tankSpawn && actualDamage > 0 && !target._demuDamaged) {
        target._demuDamaged = true;
        target.demuBonusAttacks = (target.demuBonusAttacks || 0) + 1;
        showHeroDeployText(target, '一群接着一群,真把这里当金矿了', '#1a1a1a', 2000);
    }

    // 觉醒飞龙宝宝:攻击命中后形成风阵(5×5,持续4回合,不可叠加,攻击可续)
    if (attacker.windForm) {
        gameState.windZones = gameState.windZones.filter(z => z.owner !== attacker.id);
        gameState.windZones.push({ row: attacker.row, col: attacker.col, team: attacker.team, turns: 4, owner: attacker.id });
        renderWindZones();
    }

    // 反击:首次受真实伤害触发
    if (target.counterAttack && !target.counterUsed && actualDamage > 0) {
        target.counterUsed = true;
        attacker.currentHp -= target.counterAttack;
        updateUnitHp(attacker);
        showCritText(attacker.row, attacker.col, '反击');
        // 赛伊德专属:3x3燃烧
        if (target.counterBurn) {
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
            gameState.fireZones.push({ row: attacker.row, col: attacker.col, turns: 3 });
            renderFireZones();
            showCritText(attacker.row, attacker.col, '燃烧');
        }
        if (attacker.currentHp <= 0) removeUnit(attacker);
    }

    // 马斑反击:被1格距离攻击时3×3 AoE反伤+燃烧
    if (target.aoeAttack && !target.madaraCounted) {
        const atkDist = Math.max(Math.abs(attacker.row - target.row), Math.abs(attacker.col - target.col));
        if (atkDist <= 3) {
            // 红色环绕特效
            showCounterFX(target);
            gameState.units.forEach(e => {
                if (e.team === target.team || e.ghost) return;
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

    // 半血触发(仅典狱长/渡鸦等有此特效的单位)
    if (target.maxHp && target.currentHp > 0 && target.currentHp <= target.maxHp / 2 && (target.halfHpText || target.halfHpSmoke)) {
        showHalfHpText(target);
    }

    // 铠双次攻击处理(if 块结束:跳过正常伤害后直接进入)
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
            // 动画+顺序伤害 (跳过主目标,主目标已在普通攻击中受伤)
            animateShuriken(attacker, shurikenTargets);
        }
    }

    // 马斑 AoE:攻击范围内所有敌军 + 施加燃烧 + 能量
    if (attacker.aoeAttack) {
        const aoeR = attacker.attackRange;
        const forward = attacker.team === 'red' ? -1 : 1;
        // 攻击特效:红色箭头
        showMadaraAttackFX(attacker, target);
        gameState.units.forEach(e => {
            if (e.id === target.id || e.team === attacker.team) return;
            if (e.ghost) return;
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

    // 标记已攻击(天下无双/铠双攻期间不限制)
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
    } else if (attacker.superKnight) {
        // 超骑:每回合可攻击两次
        attacker._skAttacks = (attacker._skAttacks || 0) + 1;
        if (attacker._skAttacks >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.mirror && !attacker._mirrorSecond) {
        // 镜:第一次攻击召唤分身,允许第二次(不标记)
        attacker._mirrorSecond = true;
        attacker._mirrorAttacked = true;
        mirrorSummonClone(attacker, target);
    } else if (attacker.mirror) {
        // 镜:第二次攻击后标记
        gameState.attackedUnits.add(attacker.id);
        attacker._mirrorSecond = false;
    } else if (attacker.kaiShurikenRange && attacker.kaiAttacks < 2) {
        // 铠第一击后不标记,允许第二击
    } else if (attacker.tankSpawn) {
        // 德穆兰多段攻击:还有额外次数则不标记
        attacker.demuAttacksUsed = (attacker.demuAttacksUsed || 0) + 1;
        if (attacker.demuAttacksUsed > (attacker.demuBonusAttacks || 0)) {
            gameState.attackedUnits.add(attacker.id);
        }
    } else if (attacker.erin) {
        // 艾琳:技能有剩余次数或普攻未满2次则不标记
        var erinCanContinue = attacker.erinSkillActive ? (attacker.erinSkillAttacks||0) > 0 : (attacker.erinAttacksUsed||0) < 2;
        if (!erinCanContinue) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.blowdart) {
        // 吹箭:每回合可攻击两次
        attacker.blowdartAttacksUsed = (attacker.blowdartAttacksUsed || 0) + 1;
        if (attacker.blowdartAttacksUsed >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.hashirama) {
        // 柱间:两次攻击后标记
        if ((attacker.hashiAttacksUsed||0) >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.galeSkillActive) {
        // 疾风紧急回避装置:期间每回合可攻击2次(第一次不标记)
        attacker._galeAttacks = (attacker._galeAttacks || 0) + 1;
        if (attacker._galeAttacks >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker._frenzy && (target.currentHp <= 0 || target._removing)) {
        // 病毒式传播狂热:一击击杀敌人后可再攻击(连环击杀可连续攻击)
    } else {
        gameState.attackedUnits.add(attacker.id);
    }

    // 更新目标血量显示
    updateUnitHp(target);

    // 检查目标是否死亡
    if (target.currentHp <= 0) {
        // 疾风技能期间复活拉回(带动画)
        if (target.galeSkillActive && target.galeAnchor) {
            const unitEl = gameState.board[target.row][target.col].querySelector('.unit');
            if (unitEl) {
                const dist = Math.max(Math.abs(target.row - target.galeAnchor.row), Math.abs(target.col - target.galeAnchor.col));
                const duration = Math.min(4000, Math.max(200, dist * 200));
                const ax = target.galeAnchor.col * cellW + cellW/2 - 10;
                const ay = target.galeAnchor.row * cellH + cellH/2 - 10;
                const board = document.getElementById('gameBoard');
                const cell = gameState.board[target.row][target.col];
                cell.removeChild(unitEl);
                unitEl.style.position = 'absolute';
                unitEl.style.transform = 'none';
                unitEl.style.left = (target.col * cellW + cellW/2 - 10) + 'px';
                unitEl.style.top = (target.row * cellH + cellH/2 - 10) + 'px';
                unitEl.style.transition = 'all ' + duration + 'ms ease-in';
                unitEl.style.zIndex = '30';
                board.appendChild(unitEl);
                setTimeout(() => {
                    unitEl.style.left = ax + 'px';
                    unitEl.style.top = ay + 'px';
                }, 50);
                // 弹力绳随动画变短
                const steps = 8;
                for (let s = 1; s <= steps; s++) {
                    setTimeout(() => {
                        const t = s / steps;
                        const cr = target.galeAnchor.row + (target.row - target.galeAnchor.row) * (1 - t);
                        const cc = target.galeAnchor.col + (target.col - target.galeAnchor.col) * (1 - t);
                        document.querySelectorAll('.gale-rope').forEach(r => r.remove());
                        const anchor = { row: target.galeAnchor.row, col: target.galeAnchor.col };
                        const pos = { row: cr, col: cc };
                        const board = document.getElementById('gameBoard');
                        const x1 = anchor.col * cellW + cellW/2, y1 = anchor.row * cellH + cellH/2;
                        const x2 = pos.col * cellW + cellW/2, y2 = pos.row * cellH + cellH/2;
                        [0.5, -0.5].forEach(off => {
                            const r = document.createElement('div');
                            r.className = 'gale-rope';
                            const dx = x2 - x1, dy = y2 - y1;
                            const len = Math.sqrt(dx*dx + dy*dy);
                            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                            r.style.left = (x1 + off) + 'px';
                            r.style.top = (y1 + off) + 'px';
                            r.style.width = len + 'px';
                            r.style.transform = 'rotate(' + angle + 'deg)';
                            r.style.transformOrigin = '0 0';
                            board.appendChild(r);
                        });
                    }, 50 + duration * (s / steps));
                }
                setTimeout(() => {
                    target.currentHp = target.maxHp;
                    updateUnitHp(target);
                    // 锚点被占则找最近空位(防重叠)
                    var gr = target.galeAnchor.row, gc = target.galeAnchor.col;
                    if (gameState.units.some(uu => uu.id !== target.id && uu.row === gr && uu.col === gc)) {
                        var placed2 = false;
                        for (var rr = 1; rr <= 6 && !placed2; rr++) {
                            for (var dr2 = -rr; dr2 <= rr && !placed2; dr2++) {
                                for (var dc2 = -rr; dc2 <= rr && !placed2; dc2++) {
                                    if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr) continue;
                                    var nr2 = gr + dr2, nc2 = gc + dc2;
                                    if (!isValidPosition(nr2, nc2)) continue;
                                    if (gameState.units.some(uu => uu.id !== target.id && uu.row === nr2 && uu.col === nc2)) continue;
                                    if (isBlueBase(nr2, nc2) || isRedBase(nr2, nc2)) continue;
                                    gr = nr2; gc = nc2; placed2 = true;
                                }
                            }
                        }
                    }
                    target.row = gr;
                    target.col = gc;
                    const nc = gameState.board[target.row][target.col];
                    unitEl.style.cssText = '';
                    unitEl.parentNode?.removeChild(unitEl);
                    nc.appendChild(unitEl);
                    target.galeSkillActive = false;
                    target.galeReviving = true;
                    target.moveRange -= 10;
                    const el = nc2.querySelector('.unit') || nc.querySelector('.unit');
                    if (el) el.classList.add('reviving');
                    document.querySelectorAll('.gale-rope').forEach(r => r.remove());
                }, duration + 100);
            }
        } else {
            removeUnit(target);
        }
    }

    // 觉醒大皮卡:击杀敌人回复3生命(可超上限,最高12)
    if (target.currentHp <= 0 && attacker.pekkaHeal && !target.galeSkillActive && !target.galeAnchor) {
        attacker.currentHp = Math.min(12, (attacker.currentHp || 0) + 3);
        updateUnitHp(attacker);
        showCritText(attacker.row, attacker.col, '回复');
    }

    // 大雪怪:每受1伤召唤冰雪精灵
    if (target.snowMonster && lastDamage > 0) {
        spawnIceSprites(target, lastDamage);
    }

    // 冰冻效果
    if (attacker.freeze && target.currentHp > 0) {
        if (!isImmuneToFreeze(target)) {
            target.frozen = true;
            updateFrozenVisual(target);
            showCritText(target.row, target.col, '冰冻');
        }
        // 厂长被冻召唤木炭
        if (target.percentAttack && (target.charcoalCount||0) < (target.charcoalMax||2)) {
            summonCharcoal(target);
        }
    }

    // 一次性兵种:攻击后自毁
    if (attacker.oneShot) {
        removeUnit(attacker);
    }

    // 电大直线攻击+闪电链(顺序伤害+线特效)
    if (attacker.lineAttack) {
        attacker.electricHit = [];
        attacker._baseHit = false;
        const forward = attacker.team === 'red' ? -1 : 1;
        let lineTargets = [];
        // 正前方3列扫描(只收集,不立即伤害)
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
        // 闪电链无限传播(距离≤4继续传播;每敌最多被锁定2次;被球击中的敌人不再被链锁定)
        let allChainTargets = [];
        const chainR = attacker.chainRange || 4;
        const lockCount = {};
        const queue = [];
        lineTargets.forEach(lt => { lockCount[lt.id] = 2; queue.push({ u: lt, d: 0 }); });
        while (queue.length > 0) {
            const src = queue.shift();
            gameState.units.forEach(e => {
                if (e.team === attacker.team || e.ghost) return;
                const d = Math.max(Math.abs(e.row - src.u.row), Math.abs(e.col - src.u.col));
                if (d <= chainR && d > 0) {
                    const locked = lockCount[e.id] || 0;
                    if (locked >= 2) return;
                    lockCount[e.id] = locked + 1;
                    attacker.electricHit.push(e.id);
                    allChainTargets.push({ from: src.u, to: e, depth: src.d + 1 });
                    queue.push({ u: e, d: src.d + 1 });
                }
            });
        }
        // 技能:10%概率扇形5闪电球
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
        // 子弹+闪电链特效(顺序伤害)
        showElectricBullet(attacker, lineTargets, allChainTargets);
    }

    // 溅射伤害
    if (attacker.splashRadius) {
        applySplashDamage(target, attacker);
    }

    // 凋零:命中附加黑色毒(每回合1伤,不可叠加)
    if (attacker.wither) {
        applyWitherEffect(target, attacker);
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
    // 马斑无双状态不能攻击大本营
    if (gameState.selectedUnit.inMusou) return;
    // 巡视者无法咬大本营
    if (gameState.selectedUnit.patroller) return;
    // 被巡视者咬住:只能攻击敌人,不能攻击大本营
    if (gameState.selectedUnit.grabbed) return;
    // 疯狂大炮:每回合可直接攻击一次大本营(不消耗普攻标记)
    if (gameState.selectedUnit.crazyCannon) {
        if (gameState.selectedUnit._ccBaseAttacked) return;
        gameState.selectedUnit._ccBaseAttacked = true;
    }

    const attacker = gameState.selectedUnit;

    // 计算攻击距离(取最近的大本营格子)
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

    // 标记已攻击(多段攻击单位也消耗次数,防止无限打大本营)
    if (attacker.tankSpawn) {
        attacker.demuAttacksUsed = (attacker.demuAttacksUsed || 0) + 1;
        if (attacker.demuAttacksUsed > (attacker.demuBonusAttacks || 0)) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.crazyCannon) {
        // 疯狂大炮:打基地不标记,本回合还可普通攻击一次
    } else if (attacker.blowdart) {
        attacker.blowdartAttacksUsed = (attacker.blowdartAttacksUsed || 0) + 1;
        if (attacker.blowdartAttacksUsed >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.hashirama) {
        attacker.hashiAttacksUsed = (attacker.hashiAttacksUsed || 0) + 1;
        if (attacker.hashiAttacksUsed >= 2) gameState.attackedUnits.add(attacker.id);
    } else if (attacker.erin) {
        if (attacker.erinSkillActive) {
            attacker.erinSkillAttacks = (attacker.erinSkillAttacks || 0) - 1;
            if (attacker.erinSkillAttacks <= 0) { attacker.erinSkillActive = false; attacker.attackRange = 5; attacker.moveRange = 6; }
            gameState.attackedUnits.add(attacker.id);
        } else {
            attacker.erinAttacksUsed = (attacker.erinAttacksUsed || 0) + 1;
            if (attacker.erinAttacksUsed >= 2) gameState.attackedUnits.add(attacker.id);
        }
    } else {
        // 疾风紧急回避装置:期间每回合可攻击2次(第一次不标记,可再攻击)
        if (attacker.galeSkillActive) {
            attacker._galeAttacks = (attacker._galeAttacks || 0) + 1;
            if (attacker._galeAttacks < 2) {
                // 第一次:不标记
            } else {
                gameState.attackedUnits.add(attacker.id);
            }
        } else {
            gameState.attackedUnits.add(attacker.id);
        }
    }

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
    winnerText.textContent = gameState.winner === 'red' ? '红方获胜!' : '蓝方获胜!';
    gameOverModal.classList.remove('hidden');
}

// 毁灭菇:以自身为中心 7×7 爆炸(紫色蘑菇云),7伤,自身死亡并留下持续4回合的弹坑
function doomShroomExplode(unit) {
    if (unit._doomExploded) return;
    unit._doomExploded = true;
    showDoomMushroom(unit);
    // 7×7 范围伤害(仅敌方,7伤减护甲)
    gameState.units.slice().forEach(u => {
        if (u.team === unit.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col)) <= 3) {
            const dmg = Math.max(0, 7 - Math.max(0, (u.armor || 0) - (unit.armorPen || 0)));
            u.currentHp -= dmg;
            updateUnitHp(u);
            showCritText(u.row, u.col, '爆炸');
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
    // 留下弹坑(自身位置,持续4回合)
    gameState.craters.push({ row: unit.row, col: unit.col, turns: 4 });
    renderCraters();
    // 自身死亡(_doomExploded 已标记,防递归)
    removeUnit(unit);
}

// 紫色蘑菇云特效(7×7)
function showDoomMushroom(unit) {
    const board = document.getElementById('gameBoard');
    const cloud = document.createElement('div');
    cloud.className = 'doom-mushroom';
    cloud.style.position = 'absolute';
    const w = 7 * cellW, h = 7 * cellH;
    cloud.style.left = ((unit.col - 3) * cellW) + 'px';
    cloud.style.top = ((unit.row - 3) * cellH) + 'px';
    cloud.style.width = w + 'px';
    cloud.style.height = h + 'px';
    board.appendChild(cloud);
    setTimeout(() => { if (cloud.parentNode) cloud.parentNode.removeChild(cloud); }, 1600);
}

// 弹坑渲染(深色坑洞)
function renderCraters() {
    document.querySelectorAll('.crater-cell').forEach(el => el.classList.remove('crater-cell'));
    (gameState.craters || []).forEach(c => {
        if (isValidPosition(c.row, c.col)) gameState.board[c.row][c.col].classList.add('crater-cell');
    });
}

// 被巡视者咬住的视觉:敌人图标右下角小黑点(独立元素,不干扰图标文字)
function updateGrabVisual(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (!el) return;
    let dot = el.querySelector('.grab-dot');
    if (unit.grabbed) {
        if (!dot) {
            dot = document.createElement('div');
            dot.className = 'grab-dot';
            el.appendChild(dot);
        }
    } else if (dot) {
        dot.remove();
    }
}

// 渔夫拉钩模式:11格内敌人标红(非建筑非飞行)
function enterFisherTargetMode(fisher) {
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === fisher.team || u.ghost || u._removing) return;
        if (u.building || u.flying) return; // 不能拉建筑/飞行
        const d = Math.max(Math.abs(u.row - fisher.row), Math.abs(u.col - fisher.col));
        if (d <= 11) gameState.board[u.row][u.col].classList.add('tank-target');
    });
}

// 渔夫拉钩:把敌人拉到渔夫前方一格(使用后仍可普通攻击一次)
function fishermanHook(fisher, target) {
    fisher._fisherTargeting = false;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    const dir = fisher.team === 'red' ? -1 : 1;
    const fromR = target.row, fromC = target.col;
    const fx = fisher.col * cellW + cellW / 2, fy = fisher.row * cellH + cellH / 2;
    const el = gameState.board[fromR][fromC].querySelector('.unit');
    // 落点:渔夫前方一格,被占则找渔夫周围最近空位
    let landR = fisher.row + dir, landC = fisher.col;
    if (gameState.units.some(u => u.id !== target.id && u.row === landR && u.col === landC) || !isValidPosition(landR, landC)) {
        let found = false;
        for (let rr = 1; rr <= 4 && !found; rr++) {
            for (let dr2 = -rr; dr2 <= rr && !found; dr2++) {
                for (let dc2 = -rr; dc2 <= rr && !found; dc2++) {
                    if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr) continue;
                    const lr = fisher.row + dr2, lc = fisher.col + dc2;
                    if (!isValidPosition(lr, lc)) continue;
                    if (gameState.units.some(u => u.id !== target.id && u.row === lr && u.col === lc)) continue;
                    if (isBlueBase(lr, lc) || isRedBase(lr, lc)) continue;
                    landR = lr; landC = lc; found = true;
                }
            }
        }
    }
    // 船锚钩子飞向目标 + 黑绳
    const hook = document.createElement('div');
    hook.className = 'fisher-hook';
    hook.textContent = '⚓';
    hook.style.position = 'absolute';
    hook.style.fontSize = '14px';
    hook.style.zIndex = '45';
    hook.style.pointerEvents = 'none';
    board.appendChild(hook);
    const tx0 = fromC * cellW + cellW / 2, ty0 = fromR * cellH + cellH / 2;
    const steps = 15;
    for (let s = 1; s <= steps; s++) {
        setTimeout(() => {
            const t = s / steps;
            const hx = fx + (tx0 - fx) * t;
            const hy = fy + (ty0 - fy) * t;
            hook.style.left = (hx - 7) + 'px';
            hook.style.top = (hy - 7) + 'px';
            drawFisherRope(fx, fy, hx, hy);
        }, s * 30);
    }
    // 钩子命中后:目标被绳子拉回
    setTimeout(() => {
        if (hook.parentNode) hook.parentNode.removeChild(hook);
        if (!el) {
            target.row = landR;
            target.col = landC;
            renderUnit(target);
            document.querySelectorAll('.fisher-rope').forEach(r => r.remove());
            return;
        }
        const cell = gameState.board[fromR][fromC];
        cell.removeChild(el);
        el.style.position = 'absolute';
        el.style.transform = 'none';
        el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
        el.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
        el.style.zIndex = '40';
        el.style.pointerEvents = 'none';
        board.appendChild(el);
        const lx = landC * cellW + cellW / 2, ly = landR * cellH + cellH / 2;
        const steps2 = 15;
        for (let s = 1; s <= steps2; s++) {
            setTimeout(() => {
                const t = s / steps2;
                const mx = tx0 + (lx - tx0) * t;
                const my = ty0 + (ly - ty0) * t;
                drawFisherRope(fx, fy, mx, my);
            }, s * 30);
        }
        requestAnimationFrame(() => {
            el.style.left = (lx - 10) + 'px';
            el.style.top = (ly - 10) + 'px';
        });
        setTimeout(() => {
            target.row = landR;
            target.col = landC;
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[landR][landC].appendChild(el);
            renderUnit(target);
            document.querySelectorAll('.fisher-rope').forEach(r => r.remove());
        }, 480);
    }, 480);
    // 技能不消耗攻击次数:之后仍可普通攻击一次
}

// 尤格萨隆局内费用:每释放一个法术牌减1(下限0)
function getYoggCost() {
    return Math.max(0, 20 - (gameState.spellsCastThisGame || 0));
}

// 法术卡施放:分发到具体法术
function castSpell(card, row, col) {
    gameState.spellsCastThisGame = (gameState.spellsCastThisGame || 0) + 1;
    gameState._fateWheelProgress = (gameState._fateWheelProgress || 0) + 1; // 命运之轮进度(转轮后重置)
    if (card.rage) { castRageSpell(card, row, col); return; }
    if (card.log) { castLogSpell(card, row, col); return; }
    if (card.leftover) {
        // 剩饭:点击的格子上有友军则直接加成(友方增益可生效)
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) applyLeftover(tU);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (card.stoneWall) {
        // 石墙守护:点击的格子上有友军则直接保护(友方增益可生效)
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) applyStoneWall(tU);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (card.magicShield) {
        // 魔法护盾:点击的格子上有友军则施加护盾
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) applyMagicShield(tU);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (card.shieldSpell) {
        // 护盾:点击的格子上有友军则添加4点护盾
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team === gameState.currentTurn && !tU._removing) applyShieldSpell(tU);
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (card.heal) { castHealSpell(card, row, col); return; }
    if (card.evilMoon) { castEvilMoon(card, row, col); return; }
    if (card.missileLaunch) {
        // 单击:格子上的敌人若攻击力≥5 直接消灭;否则进入选敌模式
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.currentTurn && !tU.ghost && (tU.attack || 0) >= (card.minAtk || 5)) {
            missileKill(tU);
            return;
        }
        enterMissileTargetMode(card);
        return;
    }
    if (card.rollingStone) {
        // 单击:格子上的敌人若攻击力≤2 直接消灭;否则进入选敌模式
        const tU = gameState.units.find(u => u.row === row && u.col === col);
        if (tU && tU.team !== gameState.currentTurn && !tU.ghost && (tU.attack || 0) <= (card.maxAtk || 2)) {
            rollingStoneKill(tU);
            return;
        }
        enterRollingStoneTargetMode(card);
        return;
    }
    if (card.viralSpread) { castViralSpread(card, row, col); return; }
    if (card.bigLightning) { castBigLightning(card, row, col); return; }
    // 火球法术
    const r = card.spellRadius || 1;
    const board = document.getElementById('gameBoard');
    // 火球从天而降
    const fb = document.createElement('div');
    fb.className = 'fireball-drop';
    fb.style.position = 'absolute';
    const cx = col * cellW + cellW / 2 - 12;
    const cy = row * cellH + cellH / 2 - 12;
    fb.style.left = cx + 'px';
    fb.style.top = (cy - 300) + 'px';
    fb.style.transition = 'top 0.4s ease-in';
    board.appendChild(fb);
    requestAnimationFrame(() => {
        fb.style.top = cy + 'px';
    });
    // 命中:3×3 冲击波 + 伤害
    setTimeout(() => {
        if (fb.parentNode) fb.parentNode.removeChild(fb);
        for (let dr = -r; dr <= r; dr++) {
            for (let dc = -r; dc <= r; dc++) {
                const nr = row + dr, nc = col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const wave = document.createElement('div');
                wave.className = 'fireball-blast';
                wave.style.position = 'absolute';
                wave.style.left = (nc * cellW) + 'px';
                wave.style.top = (nr * cellH) + 'px';
                board.appendChild(wave);
                setTimeout(() => { if (wave.parentNode) wave.parentNode.removeChild(wave); }, 600);
            }
        }
        // 3×3 内敌方单位(card.team 由 currentTurn 决定)
        const team = gameState.currentTurn;
        gameState.units.slice().forEach(u => {
            if (u.team === team || u.ghost || u._removing || u._magicShield) return; // 魔法护盾免疫法术
            if (Math.max(Math.abs(u.row - row), Math.abs(u.col - col)) <= r) {
                const dmg = Math.max(0, (card.spellDamage || 4) - Math.max(0, (u.armor || 0)));
                u.currentHp -= dmg;
                updateUnitHp(u);
                showCritText(u.row, u.col, '火球');
                // 大雪怪:受击召唤冰雪精灵
                if (u.snowMonster && dmg > 0) spawnIceSprites(u, dmg);
                if (u.currentHp <= 0) removeUnit(u);
            }
        });
        // 大本营固定2伤(整个基地只扣一次)
        let baseHit = false;
        for (let dr = -r; dr <= r && !baseHit; dr++) {
            for (let dc = -r; dc <= r; dc++) {
                const nr = row + dr, nc = col + dc;
                if (gameState.currentTurn === 'red' && isBlueBase(nr, nc)) {
                    gameState.blueBaseHp -= card.baseDamage || 2;
                    baseHit = true;
                    break;
                }
                if (gameState.currentTurn === 'blue' && isRedBase(nr, nc)) {
                    gameState.redBaseHp -= card.baseDamage || 2;
                    baseHit = true;
                    break;
                }
            }
        }
        updateBaseHpDisplay();
        checkGameOver();
    }, 420);
}

// 狂暴法术:5×5 范围内友军攻击+2(技能每段+2)、下次移动+2,持续一个回合(特效同步持续)
function castRageSpell(card, row, col) {
    const r = card.rageRadius || 2;
    const board = document.getElementById('gameBoard');
    const team = gameState.currentTurn;
    // 紫红色 5×5 冲击波(瞬间爆发)
    for (let dr = -r; dr <= r; dr++) {
        for (let dc = -r; dc <= r; dc++) {
            const nr = row + dr, nc = col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const fx = document.createElement('div');
            fx.className = 'rage-buff';
            fx.style.position = 'absolute';
            fx.style.left = (nc * cellW) + 'px';
            fx.style.top = (nr * cellH) + 'px';
            board.appendChild(fx);
            setTimeout(() => { if (fx.parentNode) fx.parentNode.removeChild(fx); }, 1200);
        }
    }
    // 持续一回合的范围光环 + 友军加成(多瓶各自保留,回合结束统一清除)
    gameState.rageZones.push({ row: row, col: col, team: team });
    renderRageZones();
    gameState.units.forEach(u => {
        if (u.team !== team || u._removing) return; // 友方增益可生效(魔法护盾只免疫敌方法术)
        if (Math.max(Math.abs(u.row - row), Math.abs(u.col - col)) <= r) {
            u._rageAttack = card.rageAttack || 2;
            u._rageMove = card.rageMove || 2;
            const el = gameState.board[u.row][u.col].querySelector('.unit');
            if (el) el.classList.add('raging');
        }
    });
    clearHighlights();
    gameState.selectedUnit = null;
}

// 狂暴持续光环渲染(5×5 紫红色,持续到己方回合结束)
function renderRageZones() {
    document.querySelectorAll('.rage-zone').forEach(el => el.classList.remove('rage-zone'));
    gameState.rageZones.forEach(z => {
        const r = 2;
        for (let dr = -r; dr <= r; dr++) {
            for (let dc = -r; dc <= r; dc++) {
                const nr = z.row + dr, nc = z.col + dc;
                if (isValidPosition(nr, nc)) gameState.board[nr][nc].classList.add('rage-zone');
            }
        }
    });
}

// 复仇滚木:选中格为中间,向前滚动11格(竖向3×11),逐格命中敌人2伤穿甲1+击退1格,基地固定1伤
function castLogSpell(card, row, col) {
    const team = gameState.currentTurn;
    const dir = team === 'red' ? -1 : 1;
    const dist = card.logRange || 11;
    const board = document.getElementById('gameBoard');
    // 滚木特效:棕色木头 + 银色尖刺小点,横向3格
    const log = document.createElement('div');
    log.className = 'log-spell';
    log.style.position = 'absolute';
    log.style.left = ((col - 1) * cellW) + 'px';
    log.style.top = (row * cellH + (cellH - 10) / 2) + 'px';
    log.style.width = (3 * cellW) + 'px';
    log.style.height = '10px';
    board.appendChild(log);
    const hitSet = new Set();
    let baseHit = false;
    let r = row;
    const step = () => {
        for (let dc = -1; dc <= 1; dc++) {
            const nc = col + dc;
            if (!isValidPosition(r, nc)) continue;
            // 大本营固定1伤(总一次)
            if (!baseHit && team === 'red' && isBlueBase(r, nc)) { gameState.blueBaseHp -= card.baseDamage || 1; baseHit = true; updateBaseHpDisplay(); }
            if (!baseHit && team === 'blue' && isRedBase(r, nc)) { gameState.redBaseHp -= card.baseDamage || 1; baseHit = true; updateBaseHpDisplay(); }
            // 敌人:2伤穿甲1 + 向后击退1格(不重复受伤)
            const u = gameState.units.find(x => x.row === r && x.col === nc);
            if (u && u.team !== team && !u.ghost && !u._removing && !u.flying && !u._magicShield && !hitSet.has(u.id)) { // 魔法护盾免疫法术
                hitSet.add(u.id);
                let dmg = Math.max(0, (card.logDamage || 2) - Math.max(0, (u.armor || 0) - (card.logPen || 0)));
                // 骷髅大哥护盾:抵挡滚木伤害(护盾破碎)
                if (dmg > 0 && u.skullBoss && u.skullShield) {
                    u.skullShield = false;
                    updateSkullShieldVisual(u);
                    showHeroDeployText(u, '护盾抵挡', '#b39ddb', 1000);
                    dmg = 0;
                }
                // 解斑须佐:无敌
                if (u.madaraSolve && u._susanooActive) dmg = 0;
                if (dmg > 0) {
                    u.currentHp -= dmg;
                    updateUnitHp(u);
                }
                showCritText(u.row, u.col, '滚木');
                if (u.currentHp <= 0) { removeUnit(u); }
                else {
                    logPushChain(u, dir); // 沿滚木滚动方向连锁击退1格(扎堆也全推)
                }
            }
        }
        r += dir;
        log.style.top = (r * cellH + (cellH - 10) / 2) + 'px';
        if ((dir === -1 && r >= row - dist + 1) || (dir === 1 && r <= row + dist - 1)) {
            setTimeout(step, 120);
        } else {
            if (log.parentNode) log.parentNode.removeChild(log);
        }
    };
    setTimeout(step, 50);
    clearHighlights();
    gameState.selectedUnit = null;
}

// 石墙守护:进入选友军模式
function enterStoneWallTargetMode(card) {
    gameState._stoneWallTargeting = true;
    gameState._stoneWallCard = card;
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team !== gameState.currentTurn || u._removing) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
    gameState.selectedUnit = null;
}

// 石墙守护:下一个敌方回合无敌(记录血量基准,任何伤害都被恢复;冰冻等效果仍正常)
function applyStoneWall(unit) {
    unit._stoneWallHpBase = unit.currentHp;
    unit._stoneWallProtect = 1;
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) el.classList.add('stone-bubble');
    showHeroDeployText(unit, '石墙守护', '#8b5a2b', 1200);
}

// 病毒式传播:全体己方单位获得狂热(击杀后可再攻击,连环击杀连续攻击)
function castViralSpread(card, row, col) {
    const team = gameState.currentTurn;
    gameState.units.forEach(u => {
        if (u.team !== team || u._removing) return;
        u._frenzy = true;
        showCritText(u.row, u.col, '狂热');
    });
    clearHighlights();
    gameState.selectedUnit = null;
}

// 滚石:进入选敌模式(攻击力≤2的敌人标红)
function enterRollingStoneTargetMode(card) {
    clearHighlights();
    gameState._rollingStoneTargeting = true;
    gameState.selectedUnit = null;
    const maxAtk = card.maxAtk || 2;
    gameState.units.forEach(u => {
        if (u.team === gameState.currentTurn || u.ghost || u._removing) return;
        if ((u.attack || 0) <= maxAtk) {
            gameState.board[u.row][u.col].classList.add('tank-target');
        }
    });
}

// 滚石消灭:滚石滚过消灭目标
function rollingStoneKill(target) {
    gameState._rollingStoneTargeting = false;
    clearHighlights();
    const board = document.getElementById('gameBoard');
    // 滚石特效:灰色石头滚动
    const stone = document.createElement('div');
    stone.className = 'rolling-stone-fx';
    stone.style.position = 'absolute';
    stone.style.left = (target.col * cellW + cellW / 2 - 12) + 'px';
    stone.style.top = (target.row * cellH + cellH / 2 - 12) + 'px';
    board.appendChild(stone);
    setTimeout(() => {
        if (stone.parentNode) stone.parentNode.removeChild(stone);
        showCritText(target.row, target.col, '碾压');
        if (!target._removing && !target.ghost) removeUnit(target);
    }, 500);
    gameState.selectedUnit = null;
}

// 导弹发射:进入选敌模式(攻击力≥5的敌人标红)
function enterMissileTargetMode(card) {
    clearHighlights();
    gameState._missileTargeting = true;
    gameState.selectedUnit = null;
    const minAtk = card.minAtk || 5;
    gameState.units.forEach(u => {
        if (u.team === gameState.currentTurn || u.ghost || u._removing) return;
        if ((u.attack || 0) >= minAtk) {
            gameState.board[u.row][u.col].classList.add('tank-target');
        }
    });
}

// 导弹消灭:导弹从天而降消灭目标
function missileKill(target) {
    gameState._missileTargeting = false;
    clearHighlights();
    const board = document.getElementById('gameBoard');
    // 导弹特效:从天而降
    const missile = document.createElement('div');
    missile.className = 'missile-fx';
    missile.style.position = 'absolute';
    missile.style.left = (target.col * cellW + cellW / 2 - 6) + 'px';
    missile.style.top = ((target.row - 8) * cellH) + 'px';
    board.appendChild(missile);
    setTimeout(() => {
        if (missile.parentNode) missile.parentNode.removeChild(missile);
        // 爆炸圈
        const boom = document.createElement('div');
        boom.className = 'missile-boom';
        boom.style.position = 'absolute';
        boom.style.left = (target.col * cellW) + 'px';
        boom.style.top = (target.row * cellH) + 'px';
        board.appendChild(boom);
        setTimeout(() => { if (boom.parentNode) boom.parentNode.removeChild(boom); }, 500);
        showCritText(target.row, target.col, '命中');
        if (!target._removing && !target.ghost) removeUnit(target);
    }, 450);
    gameState.selectedUnit = null;
}

// 邪月当空:随机挑8个队友,随机变成花费≥10的卡(带亲卫队的卡召唤亲卫队)
function castEvilMoon(card, row, col) {
    const team = gameState.currentTurn;
    const allies = gameState.units.filter(u => u.team === team && !u._removing);
    const picked = allies.sort(() => Math.random() - 0.5).slice(0, 8);
    const pool = cardLibrary.filter(c => c.cost >= 10 && !c.spell); // 排除法术卡
    if (pool.length === 0) { clearHighlights(); gameState.selectedUnit = null; return; }
    picked.forEach(u => {
        const nc = pool[Math.floor(Math.random() * pool.length)];
        transformToCard(u, nc);
    });
    clearHighlights();
    gameState.selectedUnit = null;
}

// 单位变身:保留位置/阵营/id,数值与技能标记换成新卡;带亲卫队的卡召唤亲卫队
function transformToCard(unit, newCard) {
    Object.keys(newCard).forEach(k => {
        if (k === 'id' || k === 'hp') return;
        unit[k] = newCard[k];
    });
    unit.cardId = newCard.id;
    unit.maxHp = newCard.hp;
    unit.currentHp = newCard.hp;
    renderUnit(unit);
    showCritText(unit.row, unit.col, '邪月');
    // 亲卫队类:召唤(典狱长守卫/雷斯亲卫队/战车)
    if (newCard.summon) summonWardenGuards(unit);
    if (newCard.leisiSpawn) summonLeisiGuards(unit);
    if (newCard.tankSpawn) {
        [[0,-1],[0,1]].forEach(p => {
            const nr = unit.row + p[0], nc = unit.col + p[1];
            if (!isValidPosition(nr, nc)) return;
            if (gameState.units.some(u => u.row === nr && u.col === nc)) return;
            const tank = { id: 'tank_' + Date.now() + '_' + Math.random(), name: '战车', attack: 3, maxHp: 4, currentHp: 4, armor: 2, armorPen: 1, moveRange: 99, attackRange: 3, team: unit.team, row: nr, col: nc, artwork: 'tank', tank: true, tankMaster: unit.id };
            gameState.units.push(tank);
            renderUnit(tank);
        });
    }
}

// 治疗术:3×3 内友军回3血(不超上限)+ 本回合+1移动
function castHealSpell(card, row, col) {
    const team = gameState.currentTurn;
    const r = card.healRadius || 1;
    const board = document.getElementById('gameBoard');
    // 绿色治疗光效(3×3)
    for (let dr = -r; dr <= r; dr++) {
        for (let dc = -r; dc <= r; dc++) {
            const nr = row + dr, nc = col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const fx = document.createElement('div');
            fx.className = 'heal-fx';
            fx.style.position = 'absolute';
            fx.style.left = (nc * cellW) + 'px';
            fx.style.top = (nr * cellH) + 'px';
            board.appendChild(fx);
            setTimeout(() => { if (fx.parentNode) fx.parentNode.removeChild(fx); }, 900);
        }
    }
    gameState.units.forEach(u => {
        if (u.team !== team || u._removing) return; // 友方增益可生效(魔法护盾只免疫敌方法术)
        if (Math.max(Math.abs(u.row - row), Math.abs(u.col - col)) <= r) {
            const healed = Math.min(card.healAmount || 3, Math.max(0, u.maxHp - u.currentHp));
            if (healed > 0) {
                u.currentHp += healed;
                updateUnitHp(u);
                showCritText(u.row, u.col, '+' + healed);
            }
            u._healMove = card.healMove || 1; // +1移动(仅本回合)
        }
    });
    clearHighlights();
    gameState.selectedUnit = null;
}

// 护盾法术:给友军添加可承受4点伤害的护盾(可叠加)
function applyShieldSpell(unit) {
    unit._shieldHp = (unit._shieldHp || 0) + (4);
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) el.classList.add('guard-shield');
    showHeroDeployText(unit, '+4护盾', '#95a5a6', 1200);
}

// 魔法护盾:免疫所有法术伤害与效果(紫色护盾持续到死亡)
function applyMagicShield(unit) {
    unit._magicShield = true;
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) el.classList.add('magic-shield');
    showHeroDeployText(unit, '魔法护盾', '#9b59b6', 1200);
}

// 剩饭法术:进入选友军模式(全图友军标红)
function enterLeftoverTargetMode(card) {
    gameState._leftoverTargeting = true;
    gameState._leftoverCard = card;
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team !== gameState.currentTurn || u._removing) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
    gameState.selectedUnit = null;
}

// 剩饭加成:攻击+1、生命+1(满血加上限)、技能每段伤害+1,永久生效
function applyLeftover(unit) {
    unit.attack += 1;
    if (unit.currentHp >= unit.maxHp) {
        unit.maxHp += 1;
        unit.currentHp += 1;
    } else {
        unit.currentHp += 1;
    }
    unit._leftoverBuff = (unit._leftoverBuff || 0) + 1;
    updateUnitHp(unit);
    showHeroDeployText(unit, '+1攻+1血', '#e74c3c', 1200);
}

// 大闪电:以生效点为中心5×5内生命值最高的3名敌人受闪电打击(5伤)
function castBigLightning(card, row, col) {
    const team = gameState.currentTurn;
    const r = card.lgtRadius || 2;
    const count = card.lgtCount || 3;
    const dmg = card.lgtDamage || 5;
    const enemies = gameState.units
        .filter(u => u.team !== team && !u.ghost && !u._removing && !u._magicShield && Math.max(Math.abs(u.row - row), Math.abs(u.col - col)) <= r) // 魔法护盾免疫法术
        .sort((a, b) => b.currentHp - a.currentHp);
    const targets = enemies.slice(0, count);
    targets.forEach(t => {
        showLightningStrike(t);
        const d = Math.max(0, dmg - Math.max(0, (t.armor || 0)));
        t.currentHp -= d;
        updateUnitHp(t);
        showCritText(t.row, t.col, '雷击');
        if (t.currentHp <= 0) removeUnit(t);
    });
    clearHighlights();
    gameState.selectedUnit = null;
}

// 降雷特效:蓝色闪电劈下
function showLightningStrike(target) {
    const board = document.getElementById('gameBoard');
    const bolt = document.createElement('div');
    bolt.className = 'lightning-strike';
    bolt.style.position = 'absolute';
    bolt.style.left = (target.col * cellW + cellW / 2 - 4) + 'px';
    bolt.style.top = ((target.row - 5) * cellH) + 'px';
    bolt.style.height = (6 * cellH) + 'px';
    board.appendChild(bolt);
    setTimeout(() => { if (bolt.parentNode) bolt.parentNode.removeChild(bolt); }, 500);
}

// 渔夫黑绳(从渔夫连到当前目标位置)
function drawFisherRope(fx, fy, tx, ty) {
    document.querySelectorAll('.fisher-rope').forEach(r => r.remove());
    const board = document.getElementById('gameBoard');
    const dx = tx - fx, dy = ty - fy;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const rope = document.createElement('div');
    rope.className = 'fisher-rope';
    rope.style.position = 'absolute';
    rope.style.left = fx + 'px';
    rope.style.top = fy + 'px';
    rope.style.width = len + 'px';
    rope.style.height = '2px';
    rope.style.transform = 'rotate(' + angle + 'deg)';
    rope.style.transformOrigin = '0 0';
    rope.style.background = '#000';
    rope.style.zIndex = '35';
    rope.style.pointerEvents = 'none';
    board.appendChild(rope);
}

// 觉醒皇家卫队:部署6个横向卫兵(每两个之间隔1格),本体不出现
function spawnRoyalGuards(unit) {
    const cols = [unit.col - 5, unit.col - 3, unit.col - 1, unit.col + 1, unit.col + 3, unit.col + 5];
    cols.forEach(c => {
        if (!isValidPosition(unit.row, c)) return;
        if (isBlueBase(unit.row, c) || isRedBase(unit.row, c)) return;
        if (gameState.units.some(u => u.row === unit.row && u.col === c)) return;
        const g = {
            id: 'royal_guard_' + Date.now() + '_' + Math.random(),
            cardId: 'royal_guard',
            name: '皇家卫兵',
            attack: 2,
            maxHp: 4,
            currentHp: 4,
            armor: 0,
            armorPen: 0,
            moveRange: 5,
            attackRange: 2,
            artwork: 'royal_guard',
            royalGuard: true,
            guardShield: 3,
            team: unit.team,
            row: unit.row,
            col: c
        };
        gameState.units.push(g);
        renderUnit(g);
    });
}

// 皇家卫兵护盾视觉
function updateGuardShieldVisual(unit) {
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (!el) return;
    if (unit.guardShield > 0) el.classList.add('guard-shield');
    else el.classList.remove('guard-shield');
}

// 精英骑士:双击释放技能--7×7金色法阵(释放时范围内敌人被嘲讽:骑士死亡前只能攻击骑士)+3伤护盾;冷却2个己方回合;法阵视觉只显示1回合
function activateEliteKnightSkill(k) {
    if (k._tauntSkillCd) return;
    k._tauntActive = true;
    k._knightShield = 3;
    k._tauntSkillCd = 2;
    // 快照:释放时7×7范围内的敌人被嘲讽(永久直到骑士死亡,无论骑士移动到哪里)
    k._tauntedIds = [];
    gameState.units.forEach(u => {
        if (u.team === k.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - k.row), Math.abs(u.col - k.col)) <= 3) k._tauntedIds.push(u.id);
    });
    // 法阵视觉(仅本回合显示)
    gameState.knightZones = gameState.knightZones.filter(z => z.owner !== k.id);
    gameState.knightZones.push({ row: k.row, col: k.col, owner: k.id });
    renderKnightZones();
    const el = gameState.board[k.row][k.col].querySelector('.unit');
    if (el) el.classList.add('guard-shield');
    clearHighlights();
    gameState.selectedUnit = null;
}

// 精英骑士法阵渲染(金色 7×7)
function renderKnightZones() {
    document.querySelectorAll('.knight-zone').forEach(el => el.classList.remove('knight-zone'));
    gameState.knightZones.forEach(z => {
        for (let dr = -3; dr <= 3; dr++) {
            for (let dc = -3; dc <= 3; dc++) {
                const nr = z.row + dr, nc = z.col + dc;
                if (isValidPosition(nr, nc)) gameState.board[nr][nc].classList.add('knight-zone');
            }
        }
    });
}

// 嘲讽判定:返回该单位必须攻击的精英骑士(释放技能时被嘲讽的敌人,永久直到骑士死亡)
function getTaunter(unit) {
    for (const k of gameState.units) {
        if (!k.eliteKnight || !k._tauntActive || k._removing) continue;
        if (k.team === unit.team) continue;
        if (k._tauntedIds && k._tauntedIds.includes(unit.id)) return k;
    }
    return null;
}

// 尤格萨隆:双击弹技能选择框
function openYoggSkillModal(yogg) {
    gameState._yoggSelected = yogg;
    document.getElementById('yoggSkill1Btn').disabled = !!(yogg._yoggSkill1Used);
    document.getElementById('yoggSkill2Btn').disabled = !!(yogg._yoggSkill2Used);
    document.getElementById('yoggSkill3Btn').disabled = !!(yogg._yoggSkill3Used);
    document.getElementById('yoggSkillModal').classList.remove('hidden');
}
function closeYoggSkillModalFunc() {
    document.getElementById('yoggSkillModal').classList.add('hidden');
    gameState._yoggSelected = null;
}
// 触须攒聚:获得混乱触须手牌(加入部署栏第11张卡);若手牌已选过触须,则接下来3个触须花费为0
function yoggSkill3(yogg) {
    yogg._yoggSkill3Used = 1;
    yogg._yoggSkillUsedThisTurn = true;
    showHeroDeployText(yogg, '触须攒聚', '#8e44ad', 2000);
    const tentacle = cardLibrary.find(c => c.id === 'chaos_tentacle');
    if (tentacle) gameState.battleDeck.push(tentacle);
    // 手牌已有触须:接下来释放的3个触须花费为0(第4个起恢复)
    if (gameState.battleDeck.filter(c => c.id === 'chaos_tentacle').length >= 2) {
        gameState._freeTentacles = 3;
    }
    clearHighlights();
    gameState.selectedUnit = null;
    // 技能用完后:随机释放两个法术
    setTimeout(() => yoggCastRandomSpells(yogg), 300);
}

// 混沌统治:选敌模式(全图敌方单位标红)
function enterYoggChaosMode(yogg) {
    closeYoggSkillModalFunc();
    clearHighlights();
    yogg._yoggChaosTargeting = true;
    gameState.units.forEach(u => {
        if (u.team === yogg.team || u.ghost || u._removing) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
}
// 混沌统治:保留数值变为己方,移动到导演前方一格
function yoggChaos(yogg, target) {
    yogg._yoggChaosTargeting = false;
    yogg._yoggSkill1Used = 1;
    yogg._yoggSkillUsedThisTurn = true;
    showHeroDeployText(yogg, '混沌统治', '#27ae60', 2000);
    const dir = yogg.team === 'red' ? -1 : 1;
    let landR = yogg.row + dir, landC = yogg.col;
    if (!isValidPosition(landR, landC) || gameState.units.some(u => u.id !== target.id && u.row === landR && u.col === landC)) {
        let found = false;
        for (let rr = 1; rr <= 4 && !found; rr++) {
            for (let dr2 = -rr; dr2 <= rr && !found; dr2++) {
                for (let dc2 = -rr; dc2 <= rr && !found; dc2++) {
                    if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr) continue;
                    const lr = yogg.row + dr2, lc = yogg.col + dc2;
                    if (!isValidPosition(lr, lc)) continue;
                    if (gameState.units.some(u => u.id !== target.id && u.row === lr && u.col === lc)) continue;
                    if (isBlueBase(lr, lc) || isRedBase(lr, lc)) continue;
                    landR = lr; landC = lc; found = true;
                }
            }
        }
    }
    target.team = yogg.team; // 保留数值,仅改变阵营
    target.row = landR;
    target.col = landC;
    renderUnit(target);
    clearHighlights();
    gameState.selectedUnit = null;
    // 技能用完后:随机释放两个法术
    setTimeout(() => yoggCastRandomSpells(yogg), 300);
}
// 诱引狂乱:敌方单位互相攻击(每个攻击一次),计算最大化击杀
function yoggFrenzy(yogg) {
    yogg._yoggSkill2Used = 1;
    yogg._yoggSkillUsedThisTurn = true;
    showHeroDeployText(yogg, '诱引狂乱', '#2ecc71', 2000);
    const enemyTeam = yogg.team === 'red' ? 'blue' : 'red';
    const acted = new Set(); // 已攻击过的敌人(每人只能攻击一次)
    const canHit = (a, x) => {
        if (x.team !== enemyTeam || x._removing || x.id === a.id) return false;
        if (x.flying && !canHitAirUnit(a)) return false;
        return Math.max(Math.abs(x.row - a.row), Math.abs(x.col - a.col)) <= (a.attackRange || 1);
    };
    const applyAttack = (a, t) => {
        const dmg = Math.max(0, (a.attack || 0) - Math.max(0, (t.armor || 0) - (a.armorPen || 0)));
        t.currentHp -= dmg;
        updateUnitHp(t);
        showCritText(t.row, t.col, '狂乱');
        if (t.currentHp <= 0) { removeUnit(t); }
    };
    // 迭代指派:优先让攻击力最低的能一击击杀者行动(保留高攻);无人可杀时高攻磨血(为后续创造击杀)
    for (let pass = 0; pass < 60; pass++) {
        const attackers = gameState.units.filter(u => u.team === enemyTeam && !u._removing && !acted.has(u.id));
        if (attackers.length === 0) break;
        // 1. 可一击击杀:选攻击力最低的击杀者(目标选射程内血量最低的可杀目标)
        let bestKill = null;
        attackers.forEach(a => {
            let t = null, minHp = Infinity;
            gameState.units.forEach(x => {
                if (!canHit(a, x)) return;
                const dmg = Math.max(0, (a.attack || 0) - Math.max(0, (x.armor || 0) - (a.armorPen || 0)));
                if (dmg >= x.currentHp && x.currentHp < minHp) { t = x; minHp = x.currentHp; }
            });
            if (t && (!bestKill || (a.attack || 0) < (bestKill.attacker.attack || 0))) bestKill = { attacker: a, target: t };
        });
        if (bestKill) {
            applyAttack(bestKill.attacker, bestKill.target);
            acted.add(bestKill.attacker.id);
            continue;
        }
        // 2. 无人可杀:最高攻击力者磨血(打射程内血量最低目标)
        let bestGrind = null;
        attackers.forEach(a => {
            let t = null, minHp = Infinity;
            gameState.units.forEach(x => {
                if (!canHit(a, x)) return;
                if (x.currentHp < minHp) { t = x; minHp = x.currentHp; }
            });
            if (t && (!bestGrind || (a.attack || 0) > (bestGrind.attacker.attack || 0))) bestGrind = { attacker: a, target: t };
        });
        if (bestGrind) {
            applyAttack(bestGrind.attacker, bestGrind.target);
            acted.add(bestGrind.attacker.id);
            continue;
        }
        break;
    }
    clearHighlights();
    gameState.selectedUnit = null;
    // 技能用完后:随机释放两个法术
    setTimeout(() => yoggCastRandomSpells(yogg), 300);
}

// 大雪怪:每受1伤在周围3×3召唤一个冰雪精灵
function spawnIceSprites(unit, damage) {
    for (let dmg = 0; dmg < damage; dmg++) {
        const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        const shuffled = dirs.sort(() => Math.random() - 0.5);
        for (const [dr, dc] of shuffled) {
            const nr = unit.row + dr, nc = unit.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            if (gameState.units.some(u => u.row === nr && u.col === nc)) continue;
            if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
            const sprite = {
                id: 'sprite_' + Date.now() + '_' + Math.random(),
                name: '冰雪精灵', attack: 1, maxHp: 1, currentHp: 1,
                moveRange: 11, attackRange: 2, team: unit.team,
                row: nr, col: nc, artwork: 'ice-sprite', freeze: true, oneShot: true,
                armor: 0
            };
            gameState.units.push(sprite);
            renderUnit(sprite);
            break;
        }
    }
}

// 混乱触须/导演:随机释放法术(伤害类→随机敌人,增益类→随机队友;按字段自动分类,新法术自动纳入)
function castRandomSpell(spellCard, caster) {
    const team = caster.team;
    const allies = gameState.units.filter(u => u.team === team && !u._removing);
    const enemies = gameState.units.filter(u => u.team !== team && !u.ghost && !u._removing);
    // 伤害类:带 spellDamage/logDamage/lgtDamage/missileLaunch 字段的法术;其余为增益类
    const isDamage = !!(spellCard.spellDamage || spellCard.logDamage || spellCard.lgtDamage || spellCard.missileLaunch || spellCard.rollingStone);
    if (isDamage) {
        if (!enemies.length) return;
        if (spellCard.missileLaunch) {
            // 导弹:随机消灭一个攻击力≥5的敌人
            const valid = enemies.filter(e => (e.attack || 0) >= 5);
            if (!valid.length) return;
            const t = valid[Math.floor(Math.random() * valid.length)];
            if (!t._removing && !t.ghost) removeUnit(t);
            return;
        }
        if (spellCard.rollingStone) {
            // 滚石:随机消灭一个攻击力≤2的敌人
            const valid = enemies.filter(e => (e.attack || 0) <= 2);
            if (!valid.length) return;
            const t = valid[Math.floor(Math.random() * valid.length)];
            if (!t._removing && !t.ghost) removeUnit(t);
            return;
        }
        const t = enemies[Math.floor(Math.random() * enemies.length)];
        if (spellCard.log) castLogSpell(spellCard, t.row, t.col);
        else if (spellCard.bigLightning) castBigLightning(spellCard, t.row, t.col);
        else castSpell(spellCard, t.row, t.col); // 火球等
    } else {
        if (!allies.length) return;
        const t = allies[Math.floor(Math.random() * allies.length)];
        if (spellCard.rage) castRageSpell(spellCard, t.row, t.col);
        else if (spellCard.leftover) applyLeftover(t);
        else if (spellCard.stoneWall) applyStoneWall(t);
        else if (spellCard.heal) castHealSpell(spellCard, t.row, t.col);
        else if (spellCard.magicShield) applyMagicShield(t);
        else if (spellCard.evilMoon) castEvilMoon(spellCard, t.row, t.col);
        else if (spellCard.shieldSpell) applyShieldSpell(t);
        else castSpell(spellCard, t.row, t.col); // 兜底:以友军位置施放
    }
}

// 导演:技能用完后随机释放两个法术(增益→随机友军,伤害→随机敌人)
function yoggCastRandomSpells(yogg) {
    const spells = cardLibrary.filter(c => c.spell);
    if (!spells.length) return;
    for (let i = 0; i < 2; i++) {
        const s = spells[Math.floor(Math.random() * spells.length)];
        castRandomSpell(s, yogg);
    }
}

// 特斯拉电磁塔:从地底现形时释放5×5紫色电圈(从中心扩散,触碰敌人3伤)
function teslaEmergence(unit) {
    const board = document.getElementById('gameBoard');
    const ring = document.createElement('div');
    ring.className = 'tesla-ring';
    ring.style.position = 'absolute';
    const w = 5 * cellW, h = 5 * cellH;
    ring.style.left = ((unit.col - 2) * cellW) + 'px';
    ring.style.top = ((unit.row - 2) * cellH) + 'px';
    ring.style.width = w + 'px';
    ring.style.height = h + 'px';
    board.appendChild(ring);
    setTimeout(() => { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 700);
    // 电圈扩散触碰敌人:3伤
    setTimeout(() => {
        gameState.units.forEach(e => {
            if (e.team === unit.team || e.ghost || e._removing) return;
            if (Math.max(Math.abs(e.row - unit.row), Math.abs(e.col - unit.col)) <= 2) {
                const dmg = Math.max(0, 3 - Math.max(0, (e.armor || 0)));
                e.currentHp -= dmg;
                updateUnitHp(e);
                showCritText(e.row, e.col, '电圈');
                if (e.currentHp <= 0) removeUnit(e);
            }
        });
    }, 300);
}

// 滚木连锁击退:沿滚动方向推1格(推土机式--挡路的敌人一起被推;霸体/建筑/魔法护盾/阴兵挡路则停止)
function logPushChain(unit, dir) {
    const chain = [unit];
    let blocked = false;
    for (let i = 0; i < 8; i++) {
        const front = chain[chain.length - 1];
        const nr = front.row + dir, nc = front.col;
        if (!isValidPosition(nr, nc)) { blocked = true; break; }
        if (isBlueBase(nr, nc) || isRedBase(nr, nc)) { blocked = true; break; }
        const blocker = gameState.units.find(u => u.row === nr && u.col === nc && !u._removing);
        if (blocker) {
            if (blocker.ghost || blocker.building || blocker._magicShield || isImmuneToKnockback(blocker)) { blocked = true; break; }
            chain.push(blocker);
            continue;
        }
        break;
    }
    if (blocked) return;
    for (let i = chain.length - 1; i >= 0; i--) {
        const u = chain[i];
        const oc = gameState.board[u.row][u.col];
        const el = oc ? oc.querySelector('.unit') : null;
        const nr = u.row + dir;
        if (el && oc && gameState.board[nr]) {
            oc.removeChild(el);
            gameState.board[nr][u.col].appendChild(el);
        }
        u.row = nr;
    }
}

// 天鹰火炮:敌方累计消耗40能量后开启
function checkEagleArtillery() {
    gameState.units.forEach(u => {
        if (!u.eagleArtillery || u._eagleActive) return;
        const enemySpent = gameState.energySpent[u.team === 'red' ? 'blue' : 'red'] || 0;
        if (enemySpent >= 40) {
            u._eagleActive = true;
            u._eagleAttacks = 0;
            showHeroDeployText(u, '天鹰火炮已开启', '#000', 2000);
        }
    });
}

// 天鹰火炮:双击进入攻击模式(全图敌人标红,自身5×5盲区)
function enterEagleTargetMode(eagle) {
    clearHighlights();
    eagle._eagleTargeting = true;
    gameState.units.forEach(u => {
        if (u.team === eagle.team || u.ghost || u._removing) return;
        // 盲区:自身5×5内不可攻击
        if (Math.max(Math.abs(u.row - eagle.row), Math.abs(u.col - eagle.col)) <= 2) return;
        gameState.board[u.row][u.col].classList.add('tank-target');
    });
}

// 天鹰火炮攻击:目标4伤 + 目标5×5范围敌人4伤
function eagleArtilleryAttack(eagle, target) {
    eagle._eagleTargeting = false;
    eagle._eagleAttacks = (eagle._eagleAttacks || 0) + 1;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    // 弹道特效:从天鹰到目标(简单紫色线)
    const bolt = document.createElement('div');
    bolt.className = 'eagle-bolt';
    bolt.style.position = 'absolute';
    bolt.style.left = (eagle.col * cellW + cellW / 2) + 'px';
    bolt.style.top = (eagle.row * cellH + cellH / 2) + 'px';
    board.appendChild(bolt);
    setTimeout(() => { if (bolt.parentNode) bolt.parentNode.removeChild(bolt); }, 400);
    // 目标及其5×5范围内敌人 4 伤(克罗格削弱后每次只能造成1点)
    const hitDmg = eagle._crogDebuffed ? 1 : 4;
    gameState.units.slice().forEach(u => {
        if (u.team === eagle.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col)) <= 2) {
            const dmg = Math.max(0, hitDmg - Math.max(0, (u.armor || 0)));
            u.currentHp -= dmg;
            updateUnitHp(u);
            showCritText(u.row, u.col, '炮击');
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
    // 目标格爆炸特效
    for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
            const nr = target.row + dr, nc = target.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const fx = document.createElement('div');
            fx.className = 'eagle-blast';
            fx.style.position = 'absolute';
            fx.style.left = (nc * cellW) + 'px';
            fx.style.top = (nr * cellH) + 'px';
            board.appendChild(fx);
            setTimeout(() => { if (fx.parentNode) fx.parentNode.removeChild(fx); }, 500);
        }
    }
    if ((eagle._eagleAttacks || 0) >= 3) {
        eagle._eagleTargeting = false;
    }
}

// ===== 吕布技能栏 =====
function openLvbuSkillModal(lvbu) {
    gameState._lvbuSelected = lvbu;
    document.getElementById('lvbuSkill1Btn').disabled = !!(lvbu._lvbuS1Used);
    document.getElementById('lvbuSkill2Btn').disabled = !!(lvbu._lvbuS2Used);
    document.getElementById('lvbuSkill3Btn').disabled = !!(lvbu._lvbuS3Used);
    document.getElementById('lvbuSkillModal').classList.remove('hidden');
}
function closeLvbuSkillModalFunc() {
    document.getElementById('lvbuSkillModal').classList.add('hidden');
    gameState._lvbuSelected = null;
}

// 技能1 方天画斩:前方2×3(前两行×中间3列)敌人3伤 + 附魔(真伤,无视护甲护盾)
function lvbuSkill1(lvbu) {
    lvbu._lvbuS1Used = 1;
    closeLvbuSkillModalFunc();
    const dir = lvbu.team === 'red' ? -1 : 1;
    let hit = false;
    for (let d = 1; d <= 2; d++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = lvbu.row + dir * d, nc = lvbu.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const u = gameState.units.find(x => x.row === nr && x.col === nc);
            if (u && u.team !== lvbu.team && !u.ghost && !u._removing) {
                const dmg = Math.max(0, 3 - Math.max(0, (u.armor || 0)));
                u.currentHp -= dmg;
                updateUnitHp(u);
                showCritText(u.row, u.col, '画斩');
                if (u.currentHp <= 0) removeUnit(u);
                hit = true;
            }
        }
    }
    // 附魔:命中敌人则附魔(后续所有攻击真伤);未命中不附魔
    if (hit) {
        lvbu._enchant = true;
        lvbu._enchantTurns = 2;
    }
    showHeroDeployText(lvbu, hit ? '方天画斩·附魔' : '方天画斩', '#c0392b', 1200);
    clearHighlights();
    gameState.selectedUnit = null;
}

// 技能2 贪狼之握:前方3×3汲取1伤 + 每吸1个+2护盾(最多6个)
function lvbuSkill2(lvbu) {
    lvbu._lvbuS2Used = 1;
    closeLvbuSkillModalFunc();
    const dir = lvbu.team === 'red' ? -1 : 1;
    let count = 0;
    for (let d = 1; d <= 3; d++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = lvbu.row + dir * d, nc = lvbu.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const u = gameState.units.find(x => x.row === nr && x.col === nc);
            if (u && u.team !== lvbu.team && !u.ghost && !u._removing) {
                u.currentHp -= 1;
                updateUnitHp(u);
                showCritText(u.row, u.col, '汲取');
                if (u.currentHp <= 0) removeUnit(u);
                count++;
            }
        }
    }
    if (count > 0) {
        lvbu._lvbuShield = (lvbu._lvbuShield || 0) + Math.min(6, count) * 2;
        const el = gameState.board[lvbu.row][lvbu.col].querySelector('.unit');
        if (el) el.classList.add('guard-shield');
    }
    showHeroDeployText(lvbu, count > 0 ? '贪狼之握+' + Math.min(6, count) * 2 + '盾' : '贪狼之握', '#8e44ad', 1200);
    clearHighlights();
    gameState.selectedUnit = null;
}

// 技能3 神魔降世:7格内选择释放点 → 跳圆心,5径圆(切比雪夫≤2)内敌人4伤,圈内护甲+1,圈持续到敌方回合结束
function enterLvbuLanding(lvbu) {
    closeLvbuSkillModalFunc();
    clearHighlights();
    lvbu._lvbuLanding = true;
    for (let r = 0; r < BOARD_ROWS; r++) {
        for (let c = 0; c < BOARD_COLS; c++) {
            if (isBlueBase(r, c) || isRedBase(r, c)) continue;
            if (Math.max(Math.abs(r - lvbu.row), Math.abs(c - lvbu.col)) <= 7) {
                gameState.board[r][c].classList.add('tank-target');
            }
        }
    }
}

function lvbuLanding(lvbu, row, col) {
    lvbu._lvbuLanding = false;
    lvbu._lvbuS3Used = 1;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    // 红色圆范围显示(直径5:切比雪夫≤2)
    for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
            const nr = row + dr, nc = col + dc;
            if (isValidPosition(nr, nc)) gameState.board[nr][nc].classList.add('lvbu-zone');
        }
    }
    // 落地后:攻击 + 白色旋转特效 + 圈内护甲+1
    const doLand = () => {
        lvbu.row = row; lvbu.col = col;
        renderUnit(lvbu);
        // 白色旋转特效(转一圈)
        showLvbuSlash(lvbu);
        // 圆圈内敌人4伤
        gameState.units.slice().forEach(u => {
            if (u.team === lvbu.team || u.ghost || u._removing) return;
            if (Math.max(Math.abs(u.row - row), Math.abs(u.col - col)) <= 2) {
                const dmg = Math.max(0, 4 - Math.max(0, (u.armor || 0)));
                u.currentHp -= dmg;
                updateUnitHp(u);
                showCritText(u.row, u.col, '神魔降世');
                if (u.currentHp <= 0) removeUnit(u);
            }
        });
        // 圈内护甲+1(持续到敌方回合结束)
        lvbu._lvbuZoneArmor = true;
        lvbu.armor = (lvbu.armor || 0) + 1;
        showHeroDeployText(lvbu, '神魔降世', '#c0392b', 1200);
    };
    // 跳跃动画:吕布从原位跳到圆心(减速清晰可见)
    const oldCell = gameState.board[lvbu.row][lvbu.col];
    const el = oldCell ? oldCell.querySelector('.unit') : null;
    if (el) {
        const fromRow = lvbu.row, fromCol = lvbu.col;
        oldCell.removeChild(el);
        el.style.position = 'absolute';
        el.style.zIndex = '45';
        el.style.pointerEvents = 'none';
        el.style.left = (fromCol * cellW) + 'px';
        el.style.top = (fromRow * cellH) + 'px';
        el.style.animation = 'lvbuJump 0.7s ease-in-out';
        board.appendChild(el);
        void el.offsetLeft; // 强制 reflow,确保初始位置渲染后再启动过渡
        el.style.transition = 'left 0.7s ease-in, top 0.7s ease-in';
        requestAnimationFrame(() => {
            el.style.left = (col * cellW) + 'px';
            el.style.top = (row * cellH) + 'px';
        });
        setTimeout(() => {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[row][col].appendChild(el);
            doLand();
        }, 720);
    } else {
        doLand();
    }
}

// 吕布大招白色旋转特效(转一圈)
function showLvbuSlash(lvbu) {
    const board = document.getElementById('gameBoard');
    const s = document.createElement('div');
    s.className = 'lvbu-slash';
    s.style.position = 'absolute';
    s.style.left = (lvbu.col * cellW + cellW / 2 - 36) + 'px';
    s.style.top = (lvbu.row * cellH + cellH / 2 - 36) + 'px';
    board.appendChild(s);
    setTimeout(() => { if (s.parentNode) s.parentNode.removeChild(s); }, 600);
}

// ===== 迈特凯·死门 =====
// 冲撞攻击:冲到敌人面前撞击3伤
function guyChargeAttack(guy, target) {
    if (guy._guyCharges >= 4) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 冲撞动画:死门凯冲到敌人面前(相邻格)
    const board = document.getElementById('gameBoard');
    const oldCell = gameState.board[guy.row][guy.col];
    const el = oldCell.querySelector('.unit');
    let landR = guy.row, landC = guy.col;
    const dirR = Math.sign(target.row - guy.row), dirC = Math.sign(target.col - guy.col);
    const nr = target.row - dirR, nc = target.col - dirC;
    if (isValidPosition(nr, nc) && !gameState.units.some(u => u.id !== guy.id && u.row === nr && u.col === nc)) {
        landR = nr; landC = nc;
    }
    if (el) {
        oldCell.removeChild(el);
        el.style.position = 'absolute';
        el.style.zIndex = '45';
        el.style.transform = 'none';
        el.style.transition = 'left 0.3s ease-in, top 0.3s ease-in';
        el.style.left = (guy.col * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (guy.row * cellH + cellH / 2 - 10) + 'px';
        board.appendChild(el);
        void el.offsetLeft;
        requestAnimationFrame(() => {
            el.style.left = (landC * cellW + cellW / 2 - 10) + 'px';
            el.style.top = (landR * cellH + cellH / 2 - 10) + 'px';
        });
        setTimeout(() => {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[landR][landC].appendChild(el);
            guy.row = landR; guy.col = landC;
            renderUnit(guy);
            // 撞击伤害
            const dmg = Math.max(0, (guy.attack || 3) - Math.max(0, (target.armor || 0) - (guy.armorPen || 0)));
            target.currentHp -= dmg;
            updateUnitHp(target);
            
            if (target.currentHp <= 0) removeUnit(target);
            finishGuyCharge(guy);
        }, 320);
    } else {
        guy.row = landR; guy.col = landC;
        renderUnit(guy);
        const dmg = Math.max(0, (guy.attack || 3) - Math.max(0, (target.armor || 0) - (guy.armorPen || 0)));
        target.currentHp -= dmg;
        updateUnitHp(target);
        if (target.currentHp <= 0) removeUnit(target);
        finishGuyCharge(guy);
    }
}

// 冲撞结算:次数+能量(每撞2次+1能量,上限4)
function finishGuyCharge(guy) {
    guy._guyCharges = (guy._guyCharges || 0) + 1;
    if (guy._guyCharges % 2 === 0) {
        guy.guyEnergy = Math.min(guy.guyMaxEnergy || 4, (guy.guyEnergy || 0) + 1);
        const el = gameState.board[guy.row][guy.col].querySelector('.unit');
        if (el) renderEnergyBar(guy, el);
        showHeroDeployText(guy, '能量+1', '#3498db', 800);
    }
    if (guy._guyCharges >= 4) gameState.attackedUnits.add(guy.id);
    clearHighlights();
    gameState.selectedUnit = null;
}

// 双击:3格内有敌人 → 进入奥义选敌(爆衣且4能量则弹技能框)
function guyDoubleClick(guy) {
    const hasEnemy3 = gameState.units.some(e => e.team !== guy.team && !e.ghost && Math.max(Math.abs(e.row - guy.row), Math.abs(e.col - guy.col)) <= 3);
    if (!hasEnemy3) return false; // 双击没反应
    if (guy._guyAwakened && (guy.guyEnergy || 0) >= (guy.guyMaxEnergy || 4)) {
        openGuySkillModal(guy);
        return true;
    }
    if ((guy.guyEnergy || 0) >= (guy.guyMaxEnergy || 4)) {
        enterGuyUltimateTarget(guy, 'elephant');
        return true;
    }
    return false;
}

function enterGuyUltimateTarget(guy, type) {
    clearHighlights();
    guy._guyUltTargeting = type;
    const range = type === 'night' ? 3 : 3;
    gameState.units.forEach(u => {
        if (u.team === guy.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - guy.row), Math.abs(u.col - guy.col)) <= range) {
            gameState.board[u.row][u.col].classList.add('tank-target');
        }
    });
}

// 夕象伍足:绕圈3圈每圈2伤 → 四道白光各1伤 → 米字形+粗白光3伤
function guyElephantStomp(guy, target) {
    guy._guyUltTargeting = null;
    guy.guyEnergy = 0;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    const bonus = guy._guyAwakened ? 2 : 0; // 爆衣技能每段+2
    // 死门凯图标绕敌人跑3圈
    const el = gameState.board[guy.row][guy.col].querySelector('.unit');
    const oldCell = gameState.board[guy.row][guy.col];
    if (el) { oldCell.removeChild(el); el.style.position = 'absolute'; el.style.zIndex = '45'; el.style.pointerEvents = 'none'; board.appendChild(el); }
    const cx = target.col * cellW + cellW / 2, cy = target.row * cellH + cellH / 2;
    const radius = 46;
    const totalSteps = 3 * 20;
    for (let i = 1; i <= totalSteps; i++) {
        setTimeout(() => {
            const ang = (i / 20) * Math.PI * 2;
            const x = cx + Math.cos(ang) * radius - 10;
            const y = cy + Math.sin(ang) * radius - 10;
            if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; }
            if (i % 20 === 0) {
                // 每圈结束对敌人2伤
                if (!target._removing) {
                    target.currentHp -= 2 + bonus;
                    updateUnitHp(target);
                    showCritText(target.row, target.col, '夕象');
                    if (target.currentHp <= 0) { removeUnit(target); }
                }
            }
        }, i * 22);
    }
    // 图标消失 → 四道白光依次插入(每道1伤)→ 米字形 → 粗白光3伤
    const lastStep = totalSteps * 22 + 200;
    setTimeout(() => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
        if (target._removing) return;
        for (let d = 1; d <= 4; d++) {
            setTimeout(() => {
                if (target._removing) return;
                showGuyBeam(target, d, 'thin');
                target.currentHp -= 1 + bonus;
                updateUnitHp(target);
                showCritText(target.row, target.col, '白光');
                if (target.currentHp <= 0) removeUnit(target);
            }, d * 350);
        }
        setTimeout(() => {
            if (target._removing) return;
            showGuyBeam(target, 0, 'cross');
            setTimeout(() => {
                // 最后一段白光后恢复死门凯图标
                renderUnit(guy);
                if (target._removing) return;
                showGuyBeam(target, 0, 'thick');
                target.currentHp -= 3 + bonus;
                updateUnitHp(target);
                showCritText(target.row, target.col, '夕象伍足');
                if (target.currentHp <= 0) removeUnit(target);
            }, 600);
        }, 4 * 350 + 300);
    }, lastStep);
    // 保持一回合4次冲撞总限制（不因奥义重置）
}

// 白光特效:细光柱/米字形/粗光柱
function showGuyBeam(target, dir, type) {
    const board = document.getElementById('gameBoard');
    const cx = target.col * cellW + cellW / 2, cy = target.row * cellH + cellH / 2;
    if (type === 'thin') {
        const b = document.createElement('div');
        b.className = 'guy-beam';
        b.style.position = 'absolute';
        // 四道白光各有角度（30/75/120/165度，不相互垂直），从敌人中心向各自方向放射插入
        const angle = [30, 75, 120, 165][(dir - 1) % 4] || 45;
        b.style.left = (cx - 3) + 'px';
        b.style.top = (cy - 70) + 'px';
        b.style.width = '6px';
        b.style.height = '140px';
        b.style.transformOrigin = '50% 50%';
        b.style.transform = 'rotate(' + angle + 'deg)';
        board.appendChild(b);
        setTimeout(() => b.remove(), 500);
    } else if (type === 'cross') {
        // 米字形:4方向白光
        [[-1,0],[1,0],[0,-1],[0,1]].forEach(p => {
            const b = document.createElement('div');
            b.className = 'guy-beam-cross';
            b.style.position = 'absolute';
            const len = 70;
            if (p[0] !== 0) { b.style.left = (cx - 3) + 'px'; b.style.top = (cy + (p[0] > 0 ? 0 : -len)) + 'px'; b.style.height = len + 'px'; }
            else { b.style.top = (cy - 3) + 'px'; b.style.left = (cx + (p[1] > 0 ? 0 : -len)) + 'px'; b.style.width = len + 'px'; b.style.height = '6px'; }
            board.appendChild(b);
            setTimeout(() => b.remove(), 500);
        });
    } else {
        const b = document.createElement('div');
        b.className = 'guy-beam-thick';
        b.style.position = 'absolute';
        b.style.left = (cx - 8) + 'px';
        b.style.top = ((target.row - 8) * cellH) + 'px';
        b.style.height = (9 * cellH) + 'px';
        board.appendChild(b);
        setTimeout(() => b.remove(), 600);
    }
}

// 夜凯:冲上去踢一脚10伤,敌未死则死门凯死亡
function guyNightGuy(guy, target) {
    guy._guyUltTargeting = null;
    guy.guyEnergy = 0;
    clearHighlights();
    gameState.selectedUnit = null;
    const bonus = 2;
    // 冲上去踢
    const oldCell = gameState.board[guy.row][guy.col];
    const el = oldCell.querySelector('.unit');
    const dirR = Math.sign(target.row - guy.row), dirC = Math.sign(target.col - guy.col);
    const nr = target.row - dirR, nc = target.col - dirC;
    let landR = guy.row, landC = guy.col;
    if (isValidPosition(nr, nc) && !gameState.units.some(u => u.id !== guy.id && u.row === nr && u.col === nc)) { landR = nr; landC = nc; }
    if (el) {
        oldCell.removeChild(el);
        el.style.position = 'absolute';
        el.style.zIndex = '45';
        el.style.transform = 'none';
        el.style.transition = 'left 0.35s ease-in, top 0.35s ease-in';
        el.style.left = (guy.col * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (guy.row * cellH + cellH / 2 - 10) + 'px';
        document.getElementById('gameBoard').appendChild(el);
        void el.offsetLeft;
        requestAnimationFrame(() => { el.style.left = (landC * cellW + cellW / 2 - 10) + 'px'; el.style.top = (landR * cellH + cellH / 2 - 10) + 'px'; });
        setTimeout(() => {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[landR][landC].appendChild(el);
            guy.row = landR; guy.col = landC;
            renderUnit(guy);
            // 踢击伤害（夜凯10伤+爆衣2；血量越低伤害越高：每低1血+1，基准5血）
            const hpBonus = Math.max(0, 5 - (guy.currentHp || 0));
            const dmg = Math.max(0, (10 + bonus + hpBonus) - Math.max(0, (target.armor || 0)));
            target.currentHp -= dmg;
            updateUnitHp(target);
            showCritText(target.row, target.col, '夜凯');
            const killed = target.currentHp <= 0;
            if (killed) removeUnit(target);
            // 敌未死 → 死门凯死亡
            if (!killed && !guy._removing) {
                showHeroDeployText(guy, '夜凯', '#c0392b', 1500);
                removeUnit(guy);
            }
        }, 380);
    }
}

// 爆衣状态:血量≤5时获得攻击+2、技能每段+2、红色呼吸光晕
function guyCheckAwaken(guy) {
    if (!guy._guyAwakened && guy.currentHp <= 5) {
        guy._guyAwakened = true;
        guy.attack += 2; // 永久攻击力加成
        const el = gameState.board[guy.row][guy.col].querySelector('.unit');
        if (el) el.classList.add('guy-awakened');
        showHeroDeployText(guy, '爆衣', '#e74c3c', 2000);
    }
}

// 死门凯技能框(爆衣+4能量双击)
function openGuySkillModal(guy) {
    gameState._guySelected = guy;
    document.getElementById('guySkillModal').classList.remove('hidden');
}
function closeGuySkillModalFunc() {
    document.getElementById('guySkillModal').classList.add('hidden');
    gameState._guySelected = null;
}

// 移除单位
function removeUnit(unit) {
// 石墙守护:无敌期间不可被移除(秒杀类兜底)
if (unit._stoneWallProtect) {
    unit.currentHp = unit._stoneWallHpBase;
    return;
}
// 毁灭菇:死亡时爆炸(敌方攻击致死触发;双击引爆已标记 _doomExploded 防重复)
if (unit.doomShroom && !unit._doomExploded) {
    doomShroomExplode(unit);
    return;
}
// 精英骑士死亡:金色法阵消失(嘲讽结束)
if (unit.eliteKnight) {
    gameState.knightZones = gameState.knightZones.filter(z => z.owner !== unit.id);
    renderKnightZones();
}
    // 清除死亡单位的中毒徽章等残留特效
    const deathCell = gameState.board[unit.row] ? gameState.board[unit.row][unit.col] : null;
    if (deathCell) {
        const pb = deathCell.querySelector('.poison-badge');
        if (pb) pb.remove();
    }
    // 阴兵无敌兜底:任何伤害/移除都杀不死(除非大哥死亡级联),被打自动回满血
    if (unit.ghost && !unit._bossKill) {
        unit.currentHp = unit.maxHp;
        return;
    }
    // 戈仑石人:死亡分裂成两个小石头人(一左一右,不递归分裂)
    if (unit.golem) {
        [[0,-1],[0,1]].forEach(p => {
            const nr = unit.row + p[0], nc = unit.col + p[1];
            if (!isValidPosition(nr, nc)) return;
            if (gameState.units.some(u => u.row === nr && u.col === nc)) return;
            if (isBlueBase(nr, nc) || isRedBase(nr, nc)) return;
            const mini = { id: 'golem_mini_' + Date.now() + '_' + Math.random(), cardId: 'golem_mini', name: '小石头人', attack: 1, maxHp: 6, currentHp: 6, armor: 0, moveRange: 3, attackRange: 2, artwork: 'golem-mini', team: unit.team, row: nr, col: nc, golemMini: true };
            gameState.units.push(mini);
            renderUnit(mini);
        });
    }
    // 黑绝:队友死亡,黑绝回归本体(保留附身时血量)
    if (unit._possessed && unit.zetsu) {
        const z = unit.zetsu;
        const zUnit = { id: 'black_zetsu_' + Date.now() + '_' + Math.random(), cardId: 'black_zetsu', name: '黑绝', attack: 2, maxHp: 6, currentHp: Math.max(1, z.currentHp), armor: 0, moveRange: 10, attackRange: 2, artwork: 'black_zetsu', team: unit.team, row: unit.row, col: unit.col, blackZetsu: true };
        gameState.units.push(zUnit);
        renderUnit(zUnit);

        releaseZetsu(unit);
    }
    // 条子:警车被摧毁时,车内警察全部出来(不再回警车,独立行动)
    if (unit.copSpawn && unit.copHps) {
        var dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
        unit.copHps.forEach((hp, i) => {
            if (hp == null) return;
            var nr = unit.row + dirs[i][0], nc = unit.col + dirs[i][1];
            if (!isValidPosition(nr, nc) || gameState.units.some(u => u.row === nr && u.col === nc)) { nr = unit.row; nc = unit.col; }
            var ranged = i === 0 || i === 3;
            var cop = {id:'cop_'+i+'_'+Date.now()+'_'+Math.random(),name:ranged?'警察(远程)':'警察(近战)',attack:ranged?4:2,maxHp:3,currentHp:hp,armor:1,armorPen:ranged?0:1,meleeAttack:ranged?0:2,meleeRange:1,moveRange:7,attackRange:ranged?6:1,team:unit.team,row:nr,col:nc,artwork:ranged?'cop-r':'cop-m',cop:true,copCar:null,copIndex:i};
            gameState.units.push(cop);renderUnit(cop);
        });
    }
    // 骷髅士兵(非大哥)死亡→阴兵状态(数值不变、无敌、不消失)--任何死亡途径统一处理
    if (unit.skullSoldier && !unit.ghost && !unit.skullBoss) {
        // 大哥已死:骷髅直接死亡(不再变阴兵,防止延迟伤害中大哥先死后续骷髅逃过级联)
        const bossAlive = gameState.units.some(u => u.id === unit.skullBossId);
        if (!bossAlive) {
            // 走正常移除流程
        } else {
            unit.ghost = true;
            unit.currentHp = unit.maxHp;
            makeGhostVisual(unit);
            return;
        }
    }
    // 骷髅大哥死亡:所有阴兵状态的骷髅也死亡(活着的保留)
    if (unit.skullBoss) {
        gameState.units.filter(u => u.skullSoldier && u.ghost && u.skullBossId === unit.id).forEach(g => { g._bossKill = true; removeUnit(g); });
    }
    // 警察阵亡:记录到警车(不复活)
    if (unit.cop && unit.copCar) {
        var copCar = gameState.units.find(function(u) { return u.id === unit.copCar; });
        if (copCar && copCar.copHps) copCar.copHps[unit.copIndex] = null;
    }
    // 战车死亡:给老太加攻击次数
    if (unit.tankMaster) {
        var m = gameState.units.find(function(u) { return u.id === unit.tankMaster; });
        if (m && !m._demuTankBonus) {
            m._demuTankBonus = true;
            m.demuBonusAttacks = (m.demuBonusAttacks || 0) + 1;
            showHeroDeployText(m, '我的战车!你要给它陪葬!', '#1a1a1a', 2000);
        }
    }
    // 主将死亡:战车一起死
    if (unit.tankSpawn) {
        gameState.units.filter(function(u) { return u.tankMaster === unit.id; }).forEach(function(t) {
            removeUnit(t);
        });
    }
    const cell = gameState.board[unit.row][unit.col];
    const unitElement = cell.querySelector('.unit');
    if (unitElement) {
        cell.removeChild(unitElement);
    }
    gameState.units = gameState.units.filter(function(u) { return u.id !== unit.id; });
}
// 更新单位血量显示
function updateUnitHp(unit) {
    // 石墙守护:无敌期间任何伤害都恢复(冰冻等效果不受影响)
    if (unit._stoneWallProtect && unit.currentHp < unit._stoneWallHpBase) {
        unit.currentHp = unit._stoneWallHpBase;
    }
    // 按单位id查找元素(单位可能被特效移出格子,如地爆天星收集阶段)
    const uel = document.querySelector('.unit[data-unit-id="' + unit.id + '"]');
    if (unit.dummy) {
        const hpText = uel ? uel.querySelector('.dummy-hp') : null;
        if (hpText) hpText.textContent = unit.currentHp + '/' + unit.maxHp;
    }
    const hpFill = uel ? uel.querySelector('.unit-hp-fill') : null;
    if (hpFill) {
        const percentage = Math.max(0, (unit.currentHp / unit.maxHp) * 100);
        hpFill.style.width = `${percentage}%`;
        if (percentage < 25) hpFill.style.background = '#e74c3c';
        else if (percentage < 50) hpFill.style.background = '#f39c12';
        else hpFill.style.background = '#27ae60';
    }
    // 凋零半血变身:降为正常单位(不再是飞行单位)
    if (unit.wither && unit.currentHp <= (unit.maxHp || 8) / 2 && unit.flying) {
        unit.flying = false;
    }
}

// 渲染单位
function renderUnit(unit) {
    const cell = gameState.board[unit.row][unit.col];

    // 清理旧位置残留的单位 DOM(直接改坐标后渲染会留旧图标)
    document.querySelectorAll('.unit[data-unit-id="' + unit.id + '"]').forEach(el => {
        if (el.parentNode !== cell) el.parentNode.removeChild(el);
    });

    // 移除已存在的单位
    const existingUnit = cell.querySelector('.unit');
    if (existingUnit) {
        cell.removeChild(existingUnit);
    }

    const unitElement = document.createElement('div');
    const artworkClass = unit.artwork ? `art-${unit.artwork}` : '';
    unitElement.className = `unit ${unit.team} ${artworkClass}`;
    unitElement.dataset.unitId = unit.id;

    // 训练木偶头顶血量
    if (unit.dummy) {
        const hpEl = document.createElement('div');
        hpEl.className = 'dummy-hp';
        hpEl.textContent = unit.currentHp + '/' + unit.maxHp;
        unitElement.appendChild(hpEl);
    }

    // 艾琳头顶计数
    if (unit.erin) {
        const cntEl = document.createElement('div');
        cntEl.className = 'erin-counter';
        cntEl.textContent = (unit.erinCount||0) + (unit.erinShield > 0 ? ' 🛡' + unit.erinShield : '');
        unitElement.appendChild(cntEl);
    }

    // 添加血量条(使用独立类名,避免被通用 .hp-bar 的 150px 宽样式影响)
    const hpBar = document.createElement('div');
    hpBar.className = 'unit-hp-bar';
    const hpFill = document.createElement('div');
    hpFill.className = 'unit-hp-fill';
    hpFill.style.width = `${Math.max(0, (unit.currentHp / unit.maxHp) * 100)}%`;
    const hpPct = (unit.currentHp / unit.maxHp) * 100;
    if (hpPct < 25) hpFill.style.background = '#e74c3c';
    else if (hpPct < 50) hpFill.style.background = '#f39c12';
    else hpFill.style.background = '#27ae60';
    hpBar.appendChild(hpFill);
    unitElement.appendChild(hpBar);

    // 标记已攻击的单位
    if (gameState.attackedUnits.has(unit.id)) {
        unitElement.classList.add('has-attacked');
    }

    // 阴兵半透明特效(重渲染后保留,防移动/攻击后丢失)
    if (unit.ghost) unitElement.classList.add('skull-ghost');

    cell.appendChild(unitElement);

    // 马斑/佩恩能量条(嵌在单位内部,跟随移动)
    if (unit.madaraMaxEnergy || unit.painMaxEnergy || unit.hashiMaxEnergy || unit.solveMaxEnergy || unit.guyMaxEnergy) renderEnergyBar(unit, unitElement);

    // 铠大招紫色特效
    if (unit.kaiUltActive) unitElement.classList.add('kai-ult');

    // 冰冻/烟雾可见性
    if (unit.frozen) updateFrozenVisual(unit);
    if (unit.burnTurns > 0) updateBurnVisual(unit);
    if (unit.witherTurns > 0) updateWitherVisual(unit);
    if (unit.grabbed) {
        unitElement.classList.add('grabbed-dot');
        const dot = document.createElement('div');
        dot.className = 'grab-dot';
        unitElement.appendChild(dot);
    }
    if (unit.patroller && unit._grabbing) unitElement.style.display = 'none';
    if (unit.royalGuard) unitElement.classList.add('awakened');
    if (unit.royalGuard && unit.guardShield > 0) unitElement.classList.add('guard-shield');
    if (unit.eliteKnight && unit._knightShield > 0) unitElement.classList.add('guard-shield');
    if (unit._shieldHp > 0) unitElement.classList.add('guard-shield');
    if (unit.guyDeathGate && unit._guyAwakened) unitElement.classList.add('guy-awakened');
    if (unit._rageAttack) unitElement.classList.add('raging');
    if (unit._stoneWallProtect) unitElement.classList.add('stone-bubble');
    if (unit._magicShield) unitElement.classList.add('magic-shield');
    if (unit.teslaHidden) unitElement.classList.add('tesla-hidden');
    if (unit.superKnight) unitElement.classList.add('awakened');
    if (unit.madaraSolve && unit._susanooActive) renderSusanooVisual(unit);
    if (unit._possessed) {
        unitElement.classList.add('zetsu-possessed');
        if (unit.zetsu && unit.zetsu.revealed) unitElement.classList.add('zetsu-revealed');
    }
    updateSmokeVisibility();
}

// 金卡登场漂浮文字
function showHeroDeployText(unit, message, color, duration) {
    if (!message) return;
    const cell = gameState.board[unit.row][unit.col];
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = message || '你掉进陷阱了!';
    if (color) text.style.color = color;
    const ms = duration || 3500;
    text.style.animation = `heroFloat ${ms}ms ease-out forwards`;
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, ms);
}

// 雷斯亲卫队
function summonLeisiGuards(leisi) {
    [[0,-2,'leisi_inf',3,3,1],[0,-1,'leisi_shield',2,4,2],[0,1,'leisi_shield',2,4,2],[0,2,'leisi_inf',3,3,1]].forEach(function(p) {
        var nr=leisi.row+p[0],nc=leisi.col+p[1];
        if(!isValidPosition(nr,nc))return;
        if(gameState.units.some(u => u.row === nr && u.col === nc))return;
        var isShield=p[2]==='leisi_shield';
        var guard={id:p[2]+'_'+Date.now()+'_'+Math.random(),name:isShield?'亲卫队盾兵':'步兵亲卫队',attack:p[3],maxHp:p[4],currentHp:p[4],armor:p[5],armorPen:0,moveRange:4,attackRange:5,team:leisi.team,row:nr,col:nc,artwork:isShield?'leisi-shield':'leisi-inf',guard:true,leisiMaster:leisi.id};
        gameState.units.push(guard);renderUnit(guard);
    });
}

// 条子召唤警察
function spawnCops(car) {
    if (car.copsSpawned) return;
    var hps = car.copHps || [3,3,3,3];
    if (!car.copHps) car.copHps = hps;
    var dirs = [[-1,-1],[-1,1],[1,-1],[1,1]];
    var types = ['ranged','melee','melee','ranged'];
    var spawned = 0;
    for (var i = 0; i < 4; i++) {
        if (hps[i] == null) continue;
        var nr = car.row + dirs[i][0], nc = car.col + dirs[i][1];
        if (!isValidPosition(nr,nc)) continue;
        if (gameState.units.some(u => u.row === nr && u.col === nc)) continue;
        var ranged = types[i] === 'ranged';
        var cop = {id:'cop_'+i+'_'+Date.now()+'_'+Math.random(),name:ranged?'警察(远程)':'警察(近战)',attack:ranged?4:2,maxHp:3,currentHp:hps[i],armor:1,armorPen:ranged?0:1,meleeAttack:ranged?0:2,meleeRange:1,moveRange:7,attackRange:ranged?6:1,team:car.team,row:nr,col:nc,artwork:ranged?'cop-r':'cop-m',cop:true,copCar:car.id,copIndex:i};
        gameState.units.push(cop);renderUnit(cop);
        spawned++;
    }
    if (spawned > 0) car.copsSpawned = true;
}

// 警察回警车动画
function animateCopReturn(cop, car) {
    const copEl = gameState.board[cop.row][cop.col].querySelector('.unit');
    if (!copEl) return;
    const board = document.getElementById('gameBoard');
    copEl.style.position = 'absolute';
    copEl.style.left = (cop.col * cellW + cellW/2 - 10) + 'px';
    copEl.style.top = (cop.row * cellH + cellH/2 - 10) + 'px';
    copEl.style.transition = 'all 900ms ease-in';
    copEl.style.zIndex = '30';
    board.appendChild(copEl);
    setTimeout(() => {
        copEl.style.left = (car.col * cellW + cellW/2 - 10) + 'px';
        copEl.style.top = (car.row * cellH + cellH/2 - 10) + 'px';
        copEl.style.opacity = '0';
    }, 50);
    setTimeout(() => { if (copEl.parentNode) copEl.parentNode.removeChild(copEl); }, 1000);
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
    text.textContent = unit.halfHpText || '典狱长实力受损!';
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
// 霸体:免疫冰冻(马斑无双状态等)
function isImmuneToFreeze(unit) {
    return !!unit.inMusou || (unit.madaraSolve && unit._susanooActive);
}

function updateBurnVisual(unit) {
    // 灼烧立即解除冰冻
    if (unit.frozen) {
        unit.frozen = false;
        updateFrozenVisual(unit);
    }
    const cell = gameState.board[unit.row][unit.col];
    const unitEl = cell.querySelector('.unit');
    if (!unitEl) return;
    if (unit.burnTurns > 0) {
        unitEl.classList.add('burning');
    } else {
        unitEl.classList.remove('burning');
    }
}

// ===== 解斑机制 =====
// 双击主入口:技能→能量→须佐→特殊须佐
function activateSolveAbility(m) {
    // 冰冻/树缠状态:可开特殊须佐(不耗能)
    if (!m._susanooActive && (m.frozen || m.treeBound) && !m._solveSpecialUsed) {
        solveActivateSusanoo(m, true);
        return;
    }
    // 敌方回合受击后可开特殊须佐(一局一次)
    if (!m._susanooActive && m._solveCanSpecial && !m._solveSpecialUsed) {
        solveActivateSusanoo(m, true);
        return;
    }
    // 须佐状态:技能1子弹 / 技能2十字斩(特殊须佐同样可用)
    if (m._susanooActive) {
        if ((m._solveSkillsUsed||0) === 0) { solveSusanooBullets(m); return; }
        if ((m._solveSkillsUsed||0) === 1) { solveSusanooCross(m); return; }
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 非须佐:木龙 → 火遁 → 4能量开须佐 → 查克拉
    if ((m._solveSkillsUsed||0) === 0) {
        m._solvePhase = 'dragon';
        enterSolveDragonSelect(m);
        return;
    }
    if ((m._solveSkillsUsed||0) === 1) {
        solveFireBlast(m);
        return;
    }
    if ((m.solveEnergy||0) >= 4) {
        solveActivateSusanoo(m, false);
        return;
    }
    // 查克拉:+2能量
    m.solveEnergy = Math.min(m.solveMaxEnergy || 4, (m.solveEnergy || 0) + 2);
    renderEnergyBar(m, gameState.board[m.row][m.col].querySelector('.unit'));
    showHeroDeployText(m, '查克拉', '#2980b9', 1000);
    clearHighlights();
    gameState.selectedUnit = null;
}
// 木龙选敌模式:3×8(前方三数列)敌人标红 + 范围提示
function enterSolveDragonSelect(m) {
    clearHighlights();
    // 显示 3×8 范围提示
    document.querySelectorAll('.dragon-range').forEach(el => el.remove());
    const dir = m.team === 'red' ? -1 : 1;
    const board = document.getElementById('gameBoard');
    for (let rr = 1; rr <= 8; rr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = m.row + dir * rr, nc = m.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const rg = document.createElement('div');
            rg.className = 'dragon-range';
            board.appendChild(rg);
            rg.style.left = (nc * cellW) + 'px';
            rg.style.top = (nr * cellH) + 'px';
        }
    }
    gameState.units.forEach(u => {
        if (u.team === m.team || u.ghost) return;
        const dR = Math.abs(u.row - m.row), dC = Math.abs(u.col - m.col);
        if (dR <= 8 && dC <= 1) gameState.board[u.row][u.col].classList.add('tank-target');
    });
}
// 木龙之术:木龙冲(路径3伤)→ 俯冲3×3四伤 → 树缠 → 解斑落地
function solveWoodDragon(m, target) {
    m._solvePhase = null;
    document.querySelectorAll('.dragon-range').forEach(el => el.remove());
    clearHighlights();
    gameState.selectedUnit = null;
    gameState.attackedUnits.add(m.id);
    m._solveSkillsUsed = (m._solveSkillsUsed||0) + 1;
    // 木龙特效出来时显示技能名
    showHeroDeployText(m, '木遁·木龙之术', '#8b5a2b', 1000);
    const dir = m.team === 'red' ? -1 : 1;
    const board = document.getElementById('gameBoard');
    // 木龙从解斑处逐渐伸长飞出(体型/拖尾随飞行变长),头飞向被选敌人
    const d = document.createElement('div');
    d.className = 'wood-dragon' + (dir === 1 ? ' blue' : '');
    d.style.position = 'absolute';
    d.style.left = Math.max(0, (m.col * cellW + cellW / 2 - 9)) + 'px';
    if (dir === -1) {
        // 红方:底部锚定解斑格(bottom = 距容器底距离),向上生长
        d.style.bottom = (BOARD_ROWS * cellH - (m.row + 1) * cellH) + 'px';
        d.style.top = 'auto';
    } else {
        // 蓝方:顶部锚定解斑格,向下生长
        d.style.top = (m.row * cellH) + 'px';
    }
    d.style.height = '0px';
    board.appendChild(d);
    // 解斑骑乘木龙:跟随木龙中央靠前位置(前端25%处)
    const cell = gameState.board[m.row][m.col];
    const el = cell.querySelector('.unit');
    if (el) {
        cell.removeChild(el);
        el.style.position = 'absolute';
        el.style.transform = 'none';
        el.style.left = (m.col * cellW + cellW / 2 - 10) + 'px';
        el.style.zIndex = '42';
        el.style.pointerEvents = 'none';
        board.appendChild(el);
    }
    let hitAny = false;
    // 路径伤害:3×8 竖向范围内敌人 3 伤(木龙经过时)
    const r0 = Math.min(m.row, target.row), r1 = Math.max(m.row, target.row);
    gameState.units.slice().forEach(u => {
        if (u.team === m.team || u.ghost) return;
        if (u.row >= r0 - 1 && u.row <= r1 + 1 && Math.abs(u.col - m.col) <= 1) {
            u.currentHp -= 3;
            updateUnitHp(u);
            hitAny = true;
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
    // 生长动画:木龙从解斑处逐渐伸长到目标(解斑不骑乘,避免重绘闪动)
    const distPx = Math.abs(target.row - m.row) * cellH;
    const animStart = performance.now();
    const animDur = 750;
    const stepGrow = (now) => {
        const p = Math.min(1, (now - animStart) / animDur);
        const h = distPx * p;
        d.style.height = h + 'px';
        // 解斑骑乘:木龙中央靠前(前端25%)
        if (el) {
            if (dir === -1) el.style.top = ((m.row + 1) * cellH - h * 0.75 - cellH / 2 + 10) + 'px';
            else el.style.top = (m.row * cellH + h * 0.75 - cellH / 2 + 10) + 'px';
        }
        if (p < 1) requestAnimationFrame(stepGrow);
        else finishDragon();
    };
    const finishDragon = () => {
        // 俯冲 3×3 四伤 + 树缠 + 解斑落地
        const boom = document.createElement('div');
        boom.className = 'solve-dive';
        boom.style.position = 'absolute';
        boom.style.left = (target.col * cellW) + 'px';
        boom.style.top = (target.row * cellH) + 'px';
        boom.style.width = (3 * cellW) + 'px';
        boom.style.height = (3 * cellH) + 'px';
        board.appendChild(boom);
        setTimeout(() => boom.remove(), 500);
        gameState.units.slice().forEach(u => {
            if (u.team === m.team || u.ghost || u._removing) return;
            if (Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col)) <= 1) {
                u.currentHp -= 4;
                updateUnitHp(u);
                hitAny = true;
                if (u.currentHp <= 0) { removeUnit(u); return; }
                if (u.treeBoundTurns === undefined || u.treeBoundTurns <= 0) {
                    u.treeBound = true;
                    u.treeBoundTurns = 2;
                    updateTreeVisual(u);
                }
            }
        });
        // 木龙消失、解斑落地目标面前
        if (d.parentNode) d.parentNode.removeChild(d);
        const landR = target.row - dir, landC = target.col;
        if (!isValidPosition(landR, landC)) { m.row = target.row + dir; m.col = target.col; } else { m.row = landR; m.col = landC; }
        if (el) {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[m.row][m.col].appendChild(el);
        }
        renderUnit(m);
        if (hitAny) {
            m.solveEnergy = Math.min(m.solveMaxEnergy || 4, (m.solveEnergy || 0) + 1);
            renderEnergyBar(m, gameState.board[m.row][m.col].querySelector('.unit'));
        }
    };
    requestAnimationFrame(stepGrow);
}
// 火遁·豪火灭却:前方3×3 3伤 + 后方3×3 2伤(3×6竖向),树缠额外2伤
function solveFireBlast(m) {
    clearHighlights();
    gameState.selectedUnit = null;
    gameState.attackedUnits.add(m.id);
    m._solveSkillsUsed = (m._solveSkillsUsed||0) + 1;
    const dir = m.team === 'red' ? -1 : 1;
    showHeroDeployText(m, '火遁·豪火灭却', '#e67e22', 1200);
    let hitAny = false;
    // 火焰统一消失时刻(技能开始 + 4.3s,两段一起消失)
    const fireEndAt = performance.now() + 3800;
    const board = document.getElementById('gameBoard');
    // 解斑突出火球 → 火球飞向前方 → 变地上火焰
    const fireball = document.createElement('div');
    fireball.className = 'solve-fireball';
    fireball.style.position = 'absolute';
    fireball.style.left = (m.col * cellW + cellW / 2 - 9) + 'px';
    fireball.style.top = (m.row * cellH + cellH / 2 - 9) + 'px';
    fireball.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
    board.appendChild(fireball);
    // 火球飞向第一段中心(前方3格)
    requestAnimationFrame(() => {
        fireball.style.left = (m.col * cellW + cellW / 2 - 9) + 'px';
        fireball.style.top = ((m.row + dir * 3) * cellH + cellH / 2 - 9) + 'px';
    });
    // 火球到达:变成地上火焰 3×3 + 3伤
    setTimeout(() => {
        if (fireball.parentNode) fireball.parentNode.removeChild(fireball);
        renderSolveFire(m, 1, 3, dir, fireEndAt);
        hitAny = dealSolveFire(m, 1, 3, dir, 3, hitAny) || hitAny;
    }, 500);
    // 第二段:火焰延长为 3×6(前方火保留)+ 后方2伤(间隔加长)
    setTimeout(() => {
        renderSolveFire(m, 4, 6, dir, fireEndAt);
        hitAny = dealSolveFire(m, 4, 6, dir, 2, hitAny) || hitAny;
        if (hitAny) {
            m.solveEnergy = Math.min(m.solveMaxEnergy || 4, (m.solveEnergy || 0) + 1);
            renderEnergyBar(m, gameState.board[m.row][m.col].querySelector('.unit'));
        }
    }, 1600);
}
// 火焰视觉:范围内格子显示火焰(统一到技能结束时刻一起消失)
function renderSolveFire(m, offStart, offEnd, dir, fireEndAt) {
    const board = document.getElementById('gameBoard');
    for (let off = offStart; off <= offEnd; off++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = m.row + dir * off, nc = m.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const f = document.createElement('div');
            f.className = 'solve-fire';
            f.style.position = 'absolute';
            board.appendChild(f);
            f.style.left = (nc * cellW) + 'px';
            f.style.top = (nr * cellH) + 'px';
            const remain = fireEndAt ? Math.max(200, fireEndAt - performance.now()) : 2700;
            setTimeout(() => { if (f.parentNode) f.parentNode.removeChild(f); }, remain);
        }
    }
}
// 火焰伤害(含树缠额外2伤)
function dealSolveFire(m, offStart, offEnd, dir, dmg, hitAny) {
    for (let off = offStart; off <= offEnd; off++) {
        gameState.units.slice().forEach(u => {
            if (u.team === m.team || u.ghost || u._removing) return;
            const rowOff = (u.row - m.row) * dir;
            if (rowOff === off && Math.abs(u.col - m.col) <= 1) {
                u.currentHp -= dmg;
                updateUnitHp(u);
                hitAny = true;
                if (u.currentHp <= 0) { removeUnit(u); return; }
                // 树缠敌人额外2伤
                if (u.treeBound) {
                    u.currentHp -= 2;
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            }
        });
    }
    return hitAny;
}
// 开启须佐能乎
function solveActivateSusanoo(m, special) {
    if (m._susanooActive) return;
    if (!special) {
        m.solveEnergy = Math.max(0, (m.solveEnergy || 0) - 4);
    } else {
        m._solveSpecialUsed = true;
    }
    m._susanooActive = true;
    m._susanooSpecial = special;
    m._solveSkillsUsed = 0;
    m._solveCanSpecial = false;
    // 须佐霸体:开启时解除冰冻(冰冻状态也能开须佐,开后可正常释放须佐技能)
    if (m.frozen) {
        m.frozen = false;
        updateFrozenVisual(m);
    }
    // 开启须佐:把3×3范围内的敌人挤出范围(霸体/建筑免疫)
    gameState.units.slice().forEach(u => {
        if (u.team === m.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - m.row), Math.abs(u.col - m.col)) <= 1) {
            const dr = Math.sign(u.row - m.row), dc = Math.sign(u.col - m.col);
            if (dr === 0 && dc === 0) return;
            flingUnit(u, dr, dc, 2);
        }
    });
    showHeroDeployText(m, '完全体须佐能乎', '#3498db', 2500);
    // 移动范围 6
    m.moveRange = 6;
    renderSusanooVisual(m);
    renderEnergyBar(m, gameState.board[m.row][m.col].querySelector('.unit'));
    clearHighlights();
    gameState.selectedUnit = null;
}
// 须佐 3×3 蓝色特效
function renderSusanooVisual(m) {
    document.querySelectorAll('.susanoo-cell').forEach(el => { if (el.dataset.owner === m.id) el.remove(); });
    if (!m._susanooActive) return;
    const board = document.getElementById('gameBoard');
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const nr = m.row + dr, nc = m.col + dc;
            if (!isValidPosition(nr, nc)) continue;
            const cell = document.createElement('div');
            cell.className = 'susanoo-cell';
            cell.dataset.owner = m.id;
            cell.style.position = 'absolute';
            board.appendChild(cell);
            cell.style.left = (nc * cellW) + 'px';
            cell.style.top = (nr * cellH) + 'px';
        }
    }
}
    // 须佐技能1:前方竖向3×5 四颗蓝色子弹(并排≤2列、纵向错开、穿透),每颗2伤
    function solveSusanooBullets(m) {
        clearHighlights();
        gameState.selectedUnit = null;
        gameState.attackedUnits.add(m.id);
        m._solveSkillsUsed = (m._solveSkillsUsed||0) + 1;
        const dir = m.team === 'red' ? -1 : 1;
        const board = document.getElementById('gameBoard');
        // 4颗子弹分布在两列(colOff: 0,0,1,1),纵向稍微错开
        const colOffs = [0, 0, 1, 1];
        for (let i = 0; i < 4; i++) {
            const colOff = colOffs[i];
            const bullet = document.createElement('div');
            bullet.className = 'solve-bullet';
            bullet.style.position = 'absolute';
            bullet.style.left = ((m.col + colOff) * cellW + cellW / 2 - 6) + 'px';
            bullet.style.top = (m.row * cellH + cellH / 2 - 6 + i * 8) + 'px';
            bullet.style.transition = 'top 0.7s linear';
            board.appendChild(bullet);
            // 目标行:前方5行
            const targetRow = m.row + dir * 5;
            setTimeout(() => {
                bullet.style.top = (targetRow * cellH + cellH / 2 - 6 + i * 8) + 'px';
            }, 40);
            // 对路径上敌人造成伤害(穿透:3×5 竖向)
            gameState.units.slice().forEach(u => {
                if (u.team === m.team || u.ghost || u._removing) return;
                const rOff = (u.row - m.row) * dir;
                if (rOff >= 1 && rOff <= 5 && Math.abs(u.col - (m.col + colOff)) <= 1) {
                    u.currentHp -= 2;
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
            setTimeout(() => bullet.remove(), 800);
        }
    }
// 须佐技能2:前方5×5十字斩(蓝色×)
function solveSusanooCross(m) {
    clearHighlights();
    gameState.selectedUnit = null;
    gameState.attackedUnits.add(m.id);
    m._solveSkillsUsed = (m._solveSkillsUsed||0) + 1;
    const dir = m.team === 'red' ? -1 : 1;
    const board = document.getElementById('gameBoard');
    // 十字斩:从须佐处发射,飞向前方5×5区域并放大
    const cross = document.createElement('div');
    cross.className = 'solve-cross';
    cross.textContent = '×';
    cross.style.position = 'absolute';
    const fromL = m.col * cellW + cellW / 2 - 20;
    const fromT = m.row * cellH + cellH / 2 - 20;
    const toL = (m.col - 2) * cellW;
    const toT = (dir === -1 ? (m.row - 5) * cellH : m.row * cellH);
    cross.style.left = fromL + 'px';
    cross.style.top = fromT + 'px';
    cross.style.width = '40px';
    cross.style.height = '40px';
    cross.style.fontSize = '50px';
    cross.style.opacity = '0.6';
    cross.style.transition = 'left 0.35s ease-out, top 0.35s ease-out, width 0.35s ease-out, height 0.35s ease-out, font-size 0.35s ease-out, opacity 0.35s ease-out';
    board.appendChild(cross);
    requestAnimationFrame(() => {
        cross.style.left = toL + 'px';
        cross.style.top = toT + 'px';
        cross.style.width = (5 * cellW) + 'px';
        cross.style.height = (5 * cellH) + 'px';
        cross.style.fontSize = '175px';
        cross.style.opacity = '1';
    });
    // 到达目标区域后造成伤害
    setTimeout(() => {
        gameState.units.slice().forEach(u => {
            if (u.team === m.team || u.ghost || u._removing) return;
            const rOff = (u.row - m.row) * dir;
            if (rOff >= 1 && rOff <= 5 && Math.abs(u.col - m.col) <= 2) {
                u.currentHp -= 3;
                updateUnitHp(u);
                if (u.currentHp <= 0) removeUnit(u);
            }
        });
    }, 400);
    setTimeout(() => cross.remove(), 900);
}
// 终极奥义:蓝色大剑插入5×5区域,3次×3伤
function solveUltimateAttack(m, target) {
    m._solvePhase = null;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    // 计算 5×5 范围内敌人的中间位置(单敌则瞄准该敌)
    let sumR = 0, sumC = 0, cnt = 0;
    gameState.units.forEach(u => {
        if (u.team === m.team || u.ghost || u._removing) return;
        if (Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col)) <= 2) {
            sumR += u.row; sumC += u.col; cnt++;
        }
    });
    const cR = cnt > 0 ? Math.round(sumR / cnt) : target.row;
    const cC = cnt > 0 ? Math.round(sumC / cnt) : target.col;
    const sword = document.createElement('div');
    sword.className = 'solve-sword';
    sword.style.position = 'absolute';
    // 蓝色大剑:剑身 + 剑尖 + 剑格 + 剑柄
    const blade = document.createElement('div');
    blade.className = 'solve-sword-blade';
    const tip = document.createElement('div');
    tip.className = 'solve-sword-tip';
    const guard = document.createElement('div');
    guard.className = 'solve-sword-guard';
    const handle = document.createElement('div');
    handle.className = 'solve-sword-handle';
    blade.appendChild(tip);
    sword.appendChild(blade);
    sword.appendChild(guard);
    sword.appendChild(handle);
    // 剑头朝下、剑柄在上:从空中下落砸向敌人(落点=敌人中间位置)
    const landT = (cR - 2) * cellH;
    const startT = Math.max(0, (cR - 9) * cellH);
    sword.style.left = ((cC - 2) * cellW) + 'px';
    sword.style.top = startT + 'px';
    sword.style.width = (5 * cellW) + 'px';
    sword.style.height = (5 * cellH) + 'px';
    sword.style.transition = 'top 0.55s ease-in';
    board.appendChild(sword);
    // 大剑从空中落下
    requestAnimationFrame(() => {
        sword.style.top = landT + 'px';
    });
    // 落地后造成伤害(3次×3伤,以敌人中间位置为中心5×5)
    setTimeout(() => {
        for (let hit = 0; hit < 3; hit++) {
            setTimeout(() => {
                gameState.units.slice().forEach(u => {
                    if (u.team === m.team || u.ghost || u._removing) return;
                    if (Math.max(Math.abs(u.row - cR), Math.abs(u.col - cC)) <= 2) {
                        u.currentHp -= 3;
                        updateUnitHp(u);
                        if (u.currentHp <= 0) removeUnit(u);
                    }
                });
            }, hit * 300);
        }
    }, 600);
    setTimeout(() => sword.remove(), 1900);
}

// 解斑反击:火球自动追踪敌人(无论多远),3×3火焰+3伤(无第二段、不加能量)
function solveCounterFire(m, enemy, onDone) {
    const board = document.getElementById('gameBoard');
    const fireball = document.createElement('div');
    fireball.className = 'solve-fireball';
    fireball.style.position = 'absolute';
    fireball.style.left = (m.col * cellW + cellW / 2 - 9) + 'px';
    fireball.style.top = (m.row * cellH + cellH / 2 - 9) + 'px';
    fireball.style.transition = 'left 0.6s ease-in, top 0.6s ease-in';
    board.appendChild(fireball);
    requestAnimationFrame(() => {
        fireball.style.left = (enemy.col * cellW + cellW / 2 - 9) + 'px';
        fireball.style.top = (enemy.row * cellH + cellH / 2 - 9) + 'px';
    });
    setTimeout(() => {
        if (fireball.parentNode) fireball.parentNode.removeChild(fireball);
        const fireEndAt = performance.now() + 2500;
        // 以敌人为中心 3×3 火焰
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = enemy.row + dr, nc = enemy.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const f = document.createElement('div');
                f.className = 'solve-fire';
                f.style.position = 'absolute';
                board.appendChild(f);
                f.style.left = (nc * cellW) + 'px';
                f.style.top = (nr * cellH) + 'px';
                const remain = Math.max(200, fireEndAt - performance.now());
                setTimeout(() => { if (f.parentNode) f.parentNode.removeChild(f); }, remain);
            }
        }
        // 伤害:3×3 内敌人 3伤 + 树缠额外2(不加能量)
        gameState.units.slice().forEach(u => {
            if (u.team === m.team || u.ghost || u._removing) return;
            if (Math.max(Math.abs(u.row - enemy.row), Math.abs(u.col - enemy.col)) <= 1) {
                u.currentHp -= 3;
                updateUnitHp(u);
                if (u.currentHp <= 0) { removeUnit(u); return; }
                if (u.treeBound) {
                    u.currentHp -= 2;
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            }
        });
        // 豪火灭却释放完后:自动开启特殊须佐(一局一次,无需手动双击)
        if (onDone) onDone();
    }, 650);
}

// ===== 治疗精灵机制 =====
// 跳向目标:3×3内友方+2血、敌方-1伤,随后消失
function healFairyJump(attacker, target) {
    clearHighlights();
    gameState.selectedUnit = null;
    gameState.attackedUnits.add(attacker.id);
    // 以目标为中心 3×3
    gameState.units.slice().forEach(u => {
        if (Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col)) > 1) return;
        if (u.team === attacker.team) {
            u.currentHp = Math.min((u.maxHp || 1), (u.currentHp || 0) + 2);
            updateUnitHp(u);
            showCritText(u.row, u.col, '回复');
        } else if (!u.ghost && !u._removing) {
            u.currentHp -= 1;
            updateUnitHp(u);
            showCritText(u.row, u.col, '治愈');
            if (u.currentHp <= 0) removeUnit(u);
        }
    });
    // 奶豆消失(一次性)
    removeUnit(attacker);
}

// ===== 觉醒超级骑士机制 =====
// 霸体免疫击退
function isImmuneToKnockback(unit) {
    return !!unit.inMusou || (unit.madaraSolve && unit._susanooActive);
}
// 须佐连锁推:推 unit 沿 (dr,dc) 1格,挡路单位连锁推开(霸体/建筑免疫)
function susanooPush(unit, dr, dc) {
    if (!unit || unit._removing || unit.ghost || isImmuneToKnockback(unit) || unit.building) return false;
    const tr = unit.row + dr, tc = unit.col + dc;
    if (!isValidPosition(tr, tc)) return false;
    if (isBlueBase(tr, tc) || isRedBase(tr, tc)) return false;
    const blocker = gameState.units.find(u => u.id !== unit.id && u.row === tr && u.col === tc);
    if (blocker) {
        if (!susanooPush(blocker, dr, dc)) return false;
    }
    const oldCell = gameState.board[unit.row][unit.col];
    const newCell = gameState.board[tr][tc];
    const el = oldCell.querySelector('.unit');
    if (el) { oldCell.removeChild(el); newCell.appendChild(el); }
    unit.row = tr; unit.col = tc;
    return true;
}
// 击飞:无视中间障碍,强制飞到方向 dist 格外(落点无效则向前回溯找最近可站格)
function flingUnit(unit, dr, dc, dist) {
    if (!unit || unit._removing || unit.ghost || isImmuneToKnockback(unit) || unit.building) return false;
    let nr = unit.row + dr * dist, nc = unit.col + dc * dist;
    nr = Math.max(0, Math.min(BOARD_ROWS - 1, nr));
    nc = Math.max(0, Math.min(BOARD_COLS - 1, nc));
    while (nr !== unit.row || nc !== unit.col) {
        if (!isBlueBase(nr, nc) && !isRedBase(nr, nc) && !gameState.units.some(u => u.id !== unit.id && u.row === nr && u.col === nc)) break;
        nr -= dr; nc -= dc;
    }
    if (nr !== unit.row || nc !== unit.col) {
        const oldCell = gameState.board[unit.row][unit.col];
        const newCell = gameState.board[nr][nc];
        const el = oldCell.querySelector('.unit');
        if (el) { oldCell.removeChild(el); newCell.appendChild(el); }
        unit.row = nr; unit.col = nc;
        return true;
    }
    return false;
}
// 击退:向 (dr,dc) 方向推 dist 格(碰壁/阻挡停在最近可站位置)
function knockbackUnit(unit, dr, dc, dist) {
    if (!unit || unit._removing || unit.ghost || isImmuneToKnockback(unit) || unit.building) return false;
    let nr = unit.row, nc = unit.col;
    for (let i = 0; i < dist; i++) {
        const tr = nr + dr, tc = nc + dc;
        if (!isValidPosition(tr, tc)) break;
        if (gameState.units.some(u => u.id !== unit.id && u.row === tr && u.col === tc)) break;
        if (isBlueBase(tr, tc) || isRedBase(tr, tc)) break;
        nr = tr; nc = tc;
    }
    if (nr !== unit.row || nc !== unit.col) {
        const oldCell = gameState.board[unit.row][unit.col];
        const newCell = gameState.board[nr][nc];
        const el = oldCell.querySelector('.unit');
        if (el) { oldCell.removeChild(el); newCell.appendChild(el); }
        unit.row = nr; unit.col = nc;
        return true;
    }
    return false;
}
// 跃击:跳向敌人砸4伤,前方2×3敌人击退1格(霸体免疫)
function superKnightLeap(attacker, target) {
    const board = document.getElementById('gameBoard');
    // 跳跃动画:图标飞向敌人
    const cell = gameState.board[attacker.row][attacker.col];
    const el = cell.querySelector('.unit');
    const fromR = attacker.row, fromC = attacker.col;
    const finish = () => {
        // 4伤
        if (target && !target._removing && !target.ghost) {
            target.currentHp -= 4;
            updateUnitHp(target);
            showCritText(target.row, target.col, '跃击');
            if (target.currentHp <= 0) removeUnit(target);
        }
        // 落点 3×3 敌军全部向远离超骑方向击飞1格(含目标,霸体免疫)
        const fromR2 = attacker.row, fromC2 = attacker.col;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = target.row + dr, nc = target.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const u = gameState.units.find(e => e.row === nr && e.col === nc && e.team !== attacker.team && !e.ghost);
                if (!u) continue;
                const kdr = Math.sign(u.row - fromR2), kdc = Math.sign(u.col - fromC2);
                if (kdr === 0 && kdc === 0) continue;
                flingUnit(u, kdr, kdc, 1);
            }
        }
        // 落地:敌人旁空位(敌人死则占敌人格)
        let landR = target.row, landC = target.col;
        if (target && target.currentHp > 0) {
            let found = false;
            for (let rr2 = 1; rr2 <= 2 && !found; rr2++) {
                for (let dr2 = -rr2; dr2 <= rr2 && !found; dr2++) {
                    for (let dc2 = -rr2; dc2 <= rr2 && !found; dc2++) {
                        if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr2) continue;
                        const lr = target.row + dr2, lc = target.col + dc2;
                        if (!isValidPosition(lr, lc)) continue;
                        if (gameState.units.some(u2 => u2.id !== attacker.id && u2.row === lr && u2.col === lc)) continue;
                        if (isBlueBase(lr, lc) || isRedBase(lr, lc)) continue;
                        landR = lr; landC = lc; found = true;
                    }
                }
            }
        }
        attacker.row = landR; attacker.col = landC;
        if (el) {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[landR][landC].appendChild(el);
        }
        renderUnit(attacker);
        clearHighlights();
        gameState.selectedUnit = null;
    };
    if (!el) { finish(); return; }
    cell.removeChild(el);
    el.style.position = 'absolute';
    el.style.transform = 'none';
    el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
    el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
    el.style.transition = 'left 0.35s ease-in, top 0.35s ease-in';
    el.style.zIndex = '40';
    el.style.pointerEvents = 'none';
    board.appendChild(el);
    requestAnimationFrame(() => {
        el.style.left = (target.col * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (target.row * cellH + cellH / 2 - 10) + 'px';
    });
    setTimeout(finish, 380);
}

// ===== 镜机制 =====
// 攻击后以敌人为对称点召唤分身(动画:冲过去重叠→召唤分身→镜倒退、分身走向对称位)
function mirrorSummonClone(mirror, target) {
    const er = target.row, ec = target.col;
    const fromR = mirror.row, fromC = mirror.col;
    // 对称中心 = 被攻击的敌人
    mirror._mirrorCenter = { row: er, col: ec };
    // 对称位置(关于敌人镜像)
    const cr = er + (er - fromR), cc = ec + (ec - fromC);
    if (!isValidPosition(cr, cc)) return;
    const hadClone = !!mirror._mirrorClone;
    mirror._mirrorClone = { row: cr, col: cc };
    const board = document.getElementById('gameBoard');
    const cell = gameState.board[fromR][fromC];
    const el = cell.querySelector('.unit');
    if (!el) { renderMirrorClone(mirror); return; }
    cell.removeChild(el);
    el.style.position = 'absolute';
    el.style.transform = 'none';
    el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
    el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
    el.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
    el.style.zIndex = '40';
    el.style.pointerEvents = 'none';
    board.appendChild(el);
    // 分身元素:已有分身则同步镜像移动;否则冲刺重叠后创建
    let cloneDiv = document.querySelector('.mirror-clone[data-owner="' + mirror.id + '"]');
    // 1. 镜冲向敌人(0.45s);分身(若已有)从对称位镜像移动到敌人处(与镜同步反向同距)
    requestAnimationFrame(() => {
        el.style.left = (ec * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (er * cellH + cellH / 2 - 10) + 'px';
        if (cloneDiv) {
            cloneDiv.style.left = (ec * cellW + cellW / 2 - 14) + 'px';
            cloneDiv.style.top = (er * cellH + cellH / 2 - 14) + 'px';
        }
    });
    // 2. 到达敌人(重叠):第一次攻击在此处创建分身(重叠处)
    setTimeout(() => {
        if (!cloneDiv) {
            cloneDiv = document.createElement('div');
            cloneDiv.className = 'mirror-clone';
            cloneDiv.dataset.owner = mirror.id;
            cloneDiv.textContent = '镜';
            cloneDiv.style.position = 'absolute';
            cloneDiv.style.transform = 'none';
            cloneDiv.style.left = (ec * cellW + cellW / 2 - 14) + 'px';
            cloneDiv.style.top = (er * cellH + cellH / 2 - 14) + 'px';
            cloneDiv.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
            cloneDiv.style.zIndex = '40';
            cloneDiv.style.pointerEvents = 'none';
            board.appendChild(cloneDiv);
        }
        // 3. 镜倒退回原位;分身镜像移动:从敌人处(或重叠处)走到对称位置(反向同距)
        requestAnimationFrame(() => {
            el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
            el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
            cloneDiv.style.left = (cc * cellW + cellW / 2 - 14) + 'px';
            cloneDiv.style.top = (cr * cellH + cellH / 2 - 14) + 'px';
        });
        // 4. 动画结束:镜挂回原位、分身挂到对称位置
        setTimeout(() => {
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            const ncell = gameState.board[fromR][fromC];
            ncell.appendChild(el);
            if (cloneDiv.parentNode) cloneDiv.parentNode.removeChild(cloneDiv);
            renderUnit(mirror);
            renderMirrorClone(mirror);
        }, 470);
    }, 450);
}
// 渲染分身(半透明镜图标)
function renderMirrorClone(mirror) {
    document.querySelectorAll('.mirror-clone').forEach(el => { if (el.dataset.owner === mirror.id) el.remove(); });
    const cl = mirror._mirrorClone;
    if (!cl || !gameState.board[cl.row] || !gameState.board[cl.row][cl.col]) return;
    const div = document.createElement('div');
    div.className = 'mirror-clone';
    div.dataset.owner = mirror.id;
    div.textContent = '镜';
    gameState.board[cl.row][cl.col].appendChild(div);
}
function removeMirrorClone(mirror) {
    document.querySelectorAll('.mirror-clone').forEach(el => { if (el.dataset.owner === mirror.id) el.remove(); });
    if (mirror) mirror._mirrorClone = null;
}
// 双击分身:互换位置
function mirrorSwapWithClone(mirror) {
    const cl = mirror._mirrorClone;
    if (!cl) return;
    const mr = mirror.row, mc = mirror.col;
    mirror.row = cl.row; mirror.col = cl.col;
    cl.row = mr; cl.col = mc;
    renderUnit(mirror);
    renderMirrorClone(mirror);
    clearHighlights();
    gameState.selectedUnit = null;
}
// 技能选敌模式:4格内敌人标红
function enterMirrorSkillMode(mirror) {
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === mirror.team || u.ghost) return;
        if (Math.max(Math.abs(u.row - mirror.row), Math.abs(u.col - mirror.col)) <= 4) {
            gameState.board[u.row][u.col].classList.add('tank-target');
        }
    });
}
// 技能开始:冲撞2伤+定身,创造圆形法阵
function mirrorSkillStart(mirror, target) {
    // 开启法阵台词(黄色,2秒渐隐)
    showHeroDeployText(mirror, '怀八荒,入九重', '#f1c40f', 2000);
    mirror._mirrorSkillMode = false;
    mirror._mirrorSkillCd = 2;
    mirror._mirrorSkillTargetId = target.id;
    removeMirrorClone(mirror);
    const er = target.row, ec = target.col;
    let mr = er, mc = ec - 3, cr = er, cc = ec + 3;
    if (!isValidPosition(mr, mc)) { mr = er; mc = ec + 3; cr = er; cc = ec - 3; }
    const fromR = mirror.row, fromC = mirror.col;
    // 动画:镜冲向敌人(重叠)→ 冲撞2伤+定身 → 镜向左走3格、分身从敌人处向右走3格 → 法阵
    const board = document.getElementById('gameBoard');
    const cell = gameState.board[fromR][fromC];
    const el = cell.querySelector('.unit');
    const buildShards = () => {
        const radius = Math.max(1, Math.abs(mirror.row - target.row) + Math.abs(mirror.col - target.col));
        const shards = [];
        for (let dr = -radius; dr <= radius; dr++) {
            for (let dc = -radius; dc <= radius; dc++) {
                const dist = Math.sqrt(dr * dr + dc * dc);
                if (Math.abs(dist - radius) > 0.5) continue;
                const nr = er + dr, nc = ec + dc;
                if (!isValidPosition(nr, nc)) continue;
                if (isBlueBase(nr, nc) || isRedBase(nr, nc)) continue;
                shards.push({ row: nr, col: nc });
            }
        }
        mirror._mirrorShards = shards;
        renderMirrorShards(mirror);
        clearHighlights();
        gameState.selectedUnit = null;
    };
    if (!el) {
        // 兜底:瞬移放置
        mirror.row = mr; mirror.col = mc;
        renderUnit(mirror);
        mirror._mirrorClone = { row: cr, col: cc };
        renderMirrorClone(mirror);
        if (target && !target._removing && !target.ghost) {
            target.currentHp -= 2;
            updateUnitHp(target);
            showCritText(target.row, target.col, '镜冲撞');
            target.stunned = true;
            target.stunnedTurns = 1;
            if (target.currentHp <= 0) removeUnit(target);
        }
        buildShards();
        return;
    }
    cell.removeChild(el);
    el.style.position = 'absolute';
    el.style.transform = 'none';
    el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
    el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
    el.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
    el.style.zIndex = '40';
    el.style.pointerEvents = 'none';
    board.appendChild(el);
    // 1. 镜冲向敌人(重叠)
    requestAnimationFrame(() => {
        el.style.left = (ec * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (er * cellH + cellH / 2 - 10) + 'px';
    });
    // 2. 到达敌人:冲撞 2 伤 + 定身;分身从敌人处出现
    setTimeout(() => {
        if (target && !target._removing && !target.ghost) {
            target.currentHp -= 2;
            updateUnitHp(target);
            showCritText(target.row, target.col, '镜冲撞');
            target.stunned = true;
            target.stunnedTurns = 1;
            if (target.currentHp <= 0) removeUnit(target);
        }
        const cloneDiv = document.createElement('div');
        cloneDiv.className = 'mirror-clone';
        cloneDiv.dataset.owner = mirror.id;
        cloneDiv.textContent = '镜';
        cloneDiv.style.position = 'absolute';
        cloneDiv.style.transform = 'none';
        cloneDiv.style.left = (ec * cellW + cellW / 2 - 14) + 'px';
        cloneDiv.style.top = (er * cellH + cellH / 2 - 14) + 'px';
        cloneDiv.style.transition = 'left 0.45s ease-in, top 0.45s ease-in';
        cloneDiv.style.zIndex = '40';
        cloneDiv.style.pointerEvents = 'none';
        board.appendChild(cloneDiv);
        // 3. 镜向左走3格 + 分身向右走3格
        requestAnimationFrame(() => {
            el.style.left = (mc * cellW + cellW / 2 - 10) + 'px';
            el.style.top = (mr * cellH + cellH / 2 - 10) + 'px';
            cloneDiv.style.left = (cc * cellW + cellW / 2 - 14) + 'px';
            cloneDiv.style.top = (cr * cellH + cellH / 2 - 14) + 'px';
        });
        // 4. 到达:归位 + 法阵生成
        setTimeout(() => {
            mirror.row = mr; mirror.col = mc;
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            gameState.board[mr][mc].appendChild(el);
            mirror._mirrorClone = { row: cr, col: cc };
            if (cloneDiv.parentNode) cloneDiv.parentNode.removeChild(cloneDiv);
            renderUnit(mirror);
            renderMirrorClone(mirror);
            buildShards();
        }, 470);
    }, 450);
}
// 渲染镜片
function renderMirrorShards(mirror) {
    document.querySelectorAll('.mirror-shard').forEach(el => { if (el.dataset.owner === mirror.id) el.remove(); });
    (mirror._mirrorShards || []).forEach(s => {
        const div = document.createElement('div');
        div.className = 'mirror-shard';
        div.dataset.owner = mirror.id;
        div.textContent = '◇';
        gameState.board[s.row][s.col].appendChild(div);
    });
}
// 换位:镜与分身互换(经过敌人),敌人2伤穿甲1 + 镜片1真伤,回1血
function mirrorSwapOnce(mirror) {
    // 换位进行中锁:位置到了才能进行下一次换位
    if (mirror._mirrorSwapping) return;
    mirror._mirrorSwapping = true;
    const cl = mirror._mirrorClone;
    const target = gameState.units.find(u => u.id === mirror._mirrorSkillTargetId);
    if (!cl || !mirror._mirrorShards || mirror._mirrorShards.length === 0 || !target || target._removing || target.ghost) {
        mirror._mirrorSwapping = false;
        mirrorSkillEnd(mirror);
        return;
    }
    // 镜与分身互相飞向对方位置(必然经过中间的敌人)
    const board = document.getElementById('gameBoard');
    const unitEl = gameState.board[mirror.row][mirror.col].querySelector('.unit');
    const cloneEl = document.querySelector('.mirror-clone[data-owner="' + mirror.id + '"]');
    let remaining = 0;
    const finish = () => {
        if (--remaining > 0) return;
        mirror._mirrorSwapping = false;
        const mr2 = mirror.row, mc2 = mirror.col;
        mirror.row = cl.row; mirror.col = cl.col;
        cl.row = mr2; cl.col = mc2;
        renderUnit(mirror);
        renderMirrorClone(mirror);
        // 敌人 2 伤(穿甲1)+ 镜片 1 真伤 + 回血
        if (target.currentHp > 0) {
            const dmg = Math.max(0, 2 - Math.max(0, (target.armor || 0) - 1));
            target.currentHp -= dmg;
            updateUnitHp(target);
            showCritText(target.row, target.col, '换位');
            const shard = mirror._mirrorShards.shift();
            if (shard) {
                const fly = document.createElement('div');
                fly.className = 'mirror-shard-fly';
                fly.textContent = '◇';
                fly.style.left = (shard.col * cellW) + 'px';
                fly.style.top = (shard.row * cellH) + 'px';
                document.getElementById('gameBoard').appendChild(fly);
                setTimeout(() => {
                    fly.style.left = (target.col * cellW) + 'px';
                    fly.style.top = (target.row * cellH) + 'px';
                }, 30);
                setTimeout(() => fly.remove(), 400);
                target.currentHp -= 1;
                updateUnitHp(target);
            }
            mirror.currentHp = Math.min((mirror.maxHp || 4) + 1, (mirror.currentHp || 0) + 1);
            updateUnitHp(mirror);
            if (target.currentHp <= 0) {
                removeUnit(target);
                mirrorSkillEnd(mirror);
                return;
            }
        }
        renderMirrorShards(mirror);
        if (mirror._mirrorShards.length === 0) mirrorSkillEnd(mirror);
    };
    if (unitEl) {
        remaining++;
        const cell = gameState.board[mirror.row][mirror.col];
        cell.removeChild(unitEl);
        unitEl.style.position = 'absolute';
        unitEl.style.transform = 'none';
        unitEl.style.left = (mirror.col * cellW + cellW / 2 - 10) + 'px';
        unitEl.style.top = (mirror.row * cellH + cellH / 2 - 10) + 'px';
        unitEl.style.transition = 'left 0.25s ease-in, top 0.25s ease-in';
        unitEl.style.zIndex = '40';
        unitEl.style.pointerEvents = 'none';
        board.appendChild(unitEl);
        requestAnimationFrame(() => {
            unitEl.style.left = (cl.col * cellW + cellW / 2 - 10) + 'px';
            unitEl.style.top = (cl.row * cellH + cellH / 2 - 10) + 'px';
        });
        setTimeout(finish, 280);
    }
    if (cloneEl) {
        remaining++;
        cloneEl.style.position = 'absolute';
        cloneEl.style.transform = 'none';
        cloneEl.style.left = (cl.col * cellW + cellW / 2 - 14) + 'px';
        cloneEl.style.top = (cl.row * cellH + cellH / 2 - 14) + 'px';
        cloneEl.style.transition = 'left 0.25s ease-in, top 0.25s ease-in';
        cloneEl.style.zIndex = '40';
        cloneEl.parentNode.removeChild(cloneEl);
        board.appendChild(cloneEl);
        requestAnimationFrame(() => {
            cloneEl.style.left = (mirror.col * cellW + cellW / 2 - 14) + 'px';
            cloneEl.style.top = (mirror.row * cellH + cellH / 2 - 14) + 'px';
        });
        setTimeout(finish, 280);
    }
    if (remaining === 0) finish();
}
// 技能结束:剩余镜片自动攻击最近敌人
function mirrorSkillEnd(mirror) {
    if (mirror._mirrorShards && mirror._mirrorShards.length > 0) {
        mirror._mirrorShards.forEach(s => {
            const ne = gameState.units.filter(u => u.team !== mirror.team && !u.ghost && !u._removing)
                .sort((a, b) => (Math.abs(a.row - s.row) + Math.abs(a.col - s.col)) - (Math.abs(b.row - s.row) + Math.abs(b.col - s.col)))[0];
            if (ne) {
                ne.currentHp -= 1;
                updateUnitHp(ne);
                showCritText(ne.row, ne.col, '镜片');
                if (ne.currentHp <= 0) removeUnit(ne);
            }
        });
    }
    mirror._mirrorShards = [];
    mirror._mirrorSkillTargetId = null;
    mirror._mirrorSkillMode = false;
    removeMirrorClone(mirror);
    // 确保技能结束后场上留下的是本体(不透明图标)
    renderUnit(mirror);
    document.querySelectorAll('.mirror-shard').forEach(el => { if (el.dataset.owner === mirror.id) el.remove(); });
    clearHighlights();
    gameState.selectedUnit = null;
}

// ===== 精英冰人机制 =====
// 制造冰场(5×5,随自身移动,持续到敌方回合结束)
function activateEliteIceSkill(unit) {
    if (unit._iceSkillActive) return;
    unit._iceSkillActive = true;
    gameState.iceFields = gameState.iceFields.filter(f => f.owner !== unit.id);
    gameState.iceFields.push({ row: unit.row, col: unit.col, team: unit.team, owner: unit.id });
    renderIceFields();
    freezeEnemiesInIce(gameState.iceFields[gameState.iceFields.length - 1]);
    clearHighlights();
    gameState.selectedUnit = null;
}
// 渲染冰场(5×5 蓝色冰面)
function renderIceFields() {
    document.querySelectorAll('.ice-field').forEach(el => el.remove());
    gameState.iceFields.forEach(f => {
        for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) {
                const nr = f.row + dr, nc = f.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const ic = document.createElement('div');
                ic.className = 'ice-field';
                ic.style.position = 'absolute';
                gameState.board[nr][nc].appendChild(ic);
            }
        }
    });
}
// 冰冻冰场内所有敌人
function freezeEnemiesInIce(ice) {
    gameState.units.forEach(u => {
        if (u.team === ice.team || u.ghost || u.frozen || isImmuneToFreeze(u)) return;
        const d = Math.max(Math.abs(u.row - ice.row), Math.abs(u.col - ice.col));
        if (d <= 2) {
            u.frozen = true;
            updateFrozenVisual(u);
        }
    });
}
// 灼烧:立即解除冰冻
function thawIfBurned(unit) {
    if (unit.frozen) {
        unit.frozen = false;
        updateFrozenVisual(unit);
    }
}

// ===== 黑绝机制 =====
// 附身:加成队友
function possessUnit(card, host) {
    host._possessed = true;
    host.zetsu = { currentHp: 6, maxHp: 6, revealed: false };
    host.attack = (host.attack || 0) + 1;
    host.critChance = (host.critChance || 0) + 0.2;
    host.maxHp = (host.maxHp || 1) + 2;
    host.currentHp = (host.currentHp || 0) + 2;
    host.moveRange = (host.moveRange || 0) + 3;
    updateUnitHp(host);
    const el = gameState.board[host.row][host.col].querySelector('.unit');
    if (el) el.classList.add('zetsu-possessed');
    showHeroDeployText(host, '黑绝附身', '#000', 1200);
}
// 收回附身加成
function releaseZetsu(unit) {
    if (!unit._possessed || !unit.zetsu) return;
    unit.attack = Math.max(0, (unit.attack || 0) - 1);
    unit.critChance = Math.max(0, (unit.critChance || 0) - 0.2);
    unit.maxHp = Math.max(1, (unit.maxHp || 1) - 2);
    unit.currentHp = Math.min(unit.currentHp, unit.maxHp);
    unit.moveRange = Math.max(0, (unit.moveRange || 0) - 3);
    unit._possessed = false;
    unit.zetsu = null;
    updateUnitHp(unit);
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) { el.classList.remove('zetsu-possessed', 'zetsu-revealed'); }
}
// 黑绝技能:6格内敌人标红
function enterZetsuSkillMode(unit) {
    clearHighlights();
    gameState.units.forEach(u => {
        if (u.team === unit.team || u.ghost) return;
        if (u.flying) return; // 黑绝不能对空
        const d = Math.abs(u.row - unit.row) + Math.abs(u.col - unit.col);
        if (d <= 6) gameState.board[u.row][u.col].classList.add('tank-target');
    });
}
// 黑绝跳跃爆炸:跳过去→爆炸3伤(无溅射)→留在敌人旁边
function zetsuJumpAttack(unit, target) {
    unit._zetsuTargeting = false;
    unit._zetsuSkillUsed = true;
    clearHighlights();
    gameState.selectedUnit = null;
    const board = document.getElementById('gameBoard');
    const cell = gameState.board[unit.row][unit.col];
    const el = cell.querySelector('.unit');
    const fromR = unit.row, fromC = unit.col;
    if (!el) {
        unit.row = target.row; unit.col = target.col;
        renderUnit(unit);
        zetsuBoom(unit, target);
        return;
    }
    cell.removeChild(el);
    el.style.position = 'absolute';
    el.style.transform = 'none';
    el.style.left = (fromC * cellW + cellW / 2 - 10) + 'px';
    el.style.top = (fromR * cellH + cellH / 2 - 10) + 'px';
    el.style.transition = 'left 0.4s ease-in, top 0.4s ease-in';
    el.style.zIndex = '40';
    el.style.pointerEvents = 'none';
    board.appendChild(el);
    requestAnimationFrame(() => {
        el.style.left = (target.col * cellW) + 'px';
        el.style.top = (target.row * cellH) + 'px';
    });
    // 跳到敌人身上(0.4s动画)→ 停留1.5秒 → 爆炸 → 从敌人身上落下到旁边
    setTimeout(() => {
        // 停留 1.5 秒(黑绝踩在敌人身上)
        setTimeout(() => {
            zetsuBoom(unit, target);
            // 落点:目标死亡占目标格,否则敌人旁最近空位
            let landR = target.row, landC = target.col;
            if (target.currentHp > 0) {
                let found = false;
                for (let rr = 1; rr <= 3 && !found; rr++) {
                    for (let dr2 = -rr; dr2 <= rr && !found; dr2++) {
                        for (let dc2 = -rr; dc2 <= rr && !found; dc2++) {
                            if (Math.max(Math.abs(dr2), Math.abs(dc2)) !== rr) continue;
                            const lr = target.row + dr2, lc = target.col + dc2;
                            if (!isValidPosition(lr, lc)) continue;
                            if (gameState.units.some(u => u.id !== unit.id && u.row === lr && u.col === lc)) continue;
                            if (isBlueBase(lr, lc) || isRedBase(lr, lc)) continue;
                            landR = lr; landC = lc; found = true;
                        }
                    }
                }
            }
            unit.row = landR; unit.col = landC;
            el.style.cssText = '';
            if (el.parentNode) el.parentNode.removeChild(el);
            const ncell = gameState.board[unit.row][unit.col];
            ncell.appendChild(el);
            renderUnit(unit);
        }, 1500);
    }, 400);
}
// 黑绝爆炸:黑色特效 + 3伤(无溅射)
function zetsuBoom(unit, target) {
    if (!target || target._removing || target.ghost) return;
    const board = document.getElementById('gameBoard');
    const boom = document.createElement('div');
    boom.className = 'zetsu-explosion';
    boom.style.left = (target.col * cellW) + 'px';
    boom.style.top = (target.row * cellH) + 'px';
    boom.style.width = cellW + 'px';
    boom.style.height = cellH + 'px';
    board.appendChild(boom);
    setTimeout(() => boom.remove(), 500);
    target.currentHp -= 3;
    updateUnitHp(target);
    if (target.currentHp <= 0) removeUnit(target);
}

// 凋零毒:黑色毒雾(每回合1伤,不可叠加)
function applyWitherEffect(unit, attacker) {
    if (unit.ghost) return;
    if (!unit.witherTurns) {
        unit.witherTurns = 3;
        updateWitherVisual(unit);
    }
}
function updateWitherVisual(unit) {
    const cell = gameState.board[unit.row] ? gameState.board[unit.row][unit.col] : null;
    if (!cell) return;
    // 黑色毒雾覆盖层(明显特效)
    let fx = cell.querySelector('.wither-fx');
    if (unit.witherTurns > 0) {
        if (!fx) {
            fx = document.createElement('div');
            fx.className = 'wither-fx';
            cell.appendChild(fx);
        }
    } else if (fx) {
        fx.remove();
    }
    const unitEl = cell.querySelector('.unit');
    if (unitEl) {
        if (unit.witherTurns > 0) unitEl.classList.add('withering');
        else unitEl.classList.remove('withering');
    }
}

// 查克拉:立即获得2格能量(蓝色字,1.5秒渐隐)
function activateChakra(unit) {
    // 只有佩恩/马斑/植物人/解斑可获得查克拉,其他角色无效
    if (!unit.shinraRange && !unit.madaraMaxEnergy && !unit.hashiMaxEnergy && !unit.solveMaxEnergy && !unit.guyMaxEnergy) return;
    const maxE = unit.hashiMaxEnergy || unit.madaraMaxEnergy || unit.painMaxEnergy || unit.solveMaxEnergy || unit.guyMaxEnergy || 4;
    if (unit.hashirama) unit.hashiEnergy = Math.min(maxE, (unit.hashiEnergy || 0) + 2);
    else if (unit.madaraMaxEnergy) unit.madaraEnergy = Math.min(maxE, (unit.madaraEnergy || 0) + 2);
    else if (unit.solveMaxEnergy) unit.solveEnergy = Math.min(maxE, (unit.solveEnergy || 0) + 2);
    else if (unit.guyMaxEnergy) unit.guyEnergy = Math.min(maxE, (unit.guyEnergy || 0) + 2);
    else unit.painEnergy = Math.min(maxE, (unit.painEnergy || 0) + 2);
    const el = gameState.board[unit.row][unit.col].querySelector('.unit');
    if (el) renderEnergyBar(unit, el);
    showHeroDeployText(unit, '查克拉', '#3498db', 1500);
    unit.chakraCd = 2;
}

// 佩恩技能伤害加成:狂暴+剩饭+黑绝附身攻击加成
function painSkillBonus(pain) {
    let b = (pain._rageAttack || 0) + (pain._leftoverBuff || 0);
    if (pain._possessed && pain.zetsu) b += 1; // 黑绝附身:攻击+1
    return b;
}

// Pain 技能激活
function activatePainAbility(pain) {
    // 4格能量释放地爆天星(万象/神罗释放过程中也可触发;能量满即可,不受攻击标记限制--先技能后查克拉补满也能直接地爆)
    if ((pain.painEnergy || 0) >= (pain.painMaxEnergy || 4)) {
        chibakuTensei(pain);
        pain._chibakuBonus = 2;
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    if (gameState.attackedUnits.has(pain.id) && !pain._chibakuBonus) {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }

    // 一回合两次技能:先万象天引,后神罗天征(地爆天星后同样可再用两次)
    if (!pain._banshoUsed) {
        banshoTenin(pain);
        pain._banshoUsed = true;
        if (pain._chibakuBonus) pain._chibakuBonus--;
    } else if (!pain._shinraUsed && pain.abilityTimer <= 0) {
        shinraTensei(pain);
        pain._shinraUsed = true;
        if (pain._chibakuBonus) pain._chibakuBonus--;
    } else {
        clearHighlights();
        gameState.selectedUnit = null;
        return;
    }
    // 万象+神罗都用了且能量不足4(无地爆机会)才标记已攻击
    if (pain._banshoUsed && pain._shinraUsed && !pain._chibakuBonus && (pain.painEnergy || 0) < 4) {
        gameState.attackedUnits.add(pain.id);
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
    // 范围特效(持续至技能结束)
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
            u.currentHp -= pain._crogDebuffed ? 1 : (pain.shinraDamage + painSkillBonus(pain));
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
            if (dist <= radius) { gameState.blueBaseHp -= pain._crogDebuffed ? 1 : (pain.shinraDamage + painSkillBonus(pain)); updateBaseHpDisplay(); }
        }
    } else {
        for (let r = 25; r <= 27; r++) for (let c = 10; c <= 13; c++) {
            const dist = Math.max(Math.abs(r - pain.row), Math.abs(c - pain.col));
            if (dist <= radius) { gameState.redBaseHp -= pain._crogDebuffed ? 1 : (pain.shinraDamage + painSkillBonus(pain)); updateBaseHpDisplay(); }
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
    // 伤害时已计numShinraHits,这里结算能量
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
            const u = gameState.units.find(uu => uu.row === tr && uu.col === tc && uu.team !== team && !uu.ghost);
            if (!u) continue;
            // 伤害+能量(无论拉没拉到)
            u.currentHp -= pain._crogDebuffed ? 1 : (pain.banshoDamage + painSkillBonus(pain));
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
    // 保持选中,立即显示行动范围
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

    // 火柱(无论跳跃成功与否都显示)
    showFirePillar(nearest.row, nearest.col);

    // 火柱伤害
    setTimeout(() => {
        let hitAny = false;
        gameState.units.forEach(e => {
            if (e.team === madara.team || e.ghost) return;
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

// 矿工地道特效(弯曲土道)
function showMinerTunnel(miner) {
    const board = document.getElementById('gameBoard');
    const cs = cellW;
    const baseR = miner.team === 'red' ? 26 : 1;
    const baseC = 11;
    // 分段弯曲路径(距离越远弯越多,1-6弯,只朝前180°转弯)
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

    // 顺序伤害:子弹经过敌人时扣血
    lineTargets.forEach((u, i) => {
        const dist = Math.max(Math.abs(u.row - unit.row), Math.abs(u.col - unit.col));
        const delay = (dist / totalDist) * 800 + 100;
        setTimeout(() => {
            u.currentHp -= unit.attack;
            updateUnitHp(u);
            if (u.currentHp <= 0) removeUnit(u);
        }, delay);
    });

    // 闪电链特效:按传播深度分层并行播放(同层同时、层间120ms,敌人多也快速完成)
    allChainTargets.forEach((ct, i) => {
        const pFrom = ct.from, pTo = ct.to;
        const delay = 1000 + (ct.depth || 0) * 120;
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

    // 收集敌方,移入board层飞行
    const enemies = gameState.units.filter(e => e.team !== pain.team);
    if (enemies.length === 0) { setTimeout(() => ball.remove(), 4000); return; }
    const flyTime = 3200; // 飞行时间
    const enemyElements = [];

    enemies.forEach((e, i) => {
        const oldCell = gameState.board[e.row][e.col];
        const el = oldCell.querySelector('.unit');
        if (!el) return;
        enemyElements.push({ unit: e, el: el });
        // 脱离cell,挂到board上
        oldCell.removeChild(el);
        el.style.position = 'absolute';
        el.style.transform = 'none';
        el.style.left = (e.col * cellW + cellW / 2 - 10) + 'px';
        el.style.top = (e.row * cellH + cellH/2 - 10) + 'px';
        el.style.transition = 'all 3s ease-in';
        el.style.zIndex = '30';
        board.appendChild(el);

        // 环绕黑球分布(以球中心为圆心)
        const angle = (i / enemies.length) * Math.PI * 2;
        const rad = 0.9;
        const bcx = bx + 25, bcy = by + 25;
        const tx = bcx + Math.cos(angle) * rad * cellW - 10;
        const ty = bcy + Math.sin(angle) * rad * cellH - 10;
        const startDelay = 300 + i * 80;
        setTimeout(() => {
            el.style.left = tx + 'px';
            el.style.top = ty + 'px';
        }, startDelay);
        // 吸引过程中两次伤害(每次1点+加成)
        [0.33, 0.66].forEach(frac => {
            setTimeout(() => {
                if (e._removing || e.currentHp <= 0) return;
                e.currentHp -= pain._crogDebuffed ? 1 : (1 + painSkillBonus(pain));
                updateUnitHp(e);
                if (e.currentHp <= 0) {
                    removeUnit(e);
                    if (el.parentNode) el.parentNode.removeChild(el);
                }
            }, startDelay + Math.floor(flyTime * frac));
        });
    });

    // 等所有敌人到位后再伤害+下落
    const lastStart = 300 + (enemyElements.length - 1) * 80;
    const landTime = lastStart + flyTime + 300;

    // 落地位置生成
    function genLandingSpots(count) {
        const spots = []; const taken = new Set();
        taken.add(pain.row + ',' + pain.col);
        // 其他单位位置也加入(防落点与骷髅等单位重叠)
        var enemyIdSet = new Set(enemies.map(function(e){ return e.id; }));
        gameState.units.forEach(function(u){ if (!enemyIdSet.has(u.id)) taken.add(u.row + ',' + u.col); });
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

    // 统一伤害+落地(先伤害,再为幸存者分配落点)
    setTimeout(() => {
        // 先统一扣血
        enemyElements.forEach(ee => {
            ee.unit.currentHp -= pain._crogDebuffed ? 1 : (4 + painSkillBonus(pain)); updateUnitHp(ee.unit);
        });
        // 筛选幸存者
        const survivors = enemyElements.filter(ee => ee.unit.currentHp > 0);
        // 为幸存者生成不重叠落点
        const spots = genLandingSpots(survivors.length);
        // 移除死亡单位(吸引途中已移除的跳过)
        enemyElements.forEach(ee => {
            if (ee.unit.currentHp <= 0) {
                if (gameState.units.some(u => u.id === ee.unit.id)) removeUnit(ee.unit);
                ee.el.remove();
            }
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
// 马斑攻击特效:红色>箭头
function showMadaraAttackFX(attacker, target) {
    const board = document.getElementById('gameBoard');
    const arrow = document.createElement('div');
    arrow.textContent = '>';
    const angle = attacker.team === 'red' ? -90 : 90; // 红方向上,蓝方向下
    arrow.style.cssText = 'position:absolute;color:#e74c3c;font-size:28px;font-weight:900;z-index:25;pointer-events:none;text-shadow:0 0 4px rgba(231,76,60,0.8);transform:rotate('+angle+'deg)';
    board.appendChild(arrow);

    const cellSize = cellW; const cH = cellH;
    const startX = attacker.col * cellSize + cellSize / 2;
    const startY = attacker.row * cellH + cellH / 2;
    const endX = target.col * cellSize + cellSize / 2;
    const endY = target.row * cellH + cellH / 2;

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

// 马斑反击特效:红色环绕圈
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

// 铠大招:不灭魔躯
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
        // 如果烟雾是敌方放的,自己的兵应可见(z-index > cover)
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
        if (u.team === attacker.team || u.ghost) return;
        const dist = Math.max(Math.abs(u.row - target.row), Math.abs(u.col - target.col));
        if (dist <= radius) {
            if (attacker.wither) applyWitherEffect(u, attacker);
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
// 渲染风阵特效
function renderWindZones() {
    document.querySelectorAll('.wind-cover').forEach(c => c.remove());
    gameState.windZones.forEach(z => {
        for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) {
                const nr = z.row + dr, nc = z.col + dc;
                if (!isValidPosition(nr, nc)) continue;
                const cover = document.createElement('div');
                cover.className = 'wind-cover';
                gameState.board[nr][nc].appendChild(cover);
            }
        }
    });
}

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

// 雷电飞龙连锁攻击(收集后动画伤害)
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

// 疾风紧急回避装置
function activateGaleSkill(gale) {
    gale.galeSkillActive = true;
    gale.galeSkillTurns = 2;
    gale.galeAnchor = { row: gale.row, col: gale.col };
    gale.moveRange += 10;
    // 本回合已攻击过:解除攻击标记,但紧急回避额度只剩1次(本回合总共最多2次)
    if (gameState.attackedUnits.has(gale.id)) {
        gameState.attackedUnits.delete(gale.id);
        gale._galeAttacks = 1;
    } else {
        gale._galeAttacks = 0;
    }
    const cell = gameState.board[gale.row][gale.col];
    const text = document.createElement('div');
    text.className = 'hero-deploy-text';
    text.textContent = '紧急回避装置';
    text.style.color = '#e74c3c';
    cell.appendChild(text);
    setTimeout(() => { if (text.parentNode) text.remove(); }, 2000);
    // 弹力绳特效
    drawGaleRope(gale);
    clearHighlights();
    gameState.selectedUnit = null;
}

function drawGaleRope(gale) {
    if (!gale.galeAnchor) return;
    document.querySelectorAll('.gale-rope').forEach(r => r.remove());
    const board = document.getElementById('gameBoard');
    const x1 = gale.galeAnchor.col * cellW + cellW/2, y1 = gale.galeAnchor.row * cellH + cellH/2;
    const x2 = gale.col * cellW + cellW/2, y2 = gale.row * cellH + cellH/2;
    [0.5, -0.5].forEach(off => {
        const rope = document.createElement('div');
        rope.className = 'gale-rope';
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        rope.style.left = (x1 + off) + 'px';
        rope.style.top = (y1 + off) + 'px';
        rope.style.width = len + 'px';
        rope.style.transform = 'rotate(' + angle + 'deg)';
        rope.style.transformOrigin = '0 0';
        board.appendChild(rope);
    });
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
    const maxE = unit.madaraMaxEnergy || unit.painMaxEnergy || unit.hashiMaxEnergy || unit.solveMaxEnergy || unit.guyMaxEnergy || 0;
    const curE = unit.madaraEnergy || unit.painEnergy || unit.hashiEnergy || unit.solveEnergy || unit.guyEnergy || 0;
    for (let i = 0; i < maxE; i++) {
        const dot = document.createElement('div');
        dot.className = i < curE ? 'energy-dot filled' : 'energy-dot';
        bar.appendChild(dot);
    }
}

// 清除高亮
function clearHighlights() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('movable', 'attackable', 'selected', 'tank-target', 'chakra-target');
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
    // 训练模式不限时(避免回合自动切换导致单位消失)
    if (gameState.maxEnergy >= 500) return;
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
    // 战车:结束回合重置锁定模式
    gameState.units.forEach(u => { u._targeting = false; u._witherTargeting = false; u._witherCharged = false; u._zetsuSkillUsed = false; u._zetsuTargeting = false; });

    const prevTurn = gameState.currentTurn;

    // 切换回合
    if (gameState.currentTurn === 'red') {
        gameState.currentTurn = 'blue';
        gameState.blueEnergy = Math.min(gameState.maxEnergy >= 500 ? gameState.maxEnergy : gameState.turnNumber + 1, gameState.maxEnergy);
        // 能量收集器加成
        const blueBoost = gameState.units.filter(u => u.team === 'blue' && u.building).length;
        gameState.blueEnergy = Math.min(gameState.blueEnergy + blueBoost, gameState.maxEnergy);
    } else {
        gameState.currentTurn = 'red';
        gameState.turnNumber++;
        gameState.redEnergy = Math.min(gameState.maxEnergy >= 500 ? gameState.maxEnergy : gameState.turnNumber, gameState.maxEnergy);
        const redBoost = gameState.units.filter(u => u.team === 'red' && u.building).length;
        gameState.redEnergy = Math.min(gameState.redEnergy + redBoost, gameState.maxEnergy);
    }

    // 黑绝显现持续到敌方回合结束:敌方回合结束(轮到己方回合)时解除显现
    gameState.units.forEach(u => {
        if (u._possessed && u.zetsu && u.zetsu.revealed && u.team === gameState.currentTurn) {
            u.zetsu.revealed = false;
            const uel3 = gameState.board[u.row][u.col].querySelector('.unit');
            if (uel3) uel3.classList.remove('zetsu-revealed');
        }
    });

    // 精英冰人冰场:冰冻冰场内敌人(敌方回合开始)+ 每回合对场内敌人造成1伤;敌方回合结束冰场消失
    gameState.iceFields.forEach(f => freezeEnemiesInIce(f));
    gameState.iceFields.forEach(f => {
        gameState.units.forEach(u => {
            if (u.team === f.team || u.ghost) return;
            const d = Math.max(Math.abs(u.row - f.row), Math.abs(u.col - f.col));
            if (d <= 2) {
                u.currentHp -= 1;
                updateUnitHp(u);
                if (u.currentHp <= 0) removeUnit(u);
            }
        });
    });
    if (gameState.iceFields.length > 0) {
        const gone = gameState.iceFields.filter(f => f.team === gameState.currentTurn);
        if (gone.length > 0) {
            gameState.iceFields = gameState.iceFields.filter(f => f.team !== gameState.currentTurn);
            gameState.units.forEach(u => {
                if (u.eliteIce && u._iceSkillActive && gone.some(f => f.owner === u.id)) u._iceSkillActive = false;
            });
            renderIceFields();
        }
    }

    // 凋零:己方回合开始回1血(敌方回合不回)
    gameState.units.forEach(u => {
        if (u.wither && u.team === gameState.currentTurn && u.currentHp < (u.maxHp || 8)) {
            u.currentHp = Math.min(u.maxHp || 8, u.currentHp + 1);
            updateUnitHp(u);
            showCritText(u.row, u.col, '回血');
        }
    });

    // 特斯拉电磁塔:攻击范围内无敌人则缩进地底(半透明,不可被攻击);从地底现形时释放5×5紫色电圈
    gameState.units.forEach(u => {
        if (u.tesla) {
            const wasHidden = !!u._wasHidden;
            const hasEnemy = gameState.units.some(e => e.team !== u.team && !e.ghost && (Math.abs(e.row - u.row) + Math.abs(e.col - u.col)) <= (u.attackRange || 5));
            u.teslaHidden = !hasEnemy;
            // 从地底现形 → 紫色电圈扩散(触碰敌人3伤)
            if (wasHidden && !u.teslaHidden) teslaEmergence(u);
            u._wasHidden = u.teslaHidden;
            const telEl = gameState.board[u.row] ? gameState.board[u.row][u.col].querySelector('.unit') : null;
            if (telEl) telEl.classList.toggle('tesla-hidden', u.teslaHidden);
        }
    });

    // 镜:分身消失(本回合未攻击则回合结束消失)、技能冷却递减
    gameState.units.forEach(u => {
        if (u.mirror) {
            if (u._mirrorClone && !u._mirrorAttacked) removeMirrorClone(u);
            u._mirrorAttacked = false;
            if (u._mirrorSkillCd > 0) u._mirrorSkillCd--;
            // 镜技能:回合结束时自动结束(剩余镜片自动攻击最近敌人)
            if (u._mirrorSkillTargetId) {
                mirrorSkillEnd(u);
            }
        }
    });

    // 解斑:须佐结束 + 技能次数重置 + 受击反击标记清除(保留 _solveCanSpecial:敌方回合受击后己方回合仍可双击开特殊须佐)
    gameState.units.forEach(u => {
        if (!u.madaraSolve) return;
        u._solveSkillsUsed = 0;
        u._solveCountered = false;
        // 兜底:敌方回合(蓝方)结束时血量比回合开始时低 → 视为受击(覆盖技能/闪电/毒/溅射等间接伤害),可双击开特殊须佐
        if (prevTurn === 'blue' && !u._susanooActive && u.currentHp < (u._hpAtTurnStart !== undefined ? u._hpAtTurnStart : u.maxHp)) {
            u._solveCanSpecial = true;
        }
        u._hpAtTurnStart = u.currentHp;
        if (u._susanooActive && u.team === prevTurn) {
            u._susanooActive = false;
            u.moveRange = 5;
            renderSusanooVisual(u);
            if (u._susanooSpecial) {
                // 特殊须佐:直接结束
                u._susanooSpecial = false;
            } else if (!gameState.gameOver) {
                // 普通须佐结束:自动终极奥义(以最近敌人为目标)
                let nearestE = null, nearestD = Infinity;
                gameState.units.forEach(e => {
                    if (e.team === u.team || e.ghost || e._removing) return;
                    const d = Math.max(Math.abs(e.row - u.row), Math.abs(e.col - u.col));
                    if (d < nearestD) { nearestD = d; nearestE = e; }
                });
                u._solvePhase = null;
                if (nearestE) solveUltimateAttack(u, nearestE);
            }
        }
    });
    // 精英骑士技能冷却递减(按己方回合计:用后第1个己方回合不可用,第2个可用)
    gameState.units.forEach(u => {
        if (u.eliteKnight && u.team === prevTurn && u._tauntSkillCd > 0) u._tauntSkillCd--;
    });
    // 尤格萨隆:每回合技能使用标记重置
    gameState.units.forEach(u => {
        if (u.yogg && u.team === prevTurn) u._yoggSkillUsedThisTurn = false;
    });
    // 尤格-萨隆:跳过回合(倒计时结束)时,剩余待放法术一次性释放完
    if (gameState._saronQueue && gameState._saronQueue.length > 0) {
        gameState._saronSkip = true;
        gameState._saronQueue.forEach(q => {
            if (q.unit && !q.unit._removing) castRandomSpell(q.spell, q.unit);
        });
        gameState._saronQueue = [];
        gameState._saronSkip = false;
    }
    // 克罗格·环形山之王:己方回合结束时,敌方所有在场卡牌攻/血变为1(永久,克罗格死亡也不恢复)
    gameState.units.forEach(u => {
        if (u.crog && u.team === prevTurn) {
            gameState.units.forEach(e => {
                if (e.team !== u.team && !e._crogDebuffed && !e.ghost && !e._removing) {
                    e._crogDebuffed = true;
                    e.attack = 1;
                    e.maxHp = 1;
                    e.currentHp = 1;
                    updateUnitHp(e);
                    showCritText(e.row, e.col, '削弱');
                }
            });
        }
    });
    // 命运之手:下回合法术0费,己方回合结束清除
    if (gameState._fateFreeSpells) { gameState._fateFreeSpells = false; gameState._fateFreeUsed = 0; }
    // 吕布回合处理
    gameState.units.forEach(u => {
        if (!u.lvbu) return;
        if (prevTurn === u.team) {
            // 己方回合结束:技能次数重置、附魔回合递减、神魔降世圈移除(敌方回合结束时)
            u._lvbuS1Used = 0;
            u._lvbuS2Used = 0;
            u._lvbuS3Used = 0;
            if (u._enchantTurns > 0) {
                u._enchantTurns--;
                if (u._enchantTurns <= 0) u._enchant = false;
            }
        } else {
            // 敌方回合结束:附魔重置(下个己方回合需技能1重新命中)、贪狼护盾50%转血、神魔降世圈结束
            u._enchant = false;
            if (u._lvbuShield > 0) {
                const heal = Math.floor(u._lvbuShield * 0.5);
                u.currentHp = Math.min(u.maxHp, u.currentHp + heal);
                updateUnitHp(u);
                u._lvbuShield = 0;
                const lsel = gameState.board[u.row][u.col].querySelector('.unit');
                if (lsel) lsel.classList.remove('guard-shield');
            }
            if (u._lvbuZoneArmor) {
                u._lvbuZoneArmor = false;
                u.armor = Math.max(0, (u.armor || 0) - 1);
                document.querySelectorAll('.lvbu-zone').forEach(el => el.classList.remove('lvbu-zone'));
            }
        }
    });
    // 狂暴法术:持续一个回合,己方回合结束加成与特效消失
    gameState.units.forEach(u => {
        if (u.team === prevTurn) {
            u._rageAttack = 0;
            u._rageMove = 0;
            u._healMove = 0;
            const el = gameState.board[u.row][u.col].querySelector('.unit');
            if (el) el.classList.remove('raging');
        }
    });
    // 石墙守护:下一个敌方回合结束,无敌与泡泡消失
    gameState.units.forEach(u => {
        if (u._stoneWallProtect && u.team !== prevTurn) {
            u._stoneWallProtect = 0;
            const el = gameState.board[u.row][u.col].querySelector('.unit');
            if (el) el.classList.remove('stone-bubble');
        }
    });
    gameState.rageZones = gameState.rageZones.filter(z => z.team !== prevTurn);
    renderRageZones();
    // 精英骑士法阵视觉只显示1回合(嘲讽效果保留在 _tauntedIds 快照中)
    if (gameState.knightZones.length > 0) {
        gameState.knightZones = [];
        renderKnightZones();
    }
    gameState.units.forEach(u => { if (u.superKnight) u._skAttacks = 0; });
    // 天鹰火炮:每回合攻击次数重置
    gameState.units.forEach(u => { if (u.eagleArtillery) u._eagleAttacks = 0; });
    // 疯狂大炮:每回合基地攻击次数重置
    gameState.units.forEach(u => { if (u.crazyCannon) u._ccBaseAttacked = false; });
    // 迈特凯·死门:回合结束冲撞次数重置 + 自动扣1血(到5停止)+ 爆衣检查
    gameState.units.forEach(u => {
        if (!u.guyDeathGate) return;
        if (u.team === prevTurn) {
            u._guyCharges = 0;
            if (u.currentHp > 5) {
                u.currentHp -= 1;
                updateUnitHp(u);
            }
            guyCheckAwaken(u);
        }
    });

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
    // 疾风技能冷却+持续
    gameState.units.forEach(u => {
        if (u.galeSkillCD > 0) u.galeSkillCD--;
        if (u.galeReviving && u.team === prevTurn) { u.galeReviving = false; u.galeSkillCD = 2; const re = gameState.board[u.row][u.col].querySelector('.unit'); if (re) re.classList.remove('reviving'); }
        if (u.galeSkillActive && u.team === prevTurn) {
            u.galeSkillTurns = (u.galeSkillTurns || 2) - 1;
            u._galeAttacks = 0;
            if (u.galeSkillTurns <= 0) {
                u.galeSkillActive = false;
                u.moveRange -= 10;
                u.galeAnchor = null;
                document.querySelectorAll('.gale-rope').forEach(r => r.remove());
            }
        }
        if (u.galeSkillActive && u.galeAnchor) drawGaleRope(u);
    });

    gameState.units.forEach(u => { u.kaiAttacks = 0; u.kaiShurikenDone = false; u.electricHit = []; u._banshoUsed = false; u._shinraUsed = false; u._chibakuBonus = 0; });
    gameState.units.forEach(u => { if (u.tankSpawn) { u.demuBonusAttacks = 0; u.demuAttacksUsed = 0; u._demuDamaged = false; u._demuTankBonus = false; } });

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

    // 凋零毒:每回合1点伤害(不可叠加)
    gameState.units.forEach(u => {
        if (u.witherTurns > 0 && !u.ghost) {
            u.currentHp -= 1;
            updateUnitHp(u);
            u.witherTurns--;
            if (u.witherTurns <= 0) updateWitherVisual(u);
            if (u.currentHp <= 0) removeUnit(u);
        }
    });

    // 燃烧伤害:每回合灼烧1点
    gameState.units.forEach(u => {
        if (u.burnTurns > 0 && !u.ghost) {
            u.currentHp -= (u.burnDamage || 1);
            updateUnitHp(u);
            u.burnTurns--;
            if (u.burnTurns <= 0) updateBurnVisual(u);
            if (u.currentHp <= 0) removeUnit(u);
        }
    });

    // 中毒结算:每回合扣血(无视护甲),连续计数未命中则重置
    gameState.units.slice().forEach(u => {
        if (u.poisonTurns > 0 && u.poisonLevel && !u.ghost) {
            u.currentHp -= (u.poisonLevel === 3 ? 5 : (u.poisonLevel === 2 ? 2 : 1));
            updateUnitHp(u);
            if (u.currentHp <= 0) removeUnit(u);
        }
        if (u.poisonTurns > 0) {
            u.poisonTurns--;
            if (u.poisonTurns <= 0) { u.poisonLevel = 0; u.poisonHits = 0; }
            updatePoisonVisual(u);
        }
        u.goblinHitThisTurn = false;
    });

    // 定身清除(轮到该方回合结束时解除,下回合可行动)
    gameState.units.forEach(u => { if (u.stunned && u.team === prevTurn) { u.stunnedTurns--; if (u.stunnedTurns <= 0) u.stunned = false; } });
    // 大树缠绕特效:固定2回合计时,到点消失
    gameState.units.forEach(u => { if (u.treeBound) { u.treeBoundTurns--; if (u.treeBoundTurns <= 0) { u.treeBound = false; updateTreeVisual(u); } } });
    // 查克拉冷却:己方回合结束时递减(用过后下一个己方回合不可用,再下一个可用)
    gameState.units.forEach(u => { if (u.chakraCd > 0 && u.team === prevTurn) u.chakraCd--; });
    // 战车导弹:敌方回合结束时轰炸标记的3×3区域(5伤,标记的是格子),己方回合结束保留标记
    if (gameState.missileMarks.length > 0) {
        const remainingMarks = [];
        gameState.missileMarks.forEach(m => {
            if (m.team === prevTurn) { remainingMarks.push(m); return; }
            showMissile(m);
            gameState.units.slice().forEach(u => {
                if (u.team === m.team || u.ghost) return;
                const dist = Math.max(Math.abs(u.row - m.row), Math.abs(u.col - m.col));
                if (dist <= 1) {
                    var dmg = 5;
                    // 骷髅大哥护盾:抵挡导弹(与普攻一致,任何伤害都挡)
                    if (u.skullBoss && u.skullShield && dmg > 0) {
                        u.skullShield = false;
                        dmg = 0;
                        showHeroDeployText(u, '护盾抵挡', '#b39ddb', 1000);
                        updateSkullShieldVisual(u);
                    }
                    if (u.ghost) dmg = 0;
                    u.currentHp -= dmg;
                    updateUnitHp(u);
                    if (u.currentHp <= 0) removeUnit(u);
                }
            });
        });
        gameState.missileMarks = remainingMarks;
        renderMissileMarks();
    }

    // 警察回警车(动画+回1血),全部阵亡则警车消失
    gameState.units.filter(u => u.copSpawn && !u._removing).forEach(car => {
        var cops = gameState.units.filter(u => u.cop && u.copCar === car.id);
        if (cops.length > 0) {
            cops.forEach(cop => {
                animateCopReturn(cop, car);
                cop.currentHp = Math.min(cop.maxHp, (cop.currentHp || 0) + 1);
                if (car.copHps) car.copHps[cop.copIndex] = cop.currentHp;
            });
            car.copsSpawned = false;
            gameState.units = gameState.units.filter(u => !(u.cop && u.copCar === car.id));
        } else if (car.copHps && car.copHps.every(h => h == null)) {
            // 4个警察全部阵亡,警车跟着消失
            removeUnit(car);
        }
    });

    // 神罗天征持续伤害(己方回合末跳过,敌方回合末伤害+清特效)
    gameState.units.forEach(u => {
        if (u.shinraRange && u.abilityTimer > 0) {
            if (!u.shinraSkipNext) {
                gameState.units.forEach(e => {
                    if (e.team === u.team || e.ghost) return;
                    const dist = Math.max(Math.abs(e.row - u.row), Math.abs(e.col - u.col));
                    if (dist <= u.shinraRange) {
                        e.currentHp -= u._crogDebuffed ? 1 : (u.shinraDamage + painSkillBonus(u));
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

    // 风阵递减+重绘
    gameState.windZones.forEach(z => z.turns--);
    gameState.windZones = gameState.windZones.filter(z => z.turns > 0);
    renderWindZones();

    // 弹坑递减+重绘
    gameState.craters.forEach(c => c.turns--);
    gameState.craters = gameState.craters.filter(c => c.turns > 0);
    renderCraters();

    // 小喷菇每回合限制重置
    gameState.shroomCount = { red: 0, blue: 0 };

    // 巡视者:咬住回合递减,3回合后自动消失
    gameState.units.forEach(u => {
        if (u.grabbed) {
            u.grabbed.turns--;
            if (u.grabbed.turns <= 0) {
                const p = gameState.units.find(x => x.id === u.grabbed.by);
                u.grabbed = null;
                updateGrabVisual(u);
                if (p && !p._removing) removeUnit(p);
            }
        }
    });

    // 艾琳回合重置(技能未用完结束回合则保留数字)
    gameState.units.forEach(u => {
        if (u.blowdart) u.blowdartAttacksUsed = 0;
        if (u.hashirama) { u.hashiAttacksUsed = 0; u.hashiBlocksUsed = 0; }
        if (u.erin) {
            u.erinAttacksUsed = 0;
            if (u.erinSkillActive) {
                u.erinSkillActive = false;
                u.attackRange = 5;
                u.moveRange = 6;
                u.erinSkillAttacks = 0;
            }
            if (u.erinBonusPending) { u.erinBonusPending = false; } else { u.erinMoveBonus = 0; }
        }
    });
    // 艾琳黄圈递减+重绘
    gameState.erinRings.forEach(r => r.turns--);
    gameState.erinRings = gameState.erinRings.filter(r => r.turns > 0);
    renderErinRings();

    // 烟雾区域递减+清除
    gameState.smokeZones = gameState.smokeZones.filter(sz => {
        sz.turns--;
        return sz.turns > 0;
    });
    clearExpiredSmoke();

    // 开始新回合计时
    startTimer();

    // AI模式:蓝色回合自动AI行动
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
    const targetCol = gameState.deployTargetCol;
    const isEnemyHalf = (gameState.currentTurn === 'red' && targetRow <= 13) || (gameState.currentTurn === 'blue' && targetRow >= 14);

    gameState.battleDeck.forEach((card, index) => {
        // 目标格有友方单位:只显示法术卡(黑绝不再通过部署框附身)
        const targetHasUnit = gameState.units.some(u => u.row === targetRow && u.col === targetCol);
        if (targetHasUnit) {
            if (!card.spell) return;
        } else if (isEnemyHalf && !card.miner && !card.spell) {
            return;
        }
        const cardElement = document.createElement('div');
        let cardCost = card.cost;
        if (card.yogg) cardCost = getYoggCost();
        if (card.chaosTentacle && gameState._freeTentacles > 0) cardCost = 0;
        cardElement.className = `battle-deck-card ${currentEnergy < cardCost ? 'disabled' : ''}`;
        cardElement.dataset.index = index;
        cardElement.dataset.cost = cardCost;

        cardElement.innerHTML = `
            ${card.artwork ? `<div class="card-artwork art-${card.artwork}"></div>` : ''}
            <h4>${card.name}${card.yogg ? ` (${cardCost})` : (card.chaosTentacle && gameState._freeTentacles > 0 ? ' (免费)' : '')}</h4>
            ${card.yoggFate ? `<div class="cost" style="color:#9b59b6;">${Math.max(0, 15 - (gameState._fateWheelProgress||0)) > 0 ? '还需 ' + Math.max(0, 15 - (gameState._fateWheelProgress||0)) + ' 个法术开启命运之轮' : '命运之轮已就绪!'}</div>` : ''}
            <div class="cost">${cardCost} 能量</div>
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
            if (gameState.battleDeck.length >= 10) { alert('出战卡组已满(最多10张)'); return; }
            if (gameState.battleDeck.some(c => c.id === card.id)) { alert('每种卡只能带一张!'); return; }
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
    if (card.armor) hpText += `(护甲 ${card.armor})`;
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
    if (card.armorPen) features.push(card.armorPen >= 999 ? '穿甲无限(真实伤害)' : '穿甲 ' + card.armorPen);
    if (card.splashRadius) features.push(`溅射 ${card.splashRadius}格`);
    if (card.chargeDamage) features.push(`冲锋≥${card.chargeMove}格 伤${card.chargeDamage}`);
    if (card.dodge) features.push('闪避');
    if (card.counterAttack) features.push(`反击${card.counterAttack}伤`+(card.counterBurn?`+燃烧3回合`:``));
    if (card.executionRange) features.push(`处决≤${card.executionRange}格`);
    if (card.summon) features.push('召唤亲卫队');
    if (card.oneShot) features.push('一次性');
    if (card.freeze) features.push('冰冻1回合');
    if (card.shinraRange) features.push(`神罗天征${card.shinraRange}格/万象天引`);
    if (card.aoeAttack) features.push('前方3格AoE+燃烧');
    if (card.madaraMaxEnergy) features.push(`能量${card.madaraMaxEnergy}格→天下无双/陨石`);
    if (card.kaiShurikenRange) features.push(`双攻/飞镖弹射${card.kaiShurikenMax}人+回血`);
    if (card.lineAttack) features.push(`直线3列射击/闪电链${card.chainDamage}伤`);
    if (card.hero) features.push('金卡');
    if (card.firstStrike) features.push('首击强制剩1血');
    if (card.tankSpawn) features.push('召唤战车×2(攻3/护甲2/血4,限老太周围4格)');
    if (card.erin) features.push('双发连击/黄圈/计数技能/保命装');
    if (card.doomShroom) features.push('双击引爆:7×7爆炸7伤+留弹坑4回合');
    if (card.smallShroom) features.push('每回合限2个/不可移动');
    if (card.patroller) features.push('咬住敌人3回合不能移动');
    if (card.royalGuard) features.push('部署6卫兵/3伤护盾/移动≥3冲锋翻倍');
    if (card.hogRider) features.push('只能攻击建筑/大本营');
    if (card.eliteKnight) features.push('7×7法阵嘲讽+3伤护盾');
    if (card.fisherman) features.push('双击拉敌人到身前+可再普攻');
    if (card.spell) {
        if (card.rage) features.push(`法术·狂暴:${card.rageRadius*2+1}×${card.rageRadius*2+1}友军攻+${card.rageAttack}/移+${card.rageMove}`);
        else if (card.log) features.push(`法术·滚木:竖向3×${card.logRange}滚动 ${card.logDamage}伤穿甲${card.logPen}+击退`);
        else if (card.leftover) features.push('法术·剩饭:选友军攻+1/血+1永久');
        else if (card.stoneWall) features.push('法术·石墙:友军下回合无敌');
        else if (card.bigLightning) features.push(`法术·大闪电:5×5内血最高${card.lgtCount}敌 ${card.lgtDamage}伤`);
        else features.push(`法术·全图释放:${card.spellRadius*2+1}×${card.spellRadius*2+1}范围${card.spellDamage}伤/基地${card.baseDamage}伤`);
    }
    if (card.yogg) features.push('混沌统治/诱引狂乱/触须攒聚/用完才能普攻');
    if (card.yoggSaron) features.push('登场:每用法术随机放1个');
    if (card.chaosTentacle) features.push('部署自动释放随机法术');
    if (card.reynoldsHeal) features.push('登场大本营回满');
    if (card.magicShield) features.push('法术·魔盾:友军免疫法术伤害/效果');
    if (card.heal) features.push(`法术·治疗:3×3友军回${card.healAmount}血+1移`);
    if (card.evilMoon) features.push('法术·邪月:8队友变高费卡');
    if (card.shieldSpell) features.push(`法术·护盾:友军+${card.shieldAmount}伤护盾`);
    if (card.eagleArtillery) features.push('建筑·天鹰:敌方耗40能量开启/全图3炮');
    if (card.dirtyRat) features.push('打出召唤敌方牌库随机卡');
    if (card.crog) features.push('己方回合末敌方攻/血变1永久');
    if (card.yoggFate) features.push('释放15个法术转动命运之轮');
    if (card.lvbu) features.push('三技能栏/真伤附魔/低血增伤30%');
    if (card.missileLaunch) features.push('法术·导弹:消灭攻≥5敌人');
    if (card.crazyCannon) features.push('每回合直击基地一次+普攻一次');
    if (card.rollingStone) features.push('法术·滚石:消灭攻≤2敌人');
    if (card.viralSpread) features.push('法术·病传:全友军击杀连攻');
    if (card.guyDeathGate) features.push('冲撞4次/夕象伍足/爆衣夜凯');

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
        descEl.textContent = card.description + (card.leisiSpawn ? '(亲卫队×4:盾兵攻2/血4/护甲2,步兵攻3/血3/护甲1,射程5/移动4)' : '') + (card.copSpawn ? '(双击出警×4:远程攻4/射程6,近战攻2/穿甲1,护甲1/移动7,回合结束回警车+回1血)' : '') + (card.windForm ? '(攻击命中形成风阵:5×5范围,友军+4移动/敌军-3移动,持续4回合,不可叠加)' : '');
        descEl.style.display = '';
    } else if (descEl) {
        descEl.style.display = 'none';
    }
}

// 显示单位信息(双击棋盘上的单位)
function showUnitInfo(unit) {
    // 查看信息不残留选中(防止关闭信息框后再点击被误判为双击触发技能)
    if (gameState.selectedUnit) {
        clearHighlights();
        gameState.selectedUnit = null;
    }
    const used = gameState.moveUsed[unit.id] || 0;
    const windMod = getWindMoveMod(unit) + (unit.erinMoveBonus||0);
    const remaining = Math.max(0, unit.moveRange - used + windMod);

    cardName.textContent = unit.name;
    cardAttack.textContent = unit.attack;
    cardHp.textContent = `${unit.currentHp} / ${unit.maxHp}`;
    cardMove.textContent = `${unit.moveRange}(剩余 ${remaining})` + (windMod ? (windMod > 0 ? ` [风阵+${windMod}]` : ` [风阵${windMod}]`) : '');

    // 攻击范围信息
    if (unit.meleeAttack) {
        cardRange.textContent = `远:${unit.attackRange}格 ${unit.attack}伤  近:${unit.meleeRange}格 ${unit.meleeAttack}伤`;
    } else {
        cardRange.textContent = unit.attackRange;
    }
    cardCost.textContent = gameState.attackedUnits.has(unit.id) ? '已攻击' : '可攻击';

    // 状态区:护甲 / 冲锋 / 暴击
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
    // 限制卡组大小(最多10张)
    if (gameState.battleDeck.length >= 10) {
        alert('出战卡组已满(最多10张)');
        return;
    }

    // 每种卡只能带一张
    const alreadyHasCard = gameState.battleDeck.some(c => c.id === card.id);
    if (alreadyHasCard) {
        alert('每种卡只能带一张!');
        return;
    }

    gameState.battleDeck.push({ ...card });
    gameState.battleDeck.sort((a, b) => (a.cost || 0) - (b.cost || 0));
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
    gameState.battleDeck.sort((a, b) => (a.cost || 0) - (b.cost || 0));
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
    gameState.redEnergy = gameState.redEnergy || 1;
    gameState.blueEnergy = gameState.blueEnergy || 1;
    gameState.redBaseHp = 50;
    gameState.blueBaseHp = 50;
    gameState.timer = 45;
    gameState.selectedUnit = null;
    gameState.deployMode = false;
    gameState.moveUsed = {};
    gameState.attackedUnits.clear();
    gameState.gameOver = false;
    gameState.winner = null;
    gameState.windZones = [];

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
    positionChatMessages();

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
    document.getElementById('howToScreen').classList.add('hidden');
    if (gameState.battleDeck.length === 0) {
        alert('请先在卡包中添加出战卡组!');
        return;
    }
    startScreen.classList.add('hidden');
    document.getElementById('modeSelectScreen').classList.remove('hidden');
});

cardPackBtn.addEventListener('click', () => {
    cardInfoPanel.classList.add('hidden');
    document.getElementById('howToScreen').classList.add('hidden');
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

// 查克拉选择模式:能使用查克拉的友方单位标绿(能量未满、未冷却)
function enterChakraTargetMode() {
    clearHighlights();
    gameState._chakraTargeting = true;
    gameState.selectedUnit = null;
    gameState.units.forEach(u => {
        const isChakraChar = !!(u.madaraMaxEnergy || u.hashiMaxEnergy || u.painMaxEnergy || u.solveMaxEnergy || u.guyMaxEnergy);
        if (!isChakraChar || u.team !== gameState.currentTurn || u._removing) return;
        const maxE = u.hashiMaxEnergy || u.madaraMaxEnergy || u.painMaxEnergy || u.solveMaxEnergy || u.guyMaxEnergy || 4;
        const curE = (u.hashiEnergy !== undefined ? u.hashiEnergy : (u.madaraEnergy !== undefined ? u.madaraEnergy : (u.painEnergy !== undefined ? u.painEnergy : (u.solveEnergy !== undefined ? u.solveEnergy : (u.guyEnergy || 0)))));
        if (curE >= maxE) return; // 能量已满不可用
        if (u.chakraCd) return; // 冷却中不可用
        gameState.board[u.row][u.col].classList.add('chakra-target');
    });
}

// 法术按钮:打开法术面板(含查克拉牌)
function openSpellModal() {
    const grid = document.getElementById('spellModalGrid');
    grid.innerHTML = '';
    const curE = gameState.currentTurn === 'red' ? gameState.redEnergy : gameState.blueEnergy;
    // 查克拉牌:手牌有查克拉角色时显示(0费,不占卡牌库)
    const hasChakraChar = gameState.battleDeck.some(c => c.madaraMaxEnergy || c.hashiMaxEnergy || c.painMaxEnergy || c.solveMaxEnergy || c.guyMaxEnergy);
    if (hasChakraChar) {
        const el = document.createElement('div');
        el.className = 'battle-deck-card';
        el.innerHTML = `<div class="card-artwork art-chakra"></div><h4>查克拉</h4><div class="cost">0 能量</div>`;
        el.addEventListener('click', () => {
            document.getElementById('spellModal').classList.add('hidden');
            enterChakraTargetMode();
        });
        grid.appendChild(el);
    }
    gameState.battleDeck.forEach((card, index) => {
        if (!card.spell) return;
        const el = document.createElement('div');
        el.className = `battle-deck-card ${curE < card.cost ? 'disabled' : ''}`;
        el.innerHTML = `
            ${card.artwork ? `<div class="card-artwork art-${card.artwork}"></div>` : ''}
            <h4>${card.name}</h4>
            <div class="cost">${card.cost} 能量</div>
        `;
        el.addEventListener('click', () => {
            if (curE < card.cost) return;
            document.getElementById('spellModal').classList.add('hidden');
            startSpellCasting(card);
        });
        grid.appendChild(el);
    });
    if (!grid.children.length) grid.innerHTML = '<p style="color: #7f8c8d;">卡组中没有法术卡</p>';
    document.getElementById('spellModal').classList.remove('hidden');
}

// 进入法术施放模式:可选格子复用移动/攻击范围配色(空格+队友绿色 movable、敌人红色 attackable;友军目标法术不标敌人)
function startSpellCasting(card) {
    gameState._spellCasting = card;
    clearHighlights();
    gameState.selectedUnit = null;
    const friendlyTarget = !!(card.stoneWall || card.leftover || card.magicShield || card.shieldSpell); // 只能选友军的法术
    for (let r = 0; r < BOARD_ROWS; r++) {
        for (let c = 0; c < BOARD_COLS; c++) {
            if (isBlueBase(r, c) || isRedBase(r, c)) continue;
            const u = gameState.units.find(x => x.row === r && x.col === c);
            if (friendlyTarget && u && u.team !== gameState.currentTurn && !u.ghost && !u._removing) {
                continue; // 友军目标法术:敌人格子不高亮
            }
            if (u && u.team !== gameState.currentTurn && !u.ghost && !u._removing) {
                gameState.board[r][c].classList.add('attackable');
            } else {
                gameState.board[r][c].classList.add('movable');
            }
        }
    }
}

// 法术按钮与面板事件
document.getElementById('spellBtn').addEventListener('click', () => {
    if (gameState._spellCasting) {
        // 再次点击:取消施放模式
        gameState._spellCasting = null;
        clearHighlights();
        return;
    }
    openSpellModal();
});
document.getElementById('closeSpellModal').addEventListener('click', () => {
    document.getElementById('spellModal').classList.add('hidden');
});

// 尤格萨隆技能框
const yoggSkillModal = document.getElementById('yoggSkillModal');
document.getElementById('yoggSkill1Btn').addEventListener('click', () => {
    const y = gameState._yoggSelected;
    if (!y) return;
    closeYoggSkillModalFunc();
    enterYoggChaosMode(y);
});
document.getElementById('yoggSkill2Btn').addEventListener('click', () => {
    const y = gameState._yoggSelected;
    if (!y) return;
    closeYoggSkillModalFunc();
    yoggFrenzy(y);
});
document.getElementById('yoggSkill3Btn').addEventListener('click', () => {
    const y = gameState._yoggSelected;
    if (!y) return;
    closeYoggSkillModalFunc();
    yoggSkill3(y);
});
document.getElementById('closeYoggSkillModal').addEventListener('click', closeYoggSkillModalFunc);

// 弹窗遮罩点击关闭(防止面板挡住棋盘导致点击失效)
deployModal.addEventListener('click', (e) => { if (e.target === deployModal) closeDeployModalFunc(); });
spellModal.addEventListener('click', (e) => { if (e.target === spellModal) spellModal.classList.add('hidden'); });
yoggSkillModal.addEventListener('click', (e) => { if (e.target === yoggSkillModal) closeYoggSkillModalFunc(); });
// 吕布技能栏
const lvbuSkillModal = document.getElementById('lvbuSkillModal');
document.getElementById('lvbuSkill1Btn').addEventListener('click', () => {
    const lv = gameState._lvbuSelected;
    if (!lv) return;
    lvbuSkill1(lv);
});
document.getElementById('lvbuSkill2Btn').addEventListener('click', () => {
    const lv = gameState._lvbuSelected;
    if (!lv) return;
    lvbuSkill2(lv);
});
document.getElementById('lvbuSkill3Btn').addEventListener('click', () => {
    const lv = gameState._lvbuSelected;
    if (!lv) return;
    enterLvbuLanding(lv);
});
document.getElementById('closeLvbuSkillModal').addEventListener('click', closeLvbuSkillModalFunc);
lvbuSkillModal.addEventListener('click', (e) => { if (e.target === lvbuSkillModal) closeLvbuSkillModalFunc(); });
// 死门凯技能框
document.getElementById('guySkill1Btn').addEventListener('click', () => {
    const g = gameState._guySelected;
    if (!g) return;
    closeGuySkillModalFunc();
    enterGuyUltimateTarget(g, 'elephant');
});
document.getElementById('guySkill2Btn').addEventListener('click', () => {
    const g = gameState._guySelected;
    if (!g) return;
    closeGuySkillModalFunc();
    enterGuyUltimateTarget(g, 'night');
});
document.getElementById('closeGuySkillModal').addEventListener('click', closeGuySkillModalFunc);
document.getElementById('guySkillModal').addEventListener('click', (e) => { if (e.target === document.getElementById('guySkillModal')) closeGuySkillModalFunc(); });


// 模式选择按钮
const modeSelectScreen = document.getElementById('modeSelectScreen');
document.getElementById('howToBtn').addEventListener('click', () => {
    // 记录来源界面(主界面或模式选择)
    gameState._howToFrom = (!startScreen.classList.contains('hidden')) ? 'start' : 'mode';
    // 隐藏所有其他界面,再显示玩法介绍
    [startScreen, modeSelectScreen, cardPackScreen, gameScreen, document.getElementById('lobbyScreen')].forEach(s => { if (s) s.classList.add('hidden'); });
    document.getElementById('howToScreen').classList.remove('hidden');
});
document.getElementById('howToBackBtn').addEventListener('click', () => {
    document.getElementById('howToScreen').classList.add('hidden');
    if (gameState._howToFrom === 'start') startScreen.classList.remove('hidden');
    else modeSelectScreen.classList.remove('hidden');
});
document.getElementById('trainingBtn').addEventListener('click', () => {
    gameState.aiMode = false;
    gameState.maxEnergy = 500;
    gameState.redEnergy = 500;
    gameState.blueEnergy = 500;
    modeSelectScreen.classList.add('hidden');
    startGame();
});
document.getElementById('aiBattleBtn').addEventListener('click', () => {
    if (gameState.battleDeck.length < 10) {
        alert('人机对战需要携带至少10张卡牌才能开局,请先在卡包中添加卡牌!');
        return;
    }
    if (gameState.battleDeck.some(c => c.trainingOnly)) {
        alert('出战卡组包含训练木偶,仅可在训练营模式使用,请先在卡组中移除!');
        return;
    }
    gameState.aiMode = true;
    gameState.maxEnergy = 20;
    modeSelectScreen.classList.add('hidden');
    gameState.aiDeck = pickAIDeck();
    startGame();
    setTimeout(aiTurn, 1000);
});
document.getElementById('modeBackBtn').addEventListener('click', () => {
    modeSelectScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});

function pickAIDeck() { const s = [...cardLibrary].sort(() => Math.random()-0.5); return s.filter(c => !c.trainingOnly).slice(0,10).map(c=>({...c})); }
function aiTurn() {
    if (gameState.gameOver || gameState.currentTurn !== 'blue') return;
    const aiDeck = gameState.aiDeck || [];
    const energy = gameState.blueEnergy;
    const deployable = aiDeck.filter(c => c.cost <= energy && aiUnits.filter(u => u.cardId === c.id).length < 2);
    if (deployable.length > 0) {
        const card = deployable[Math.floor(Math.random() * deployable.length)];
        // 蓝方黑绝:优先附身己方未附身单位(无目标则正常部署本体)
        if (card.blackZetsu) {
            const hosts = gameState.units.filter(u => u.team === 'blue' && !u._possessed && !u.blackZetsu);
            if (hosts.length > 0) {
                const host = hosts[Math.floor(Math.random() * hosts.length)];
                gameState.blueEnergy -= card.cost; updateEnergyDisplay();
                possessUnit(card, host);
                setTimeout(aiMoveAndAttack, 500);
                return;
            }
        }
        for (let row = 14; row >= 3; row--) {
            for (let col = 10; col <= 19; col++) {
                if (gameState.units.some(u => u.row === row && u.col === col)) continue;
                if (isBlueBase(row, col) || isRedBase(row, col)) continue;
                const unit = { id: card.id+'_'+Date.now(), cardId: card.id, name: card.name, attack: card.attack, maxHp: card.hp, currentHp: card.hp, moveRange: card.moveRange, attackRange: card.attackRange, artwork: card.artwork, armor: card.armor||0, team: 'blue', row, col, flying: card.flying||false, meleeAttack: card.meleeAttack||0, meleeRange: card.meleeRange||0, armorPen: card.armorPen||0, critChance: card.critChance||0, dodge: card.dodge||false, counterAttack: card.counterAttack||0, summon: card.summon||false, summonGuardType: card.summonGuardType||'', tankSpawn: card.tankSpawn||false, leisiSpawn: card.leisiSpawn||false, copSpawn: card.copSpawn||false, windForm: card.windForm||false, splashRadius: card.splashRadius||0, deployEffect: card.deployEffect||false, hero: card.hero||false, heroDeployText: card.heroDeployText||'', heroDeployColor: card.heroDeployColor||'', heroDeployDuration: card.heroDeployDuration||3500, chargeMove: card.chargeMove||0, chargeDamage: card.chargeDamage||0, erin: card.erin||false, pekkaHeal: card.pekkaHeal||false, blowdart: card.blowdart||false, hashirama: card.hashirama||false, hashiMaxEnergy: card.hashiMaxEnergy||0, skullArmy: card.skullArmy||false,wither: card.wither||false,tesla: card.tesla||false,blackZetsu: card.blackZetsu||false,golem: card.golem||false,eliteIce: card.eliteIce||false,mirror: card.mirror||false,superKnight: card.superKnight||false,healFairy: card.healFairy||false,cannon: card.cannon||false,madaraSolve: card.madaraSolve||false };
                gameState.units.push(unit); renderUnit(unit);
                runDeployEffects(unit);
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
        const tk = getTaunter(u);
        if (gameState.attackedUnits.has(u.id)) return;
        const atkRng = u.attackRange || 1;

        // 1. 攻击范围内敌方单位
        let nearest = null, minD = Infinity;
        gameState.units.filter(e => e.team === 'red' && (!tk || e.id === tk.id)).forEach(e => {
            if (u.hogRider && !e.building) return;
            if (e.flying && !canHitAirUnit(u)) return;
            if (e.teslaHidden) return;
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

        // 2. 攻击范围内红方大本营(无双状态不打大本营)
        let inBaseRange = false;
        for (let r = 25; r <= 27; r++) for (let c = 10; c <= 13; c++) {
            const d = Math.max(Math.abs(r-u.row), Math.abs(c-u.col));
            if (d <= atkRng) { inBaseRange = true; break; }
        }
        if (inBaseRange && !u.inMusou) {
            gameState.selectedUnit = u;
            attackBase(false);
            gameState.selectedUnit = null;
            gameState.attackedUnits.add(u.id);
            return;
        }

        // 3. 向最近红方单位/大本营移动
        let targetR = 26, targetC = 11;
        let closestEnemy = null, cDist = Infinity;
        gameState.units.filter(e => e.team === 'red' && (!tk || e.id === tk.id)).forEach(e => {
            if (u.hogRider && !e.building) return;
            if (e.flying && !canHitAirUnit(u)) return;
            if (e.teslaHidden) return;
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
            gameState.units.filter(e => e.team === 'red' && (!tk || e.id === tk.id)).forEach(e => {
                if (u.hogRider && !e.building) return;
                if (e.flying && !canHitAirUnit(u)) return;
                if (e.teslaHidden) return;
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

// 部署弹窗卡牌点击--事件委托:在父容器上统一监听,取代逐卡牌绑定的 addEventListener
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

window.addEventListener('resize', () => { if (typeof positionChatMessages === 'function') positionChatMessages(); });

// 聊天消息定位到棋盘右侧
function positionChatMessages() {
    const cont = gameBoard.parentElement;
    const boardRect = gameBoard.getBoundingClientRect();
    const contRect = cont.getBoundingClientRect();
    chatMessages.style.left = Math.max(4, (boardRect.right - contRect.left) + 8) + 'px';
    chatMessages.style.right = 'auto';
}

// 聊天系统
const chatBtn = document.getElementById('chatBtn');
const chatOptions = document.getElementById('chatOptions');
const chatMessages = document.getElementById('chatMessages');
let chatLastSend = 0;
chatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatOptions.classList.toggle('hidden');
});
document.querySelectorAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sendChatMessage(btn.dataset.text);
        chatOptions.classList.add('hidden');
    });
});
function sendChatMessage(text) {
    const now = Date.now();
    if (now - chatLastSend < 500) return; // 0.5秒冷却
    chatLastSend = now;
    const msg = document.createElement('div');
    msg.className = 'chat-msg';
    msg.textContent = text;
    chatMessages.appendChild(msg);
    setTimeout(() => {
        msg.classList.add('chat-msg-out');
        setTimeout(() => { if (msg.parentNode) msg.parentNode.removeChild(msg); }, 500);
    }, 1500); // 1.5秒后渐变消失
}

// 点击页面其他地方关闭卡牌信息面板 + 点击棋盘外空白取消选中
var outsideClickCancel = () => {
    if (gameState.selectedUnit) {
        clearHighlights();
        gameState.selectedUnit = null;
    }
};
document.addEventListener('click', (e) => {
    if (e.target.closest('.card-info-panel') || e.target.closest('.card-info-btn') || e.target.closest('.cell') || e.target.closest('.battle-deck-card') || e.target.closest('.deck-card') || e.target.closest('#deployModal') || e.target.closest('button')) return;
    cardInfoPanel.classList.add('hidden');
    outsideClickCancel();
});

// 初始化
initPreviewBoard();

// 导出用于调试
window.gameState = gameState;