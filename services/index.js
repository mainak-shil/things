export default class API {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }
  get(endpoint, params) {
    return this.httpRequest('GET', this.baseUrl + endpoint, params);
  }

  post(endpoint, params) {
    return this.httpRequest('POST', this.baseUrl + endpoint, params);
  }

  httpRequest(method, url, params) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: method,
        body: JSON.stringify(params),
      };
      fetch(url, options)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => reject(error)); //to catch the errors if any
    });
  }
}
