import fetchJsonp from 'fetch-jsonp';

export class Jsonp {

  constructor() {

  }

  public static base(url: string) {
    return fetchJsonp(url).then((res: any) => res.json());
  }

}

