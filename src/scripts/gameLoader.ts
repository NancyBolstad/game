function gameLoader(): void {
  setTimeout(function() {
    const element = <HTMLDivElement>document.getElementsByClassName('loading')[0];
    element.innerHTML = '';
    element.classList.remove('loading');
  }, 3000);
}

export default gameLoader;
