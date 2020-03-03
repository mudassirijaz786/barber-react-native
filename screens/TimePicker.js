import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import React, { Component } from "react";

export default class TimePicker extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }

  handlePicker = () => {
    this.setState({
      isVisible: false
    });
  };

  hidePicker = () => {
    this.setState({
      isVisible: false
    });
  };
  showPicker = () => {
    this.setState({
      isVisible: true
    });
  };
  render() {
    return (
      <View>
        <Button title="Show Picker" onPress={this.showPicker} />
        <DateTimePickerModal
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}
          mode={"time"}
        />
      </View>
    );
  }
}
