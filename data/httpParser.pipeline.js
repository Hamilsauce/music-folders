const { ReplaySubject, AsyncSubject, timer, iif, Subject, interval, of , merge, from } = rxjs;
const { groupBy, toArray, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, reduce } = rxjs.operators;
const { fromFetch } = rxjs.fetch;


export default ({ url, jsonKey }) => fromFetch(url)
  .pipe(
    mergeMap(res => res.json()),
    tap(x => console.log('HTTPPARSER', x.files)),
    map(x => x.files),
    mergeMap((f) => Array.isArray(f) ? from(f) : from(f['files'])),
  // map(flattenTree),

  tap(x => console.log('HTTPPARSER', x)),
)
