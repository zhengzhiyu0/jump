import GameMain from "../GameMain";
import AnimatorSpine from "../tool/animator/AnimatorSpine";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("component/Mob")
export default class Mob extends cc.Component {

    // onLoad () {}
    private runDir = 1;
    private runSpeed = 40;
    private runGrid = 0;

    @property(sp.Skeleton) SpineBoy: sp.Skeleton = null;
    private _animatorMain: AnimatorSpine = null;

    onLoad() {
        this._animatorMain = this.SpineBoy.getComponent(AnimatorSpine);
        this._animatorMain.onInit((fromState: string, toState: string) => {
            cc.log(`state change: ${fromState} -> ${toState}`);
        });
    }

    start() {
        this.run();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (selfCollider.tag == 1 && otherCollider.node.group == "floor") {
            let pos: cc.Vec2 = otherCollider.node["mapPos"].clone();

            pos.x = pos.x + this.runDir;
            let isFloor = GameMain._mapManager.isFloor(pos);
            // console.log("isFloor", isFloor);
            if (!isFloor) {
                this.run();
            } else {
                this.runGrid++;
                if (this.runGrid >= 5) {
                    this.runGrid = 0;
                    this.run();
                }
            }
        }
    }

    private run() {
        this._animatorMain.autoTrigger("move");
        this.runDir = -this.runDir;
        this.node.scaleX = this.runDir * Math.abs(this.node.scaleX);
        let rb = this.node.getComponent(cc.RigidBody);
        let lv = rb.linearVelocity;
        rb.linearVelocity = cc.v2(this.runSpeed * this.runDir, lv.y);
    }

    // update (dt) {}
}
