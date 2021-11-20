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
  ActivityIndicator
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/PreviewPost.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HTMLView from 'react-native-htmlview';
import {RNS3} from 'react-native-aws3'
export default class PreviewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
        userID: '',
        fullName: '',
        food: {},
        images: [],
        isLiked: false,
        picturePaths: [],
        categoryID: '',
        ingredientIDs: [],
        loading: false,
        activityIndicatorViewStyle: {display: 'none'}
    }
}
  componentDidMount = async () => {
        
    const userID = await AsyncStorage.getItem('userID')

    this.setState({userID: userID})
    
    const user = await fetch('http://localhost:3000/users/getByUserID',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        userID: userID
      })
    }).then(res => res.json());

    this.setState({fullName: user.userFullName})

    const images = this.props.route.params.imagesAWS

    images.map(image => {
      this.setState({images: [...this.state.images, image.uri]})
    })
    const category = await fetch('http://localhost:3000/categories/getByCategoryName',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        categoryName: this.props.route.params.categories
      })
    }).then(res => res.json());
    
    const ingredients = await fetch('http://localhost:3000/ingredients/getByIngredientName',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        ingredientName: this.props.route.params.ingredients
      })
    }).then(res => res.json());
 
    ingredients.map(ingredient => {
      this.setState({ingredientIDs: [...this.state.ingredientIDs, ingredient._id]})
    })

    this.setState({userID: userID, categoryID: category[0]._id})
    console.log(this.state.userID)
}

  nameGenerator = (name) => {
    name = name.replace(/\s+/g, '-').toLowerCase();
    name = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
    return name
  }


  previousButton = () => {
    this.props.navigation.goBack()
  }
  
  postButton = async () => {
   
    
    this.setState({loading: true,
      activityIndicatorViewStyle: {position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: '#000', opacity: .5, zIndex: 999}
    })
    const imageAWS = this.props.route.params.imagesAWS
    const config = {
      keyPrefix: 's3/',
      bucket: 'quickfoodimages',
      region: 'eu-central-1',
      accessKey: 'AKIA5YWW7CKE5N3YBJL5',
      secretKey: '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',
      successActionStatus: 201
    }

    imageAWS.map((image, index) => {
      image.name = this.nameGenerator(this.props.route.params.foodTitle)
      image.name = this.state.userID + "-" + image.name + "-" + index

      RNS3.put(image, config).then(res=> {
        this.setState({picturePaths: [...this.state.picturePaths, res.body.postResponse.location]})
      }).then(res => {
      }).then(res=> {
        this.setState({
          loading: false,
          activityIndicatorViewStyle: {display: 'none'}
        })
      }).then(async (res)=> {
        console.log(this.state.picturePaths)
        const postFood = await fetch('http://localhost:3000/foods/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            foodName : this.props.route.params.foodTitle,
            foodDescription : this.props.route.params.foodDesc,
            foodStatus : 5,
            foodActivity : true,
            foodPicturePaths : this.state.picturePaths,
            ingredientIDs : this.state.ingredientIDs,
            categoryID : this.state.categoryID,
            userID : this.state.userID
        })}).then(res=> 
          res.json()
        ).then(res => {
          AsyncStorage.setItem('foodID', res._id);
          this.props.navigation.navigate('Add Food', {navigatedFrom: 1, name: res.foodTitle });
        })
      })
    })

  }

  refresh = () => {
    console.log('asd444');
  }

  render(){
    const {fullName} = this.state
    return (
        <View style={styles.container}>
          <View style={this.state.activityIndicatorViewStyle}>
            <Text>Loading..</Text>
            <ActivityIndicator 
              animating={this.state.loading}
              textContent={'Loading...'}
              size='large'
              style={[styles.activityIndicator]}
            />
          </View>
          <ScrollView style={styles.foods}>
            <SliderBox 
              images={this.state.images}
              sliderBoxHeight={300}
              disableOnPress={true}
              dotColor="#ff3f34"
              inactiveDotColor="#90A4AE" />

              <View style={styles.foodHeader}>
                <View style={styles.foodTitleView}>
                  <Text style={styles.foodTitle}>{this.props.route.params.foodTitle} by {fullName}</Text>
                </View>
                
              </View>
              <View style={styles.foodDescriptionView}>
              <HTMLView
                  value={this.props.route.params.foodDesc}
              />  
              </View>
          </ScrollView>
          <TouchableOpacity style={styles.previousButtonTO} onPress={this.previousButton}>
                <MaterialCommunityIcons name='chevron-left'
                  size = { 25 }
                  style = {styles.previousButtonIcon}
                  color = '#FFF'/>
                <Text style={styles.previousButtonTitle}>Back</Text>
              </TouchableOpacity>
          <TouchableOpacity style={styles.nextButtonTO} onPress={this.postButton}>
            <Text style={styles.nextButtonTitle}>POST</Text>
            <MaterialCommunityIcons name='chevron-right'
              size = { 25 }
              style = {styles.nextButtonIcon}
              color = '#FFF'/>
          </TouchableOpacity>
        </View>
    );
  }
}
