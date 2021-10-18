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
import styles from '../style/SelectCategories.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default class SelectCategories extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    foodCategories = [
        'Breakfast and Brunch',
        'Lunch',
        'Dinner',
        'Appetizer',
        'Snack',
        'Bread',
        'Desserts',
        'Drink',
        'Main Dish',
        'Salad',
        'Side Dish',
        'Soup, Stew & Chili',
        'Diet & Healthy'
    ]
}

renderCategories = () => {
    return  <View>
        {
            foodCategories.map((categoryName, i) => (
                <BouncyCheckbox
                    size={25}
                    fillColor="#ff3f34"
                    unfillColor="transparent"
                    text={categoryName}
                    textStyle={{color: '#111'}}
                    iconStyle={{ borderColor: "red" }}
                    onPress={(isChecked: boolean) => {}}
                    style={styles.checkbox}
                    // disableBuiltInState={true}
                />
            ))
        }
    </View>
}

render(){
        return(
            <ScrollView style={styles.container}>
               <View>
                   {this.renderCategories()}
               </View>
                
            </ScrollView>
        )
    }
}