import {
  FolderReference,
  DataAggregator,
  DataTransformer,
  DataService,
} from './models';

const { iif, ReplaySubject, AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

export class Store {
  constructor(dataService, config) {
    this.dataService = dataService;
    this.data$ = this.dataService.
    this.config = config
    this._state = new Map([[rootName, ]])
    this._COLLECTIONGRAPH = {
      _metadata: {
        ROOT: {},
        FOLDERS: {
          indexField: 'Name',
          INDEX: ['jams', 'Procession']
        },
        FILES: {
          indexField: 'Name',
          INDEX: ['jams', 'Procession']
        },
      },
      ROOT: {
        folderStuff: '...',
        children: new Map(
          [
            ['name', {
              type: 'FileReference',
              parent: 'ROOT.name',
              reference: (name) => this._TREE[refType].get(name),
              refType: 'File',
              fileStuff: '...',
            }],
            ['name', {
              type: 'FolderReference',
              folderStuff: '...',
              reference: (name) => this._TREE[refType].get(name),
              refType: 'File',
              parent: 'ROOT.name',
              children: new Map(
                //...Ref Objects  
              )
            }],
          ]
        )
      },
      FOLDERS: {},
      FILES: {},
    }
    
    this._collections = new Map(
      [
        ['metadata', '...'],
        ['ROOT', '...'],
        ['FOLDERS', '...'],
        ['FILES', '...'],
      ]
    );
  };
  
  

  get state() { return this._state };
  set state(newValue) { this._state = newValue };
  get collections() { return this._collections };
  set collections(newValue) { this._collections = newValue };
}



export const createStore = (config = { rootName: '' }) => {
  const store = new Store(new DataService(url), config);
  return store
};