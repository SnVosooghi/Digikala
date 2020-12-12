import Api from '../../lib/api';
import initialState from '../store/search';



export default {
  namespace: 'search',

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

    async getSearch( phrase ) {
      dispatch.search.clearSearch()
      try {
        const response= await Api.get(`/movie?search=${phrase}`);
        dispatch.search.setSearch(response.data)
      } catch (error) {
        console.log(error)
        return {message: 'failed'};
      }
    },
    async getMoreSearch (link) {
      try {
        const response= await Api.get(link);
        dispatch.search.setMoreSearch(response.data)
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



    clearSearch ( state , payload ) {
      return {
          next: null,
          results: []
      }
    },

    setSearch ( state, payload) {
      return {
          next: payload.next,
          results: payload.results
      }
    },

    setMoreSearch ( state, payload) {
      const newPaginate= state.results
      console.log(state)
      for ( result of payload.results){
        newPaginate.push(result);
      }
      return {
          next: payload.next,
          results: newPaginate
      }
    }

  },
};


