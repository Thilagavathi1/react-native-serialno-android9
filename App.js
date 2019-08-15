/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  PermissionsAndroid,
  Alert
} from "react-native";
import DeviceInfo from "react-native-device-info";

import { Colors } from "react-native/Libraries/NewAppScreen";
export async function request_READ_PHONE_STATE() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "ReactNativeCode wants to READ_PHONE_STATE",
        message: "ReactNativeCode App needs access to your personal data. "
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission Granted.");
    } else {
      Alert.alert("Permission Not Granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      device_IMEI: ""
    };
  }
  async componentDidMount() {
    await request_READ_PHONE_STATE();
  }

  get_Serial_Number = () => {
    var serialNumber = DeviceInfo.getSerialNumber();
    console.log(serialNumber, "serialNumber");
    // alert(serialNumber);
    this.setState({ device_IMEI: serialNumber });
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}>
            {this.state.device_IMEI}
          </Text>

          <Button
            title="Click Here to Get Device Serial Number"
            onPress={this.get_Serial_Number}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
