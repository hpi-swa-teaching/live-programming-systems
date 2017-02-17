import fetch from 'isomorphic-fetch'

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://template.com/api'
  : 'http://localhost:3000/api'

// Similar to:
// http://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
function fetchJson(url, request) {
  const finalRequest = request
    ? {
      ...request,
      body: JSON.stringify(request.body),
      headers: {
        ...request.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    : {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }

  return fetch(url, finalRequest).then(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
      // Reject other status
      return response.json().then(Promise.reject.bind(Promise))
    },
    error => Promise.reject(error) // Network or connection failure
  )
}

export function getExample(query) {
  return fetchJson(`${API_URL}/get/path?query=${query}`)
}

export function postExample(userID, password) {
  return fetchJson(`${API_URL}/login`, {
    method: 'POST',
    body: {
      userID,
      password,
    },
  })
}
