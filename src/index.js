import readingTime from 'reading-time';
import { greeting } from './scripts/test';

window.calcRT = ev => {
  var stats = readingTime(ev.value).text;

  document.getElementById('readingTime').innerText = stats;

  console.log(greeting);
};

(function test() {
  console.log(greeting + ' Nancy');
})();
