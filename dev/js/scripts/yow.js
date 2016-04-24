

function Yow() {
  this.ns = '';
  this.scriptRoot = 'modules';
  this.egg = 'I am an egg';
}

Yow.prototype.init = function(data) {
  this.ns = data.namespace || Yow;
  Yow.loadedState = {};
  if(data.scriptRoot) {
    this.scriptRoot = data.scriptRoot;
  }
  this.ns[this.scriptRoot] = this.ns[this.scriptRoot] || {};
};


var Chicken = {};

var Yowie = new Yow();
Yowie.init({
  namespace: Chicken,
  scriptRoot: 'chickPeas'
});