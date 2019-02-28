
/**
 * Core company namespace.  Replace CompanyName with your global company object
 * at the point you would like to add your scripts.  If you have one.
 * 
 * So if you are called The Fabulous Banana Factory then you could change CompanyName variable to TFBF
 * 
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
  //,debugMode: true
  //,debugScripts: ['LOADED', 'anotherScriptName', 'any string']
});