import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { getArtist, getArtists, updateArtist, deleteArtist } from '../../App/Sagas/ArtistSagas'
import ArtistActions from '../../App/Redux/ArtistRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getArtist(1)
  const step = stepper(getArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ArtistActions.artistSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ArtistActions.artistFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getArtists()
  const step = stepper(getArtists(FixtureAPI, {page: 0, sort: 'id,asc', size: 20}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ArtistActions.artistAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getArtists(FixtureAPI, {page: 0, sort: 'id,asc', size: 20}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ArtistActions.artistAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateArtist({id: 1})
  const step = stepper(updateArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ArtistActions.artistUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ArtistActions.artistUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteArtist({id: 1})
  const step = stepper(deleteArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ArtistActions.artistDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteArtist(FixtureAPI, {id: 1}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ArtistActions.artistDeleteFailure()))
})
