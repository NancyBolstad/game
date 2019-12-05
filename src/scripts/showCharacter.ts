import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';

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
    const characterImage = document.createElement('img');
    characterImage.setAttribute('draggable', 'false');
    const test = `<img draggable="false" src="https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575549674/game/${characterNameIndex}.png" class="card__image">`;
    const cardTitle = ` <h3>${data.name}</h3>`;
    component.innerHTML = test + cardTitle;

    characterList.append(component);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
