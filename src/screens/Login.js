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
  Alert,
  AsyncStorage,
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
      userEmail: "",
      userPassword: "",
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

  login = async() => {
    if(this.state.userEmail != null && this.state.userPassword != null) {
      const user = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userEmail: this.state.userEmail,
          userPassword: this.state.userPassword
        })
      }).then(res=> {
        return res.json()
      }).catch(err => {
        console.log(err)
      })
      if(!user.errorCode){
        console.log(user)
        await AsyncStorage.setItem('loginAuth', '1')
        await AsyncStorage.setItem('userID', user[0]._id)
        this.props.navigation.navigate('Home')
      }else{
        Alert.alert('Error', `${user.message}\nError Code: ${user.errorCode}`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
    }else{
      Alert.alert('Missing Field(s)', `Please make sure you fill in all fields!`,[
        {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
      ]);
    }
  }

  signUp = async () => {

    if(this.state.signUpFullName != "" && this.state.signUpMail != "" && this.state.signUpPassword != "" && this.state.signUpPasswordConfirm!=""){
      if(this.state.signUpPasswordConfirm != this.state.signUpPassword){
        Alert.alert('Unmatch Passwords ', `Please make sure passwords are same!`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }else{
        if(this.validate(this.state.signUpMail)){
        const newUserInfos = await fetch('http://localhost:3000/users/signup',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userFullName: this.state.signUpFullName,
            userEmail: this.state.signUpMail,
            userStatus: 1,
            userActivity: true,
            userPassword: this.state.signUpPassword
          })
          }).then(res =>{
            return res.json();
          })
          .catch(err=> {
            console.log('error', err)
          });
        }
        else{
          Alert.alert('Email Error', `The email you entered is not in the correct format!`,[
            {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
          ]);
        }
        
        if(!newUserInfos.errorCode){
          await AsyncStorage.setItem('loginAuth', '1')
          await AsyncStorage.setItem('userID', newUserInfos._id)
          this.props.navigation.navigate('Home')   
        }else{
          Alert.alert('Error', `${newUserInfos.message}\nError Code: ${newUserInfos.errorCode}`,[
            {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
          ]);
          
        }
      }
    }else{
        Alert.alert('Missing Field(s)', `Please make sure you fill in all fields!`,[
          {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ]);
      }
    
  }
  validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
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
                <TextInput autoCapitalize="none"
                 style={styles.input}
                 placeholder="Email"
                 placeholderTextColor='#b1b1b3'
                 value={this.state.userEmail} 
                 onChangeText={(value) => { this.setState({userEmail: value})}}/>
             </View>
             <View style={[styles.inputView, styles.passwordView]}>
                <TextInput 
                  secureTextEntry={this.state.eyeToggle ? false : true}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor='#b1b1b3'
                  value={this.state.userPassword} 
                  onChangeText={(value) => { this.setState({userPassword: value})}}/>
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
             <TouchableOpacity style={styles.loginButtonView} onPress={this.login}>
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