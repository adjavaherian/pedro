import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
require('es6-promise').polyfill();
require('isomorphic-fetch');

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {

  return fetch('http://example.com/user')
    .then(function(res){
      return res.json();
    })
    .then(function(json){
      return put({type: "USER_FETCH_SUCCEEDED", user: user});
    })
    .catch(function(ex){
      return put({type: "USER_FETCH_FAILED", message: ex.message});
    })
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield* takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield* takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
