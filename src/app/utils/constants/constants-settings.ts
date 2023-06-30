export class Constants {
    public baseUrlApi = {
    test: 'https://www.extranetrosen.cl/LogisticaInversaAPI_TEST/api/',
    prod: 'https://www.extranetrosen.cl/LogisticaInversaAPI/api/',
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
  public getHeadersOptions() {
    return this.headersOptions;
  }
}