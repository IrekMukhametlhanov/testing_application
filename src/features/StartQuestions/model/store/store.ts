import { createStore, createEvent } from 'effector';

export const Name = createStore<string>('');

export const setName = createEvent<string>();

Name.on(setName, (_, payload) => payload);

export const saveNameToLocalStorage = (name: string) => {
  localStorage.setItem('Name', name);
};