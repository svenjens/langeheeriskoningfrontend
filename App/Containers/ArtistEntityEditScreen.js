import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ArtistActions from '../Redux/ArtistRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import t from 'tcomb-form-native'

// Styles
import styles from './Styles/ArtistEntityEditScreenStyle'

let Form = t.form.Form

class ArtistEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        name: t.maybe(t.String),
        time: t.maybe(t.String),
        info: t.maybe(t.String)
      }),
      formValue: this.props.artist,
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('time').refs.input.focus()
          },
          time: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('info').refs.input.focus()
          },
          info: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm()
          }
        }
      },
      success: false,
      artist: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.entityId) {
      this.props.getArtist(this.props.entityId)
    } else {
      this.setState({formValue: null})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.artist) {
      this.setState({ artist: newProps.artist })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        }
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.setState({
          success: true,
          requesting: false,
          formValue: {}
        })
        Alert.alert('Success', 'Entity saved successfully', [{text: 'OK'}])
        this.props.getAllArtists({page: 0, sort: 'id,asc', size: 20})
        NavigationActions.pop()
      }
    }
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const artist = this.refs.form.getValue()
    if (artist) { // if validation fails, value will be null
      this.props.updateArtist(artist)
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artists.artist,
    fetching: state.artists.fetchingOne,
    updating: state.artists.updating,
    error: state.artists.errorOne
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtist: (id) => dispatch(ArtistActions.artistRequest(id)),
    getAllArtists: (options) => dispatch(ArtistActions.artistAllRequest(options)),
    updateArtist: (artist) => dispatch(ArtistActions.artistUpdateRequest(artist))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEntityEditScreen)
