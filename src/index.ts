import Greeter from './scripts/Greeter';

const greeter = new Greeter('Hello!');
document.body.innerHTML = greeter.greet();
