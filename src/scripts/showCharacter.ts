import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';

const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters/';

function getCharacterCards(characters: number[]) {
  characters.map(element => {
    showCharacter(element);
  });
}

async function showCharacter(characterName: number) {
  const url = `${BASE_URL}${characterName}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes = await response.json();

    const component = document.createElement('div');
    component.className = 'card';
    component.setAttribute('draggable', 'true');
    component.setAttribute('key', `${data.name}`);
    const cardTitle = ` <h4>${data.name}</h4>`;
    const cardSubTitle = `<h5>${data.titles[0]}</h5>`;
    const cardContent = `<ul><li>Born:${data.born}</li><li>${data.culture}</li></ul>`;
    component.innerHTML = cardTitle + cardSubTitle + cardContent;

    characterList.append(component);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
