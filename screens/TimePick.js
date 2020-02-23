import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { Alert, StyleSheet, View, AsyncStorage} from 'react-native';

export default class TimePick extends Component {
  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  datePick =(date) =>{
    this.setState({date: date})
    console.log(date) 

  }

  render(){
    const {date} = this.state
    console.log(date) 
    return (
      <View style={styles.container}>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.datePick(date)}}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200
  },
  input: {
    margin: 10
  }
});
