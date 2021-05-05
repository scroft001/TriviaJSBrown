function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  function makeElement(type = "div", newClass, inner = "") {
    let newEl = document.createElement(type);
    if (newClass) {
      newEl.classList.add(newClass);
    }
    newEl.innerHTML = inner;
    return newEl;
  }
  
  export { shuffle, makeElement };