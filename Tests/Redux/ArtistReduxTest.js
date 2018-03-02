import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/ArtistRedux'

test('attempt retrieving a single artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.artist).toBe(null)
})

test('attempt retrieving a list of artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.artists).toBe(null)
})

test('attempt updating a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.artist).toEqual({id: 1})
})

test('success retrieving a list of artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.artists).toEqual([{id: 1}, {id: 2}])
})

test('success updating a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.artist).toEqual({id: 1})
})
test('success deleting a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.artist).toEqual(null)
})

test('failure retrieving a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.artist).toEqual(null)
})

test('failure retrieving a list of artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.artists).toEqual(null)
})

test('failure updating a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.artist).toEqual(INITIAL_STATE.artist)
})
test('failure deleting a artist', () => {
  const state = reducer(INITIAL_STATE, Actions.artistDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.artist).toEqual(INITIAL_STATE.artist)
})
