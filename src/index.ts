import Storage from './scripts/util/storage';
import ApiService from './scripts/util/apiService';

const gameStorage = new Storage();

gameStorage.set('player1', 'test');

ApiService({ page: 1, pageSize: 10 });
