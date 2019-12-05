import handleDrag from './scripts/handleDrag';
import { handleSelection } from './scripts/handleSelection';
import getCharacterCards from './scripts/showCharacter';
import characterIndex from './scripts/util/characterIndex';
import { characterList, validateSelectionBtn } from './scripts/util/containers';

function renderCharacterList(): void {
  if (characterList != null) {
    getCharacterCards(characterIndex);
    handleDrag();
    if (validateSelectionBtn != null)
      validateSelectionBtn.addEventListener('click', handleSelection, false);
  }
}

export default renderCharacterList;
