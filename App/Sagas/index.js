import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { ArtistTypes } from '../Redux/ArtistRedux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, loginLoad } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPassword, changePassword } from './PasswordSagas'
import { getAccount, updateAccount } from './AccountSagas'
import { getArtist, getArtists, updateArtist, deleteArtist } from './ArtistSagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(ArtistTypes.ARTIST_REQUEST, getArtist, api),
    takeLatest(ArtistTypes.ARTIST_ALL_REQUEST, getArtists, api),
    takeLatest(ArtistTypes.ARTIST_UPDATE_REQUEST, updateArtist, api),
    takeLatest(ArtistTypes.ARTIST_DELETE_REQUEST, deleteArtist, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
