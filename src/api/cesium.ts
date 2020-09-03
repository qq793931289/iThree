// import fetchJsonp from 'fetch-jsonp';
import { API } from './api';

export class Cesium {

  private static _ak: string = 'UDlMuhOMfdTRVKqtQqLiKg8oH6Lxnagt';
  private static _baiduBaseUrl: string = 'https://api.map.baidu.com';
  private static _geoatlasBaseUrl: string = 'https://v-edu.org.cn/sre/file/map/';

  constructor() {

  }

  public static getPoint(input: string) {
    const baseUrl = this._baiduBaseUrl + '/place/v2/search?';
    const url = [
      baseUrl,
      'query=',
      input,
      '&region=',
      '中国',
      '&output=json&ak=',
      this._ak,
    ].join('');
    return API.jsonp.base(url);
  }

  public static async getAddress(
    long: number = 121.49884033194,
    lat: number = 31.225696563611,
  ) {
    const url = [
      this._baiduBaseUrl + '/reverse_geocoding/v3/?ak=',
      this._ak,
      '&output=json&coordtype=wgs84ll&location=',
      String(lat),
      ',',
      String(long)].join('');
    return API.jsonp.base(url);
  }

  public static getGeoatlas(adcode: string | number = 100000, full: boolean = false) {

    //https://v-edu.org.cn/sre/file/map/geoatlas/100000_full.json

    const url = [
      this._geoatlasBaseUrl,
      '/geoatlas/',
      String(adcode),
      full ? '_full' : '',
      '.json',
    ].join('');

    return API.Axios.get(url);
  }

}

