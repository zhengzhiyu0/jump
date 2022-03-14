const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraManager extends cc.Component {

    target: cc.Node = null;

    private max_x = 1334;

    // onLoad () {}

    start() {

    }

    initCamera(mapNode: cc.Node, target: cc.Node) {
        var mainWidth = cc.find("Canvas").width;
        var mapWidth = mapNode.width;
        this.max_x = mapWidth - mainWidth;

        this.target = target;
    }

    update(dt) {
        if (!this.target) return;
        // 将节点坐标系下的一个点转换到世界空间坐标系
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0, 0));
        // 将一个点转换到节点 (局部) 空间坐标系
        var c_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        if (c_pos.x <= 0 || c_pos.x >= this.max_x) {
            return;
        }
        this.node.x = c_pos.x;

    }
}
