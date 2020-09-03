import axios from 'axios';

export class Axios {

  constructor() {

  }

  public static get(url: string, params: Object = {}) {
    return axios.get(url, {
      params: Object.assign({
        // "参数名": "传递的参数"
      }, params),
    })
      .then((res: any) => {
        return res;
      })
      .catch(function (error: any) {

        throw new Error('API.Axios.get' + error);

      });
  }

}