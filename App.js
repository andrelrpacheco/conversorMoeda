import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Converter from './src/converter'

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Converter currencyUSD='EUR' currencyBRL='BRL' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
