import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import ArtistActions from '../Redux/ArtistRedux'
import RoundedButton from '../Components/RoundedButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ArtistEntityDetailScreenStyle'

class ArtistEntityDetailScreen extends React.Component {
  constructor (context, props) {
    super(context, props)
    this.state = {
      entityId: props.entityId,
      artist: {}
    }
  }

  componentWillMount () {
    this.props.getArtist(this.props.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.artist) {
      this.setState({ artist: newProps.artist })
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.artist.id}</Text>
        <Text>Name: {this.state.artist.name}</Text>
        <Text>Time: {this.state.artist.time}</Text>
        <Text>Info: {this.state.artist.info}</Text>
        <RoundedButton text='Edit' onPress={NavigationActions.artistEntityEdit.bind(this, { entityId: this.state.artist.id })} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artists.artist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArtist: (id) => dispatch(ArtistActions.artistRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEntityDetailScreen)
