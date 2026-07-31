export default function(url, options) {
  return fetch(process.env.REACT_APP_API_BASE_URL + url, options)
}
