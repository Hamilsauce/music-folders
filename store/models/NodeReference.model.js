import { Query } from './Query.model.js';

export class NodeReference extends Query{
  constructor(name, referenceFunction) {
    super();
    this.name = name;
    this.ref = referenceFunction;
  };
  get(name) { return this.ref(name) };
}