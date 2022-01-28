import { NodeReference } from './NodeReference.model.js';

export class FileReference extends NodeReference {
  constructor(name, referenceFunction) {
    super();
    this.name = name;
    this.ref = referenceFunction;
  };
  get(name) { return this.ref(name) };
}