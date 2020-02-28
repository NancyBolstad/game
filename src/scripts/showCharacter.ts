import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';
import createImage from './util/createImage';
import gameLoader from './util/gameLoader';

const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters/';

function getCharacterCards(characterIndex: number[]): void {
  gameLoader();
  characterIndex.map(element => {
    showCharacter(element);
  });
}

async function showCharacter(characterNameIndex: number) {
  const url = `${BASE_URL}${characterNameIndex}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes = await response.json();
    const { name, titles } = data;
    const placeHolder = 'Humble Man Without Title';

    const component = document.createElement('div');
    component.className = 'row__item--card';
    component.setAttribute('draggable', 'true');
    component.setAttribute('key', `${characterNameIndex}`);
    const cardImage = `<img draggable="false" src=${createImage(
      characterNameIndex,
    )} class="item--card-image" alt="Game figure no.${characterNameIndex}">`;
    const cardTitle = ` <h3>${name}</h3>`;
    const cardSubTitle = `<span>${titles[0] ? titles[0] : placeHolder}</span>`;
    component.innerHTML = cardImage + cardTitle + cardSubTitle;

    characterList.append(component);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
