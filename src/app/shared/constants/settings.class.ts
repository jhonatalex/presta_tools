export class Constants {
  public baseApiURL = {
    test: 'https://prestatools.somee.com/',
    prod: 'https://prestatools.somee.com/',
  };
  private headersOptions = {
    headers: {
      'Authorization': '',
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, HEAD, DELETE',
      'Access-Control-Allow-Methods': '',
      'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Accept, X-Requested-With, remember-me',
      // 'X-Frame-Options': 'ALLOW-FROM http://localhost:4200'
    },
  };
  private storageKeys = {
    /**
     * Rosen Token Access Key
     */
    loginTokenKey: `USER`,
    /**
     * Rosen Token Data
     */
    decodedTokenKey: `TOKEN`,
    /**
     * User Token Permission
     */
    usrTknPrm: `UTP`,
    /**
     * User Centro y Almacen
     */
    usrCntrs: `CNTR-ALM`,
    /**
     * Selected Centro y Almacen
     */
    selCntrs: `SEL-CTR-ALM`
  }
  private regularExpressions = {
    /**
     * Expresion URL A
     */
    url: /^(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/,
    /**
     * Expresion URL B
     */
    urlNew: /\bhttps?:\/\/\S+/,
    /**
     * Expresion Mentions
     */
    userTag: /(@\w+[.]\w+)/gi,
    /**
     * Expresion Hashtag
     */
    hashTag: /#\S*\w/i,
    /**
     * Expresion RUT
     */
    rut: /^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/,
    /**
     * Expresion Email
     */
    email: /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/,
  };


  public getTestApiURL(): string {
    return this.baseApiURL.test;
  }
  public getProdApiURL(): string {
    return this.baseApiURL.prod;
  }
  public getHeadersOptions() {
    return this.headersOptions;
  }
  public getRegularExp() {
    return this.regularExpressions;
  }
  public getStorageKeys() {
    return this.storageKeys;
  }
}
