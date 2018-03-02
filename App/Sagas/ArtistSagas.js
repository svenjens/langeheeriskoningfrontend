import { call, put } from 'redux-saga/effects'
import ArtistActions from '../Redux/ArtistRedux'
import { callApi } from './CallApiSaga'

export function * getArtist (api, action) {
  const { artistId } = action
  // make the call to the api
  const apiCall = call(api.getArtist, artistId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ArtistActions.artistSuccess(response.data))
  } else {
    yield put(ArtistActions.artistFailure(response.data))
  }
}

export function * getArtists (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getArtists, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ArtistActions.artistAllSuccess(response.data))
  } else {
    yield put(ArtistActions.artistAllFailure(response.data))
  }
}

export function * updateArtist (api, action) {
  const { artist } = action
  // make the call to the api
  const apiCall = call(api.updateArtist, artist)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ArtistActions.artistUpdateSuccess(response.data))
  } else {
    yield put(ArtistActions.artistUpdateFailure(response.data))
  }
}

export function * deleteArtist (api, action) {
  const { artistId } = action
  // make the call to the api
  const apiCall = call(api.deleteArtist, artistId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ArtistActions.artistDeleteSuccess())
  } else {
    yield put(ArtistActions.artistDeleteFailure(response.data))
  }
}
