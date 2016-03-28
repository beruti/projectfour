angular
  .module('logging')
  .factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ['API', 'TokenService'];
// can think of an interceptor like middleware - is also set in app.js but for the front-end
function AuthInterceptor(API, TokenService) {

  //outgoing requests need to have tokens added to their headers
  return {
    request: function(config){
      var token = TokenService.getToken();
      // if address is correct and token is present then set it to header 
      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    //incoming requests need to be checked for tokens so that they can be saved
    response: function(res){
      //check if the response is coming from the right URL address and whether it has a token
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}
