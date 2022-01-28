const { interval, merge } = rxjs
const { tap,map, groupBy, scan, mergeAll, first, takeWhile, share } = rxjs.operators
// import "./style.css";

// Stream of dice rolls
const diceRolls$ = interval(1000).pipe(
  map(i => ({
    player: ["Sally", "Joe", "Sam"][i % 3],
    roll: Math.ceil(Math.random() * 6)
  })),
  share()
);

// Running Scores
const runningScores$ = diceRolls$.pipe(
  // Group the rolls by plaer
  groupBy(diceRoll => diceRoll.player),
  // Transform the player roll streams into player score streams
  map(playerRoll$ => playerRoll$.pipe(
    tap(x => console.log('x', x)),
    
    // Scan over the player values and add them together over time
    scan((playerScore, playerRoll) => ({
      player: playerRoll.player,
      roll: playerRoll.roll,
      score: playerScore.score + playerRoll.roll
    }), {
      score: 0
    }),
  )),
  // Merge the streams back into 1 stream
  mergeAll(),
    tap(x => console.log('mergeall', x)),
  
)

// Find the winner from the stream of running scores
const winner$ = runningScores$.pipe(
    tap(x => console.log('winner', x)),
  first(playerScore => playerScore.score >= 21),
)

// Merge the running scores and the winner together while the game is ongoing
const scores$ = merge(
  runningScores$.pipe(
    takeWhile(playerScore => playerScore.score < 21),
    // tap(x => console.log('x', x)),
  ),
  winner$
);

// Announce the scores
scores$.subscribe({
  next: score => {
    document.getElementById("app").innerHTML += `<div>
      ${score.player} rolled a ${score.roll} and has ${score.score} points
    </div>`
  },
  complete: () => {
    document.getElementById("app").innerHTML += "<div>Game over!</div>";
  }
});
