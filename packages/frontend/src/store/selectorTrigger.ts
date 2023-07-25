import { atomFamily } from 'recoil';

export const selectorTrigger = atomFamily({
  key: 'selectorTrigger',
  default: 0,
});
