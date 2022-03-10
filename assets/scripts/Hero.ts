const { ccclass, property } = cc._decorator;
@ccclass
export default class Hero extends cc.Component {
    @property
    public speed: number = 200;
    private _tempV2: cc.Vec2 = cc.v2(0, 0);
    private _input = {};
    private _state = {
        stand: 1,
        attack: 2
    }
    private _heroState: number = null;
    private _animationName: string = "idle";
    private _rigidBody: cc.RigidBody = null;
    protected onLoad() {
        this._heroState = this._state.stand;
        this._rigidBody = this.node.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
    protected onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }
    private onKeyDown(e: cc.Event.EventKeyboard) {
        this._input[e.keyCode] = 1;
    }
    private onKeyUp(e: cc.Event.EventKeyboard) {
        this._input[e.keyCode] = 0;
    }
    protected update(dt: number) {
        let lv = this._rigidBody.linearVelocity;
        let scaleX = Math.abs(this.node.scaleX);

        if (this._input[cc.macro.KEY.a] || this._input[cc.macro.KEY.left]) {
            this._tempV2.x = -1;
        } else if (this._input[cc.macro.KEY.d] || this._input[cc.macro.KEY.right]) {
            this._tempV2.x = 1;
        } else {
            this._tempV2.x = 0;
        }

        if (this._input[cc.macro.KEY.w] || this._input[cc.macro.KEY.up]) {
            this._tempV2.y = 1;
        } else if (this._input[cc.macro.KEY.s] || this._input[cc.macro.KEY.down]) {
            this._tempV2.y = -1;
        } else {
            this._tempV2.y = 0;
        }

        if (this._tempV2.x) {
            lv.x = this._tempV2.x * this.speed;
            this.node.scaleX = scaleX * this._tempV2.x;
        } else {
            lv.x = 0;
        }

        if (this._tempV2.y) {
            lv.y = this._tempV2.y * this.speed;
        } else {
            lv.y = 0;
        }

        this._rigidBody.linearVelocity = lv;
    }
}
