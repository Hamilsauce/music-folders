import { NodeReference } from './NodeReference.model.js';

export class FolderReference extends NodeReference {
  constructor(name, referenceFunction) {
    super();
    this.name = name;
    this.ref = referenceFunction;
  };
  get(name) { return this.ref(name) };
}