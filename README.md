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


### To Use

#### For new scripts

```javascript
  Yo.add('Lister', [], function() {
  });
```

#### and add the following line to main.js

```javascript
  //= require widgets/test.js
```


#### with dependencies

```javascript
  Yo.add('Lister', ['something', 'different'], function(something, different) {
    something.show();
    different.show();
  });
```

eyeamaman@gmail.com
