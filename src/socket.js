import { io } from 'socket.io-client';
import { apiUrl } from './config';

const URL = apiUrl;

export const socket = io(URL, {query:{token:"asdfghasdfg"}});