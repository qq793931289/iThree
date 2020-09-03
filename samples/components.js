
const RenderDemo = require('./index').default;
const req = require.context('../src/components/', true, /.*sample\.tsx?$/);
const list = new Map();
let components = [];
req.keys().forEach((mod) => {
  let v = req(mod);
  if (v && v.default) {
    v = v.default;
  }
  if (typeof v === 'object') {
    components.push(v);
  }
});
components.sort((a, b) => {
  if (a.order && b.order) {
    return a.order - b.order;
  } else if (a.order) {
    return -1;
  } else if (b.order) {
    return 1;
  } else {
    return 0;
  }
});
let navList = [];
let kitsList = [];
components = components.map(item => {
  if (item.data) {
    navList.push(item.data);
  }
  if (item.kitsData) {
    kitsList.push(item.kitsData);
  }
  if (item.comp) {
    return item.comp();
  } else {
    return item();
  }
})
console.log();
(function () {
  let ready = false;
  function handler(e) {
    if (ready) {
      return;
    }
    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return;
    }
    RenderDemo(components.slice(0, 1), navList.slice(0, 1), kitsList.slice(0, 1));
    ready = true;
  }
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false);
    document.addEventListener('readystatechange', handler, false); // IE9+
    window.addEventListener('load', handler, false);
  }
})();



