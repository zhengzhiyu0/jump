import GameMain from "../GameMain";
import ResHelp from "../tool/ResHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;

        cc.director.getPhysicsManager().gravity = cc.v2(0, -600);
    }

    protected async start() {
        //地图
        let mapNode = await GameMain._mapManager.initMap(1);

        //英雄
        const curPointInfo = GameMain._mapManager.getOneMapObjectInfo(mapNode, "born", "kind", "hero");
        let pos = GameMain._mapManager.getPosInMapObject(curPointInfo);
        let heroPrefab = await ResHelp.instance.getPrefab("hero/m_hero1")
        let hero = cc.instantiate(heroPrefab);
        hero.scale = 0.8;
        GameMain.root.addChild(hero);
        hero.position = cc.v3(pos);

        //相机
        GameMain._cameraManager.initCamera(mapNode, hero);
    }

    // update (dt) {}
}
