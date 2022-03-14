const { ccclass, property } = cc._decorator;

let instance: ResHelp = null;

@ccclass
export default class ResHelp extends cc.Component {

    static get instance() {
        if (!instance) {
            instance = new ResHelp();
        }

        return instance;
    }

    public getPrefab(url) {
        return new Promise<cc.Prefab>((resolve, reject) => {
            cc.loader.loadRes(url, (err, asset: cc.Prefab) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(asset);
                }
            });
        })

    }

}
