import ResHelp from "./tool/ResHelp";

const { ccclass, property } = cc._decorator;
const Res = ResHelp.instance;

@ccclass
export default class MapManager extends cc.Component {

    // onLoad () {}
    private mapNode: cc.Node = null;
    private floorLayer: cc.TiledLayer = null;

    @property(cc.Node)
    gameObj: cc.Node = null;

    @property(cc.Node)
    t:cc.Node = null

    protected start() {
    }

    public initMap() {
        //初始化地图大小
        let mapNode = this.node.children[0];
        if (!mapNode) {
            cc.error("no mapNode");
            return;
        }
        this.mapNode = mapNode;
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
        this.floorLayer = layer;
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

                    // console.log("properties___", properties)
                    let prefabName = properties.prefab;

                    if (properties.kind === "Food") {
                        continue;
                    }
                    if (properties.kind === "dy_wall") {
                        let worldPos = this.tilePos2PixelPos(raw, col);
                        console.log("worldPos",worldPos)
                        let location = this.gameObj.convertToNodeSpaceAR(worldPos);
                        console.log("location",location)

                        let node = cc.instantiate(this.t)
                        node.parent = this.gameObj;
                        node.x = location.x;
                        node.y = location.y

                        // Res.getPrefab("mo_" + "dy_wall").then(res => {
                        //     let node = cc.instantiate(res);
                        //     this.gameObj.addChild(node);
                        //     node.setPosition(location);
                        // })
                        continue;
                    }
                    if (prefabName) {

                    }
                }
            }
        }

        layer.node.active = false;
    }


    private tilePos2PixelPos(raw, col) {
        let pixelPos = this.floorLayer.getPositionAt(raw, col);

        let p2 = this.mapNode.convertToWorldSpaceAR(pixelPos);

        return p2;
    }

    // update (dt) {}
}
