Use something like this to reverse template parse:
```js
function zFromTemplate(str, template) {      
  var sr = template.replace(/\{[^z]\}/g, ".*?");
  sr = sr.replace(/\{z\}/g, "(.+)");

  var rex = new RegExp(sr),
      parts = rex.exec(str);

  if(parts) {
    return parts[1];
  }
  return null;
}

var u = $("#url").text(),
    t = $("#template").text();

$("#results").text(zFromTemplate(u, t))
```
https://codepen.io/grinn/pen/ExKQXq
https://stackoverflow.com/questions/23111062/javascript-regex-string-template-extract-variable