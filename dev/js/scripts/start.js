
/**
 * Core company namespace.  Replace CompanyName with your actual company object
 * at the point you would like to add your scripts.  If you have one.
 * @namespace
 */
var CompanyName = {};

Yo.init({
  namespace: CompanyName
  ,scriptRoot: 'myModules'
  ,globalDependencies: {
    jQuery: 'jQuery',
    pants: 'pants'
  }
  ,dependencyAsObject: true
  //,debugMode: true
  //,debugScripts: ['LOADED', 'anotherScriptName', 'any string']
});