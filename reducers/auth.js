import * as c from '../constants'
import {Map} from 'immutable'

// Load auth details from session storage
const auth = sessionStorage.getItem('auth');
const defaultState = Map(JSON.parse(auth));

export default function (state=defaultState, action) {
  const { type, payload} = action
  switch (type) {
    case c.SET_AUTH: {
      return Map(payload)
    }
  }
  return state;
}
