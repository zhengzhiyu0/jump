export interface IMapConfig {
    [propName: string]: IMapConfigData
}

export interface IMapConfigData {
    id: number,
    prefab: string,
    bg: string,
}

export const MapConfig: IMapConfig = {
    map1: {
        id: 1,
        prefab: "m_stage1",
        bg: "bg1"
    }
}