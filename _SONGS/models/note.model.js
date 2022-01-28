export class NoteModel {
  constructor(noteData) {
    this.pitch = [
      {
        step: "B",
        octave: 3,
      }
    ];
    this.notations = [
      {
        technical: [
          {
            fret: 2,
            string: 5
          }
        ]
      }
    ];
    this.voice = 1;
    this.duration = 960;
    this.type = "quarter";
    this.chord = null;
    this.tie = null;
    this.root;
  };
  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}