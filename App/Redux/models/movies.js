import Api from '../../lib/api';
import initialState from '../store/movies';
import { setCookie } from '../../lib/cookies'



export default {
  namespace: 'auth',

  /**
   *  Initial state
   */
  state: initialState,

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**


    /**
     * Get a single item from the API
     * @param {user}
     * @returns {Promise[obj]}
     */


    async getCategoryList() {
      try {
        const response = await Api.get(`/category`);
        dispatch.movies.setCategories(response.data.results);
          return {message:'success'};
      } catch (error) {
          console.log(error)
          return {message: 'failed'};
      }
    },

    async getCategoryMovies(tag ) {
      dispatch.movies.clearCategoryMovies()
      try {
        const response= await Api.get(`/movie?tags=${tag}`);
        dispatch.movies.setCategoryMovies(response.data)
      } catch (error) {
        console.log(error)
        return {message: 'failed'};
      }
    },
    async getMoreCategoryMovies (link) {
      try {
        const response= await Api.get(link);
        dispatch.movies.setMoreCategoryMovies(response.data)
      } catch (error) {
        console.log(error)
        return {message: 'failed'};
      }
    }


  }),

  /**
   * Reducers
   */
  reducers: {


    setError ( state, payload) {
      return {
        ...state,
        error:payload
      }
    },

    setCategories ( state , payload) {
      return {
        ...state,
        categoryList: payload
      }
    },

    clearCategoryMovies ( state , payload ) {
      return {
        ...state,
        categoryMovies: {
          next: null,
          results: []
        }
      }
    },

    setCategoryMovies ( state, payload) {
      return {
        ...state,
        categoryMovies: {
          next: payload.next,
          results: payload.results
        } 
      }
    },

    setMoreCategoryMovies ( state, payload) {
      const newPaginate= state.categoryMovies.results
      for ( result of payload.results){
        newPaginate.push(result);
      }
      return {
        ...state,
        categoryMovies: {
          next: payload.next,
          results: newPaginate
        } 
      }
    }

  },
};


