import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Appearance
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Intro from '../components/Intro/Intro'
import SearchInput from "../components/SearchInput/SearchInput";
import styles from '../style/Login.scss'

export default class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
      signUpMail: "",
      signUpFullName: "",
      signUpPassword: "",
      signUpPasswordConfirm: "",
      eyeToggle: false,
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    }
    const signupToggle = false;
    const isDarkMode = Appearance.getColorScheme()
  }

  animVal = new Animated.Value(this.signupToggle ? 1 : 0);
  interpolateBottom = this.animVal.interpolate({inputRange:[0,1],outputRange:[-999,0]})
  toggleSignup = () => { 
    this.signupToggle = !this.signupToggle
    Keyboard.dismiss()
    this.animationSignup()
  }

  animationSignup = () => {
    Animated.timing(this.animVal, {
        toValue: this.signupToggle ? 1 : 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
  }

  signUp = () => {

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
         <View style={styles.flexContainer}>
           
          <LinearGradient style={styles.gradientBackground} colors={['#fc291d', '#ff3f34']} >
          <View style={styles.logoAlignment}>
            <Image
              style={styles.logo}
              source={require('../images/logo.png')}
            />
          </View>
          </LinearGradient>
          
          <View style={styles.solidBackground}>
            <View style={[styles.popupBackground, embeddedStyle.shadow] }>
             <View style={styles.inputView}>
                <TextInput autoCapitalize="none" style={styles.input} placeholder="Email" placeholderTextColor='#b1b1b3'/>
             </View>
             <View style={[styles.inputView, styles.passwordView]}>
                <TextInput 
                  secureTextEntry={this.state.eyeToggle ? false : true}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor='#b1b1b3'/>
                <TouchableOpacity style={styles.eyeIcon} onPress={() => this.setState({eyeToggle: !this.state.eyeToggle})}>
                <Icon
                  name={this.state.eyeToggle ? 'eye' : 'eye-slash'}
                  backgroundColor="transparent"
                  color="#777"
                  size={18}
                  iconStyle={{marginRight: 0}}
                />
                </TouchableOpacity>
             </View>
             <View style={styles.forgetPasswordView}>
                <TouchableOpacity>
                  <Text style={styles.forgetPassword}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
             </View>
             <TouchableOpacity style={styles.loginButtonView}>
              <LinearGradient colors={['#fc291d', '#ff3f34']} style={styles.loginButtonView}>
                <Text style={styles.loginButton}>
                  Login
                </Text>
              </LinearGradient>
             </TouchableOpacity>
             <View style={styles.signupTextView}>
                  <Text>
                    Don't you have an account? 
                  </Text>  
                  <TouchableOpacity style={styles.signupTextTO} onPress={this.toggleSignup}>
                        <Text style={styles.signupText}>
                          Sign Up
                        </Text>
                    </TouchableOpacity>
             </View>
            </View>
          </View>
         </View>
        
         <Animated.View style={{position: 'absolute', width: '100%', height: '68%', backgroundColor: '#FFF', bottom: this.interpolateBottom, borderTopLeftRadius: 10, borderTopRightRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.closeButtonView} onPress={this.toggleSignup}>
              <Icon 
                name='close'
                backgroundColor="transparent"
                color="#777"
                size={22}
                iconStyle={{marginRight: 0}} />
            </TouchableOpacity>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.signupViewAlignment} >
              <View style={[styles.inputView, styles.signupInputView]}>
                <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                placeholderTextColor='#b1b1b3'
                value={this.state.signUpFullName} 
                onChangeText={(value) => { this.setState({signUpFullName: value})}}/>
              </View>
              <View style={[styles.inputView, styles.signupInputView]}>
                <TextInput 
                autoCapitalize="none"
                style={styles.input}
                placeholder="Email" 
                placeholderTextColor='#b1b1b3' 
                value={this.state.signUpMail} 
                onChangeText={(value) => { this.setState({signUpMail: value})}}/>
              </View>
              <View style={[styles.inputView, styles.signupInputView]}>
                <TextInput 
                secureTextEntry={true}
                autoCapitalize="none" 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor='#b1b1b3'
                value={this.state.signUpPassword} 
                onChangeText={(value) => { this.setState({signUpPassword: value})}}/>
                </View>
              <View style={[styles.inputView, styles.signupInputView]}>
                <TextInput 
                secureTextEntry={true}
                autoCapitalize="none" 
                style={styles.input} 
                placeholder="Confirm Pasword" 
                placeholderTextColor='#b1b1b3'
                value={this.state.signUpPasswordConfirm} 
                onChangeText={(value) => { this.setState({signUpPasswordConfirm: value})}}/>
              </View>
              <TouchableOpacity style={styles.signupButtonView} onPress={this.signUp}>
              <LinearGradient colors={['#fc291d', '#ff3f34']} style={styles.signupButtonView}>
                <Text style={styles.signupButton}>
                  Sign Up
                </Text>
              </LinearGradient>
             </TouchableOpacity>
            </KeyboardAvoidingView>
         </Animated.View>
        </View>
        </TouchableWithoutFeedback>
    );
  }
}

const embeddedStyle = StyleSheet.create({

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  shadowSignup: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }

})