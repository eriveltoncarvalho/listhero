import axios from 'axios';
import md5 from 'js-md5';

const PUBLIC_KEY = ''; 
const PRIVATE_KEY = '';

const timestamp = Number(new Date());

const hash = md5.create();
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

const api = axios.create({
 

  baseURL: 'https://gateway.marvel.com/v1/public',
  params :{
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: hash.hex(),
    limit: 10
  }

});

export default api;
