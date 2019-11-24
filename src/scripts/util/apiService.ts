import { ResponseObjTypes } from './types';

const PAGE_SIZE: number = 10;
const PAGE: number = 1;
const BASE_URL: string = 'https://www.anapioficeandfire.com/api/characters?';

interface ServiceProps {
  page?: number;
  pageSize?: number;
}

async function ApiService({ page, pageSize }: ServiceProps) {
  const url = `${BASE_URL}page=${page ? page : PAGE}&pageSize=${pageSize ? pageSize : PAGE_SIZE}`;

  try {
    const response = await fetch(url);
    const data: ResponseObjTypes[] = await response.json();

    console.log(111111);

    console.log(data);

    return data;
  } catch (err) {
    throw err;
  }
}

export default ApiService;
