const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    private max_x = 1334;

    // onLoad () {}

    start() {
        var mainWidth = cc.find("Canvas").width;
        var mapWidth = this.map.children[0].width;
        this.max_x = mapWidth - mainWidth;
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
