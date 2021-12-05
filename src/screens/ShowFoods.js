import React, { Component } from "react";
import {
  View,
  ScrollView,
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
  Appearance,
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/Categories.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckboxGroup, {
    ICheckboxButton,
  } from "react-native-bouncy-checkbox-group";
import Foods from "../components/Foods/Foods";

export default class ShowFoods extends Component {
  constructor(props){
    super(props);
    this.state = {
        allFoods: {},
    }
}

fetchData = async () => {
  if(this.props.route.params.categoryID){
    const foods = await fetch('http://localhost:3000/foods/getByCategoryId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryID: this.props.route.params.categoryID,
      })
    }).then(res=> 
        res.json()
    )
    this.setState({allFoods: foods})
  }
  if(this.props.route.params.ingredients){
    console.log('ingredients', this.props.route.params.ingredients)
    const foods = await fetch('http://localhost:3000/foods/getByIngredients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ingredients: this.props.route.params.ingredients,
      })
    }).then(res=> 
        res.json()
    )
    this.setState({allFoods: foods})
  }
  
  
}

componentDidMount = () => {
  const {navigation} = this.props;
  this.fetchData();
  this.focusListener = navigation.addListener('focus', () => {
    this.fetchData();
  })
}

render(){
        return(
            <View style={styles.container}>
               {this.state.allFoods.length >= 1 && <Foods allFoods={this.state.allFoods} navigation={this.props.navigation} />}
            </View>
        )
    }
}