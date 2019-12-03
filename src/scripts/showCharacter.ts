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
    const cardTitle = ` <h2>${data.name}</h2>`;
    const cardSubTitle = `<h3>${data.titles[0]}</h3>`;
    const cardContent = `<ul><li>Born:${data.born}</li><li>${data.culture}</li></ul>`;
    component.innerHTML = cardTitle + cardSubTitle + cardContent;

    characterList.append(component);

    console.log(data);

    return data;
  } catch (err) {
    throw err;
  }
}

export default getCharacterCards;
