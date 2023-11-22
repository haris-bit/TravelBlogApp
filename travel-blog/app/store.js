// store.js
import { atom } from 'recoil';

export const userEmailState = atom({
    key: 'userEmail',
    default: ''
});
