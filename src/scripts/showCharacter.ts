import { characterList } from './util/containers';
import { ResponseObjTypes } from './util/types';

const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters/';

async function showCharacter(characterName: number) {
  const url = `${BASE_URL}${characterName}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes = await response.json();

    const component = document.createElement('div');
    component.className = 'col-lg-4 p-3 col-md-6';
    component.setAttribute('draggable', 'true');
    component.innerHTML = ` <div class="p-4"><h4>${data.name}</h4><p lass="package__description">${data.born}</p></div>`;

    if (characterList != null) characterList.append(component);

    console.log(data);

    return data;
  } catch (err) {
    throw err;
  }
}

export default showCharacter;
