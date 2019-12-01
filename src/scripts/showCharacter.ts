import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';

const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters/';

async function showCharacter(characterName: number) {
  const url = `${BASE_URL}${characterName}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes = await response.json();

    const component = document.createElement('div');
    component.classList.add('card');
    component.setAttribute('key', `${data.name}`);
    component.innerHTML = ` <h4>${data.name}</h4><p>${data.born}</p>`;

    characterList.append(component);

    console.log(data);

    return data;
  } catch (err) {
    throw err;
  }
}

export default showCharacter;
