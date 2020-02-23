import { Text, Block } from 'galio-framework';

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';

export default class ServiceScreen extends Component {


  
  render() {
    
    return (
      <ScrollView >
        <Card style={{marginTop: 20}}>
          <Card.Title title="Tommy and guy" subtitle="Cutting" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
          <Card.Content>
            <Paragraph>This service charges about 300 rupees per head</Paragraph>
          </Card.Content>
          <Card.Cover style={{ flex: 1,resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd', marginLeft: 18, marginRight: 18}} source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button style={{color: "black"}} onPress = {() =>this.props.navigation.navigate('TimePick')} >Awail it</Button>
            <Block row>
                <Text color="black" size={16}>Do you like it? </Text>
                <Block>
                  <Text size={16} color={materialTheme.COLORS.WARNING}>
                    300 rupees <Icon name="dollar" family="GalioExtra" size={14} />
                  </Text>
                </Block>
              </Block>
          </Card.Actions>
        </Card>
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({

  input: {
    margin: 10
  }
});

