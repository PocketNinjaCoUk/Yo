# Dependency on a single page script

Using gulp to import javascript files into 1 file and provide clean dependencies

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
  Yo.add('Lister', ['something', 'else'], function(something, else) {
    something.show();
    else.show();
  });
```

eyeamaman@gmail.com