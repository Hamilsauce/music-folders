const { ReplaySubject, AsyncSubject, timer, iif, Subject, interval, of , merge, from } = rxjs;
const { groupBy, toArray, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, reduce } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

const fileStreamSubject$ = new ReplaySubject();

const SOURCE = {
  muex: './data/_sources/music-exchange1.json'
}

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

const createNodeReferences = (parent, children) => {
  if (children) {
    children.forEach((ch, i) => {
      ch.parentId = parent.id
      delete ch.parentName
      if (ch.nodeType === 'File') delete ch.children
    });

    if (parent) {
      parent.childrenRefs = children.reduce((refs, ch) => [...refs, ch.id], []);
      parent.size = parent.childrenRefs.length
    }
  }
};

let currentFolder;
const flattenTree = (obj, curr) => {
  let array;
  if (!Array.isArray(obj)) {
    currentFolder = obj;
    currentFolder.isRoot = false;
    currentFolder.subRoot = true;
    createNodeReferences(obj, obj.children)
    array = [obj];
  } else {
    currentFolder = curr;
    array = obj
    createNodeReferences(currentFolder, obj)
  }

  return array.reduce((acc, value) => {
    let { children, parentName, ...node } = value
    acc.push(node);
    if (node.nodeType === 'Folder') {
      currentFolder = node;
      acc = children ? acc.concat(flattenTree(children, currentFolder)) : acc;
    }
    return acc;
  }, []);
  return
}

export default fromFetch(SOURCE.muex)
  .pipe(
    mergeMap(res => from(res.json())
      .pipe(map(flattenTree))
    ),
    tap(x => console.log('x', x)),
    mergeMap(nodeArray => from(nodeArray)),
  );