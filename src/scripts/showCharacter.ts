import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';
import createImage from './util/createImage';

const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters/';

function getCharacterCards(characterIndex: number[]) {
  characterIndex.map(element => {
    showCharacter(element);
  });
}

async function showCharacter(characterNameIndex: number) {
  const url = `${BASE_URL}${characterNameIndex}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes = await response.json();

    const component = document.createElement('div');
    component.className = 'card';
    component.setAttribute('draggable', 'true');
    component.setAttribute('key', `${characterNameIndex}`);
    const cardImage = `<img draggable="false" src=${createImage(
      characterNameIndex,
    )} class="card__image" alt="Game figure no.${characterNameIndex}">`;
    const cardTitle = ` <h3>${data.name}</h3>`;
    component.innerHTML = cardImage + cardTitle;

    characterList.append(component);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
