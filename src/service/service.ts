import fetch_mock from "./mock/data"
const API_BASE_PATH = "www.XXX.com"

const getHeaders = () => {
  const headerObj = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'cookie': document.cookie
  }
  return headerObj
}

function fetch_post<T>(url: string, payload?: any, options?: any) {
  const api_endpoint = API_BASE_PATH + url
  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: payload,
    cache: 'no-store',
    credentials: 'include',
    ...options
  };
  return fetch_mock(api_endpoint, requestOptions)
}

function fetch_get<T>(url: string, options?: any) {
  const api_endpoint = API_BASE_PATH + url
  const requestOptions = {
    method: 'GET',
    headers: getHeaders(),
    cache: 'no-store',
    credentials: 'include',
    ...options
  };
  return fetch_mock(api_endpoint, requestOptions)
}

export default {
  post: fetch_post,
  get: fetch_get
}
