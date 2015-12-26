# Yo

## Dependency on a single page script

Using gulp to import javascript files into 1 file and provide clean dependencies.
Basically this is just a pet project to do this and learn at the same time :-)
Currently it seems to work well with raw Javascript.  For importing 3rd party plugins that run on page ready there is a little more work :-S

### To install

Download the repo and run

```
$ npm install
```

The main gulp command is to simply run

```
$ gulp
```

This imports javascript into 1 file and copies it to a public folder along with the index html page.

### Why?

Try running the code below!

```javascript
  var namespace = {};
  namespace.widget = {};

  namespace.widget.utils = function() {
    return {
      output: function() {
        console.log('Utils are used');
      }
    }
  }();

  namespace.widget.tooltip = function(utils){
    utils.output();
  }(namespace.widget.utils);
```

Works lovely doesn't it.  Now run the code below with the 2 functions swapped around

```javascript
  var namespace = {};
    namespace.widget = {};

    namespace.widget.tooltip = function(utils){
      utils.output();
    }(namespace.widget.utils);

    namespace.widget.utils = function() {
      return {
        output: function() {
          console.log('Utils are used');
        }
      }
    }();
```

Doesn't work very well at all.  *I can put them in order or have an init function at the bottom of the page though!* You say!
Well forget you and forget that! :-P

## So lets look at Yo

### How To Use

```javascript
  var CompanyName = {};
  CompanyName.whatever = {};

  Yo.init({
    namespace: CompanyName.whatever
  });
```

#### For new scripts

```javascript
  Yo.add('Lister', [], function() {
  });
```

#### and add the following line to main.js

```javascript
  //= require widgets/lister.js
```


#### with dependencies

```javascript
  Yo.add('Lister', ['something', 'different'], function(something, different) {
    something.show();
    different.show();
  });
  
  Yo.add('Something', function() {
    var show = function() {
      console.log('say HI from something');
    };
    return {
      show: show
    }
  });
  
  Yo.add('Different', function() {
    var show = function() {
      console.log('say HI from different');
    };
    return {
      show: show
    }
  });
```
