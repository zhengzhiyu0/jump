const { ccclass, property } = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {

    // onLoad () {}

    @property
    stageScale: number = 0;

    protected start() {

    }

    public initMap() {
        let stage = this.node.children[0];
        if (!stage) {
            cc.error("no stage");
            return;
        }

        stage.scale = this.stageScale;

        let canvas = cc.find("Canvas");
        let x = -canvas.position.x;
        let y = -canvas.position.y;
        stage.setAnchorPoint(0, 0);
        stage.setPosition(x, y);


        let tiledMap = stage.getComponent(cc.TiledMap);
        let tiledSize = tiledMap.getTileSize();
        console.log("tiledSize", tiledSize)
        let layer = tiledMap.getLayer("floor");
        let layerSize = layer.getLayerSize();


        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                let tiled = layer.getTiledTileAt(i, j, true);
                if (tiled.gid != 0) {

                    let curGId = layer.getTileGIDAt(i, j);
                    let properties = tiledMap.getPropertiesForGID(curGId);

                    if (properties && properties.isCollide) {
                        let tempNode = new cc.Node();
                        tempNode.parent = tiled.node.parent;
                        tempNode.position = tiled.node.position;
                        tempNode.scale = tiled.node.scale;
                        tempNode.group = "floor";

                        let body = tempNode.addComponent(cc.RigidBody);
                        body.type = cc.RigidBodyType.Static;
                        let collider = tempNode.addComponent(cc.PhysicsBoxCollider);
                        collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                        collider.size = tiledSize;
                        collider.apply();
                    }

                }

            }
        }
    }

    // update (dt) {}
}
