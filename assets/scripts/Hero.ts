import AnimatorSpine from "./tool/animator/AnimatorSpine";
import InputHelp from "./tool/InputHelp";

const { ccclass, property } = cc._decorator;
const Input = InputHelp.instance;

@ccclass
export default class Hero extends cc.Component {
    @property(sp.Skeleton) SpineBoy: sp.Skeleton = null;
    private _animatorMain: AnimatorSpine = null;

    @property
    public speed: number = 200;

    @property
    public jumpHeight: number = 300;

    private _tempV2: cc.Vec2 = cc.v2();
    private _state = {
        stand: 1,
        attack: 2
    }
    private _heroState: number = null;
    private _animationName: string = "idle";
    private _rigidBody: cc.RigidBody = null;
    private canJump = true;

    protected onLoad() {
        this._animatorMain = this.SpineBoy.getComponent(AnimatorSpine);
        this._animatorMain.onInit((fromState: string, toState: string) => {
            cc.log(`state change: ${fromState} -> ${toState}`);
        });

        this._heroState = this._state.stand;
        this._rigidBody = this.node.getComponent(cc.RigidBody);
    }

    protected onDestroy() {

    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (otherCollider.node.group == "floor" && selfCollider.tag == 0) {
            this.canJump = true;
        }
    }

    protected update(dt: number) {
        let lv = this._rigidBody.linearVelocity;
        let scaleX = Math.abs(this.node.scaleX);

        if (Input.is_action_pressed(cc.macro.KEY.a) || Input.is_action_pressed(cc.macro.KEY.left)) {
            this._tempV2.x = -1;
        } else if (Input.is_action_pressed(cc.macro.KEY.d) || Input.is_action_pressed(cc.macro.KEY.right)) {
            this._tempV2.x = 1;
        } else {
            this._tempV2.x = 0;
        }
        if (this._tempV2.x) {
            lv.x = this._tempV2.x * this.speed;
            this.node.scaleX = scaleX * this._tempV2.x;
        } else {
            lv.x = 0;
        }
        this._animatorMain.setNumber('speed', Math.abs(this._tempV2.x));


        if (Input.is_action_just_pressed(cc.macro.KEY.k) && this.canJump) {
            lv.y = this.jumpHeight;
            this.canJump = false;
            this._animatorMain.autoTrigger("jump");
        }

        this._rigidBody.linearVelocity = lv;
    }
}
