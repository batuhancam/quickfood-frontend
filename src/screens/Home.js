import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import Intro from '../components/Intro/Intro'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../style/Home.scss'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Home extends Component {

  constructor (props) {
    super(props);
  }
  
  render() {

    return (

      <KeyboardAvoidingView style={styles.backgroundAll}>
        <Intro/>
       
        <View style={styles.logoAlignment}>
          <Image
            style={styles.logo}
            source={require('../images/logo.png')}
          />
        </View>
       
        <SearchInput/>


        {/* <View style={styles.bottomMenu}>
          <View style={styles.menuElement}>
            <Icon.Button
              name="home"
              backgroundColor="transparent"
              color="white"
              size={30}
              style={styles.menuIconActive}
              iconStyle={{marginRight: 0}}
              onPress={() => this.props.navigation.navigate('Home')}
              light
            />
          </View>
          <View style={styles.menuElement}>
            <Icon.Button
                name="navicon"
                backgroundColor="transparent"
                color="white"
                size={30}
                style={styles.menuIcon}
                onPress={() => this.props.navigation.navigate('Login')}
              />
          </View>
          <View style={styles.menuElement}>
            <Icon.Button
                name="star-o"
                backgroundColor="transparent"
                color="white"
                size={30}
                style={styles.menuIcon}
              />
          </View>
          <View style={styles.menuElement}>
              <Icon.Button
                  name="user"
                  backgroundColor="transparent"
                  color="white"
                  size={30}
                  style={styles.menuIcon}
                  onPress={() => this.props.navigation.navigate('Login')}
                />
          </View>
        </View> */}

      </KeyboardAvoidingView>
    );
  }
}

