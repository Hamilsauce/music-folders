const { iif, ReplaySubject,AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;
const { fromFetch } = rxjs.fetch

// const fetchProcJson = fromFetch('./procession/_proc-normalized.json')
const fetchProcJson = fromFetch('./procession/procession-full.json')
 .pipe(
   mergeMap(res => from(res.json())),
  // mergeMap((response) => from(response[name])),
   tap((x) => console.log('NORMALIZED SCORE', x)),
 )
 
 fetchProcJson.subscribe();
 
 