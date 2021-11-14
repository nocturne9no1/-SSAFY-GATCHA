//import { Cookies } from 'react-cookie';

//const cookies = new Cookies()

//export const setCookie = (name, value, option) => {
//  console.log(value)	
//  return cookies.set(name, value, { ...option })
//}

//export const getCookie = (name) => {
//  return cookies.get(name)
//}
export const setCookie = (name, value, option) => {
  return window.localStorage.setItem(name, value);
}

export const getCookie = (name) => {
  return localStorage.getItem(name);
}

