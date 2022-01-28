const { iif, ReplaySubject, AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

const app = document.querySelector('.app');
const xmlContainer = document.querySelectorAll('.xmlContainer')
const appBody = document.querySelector('.app-body')

export class Model {
  constructor({ children, key, type }) {
    this.children = children || [];
    this.key = key || '';
    this.type = type || 'Model';
  }
}

export class DocumentModel extends Model { constructor(children, name) { super({ children, name, type: 'Document' }) } }

export class NodeModel extends Model {
  constructor({ children, key, attributes, value, parent, depth }) {
    super({ children, key, type: 'Node' })
    this.attributes = attributes
    this.value = value
    this.parent = parent
    this.depth = depth
  }
}



/* --- BUILDER --- */

export class Builder {
  constructor() {
    this.TYPES = { xml: "application/xml" }
    this.documents = new Map();
    this.parser = new DOMParser();

    // const doc = parser.parseFromString(xmlStr, "application/xml");
  }

  createDocument(xmlString, name = '') {
    const doc = this.parser.parseFromString(xmlString, this.TYPES.xml)
    if (doc == null) return null;
    return this.documents.set(name, doc.documentElement).get(name)
  }

  parse(xmlString, type) {
    const doc = this.parser.parseFromString(xmlString, this.TYPES.xml)
    return doc.querySelector('parsererror') ?
      null : doc //.documentElement;
  }

  getDocument(name = '') { return this.documents.has(name) ? this.documents.get(name) : null; }

  createNodeModel(opt = {}) {
    return new NodeModel({
      key: opt.key || null,
      parent: opt.parent || null,
      value: opt.value || null,
      children: opt.children || [],
      depth: opt.depth || 0,
      attributes: opt.attributes || {},
    })
  }

  traverse(node, callback) {
    callback(node);
    if (node.children.length > 0) {
      [...node.children].forEach((child) => {
        this.traverse(child, callback);
      });
    }
  }


  createNodeModel() {}
  createWalker(doc) {
    return document.createTreeWalker(doc)
  }

  mapModel() {}

  compose(doc) {
    let documentModel //= new NodeModel({...doc, key: doc.name, value: doc.value})
    let currentParent;
    // this.traverse(doc.firstElementChild, node => {
    this.traverse(doc, node => {
      // let node = new NodeModel({
      //   ...xmlNode
      //   key: node.name,
      //   value: node.value
      // })
      if (node.children > 0) {
        currentParent = {...node}
      };
      
      console.log(documentModel);
      console.log(node);
      // return node
    })
    console.log('documentModel', documentModel);

  }



  render(tree, targetElement) {
    const containerEl = createContainerElement();

    traverse(tree, function(node) {
      node.el = createNodeElement(node);
      containerEl.appendChild(node.el);
    });

    targetElement.appendChild(containerEl);
  }


  build() {}

  checkParseStatus(doc) {
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
      console.error("error while parsing");
    } else {
      console.log(doc.documentElement.nodeName);
    }
  }


  attach(doc, parent) {}


  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}


const req = await fetch('/_SONGS/chords/chords.xml');
const xmlSerial = await req.text();


const xmlBuilder = new Builder();
const docu = xmlBuilder.createDocument(xmlSerial, 'chords') //.get('chords') //.documentElement
// console.log('docu', docu.documentElement.firstElementChild)
console.log('docu', docu) //.firstElementChild)

const treeWalker = document.createTreeWalker(app)
console.log('treeWalker', treeWalker.firstChild())
xmlBuilder.compose(docu)
xmlBuilder.compose(docu)
// appBody.appendChild(docu.children)
// console.log('appBody', [...appBody.children])