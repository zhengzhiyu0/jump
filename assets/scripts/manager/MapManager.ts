import Prop from "../component/Prop";
import { MapConfig } from "../config/MapConfig";
import { PropsConfig } from "../config/PropsConfig";
import ResHelp from "../tool/ResHelp";

const { ccclass, property } = cc._decorator;
const Res = ResHelp.instance;

@ccclass
export default class MapManager extends cc.Component {

    // onLoad () {}
    private mapNode: cc.Node = null;
    private floorLayer: cc.TiledLayer = null;

    @property(cc.Node)
    gameObj: cc.Node = null;

    protected start() {
    }

    public async initMap(mapId: number) {
        this.node.removeAllChildren();
        let config = MapConfig["map" + mapId];

        let bgPrefab = await Res.getPrefab("bg/" + config.bg);
        let mapPrefab = await Res.getPrefab("maps/" + config.prefab);

        //初始化地图大小
        let bgNode = cc.instantiate(bgPrefab);
        let mapNode = cc.instantiate(mapPrefab)
        this.node.addChild(bgNode);
        this.node.addChild(mapNode);
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

        let mapRealWidth = mapNode.scaleX * mapNode.width;
        let mapRealHeight = mapNode.scaleY * mapNode.height;
        bgNode.getComponent(cc.Sprite).type = cc.Sprite.Type.TILED;
        bgNode.width = mapNode.width / 2;
        // bgNode.height = mapRealHeight;
        bgNode.scaleY = mapRealHeight / bgNode.height;

        this.setFloor(tiledMap, tiledSize);
        this.setItems(tiledMap);
        this.setCoin();
        this.setMob();

        return mapNode;
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
                    if (prefabName) {
                        let worldPos = this.tilePos2PixelPos(raw, col);
                        // console.log("worldPos",worldPos)
                        let location = this.gameObj.convertToNodeSpaceAR(worldPos);
                        // console.log("location",location)

                        if (properties.kind === "dy_wall") {
                            Res.getPrefab("items/mo_" + prefabName).then(res => {
                                let node = cc.instantiate(res);
                                this.gameObj.addChild(node);
                                node.setPosition(location);

                                if (properties.kind === "Food") {

                                } else if (properties.kind === "dy_wall") {
                                    let type = properties.type;
                                    if (type && node) {
                                        node.getChildByName(type + "").active = true;
                                        node["type"] = type;
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }

        layer.node.active = false;
    }

    private setCoin() {
        const objs = this.getMapObjectInfo(this.mapNode, "obj", "kind", "coin");
        // console.log(objs);
        objs.forEach(point => {
            let id = point.id;
            let config = PropsConfig[id];
            if (!config) {
                return;
            }
            const pos = this.getPosInMapObject(point);

            let num = point.num;
            let price = point.price;
            let stinger = point.stinger;
            switch (point.shape) {
                case "circle":
                    let startPos = pos.clone();
                    if (num) {
                        for (let i = 1; i <= num; i++) {
                            let angle = cc.misc.degreesToRadians(point.rot * i);
                            let nextX = point.len * Math.cos(angle) + startPos.x;
                            let nextY = point.len * Math.sin(angle) + startPos.y;
                            this.spawnDropProp({
                                config,
                                pos: cc.v2(nextX, nextY),
                                num: 1,
                                price,
                                stinger
                            })
                        }
                    }
                    break;
                case "line":
                    if (num) {
                        let startPos = pos.clone();
                        for (let i = 1; i <= num; i++) {
                            if (i >= 2) {
                                startPos = startPos.add(cc.v2(point.px, point.py));
                            }
                            this.spawnDropProp({
                                config,
                                pos: startPos,
                                num: 1,
                                price,
                                stinger
                            })
                        }
                    }
                    break;
            }
        })
    }

    private setMob() {
        const objs = this.getMapObjectInfo(this.mapNode, "born", "kind", "mob");
        objs.forEach(point => {
            const pos = this.getPosInMapObject(point);
            Res.getPrefab("mob/" + point.mob).then(res => {
                let mob = cc.instantiate(res);
                mob.parent = this.gameObj;
                mob.setPosition(pos);
            })
        })
    }

    private async spawnDropProp(obj) {
        let pos = obj.pos;
        let currentPos = obj.currentPos || null;
        let num = obj.num;
        let config = obj.config;
        let stinger = obj.stinger;
        let isLoadMirror = obj.isLoadMirror;
        let node: cc.Node = null;
        if (config.icon === "coin") {
            node = cc.instantiate(await Res.getPrefab("obj/coin"));
            node.getComponent(Prop).setData(config);
        } else {
            // node = toy.pools.get("mo_dropItem");
            // let iconNode = cc.find("icon", node);
            // iconNode.getComponent(
            //     cc.Sprite
            // ).spriteFrame = cc.Canvas.instance.pictures.get(config.icon);
        }

        // let bgNode = cc.find("bg", node);
        // if (num && currentPos) {
        //     bgNode.active = true;
        //     let sub = bgNode.children[0];

        //     sub.getComponent(cc.Label).string =
        //         num > 1 ? `${config.sname}(${num}个)` : `${config.sname}`;
        //     sub.color = toy.CONST.propColor[config.quality.toUpperCase()];
        // } else {
        //     bgNode.active = false;
        // }
        node.parent = this.gameObj;
        node.active = true;
        if (!currentPos || isLoadMirror) {
            node.setPosition(pos);
        } else {
            // node.setPosition(currentPos);
            // toy.com("JumpToPos", { node, pos, currentPos });
        }


    }

    public tilePos2PixelPos(raw, col) {
        let pixelPos = this.floorLayer.getPositionAt(raw, col);

        let p2 = this.mapNode.convertToWorldSpaceAR(pixelPos);

        return p2;
    }

    public getMapObjectInfo(mapNode: cc.Node, layoutName: string, objType: string, objName: string) {
        let mapInfo = mapNode.getComponent(cc.TiledMap);
        let objInfo = mapInfo.getObjectGroup(layoutName);
        if (!objInfo) {
            return null;
        }
        let objPoints = objInfo.getObjects();

        if (objType && objName) {
            let res = objPoints.filter(o => {
                return o[objType] === objName;
            })

            return res.length ? res : null;
        } else {
            return objPoints;
        }
    }

    public getOneMapObjectInfo(mapNode: cc.Node, layoutName: string, objType: string, objName: string) {
        let res = this.getMapObjectInfo(mapNode, layoutName, objType, objName);
        return (res && res.length) ? res[0] : null;
    }

    public getPosInMapObject(localPoint) {
        let localPointOffset = localPoint.offset;
        let canvas = cc.find("Canvas");
        return cc.v2(
            (-canvas.position.x) + localPointOffset.x * this.mapNode.scaleX,//瓦片地图160（32）
            canvas.position.y - localPointOffset.y * this.mapNode.scaleY//瓦片地图160（32）
        );
    }

    // update (dt) {}
}
