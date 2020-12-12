/* global document */
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Create a new Cookie
 * @param {str} cookieName
 * @param {str} cookieValue
 */
export const setCookie = async (cookieName, cookieValue) => {
  try {
    await AsyncStorage.setItem(cookieName, cookieValue)
  } catch (e) {
    // saving error
  }
  
};

/**
 * Get the value of a Cookie
 * @param {str} cookieName
 */
export const getCookie = async (cookieName) => {
  try {
    const value = await AsyncStorage.getItem(cookieName)
    if(value !== null) {
      // value previously stored
      return value;
    }
  } catch(e) {
    // error reading value
  }
};

/**
 * Remove cookoe
 * @param {str} cookieName
 */
export const removeCookie = async (cookieName) => {
  try {
    await AsyncStorage.removeItem(cookieName)
  } catch(e) {
    // remove error
  }

}

/**
 * Deletes a Cookie by cookie name (expires it)
 * @param {str} cookieName
 */

