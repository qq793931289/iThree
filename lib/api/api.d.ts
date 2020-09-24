import { Jsonp } from './jsonp';
import { Cesium } from './cesium';
import { Axios } from './axios';
export declare class API {
    static jsonp: typeof Jsonp;
    static cesium: typeof Cesium;
    static Axios: typeof Axios;
    constructor();
}
