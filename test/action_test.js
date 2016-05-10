import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import sagas from '../sagas'
import nock from 'nock'
import expect from 'expect'

describe('test the sagas', function(){

  before(function(){

    if(typeof window !== 'undefined') {
      console.log('window is defined');
      global = window;
    }

    function mockStorage() {
        var storage = {};
        return {
            setItem: function(key, value) {
                storage[key] = value || '';
            },
            getItem: function(key) {
                return storage[key];
            },
            removeItem: function(key) {
                delete storage[key];
            },
            get length () {
                return Object.keys(storage).length;
            },
            key: function(i) {
                var keys = Object.keys(storage);
                return keys[i] || null;
            }
        };
    }

    global['localStorage'] = mockStorage();
    global['sessionStorage'] = mockStorage();

  });

  it('should bootstrap a saga and store', function(){

    const sagaMiddleware = createSagaMiddleware(sagas);
    const middlewares = [ sagaMiddleware ];
    const mockStore = configureMockStore(middlewares);
    console.log('mockStore', mockStore);

  });

});
