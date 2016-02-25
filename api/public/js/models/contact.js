angular
  .module('logging')
  .factory('Contact', Contact)

Contact.$inject = ['$resource', 'API']
function Contact($resource, API){

  return $resource(
    API+'/contacts/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}