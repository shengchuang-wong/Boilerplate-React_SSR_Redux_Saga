import { put, takeLatest, all, call, fork } from 'redux-saga/effects'
import axios from 'axios';
import { fetchUsersSuccess } from '../actions'

// import Cookies from 'universal-cookie';

// export function* helloSaga() {
//   console.log('Hello Sagas!')
// }

const fetchUsersService = () => {
  return axios.get('http://react-ssr-api.herokuapp.com/users');
}

function* fetchUsersSaga() {
  try {
    const response = yield call(fetchUsersService)
    if (response.status >= 200 && response.status < 300) {
      yield put(
        fetchUsersSuccess(
          response.data
        )
      )

      // const cookies = new Cookies();
      // const setCookie = (name, value) => {
      //   return cookies.set(name, value, {path: '/'})
      // }
      // yield call(setCookie, 'users', response.data)

      // cookies.set, 'users', response.data, { path: '/' }
      // if (typeof window !== undefined) {
      //   yield put(push('/'))`
      // }
    }
  } catch (err) {
    console.log('err', err)
  }
}

function* watchFetchUsers() {
  yield takeLatest('FETCH_USERS', fetchUsersSaga)
}

export default function* rootSaga() {
  yield all([
    // helloSaga(),
    watchFetchUsers()
  ])
}