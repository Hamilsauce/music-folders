// import connector$ from './data/Connector.js'
import {PIPELINE$} from './data/main.pipeline.js'

const { iif, ReplaySubject,AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;


PIPELINE$.pipe( 
  tap(x => console.log('PIPELINE$', x))
).subscribe()
