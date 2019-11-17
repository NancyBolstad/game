import { name } from './Name';
export default class Greeter {
  constructor(public greeting: string) {}
  greet() {
    return '<h1>' + this.greeting + name + '</h1>';
  }
}
