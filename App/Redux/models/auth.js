import Api from '../../lib/api';
import initialState from '../store/auth';
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


    async login(credintials) {
      try {
        const response = await Api.post(`/user/auth-token`,credintials);
        dispatch.auth.setToken(response.data.token);
        return {message:'logged in'};
      } catch (error) {
          console.log(error)
          return {message: 'unauthorized'};
      }
    },


  }),

  /**
   * Reducers
   */
  reducers: {

    setToken (state, payload) {
      setCookie( 'Auth:Token', payload, 100);
      return {
        ...state,
        token:payload
      }
    },

    setImageUrl (state, payload) {
      return {
        ...state,
        imageUri:payload
      }
    },

    setError ( state, payload) {
      return {
        ...state,
        error:payload
      }
    }
  },
};


