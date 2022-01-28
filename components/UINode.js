export class UINode {
  constructor(data) {
    this.children = data.children;
    this.kind = this.children.length === 0 ? 'file' : 'folder';
  }


  get prop() { return this._prop };
  set prop(newValue) { this._prop = newValue };
}
