import { atom } from 'recoil';

export const isCreateSwapModalState = atom({
  key: 'isCreateSwapModalState',
  default: false,
});

export const haveCreateSwapState = atom<any>({
  key: 'haveCreateSwapState',
  default: [],
});

export const wantCreateSwapState = atom<any>({
  key: 'wantCreateSwapState',
  default: [],
});
