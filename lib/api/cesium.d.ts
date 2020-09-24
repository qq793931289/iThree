export declare class Cesium {
    private static _ak;
    private static _baiduBaseUrl;
    private static _geoatlasBaseUrl;
    constructor();
    static getPoint(input: string): Promise<any>;
    static getAddress(long?: number, lat?: number): Promise<any>;
    static getGeoatlas(adcode?: string | number, full?: boolean): Promise<any>;
}
