export interface PlayerTypes {
  selectedCharacter?: string;
  isWinner?: boolean;
  currentPosition?: any;
}

export interface ResponseObjTypes {
  url: string;
  name: string;
  gender: string;
  culture: string;
  born: string;
  died: string;
  titles: string[];
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: any[];
  books: string[];
  povBooks: any[];
  tvSeries: string[];
  playedBy: string[];
}
