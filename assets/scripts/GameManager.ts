import CameraManager from "./CameraManager";
import MapManager from "./MapManager";
import ResHelp from "./tool/ResHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(MapManager)
    mapManager: MapManager = null;

    @property(CameraManager)
    cameraManager: CameraManager = null;

    public static _mapManager: MapManager = null;
    public static _cameraManager: CameraManager = null;

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
        GameManager._mapManager = this.mapManager;
        GameManager._cameraManager = this.cameraManager;

        //地图
        let mapNode = await this.mapManager.initMap(1);

        //英雄
        const curPointInfo = this.mapManager.getOneMapObjectInfo(mapNode, "born", "kind", "hero");
        console.log("curPointInfo", curPointInfo)
        let pos = this.mapManager.getPosInMapObject(curPointInfo);
        console.log("pos", pos)
        let heroPrefab = await ResHelp.instance.getPrefab("hero/m_hero1")
        let hero = cc.instantiate(heroPrefab);
        this.node.addChild(hero);
        hero.position = cc.v3(pos);

        //相机
        this.cameraManager.initCamera(mapNode, hero);
    }

    // update (dt) {}
}
