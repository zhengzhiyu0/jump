import CameraManager from "./manager/CameraManager";
import GameManager from "./manager/GameManager";
import MapManager from "./manager/MapManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(GameManager)
    gameManager: GameManager = null;

    @property(MapManager)
    mapManager: MapManager = null;

    @property(CameraManager)
    cameraManager: CameraManager = null;

    public static root: cc.Node = null;
    public static _gameManager: GameManager = null;
    public static _mapManager: MapManager = null;
    public static _cameraManager: CameraManager = null;

    start() {
        GameMain.root = this.node;
        GameMain._gameManager = this.gameManager;
        GameMain._mapManager = this.mapManager;
        GameMain._cameraManager = this.cameraManager;
    }

    // update (dt) {}
}
