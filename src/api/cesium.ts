// import fetchJsonp from 'fetch-jsonp';
import { API } from './api';

export class Cesium {

  constructor() {

  };

  public static baiduMap(input: string) {
    const ak: string = 'UDlMuhOMfdTRVKqtQqLiKg8oH6Lxnagt';
    const baseUrl = 'http://api.map.baidu.com/place/v2/search?';
    const url = [
      baseUrl,
      'query=',
      input,
      '&region=',
      '中国',
      '&output=json&ak=',
      ak,
    ].join('');
    return API.jsonp.base(url);
    // return fetchJsonp(url).then((res: any) => res.json());
  }

}

