import { Text, Block } from 'galio-framework';

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Image } from 'react-native-paper';
import Service from "../components/Service"
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';

export default class ServicesScreen extends Component {


  
  render() {
    
    return (
      <ScrollView style={{ flex: 1, boderColor: "indigo"}}>
        <Block style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginBottom: 20 }}>What can we help you find?</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Cutting"/>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Face wash"/>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Massage"/>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Oil massage"/>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Rough cutting"/>
              <Service uri={{uri: 'https://picsum.photos/700'}} name="Fishel"/>
            </ScrollView>
            <Card>
              <Card.Content>
                <Title>Cutting</Title>
                <Paragraph>This is cutting by tommy and guy</Paragraph>
              </Card.Content>
              <Card.Cover style={{ flex: 1,resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd', marginLeft: 18, marginRight: 18}} source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button onPress = {() =>this.props.navigation.navigate('Service')}>By tommy and guy</Button>
                <Block row>
                    <Text color="black" size={16}>Do you like it? </Text>
                    <Block>
                      <Text size={16} color={materialTheme.COLORS.WARNING}>
                        4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                      </Text>
                    </Block>
                </Block>
              </Card.Actions>
          </Card>
          <Card>
              <Card.Content>
                <Title>Face wash</Title>
                <Paragraph>This is face wash by alice</Paragraph>
              </Card.Content>
              <Card.Cover style={{ flex: 1,resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd', marginLeft: 18, marginRight: 18}} source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button onPress = {() =>this.props.navigation.navigate('Service')}>By alice</Button>
                <Block row>
                    <Text color="black" size={16}>Do you like it? </Text>
                    <Block>
                      <Text size={16} color={materialTheme.COLORS.WARNING}>
                        4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                      </Text>
                    </Block>
                </Block>
              </Card.Actions>
          </Card>

            <Card>
              <Card.Content>
                <Title>Massage</Title>
                <Paragraph>This is massage by Mark</Paragraph>
              </Card.Content>
              <Card.Cover style={{ flex: 1,resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd', marginLeft: 18, marginRight: 18}} source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button onPress = {() =>this.props.navigation.navigate('Service')}>By mark</Button>
                <Block row>
                    <Text color="black" size={16}>Do you like it? </Text>
                    <Block>
                      <Text size={16} color={materialTheme.COLORS.WARNING}>
                        4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                      </Text>
                    </Block>
                </Block>
              </Card.Actions>
          </Card>
        </Block>
      </ScrollView>
     
      
    );
  }
}

const styles = StyleSheet.create({

});

