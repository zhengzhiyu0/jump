const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("component/Prop")
export default class Prop extends cc.Component {
    private config = null;

    start() {

    }

    setData(config) {
        this.config = config;
    }

    animation() {
        cc.tween(this.node).to(0.35, {
            y: this.node.y + 50,
            scale: 1.5
        }).to(0.1, {
            opacity: 0
        }).call(() => {
            console.log("吃到道具", this.config)
            this.node.destroy();
        }).start();
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.CircleCollider) {
        this.animation();
    }

    // update (dt) {}
}
