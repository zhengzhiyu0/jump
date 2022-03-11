import MapManager from "./MapManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(MapManager)
    mapManager: MapManager = null;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit
        ;

        // cc.director.getPhysicsManager().gravity = cc.v2(0, -600);
    }

    protected start() {
        this.mapManager.initMap();
    }

    // update (dt) {}
}
