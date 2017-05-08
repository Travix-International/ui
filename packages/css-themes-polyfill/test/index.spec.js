global.window = {
  TravixTheme: {
    button: '#F00',
    text: '#AFA',
  },
};

global.document = {
  querySelectorAll() {
    return [{ href: 'test.js' }];
  },
  createElement(name) {
    return { name: name };
  },
  head: {
    appendChild(child) {
      this.children = [child];
    },
    addEventListener(eventName, handler) {
      console.assert(eventName === 'DOMSubtreeModified', 'Wrong event name');
      this.testFunc = handler;
    },
  },
};
const head = global.document.head;

function HTMLStyleElement() {
  this.innerText = `
    .text {
      padding: 5px;
      color: var(--text);
    }
  `;
};

function testEventHandler() {
  const testElem = new HTMLStyleElement();

  head.testFunc({
    target: testElem,
  });

  console.assert(
    testElem.innerText.indexOf('color: #AFA;') !== -1,
    'Dinamically added style was not processed with CSS vars'
  );
  console.log('Done');
}

function XMLHttpRequest() {};
XMLHttpRequest.prototype.open = function open(method, path, opt) {
  console.assert(method === 'GET', 'Method is not correct');
  console.assert(path === 'test.js', 'Path is not correct');
  console.assert(opt, 'Opt is not correct');
};

XMLHttpRequest.prototype.send = function send() {
  console.assert(this.onreadystatechange, 'onreadystatechange is not set');
  this.readyState = 4;
  this.status = 200;
  this.responseText = `
    .button {
      padding: 10px;
      color: var(--button);
    }`;
  this.onreadystatechange();
  const styleEl = head.children[0];

  console.assert(
    head.children.length === 1,
    'Style element was not added to document head'
  );

  console.assert(
    styleEl.innerText.indexOf('color: #F00;') !== -1,
    'Style element was not processed with variables'
  );
  setTimeout(testEventHandler);
};

global.XMLHttpRequest = XMLHttpRequest;
global.HTMLStyleElement = HTMLStyleElement;

require('../src/index.js');
