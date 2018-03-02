export default {
  // Functions return fixtures

  // entity fixtures

  updateArtist: (artist) => {
    return {
      ok: true,
      data: require('../Fixtures/updateArtist.json')
    }
  },
  getArtists: () => {
    return {
      ok: true,
      data: require('../Fixtures/getArtists.json')
    }
  },
  getArtist: (artistId) => {
    return {
      ok: true,
      data: require('../Fixtures/getArtist.json')
    }
  },
  deleteArtist: (artistId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../Fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../Fixtures/getAccount.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({password}) => {
    if (password === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
