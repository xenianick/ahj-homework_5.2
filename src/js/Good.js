import getId from './getId.js';

export default class Good {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = getId();
  }
}
