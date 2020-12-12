/* global */
import { init } from '@rematch/core';
import * as models from '../models';

// Create plugins



const configureStore = () => {
  const store = init({
    models,
  });

  const { dispatch } = store;

  return {  store, dispatch };
};

export default configureStore;
