import jview from './_jview/jview.js'

const { iif, ReplaySubject, AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { toArray, throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, reduce, tap, startWith, filter, mapTo } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

// const MUSIC_URL = '../data/MUSIC_FOLDERS.json'
const MUSIC_URL = './data/_sources/MUSIC_686.json'

export const createConnection = (url) => {
  return fromFetch(url)
    .pipe(
      mergeMap(res => res.json()),
      mergeMap(({ files }) => from(files)),
      tap((data) => {
        const tree = jview.create(data);
        jview.render(tree, document.querySelector('.root'));
        jview.expand(tree);
      }),
    )
}
// const MUSIC_URL = './MUSIC_686.json'
// fetch(MUSIC_URL)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     const tree = jview.create(data);
//     jview.render(tree, document.querySelector('.root'));
//     jview.expand(tree);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

// createConnection(MUSIC_URL)