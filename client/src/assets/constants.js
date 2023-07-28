import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';

export const genres = [
  { title: 'Pop', value: 'POP' },
  { title: 'Hip-Hop', value: 'HIP_HOP_RAP' },
  { title: 'Dance', value: 'DANCE' },
  { title: 'Electronic', value: 'ELECTRONIC' },
  { title: 'Soul', value: 'SOUL_RNB' },
  { title: 'Alternative', value: 'ALTERNATIVE' },
  { title: 'Rock', value: 'ROCK' },
  { title: 'Latin', value: 'LATIN' },
  { title: 'Film', value: 'FILM_TV' },
  { title: 'Country', value: 'COUNTRY' },
  { title: 'Worldwide', value: 'WORLDWIDE' },
  { title: 'Reggae', value: 'REGGAE_DANCE_HALL' },
  { title: 'House', value: 'HOUSE' },
  { title: 'K-Pop', value: 'K_POP' },
];

export const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
  { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];

const SERVER = 'https://server-dot-canvas-advice-391121.wm.r.appspot.com';
const LOCAL = 'http://localhost:3001'

const host = LOCAL;

export const LOGIN = host + '/login';
export const REGISTER_URL = host + '/register';
export const CREATE_PLAYLIST = host + '/create-playlist';
export const UPDATE_PLAYLIST_NAME = host + '/update-playlist-name';
export const GET_SONGS = host + '/get-songs';
export const GET_PLAYLISTS = host + '/get-playlists';
export const UPLOAD = host + '/upload';
export const GET_PLAYLISTS_ITEMS = host + '/get-playlist-items';
export const ADD_TO_PLAYLIST = host + '/add-to-playlist';
