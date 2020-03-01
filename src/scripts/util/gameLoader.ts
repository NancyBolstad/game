function gameLoader(): void {
  document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  setTimeout(function() {
    const element = <HTMLDivElement>document.getElementsByClassName('loading')[0];
    element.innerHTML = '';
    element.classList.remove('loading');
    document.getElementsByTagName('body')[0].style.overflowY = 'visible';
  }, 3000);
}

export default gameLoader;
