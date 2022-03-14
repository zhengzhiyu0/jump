export interface IPropsConfig {
    [propName: number]: IPropsConfigData
}

export interface IPropsConfigData {
    id: string,
    type: string,
    icon: string,
    sname: string,
    hero?: string,
    kind?: string,
    price?: number,
    noSale?: boolean,
    attr?: any,
    quality: string,
    desc: string
}

export const PropsConfig: IPropsConfig = {
    10000101: {
        id: "10000101",
        type: "Coin",
        icon: "coin",
        sname: "金币",
        quality: "normal",
        desc: "金光闪闪的"
    },
    10000103: {
        id: "10000103",
        type: "Prop",
        icon: "score",
        sname: "积分",
        quality: "normal",
        desc: ""
    },
    10000102: {
        id: "10000102",
        type: "Prop",
        icon: "reviveCoin",
        sname: "复活币",
        kind: "coin",
        quality: "normal",
        price: 10,
        desc: "在关卡内死亡后，消耗一枚即可立即满血复活！！",

    },
    // 10000103: {
    //     id: "10000103",
    //     type: "Prop",
    //     icon: "hp",
    //     sname: "生命药水",
    //     kind: "coin",
    //     quality: "rare",
    //     price: 15,
    //     desc: "回复1滴血，使用后进入10秒钟的冷却时间",
    //     attr: {
    //         cd: 10,
    //         recover: 1
    //     }
    // },

    10000104: {
        id: "10000104",
        type: "Prop",
        icon: "mp",
        sname: "魔力药水",
        kind: "coin",
        quality: "rare",
        price: 15,
        desc: "回复50魔力值，使用后进入10秒钟的冷却时间",
        attr: {
            cd: 10,
            recover: 50
        }
    },
    10001001: {
        id: "10001001",
        type: "Prop",
        icon: "owletchip",
        hero: "owlet",
        sname: "英雄碎片-沐恩",
        quality: "epic",
        kind: "chip",
        noSale: true,
        desc: "只限于兑换英雄-沐恩",
        attr: {
            goal: 66
        }

    },
    10001002: {
        id: "10001002",
        type: "Prop",
        hero: "dude",
        icon: "dudechip",
        sname: "英雄碎片-小皮",
        kind: "chip",
        quality: "epic",
        noSale: true,
        desc: "只限于用于兑换英雄-小皮",
        attr: {
            goal: 30
        }

    },
    10000001: {
        id: "10000001",
        price: 666,
        type: "Skill",
        icon: "blackhole",
        kind: "coin",
        sname: "吞噬之力",
        quality: "epic",
        desc: "在移动方向发射一颗黑洞，对碰触到的敌人造成2点伤害",
        attr: {
            skillDamage: 2,
            moveSpeed: 400,
            atkDistance: 700,
            cd: 1, //s
            act: "blackhole",
            costMp: 80
        }
    },
    10000002: {
        id: "10000002",
        price: 450,
        type: "Skill",
        icon: "fireball",
        kind: "coin",
        sname: "地狱火球",
        quality: "epic",
        desc: "在移动方向发射一颗火球对碰触到的敌人造成2点伤害",
        attr: {
            skillDamage: 2,
            moveSpeed: 300,
            atkDistance: 500,
            cd: 2.5, //s
            act: "fireball",
            costMp: 50
        }
    },
    10000003: {
        id: "10000003",
        price: 450,
        type: "Skill",
        icon: "fireball_3",
        kind: "coin",
        sname: "三只火球",
        quality: "epic",
        desc: "在移动方向发射3颗火球全部命中敌人后将造成3点的伤害",
        attr: {
            skillDamage: 1,
            moveSpeed: 300,
            atkDistance: 500,
            cd: 3, //s
            act: "danmaku",
            costMp: 80
        }
    },
    10000004: {
        id: "10000004",
        price: 8000,
        type: "Skill",
        icon: "shield",
        kind: "score",
        sname: "护盾",
        quality: "epic",
        desc: "在角色身上套上一个光环2.5秒内将抵御任何伤害",
        attr: {
            skillDamage: 0,
            cd: 20, //s
            time: 2.5, //s,
            act: "shield",
            costMp: 50
        }

    },

    10000005: {
        id: "10000005",
        icon: "lightningbolt",
        type: "Skill",
        kind: "coin",
        sname: "光爆冲击",
        noSale: true,
        quality: "epic",
        desc: "在敌人附近随机位置发出一道闪电对击中的敌人2点造成伤害",
        attr: {
            skillDamage: 2,
            cd: 5, //s
            scope: 600, //作用范围
            time: 2.5, //s,
            act: "lightningbolt",
            costMp: 5
        }

    },
    10000006: {
        id: "10000006",
        price: 888,
        type: "Skill",
        icon: "midastouch",
        kind: "coin",
        sname: "点石成金",
        quality: "epic",
        desc: "300秒内捡取金币额外获得50%加成",
        attr: {
            skillDamage: 0,
            cd: 60 * 5, //s  60*5
            buffTime: 60 * 5, //s
            time: 1, //s,
            act: "midastouch",
            coinAdditionRate: 0.5, //50% 金币加成
            costMp: 100  // 100
        }
    },

    /** 暂时不开放 **/
    // explosion:{
    //     price:1000,
    //     icon:"explosion",
    //     kind:"coin",
    //     sname: "熔岩爆破",
    //     desc:"在角色身后方生成一个球，对先进入攻击范围的敌人发起攻击并对造成伤害。",
    //     attr:{
    //         skillDamage:2,
    //         cd:5, //s
    //         scope:600, //如果敌人在600 范围内 会自动瞄准敌人发射
    //         moveSpeed:300,
    //         atkDistance:700,
    //         act:"explosion",
    //         costMp:50
    //     }
    //
    // },
    /** 暂时不开放 **/
    // lightning:{
    //     price:255,
    //     icon:"lightning",
    //     kind:"coin",
    //     sname: "电闪之光",
    //     desc:"在角色移动方向发出闪电，对范围内的敌人造成伤害。",
    //     attr:{
    //         skillDamage:2,
    //         cd:1, //s
    //         time:3, //s,
    //         act:"lightning",
    //         costMp:30
    //     }
    // },

    /** 暂时不开放 **/
    // spikes:{
    //     price:6666,
    //     icon:"spikes",
    //     kind:"score",
    //     sname: "地刺",
    //     desc:"在最近的敌人脚下生成一些地刺，并对敌人造成伤害。",
    //     skillDamage:2,
    //     cd:5, //s
    //     time:1.5, //s,
    //     act:"spikes",
    //     scope:600, //作用范围
    //     costMp:50
    // },
    /** 暂时不开放 **/
    // firewall:{
    //     price:666,
    //     icon:"firewall",
    //     kind:"coin",
    //     sname: "火墙",
    //     desc:"在最近的敌人身上生成一道火墙，并对敌人造成伤害。",
    //     skillDamage:2,
    //     cd:5, //s
    //     time:1.5, //s,
    //     scope:600, //作用范围
    //     act:"firewall",
    //     costMp:50
    // },
    /** 暂时不开放 **/
    // sunstrike:{
    //     price:500,
    //     icon:"sunstrike",
    //     kind:"coin",
    //     sname: "烈日冲击",
    //     desc:"在最近的敌人身上生成一道火柱，并对敌人造成伤害。",
    //     attr:{
    //         skillDamage:2,
    //         cd:5, //s
    //         time:1.5, //s,
    //         scope:600, //作用范围
    //         act:"sunstrike",
    //         costMp:50
    //     }
    // }
}