import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import api from '../services/api'

class Converter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currencyUSD: props.currencyUSD,
            currencyBRL: props.currencyBRL,
            currencyBRLValue: 0,
            valueConverted: 0
        }

        this.convertCurrency = this.convertCurrency.bind(this)
    }

    async convertCurrency() {
        try {
            const EURBRL = `${this.state.currencyUSD}-${this.state.currencyBRL}`
            const response = await api.get(EURBRL)
            console.log(response)

            if(response.status === 200) {
                const quotationValue = response.data.EURBRL.ask
                const finalQuotation = (quotationValue * parseFloat(this.state.currencyBRLValue))
                this.setState({
                    valueConverted: finalQuotation.toFixed(2),
                })
            }
            
        } catch (error) {
            console.warn('Moeda não encontrada')
        }
        Keyboard.dismiss()
    }

    render() {
        const { currencyUSD, currencyBRL } = this.props
        //const changeCurrencyDolar = currencyUSD.replace(currencyUSD, 'US$')
        
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{currencyUSD} para {currencyBRL}</Text>

                <TextInput 
                    placeholder='Valor a ser convertido' 
                    style={styles.inputConvert}
                    onChangeText={(currencyBRLValue) => {
                        this.setState({currencyBRLValue})
                    }}
                    keyboardType='numeric'
                />

                <TouchableOpacity style={styles.btnConvert} onPress={this.convertCurrency}>
                    <Text style={styles.btnTitle}>Converter</Text>
                </TouchableOpacity>

                <Text style={styles.valueInDolar}>
                    {this.state.valueConverted !== 0 ? `${this.state.currencyBRLValue}` : ''}
                </Text>

                <Text style={styles.valueConverted}>
                    {this.state.valueConverted == 0 ? '' : `R$ ${this.state.valueConverted}`}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000'
    },
    inputConvert: {
        width: 300,
        height: 50,
        backgroundColor: '#ccc',
        fontSize: 18,
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    btnConvert: {
        width: 200,
        height: 50,
        backgroundColor: '#079ea6',
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    valueConverted: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#000000'
    },
    valueInDolar: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 40,
        color: '#000000'
    }
})

export default Converter
