import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import { FileModel, createFile } from './models/file.model.js';
import { DataService } from './data/services/data.service.js'
import { DataAccessor } from './data/DataAccessor.js';

import fileData from './data/modules/audio-files.source.js'
import * as Refs from './store/models/index.js';
const FILE_DATA_URL = './data/_sources/_MUSIC_JSON.json'
const SMALL_DATA_URL = './data/_sources/MUSIC_686.json';
const SAMPLE_DATA_URL = './data/_sources/sampledata.json'

const { pipeline, date, array, utils, text } = ham;
const { iif, ReplaySubject, AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { last, toArray, throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, reduce, tap, startWith, filter, mapTo } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

import muexPipeline from './data/main.pipeline.js'

// const muexSubs = Object.entries(muexPipeline.streams)
//   .map(([k, v], i) => {
//     const nodeType = k === 'files$' ? 'FILES' : 'FOLDERS'

//   });

const filesSub = muexPipeline.streams.files$
  .pipe(
    mergeMap(files => files.pipe(
      scan((sum, curr) => sum + 1, 0),
    )),
    last(),
    map(x => console.log('FOLDERS', x)),
  ).subscribe()

const foldersSub = muexPipeline.streams.folders$
  .pipe(
    mergeMap(files => files.pipe(
      scan((sum, curr) => sum + 1, 0),
    )),
    last(),
    map(x => console.log('FOLDERS', x)),
  ).subscribe()





export class DataConnector {
  constructor() {
    this.root;
    return new Subject()
  };
  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}



const dataService = new DataService(FILE_DATA_URL);

// const handle = DataAccessor.subcollections(poo, 'pees', 'shits')
// console.log('handle', handle)
// const subcollections = DataAccessor.setData(poo)

// const pooPeeSubs = subcollections('pees', 'cums')
// import  {createConnection} from './fetchdata.js'

// const jv$ = createConnection(SMALL_DATA_URL)
// .pipe(
// tap(x => console.log('poooooop', x)),  
// )//.subscribe()
// const filesCx = dataService.createConnection(SMALL_DATA_URL,'files')

// console.log('filesCxn', [...filesCx])
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
// download("hello.txt", "This is the content of my file :)");


const traverse = node => {
  return (Object.values(node.children).length ? [] : [{ ...node.children }])
    .concat(
      ...Object.values(node.children)
      .map(child => traverse(child)
        .map(arr => [node].concat(arr))
      )
    )
}

let connection1 = dataService.fileSubject$
  .pipe(
    map(traverse),
    // toArray(),
    // tap(x => console.log('TRAVERSD', x)),
    map(arr => {
      const flatter = arr
        .reduce((acc, curr, i) => {

          return new Map([...acc, ...curr.map(_ => [_.name, _])])

        }, new Map());
      return flatter
    }),
    // tap(x => console.log('FILEPATHS', [...x])),
    // map(_=>JSON.stringify([..._],null,3)),
    // map(x => JSON.stringify([...x], null, 3)),
    // tap(x => download('folders-json.json', x)),
    // take(1),
    tap(x => window.fileTree = [...x]),
    // tap(() => console.log('window.FileTree', window.fileTree)),
  )
//.subscribe()


let connection = dataService.connect('files')
let request$ = connection
  // .pipe(take(1), tap(x => console.log('REQUEST$ CONNECTION', [...x.children])),)
  .subscribe()



const aggregrates$ = dataService.connect('files').pipe(
  reduce((agg, file) => {
    agg.set('totalCount', agg.get('totalCount') + 1);
    agg.set('totalSize', agg.get('totalSize') + file.Size);
    agg.set('extensions', { count: agg.get('extensions').list.length, list: [...new Set([...agg.get('extensions').list, file.Extension])] });
    agg.set('contentTypes', { count: agg.get('contentTypes').list.length, list: [...new Set([...agg.get('contentTypes').list, file.ContentType])] });
    agg.set('kinds', { count: agg.get('kinds').list.length, list: [...new Set([...agg.get('kinds').list, file.Kind])] });
    agg.set('folderPaths', { count: agg.get('folderPaths').list.length, list: [...new Set([...agg.get('folderPaths').list, file.FolderPath])] });
    return agg;
  }, new Map([
      ['totalCount', 0],
      ['totalSize', 0],
      ['extensions', { count: 0, list: [] }],
      ['contentTypes', { count: 0, list: [] }],
      ['kinds', { count: 0, list: [] }],
      ['folderPaths', { count: 0, list: [] }]
    ]))
);

aggregrates$
  .pipe(
    // tap(x => console.log('AGGREGATES', [...x])),
  ).subscribe()


let rootpath = 'C:\\Users\\jacob\\OneDrive - Sea Hag Enterprises\\'

// console.log('end');