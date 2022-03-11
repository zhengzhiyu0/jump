const { ccclass, property } = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {

    // onLoad () {}

    protected start() {

    }

    public initMap() {
        //初始化地图大小
        let mapNode = this.node.children[0];
        if (!mapNode) {
            cc.error("no mapNode");
            return;
        }
        let tiledMap = mapNode.getComponent(cc.TiledMap);
        let tiledSize = tiledMap.getTileSize();
        // console.log("tiledSize", tiledSize)
        let canvas = cc.find("Canvas");
        let x = -canvas.position.x;
        let y = -canvas.position.y;
        mapNode.scaleX = 64 / tiledSize.width;
        mapNode.scaleY = 64 / tiledSize.height;
        mapNode.setAnchorPoint(0, 0);
        mapNode.setPosition(x, y);

        this.setFloor(tiledMap, tiledSize);
        this.setItems(tiledMap);
    }

    setFloor(tiledMap: cc.TiledMap, tiledSize: cc.Size) {
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

    setItems(tiledMap: cc.TiledMap) {
        let layer = tiledMap.getLayer("items");
        let size = layer.getLayerSize();
        let width = size.width;
        let height = size.height;

        for (let col = 0; col < height; col++) {
            for (let raw = 0; raw < width; raw++) {
                let curGId = layer.getTileGIDAt(raw, col);
                let properties = tiledMap.getPropertiesForGID(curGId);
                let size = tiledMap.getTileSize();
                if (properties) {
                    console.log("properties___", properties)
                    let prefabName = properties.prefab;

                    if (properties.kind === "Food") {
                        continue;
                    }
                    if (prefabName) {

                    }
                }
            }
        }

        layer.node.active = false;
    }

    // update (dt) {}
}
