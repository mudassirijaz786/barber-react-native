import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
export default class Salon extends Component {
    render() {
        return (
            <View style={{ height: 200, width: 400, marginRight: 20, borderWidth: 0.5, borderColor: 'indigo', marginTop: 20 }}>
                <View style={{ flex: 2 }}>
                    <Image source={this.props.uri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <Text>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}
