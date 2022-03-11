const { ccclass, property } = cc._decorator;

let instance: InputHelp = null;
@ccclass
export default class InputHelp extends cc.Component {
    private _pressd_map: any = {};
    private _just_pressd_map: any = {};
    private _just_released_map: any = {};


    // 标记按键是否按下
    private set_pressed_status(k: number, status: boolean) {
        if (status != false && !!this._pressd_map[k]) {
            return;
        }

        this._pressd_map[k] = status;
        this._just_pressd_map[k] = status;
    }

    // 标记按键松开状态
    private set_released_status(k: number, status: boolean) {
        this._just_released_map[k] = status;
    }

    // 获取按键按压状态
    is_action_pressed(k: number) {
        return !!this._pressd_map[k];
    }

    // 获取按键按压状态（仅一次）
    is_action_just_pressed(k: number) {
        let pressed_status = this._just_pressd_map[k];
        this._just_pressd_map[k] = false;
        return !!pressed_status;
    }

    // 获取按键松开状态（仅一次）
    is_action_just_released(k: number) {
        let released_status = this._just_released_map[k];
        this._just_released_map[k] = false;
        return !!released_status;
    }

    constructor() {
        super();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e: cc.Event.EventKeyboard) => {
            this.set_pressed_status(e.keyCode, true);
            this.set_released_status(e.keyCode, false);
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e: cc.Event.EventKeyboard) => {
            this.set_pressed_status(e.keyCode, false);
            this.set_released_status(e.keyCode, true);
        }, this);
    }

    static get instance() {
        if (!instance) {
            instance = new InputHelp();
        }

        return instance;
    }

}
