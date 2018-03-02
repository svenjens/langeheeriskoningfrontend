import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  artistRequest: ['artistId'],
  artistAllRequest: ['options'],
  artistUpdateRequest: ['artist'],
  artistDeleteRequest: ['artistId'],

  artistSuccess: ['artist'],
  artistAllSuccess: ['artists'],
  artistUpdateSuccess: ['artist'],
  artistDeleteSuccess: [],

  artistFailure: ['error'],
  artistAllFailure: ['error'],
  artistUpdateFailure: ['error'],
  artistDeleteFailure: ['error']
})

export const ArtistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  artist: null,
  artists: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    artist: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    artists: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { artist } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    artist
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { artists } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    artists
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { artist } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    artist
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    artist: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    artist: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    artists: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    artist: state.artist
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    artist: state.artist
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ARTIST_REQUEST]: request,
  [Types.ARTIST_ALL_REQUEST]: allRequest,
  [Types.ARTIST_UPDATE_REQUEST]: updateRequest,
  [Types.ARTIST_DELETE_REQUEST]: deleteRequest,

  [Types.ARTIST_SUCCESS]: success,
  [Types.ARTIST_ALL_SUCCESS]: allSuccess,
  [Types.ARTIST_UPDATE_SUCCESS]: updateSuccess,
  [Types.ARTIST_DELETE_SUCCESS]: deleteSuccess,

  [Types.ARTIST_FAILURE]: failure,
  [Types.ARTIST_ALL_FAILURE]: allFailure,
  [Types.ARTIST_UPDATE_FAILURE]: updateFailure,
  [Types.ARTIST_DELETE_FAILURE]: deleteFailure
})
