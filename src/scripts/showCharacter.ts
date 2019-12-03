import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';
import { diceIcons } from './util/dice';

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
    const cardTitle = ` <h3>${data.name}</h3>`;
    const cardSubTitle = `<p>${data.aliases[0]}</p>`;
    component.innerHTML = cardTitle + diceIcons.point1 + cardSubTitle;

    characterList.append(component);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
