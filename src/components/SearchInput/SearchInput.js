import React, { Component } from 'react';
import {KeyboardAvoidingView, View, TextInput, Text, TouchableOpacity, Image, ScrollView, Animated, Keyboard, Alert, TouchableWithoutFeedback} from "react-native";
import { createIconSetFromFontello } from 'react-native-vector-icons';
import styles from './SearchInput.scss' 

export default class SearchInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            suggestion: [],
            selectedIngredients: [],
            selectedIngredientIDs: [],
            inputValue : "",
            toggle: false,
            cancelToggle: false,
            addToggle: false,
            searchToggle: false,
            ingredients: []
        }
        const toggle = false
        
    }
    animVal = new Animated.Value(this.toggle ? 1 : 0);

    interpolateWidth = this.animVal.interpolate({inputRange:[0,1],outputRange:['90%','108%']})
    interpolateHeight = this.animVal.interpolate({inputRange:[0,1],outputRange:['0%','100%']})
    interpolateBackgroundColor = this.animVal.interpolate({inputRange:[0,1],outputRange:['white','white']})
    interpolatePaddingTop = this.animVal.interpolate({inputRange:[0,1],outputRange:[0,44]})

    animatedTransition = Animated.spring(this.animVal,{toValue:1})

    toggleSearchBox = () => { 
        this.toggle = true
        this.setState({cancelToggle: true})
        this.animationSearchBox()
    }

    toggleCancel = () => {
        Keyboard.dismiss()
        this.toggle = false
        this.setState({
            cancelToggle: false,
            addToggle: false,
            inputValue: "",
            suggestion: []
        })

        this.animationSearchBox()
    }


    animationSearchBox = () => {
        Animated.timing(this.animVal, {
            toValue: this.toggle ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
          }).start();
    }


    handleClickIngredientElement = (e) => {
        const value = e._dispatchInstances.child.key
        this.setState({inputValue: value, suggestion: []})
    }
    onTextChanged = (value) => {
        this.setState({inputValue: value})
        this.setState({addToggle: false})
        if(this.state.selectedIngredients.length > 0)
            this.setState({searchToggle: true})
        
        let suggestions = []
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i')
            this.setState({
                addToggle: true,
                searchToggle: false
            })
            const ingredients = Array.prototype.sort.call(this.state.ingredients, (a,b) => (a.ingredientName > b.ingredientName) ? 1 : -1)
            console.log(ingredients)
            suggestions = Array.prototype.filter.call(ingredients, v => regex.test(v.ingredientName))
            console.log(suggestions)
        }
        this.setState({suggestion: suggestions})
    }
    renderSuggestions = () => {
        const {suggestion} = this.state
        if(suggestion.length === 0){
            return null
        }
        if(suggestion.length === 1){
            return  <ScrollView style={styles.suggestionContainer1} >
            {
                suggestion.map((ingredient, i) => (
                    <TouchableOpacity style={(i === suggestion.length - 1 && suggestion.length > 3 ) ? styles.suggestionLastElement : styles.suggestionElement} key={ingredient.ingredientName} onPress={this.handleClickIngredientElement}>
                        <Text  key={ingredient.ingredientName}>{ingredient.ingredientName}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
        }
        return  <ScrollView style={styles.suggestionContainer} >
        {
            suggestion.map((ingredient, i) => (
                <TouchableOpacity style={(i === suggestion.length - 1 && suggestion.length > 3 ) ? styles.suggestionLastElement : styles.suggestionElement} key={ingredient.ingredientName} onPress={this.handleClickIngredientElement}>
                    <Text  key={ingredient.ingredientName}>{ingredient.ingredientName}</Text>
                </TouchableOpacity>
            ))
        }
    </ScrollView>
    }

    addIngredientsHandler = () => {
        const selectedIngredients = this.state.selectedIngredients
        // const selectedIngredientIDs = []



        if(!selectedIngredients.includes(this.state.inputValue)){
            selectedIngredients.push(this.state.inputValue)
            this.setState({
                ...this.state,
                inputValue: '',
                selectedIngredients: selectedIngredients,
                searchToggle: true,
                addToggle: false
            })
        }else if(this.state.inputValue != ''){
            Alert.alert('Entry Not Found', `I am sorry :( I can not find any ingredient named '${this.state.inputValue}'`,[
                {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
            ])
        }else if(selectedIngredients.includes(this.state.inputValue)){
            Alert.alert('Same Entry!', `You have already added '${this.state.inputValue}' before.`,
            {text: 'Check Again', onPress: () => {console.log('2nd alert box closed')}})
        }

        Array.prototype.map.call(this.state.selectedIngredients, (ingredient) => {
            const result = fetch('http://localhost:3000/ingredients/getByIngredientName', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ingredientName: ingredient,
                })
            })
            .then(res=> res.json())
            .then(res => {
                const id = res[0]._id
                this.setState(prevState => ({
                    selectedIngredientIDs: [...prevState.selectedIngredientIDs, id]
                }))
            })
            
        });

    }

    displaySelectedIngredients = () => {
        const {selectedIngredients} = this.state
        return <View style={(this.state.cancelToggle == false && this.state.searchToggle == true) ? styles.ingredientDownInput : styles.selectedIngredients} >
                    {
                        selectedIngredients.map((ingredient, i) => {
                            return <TouchableOpacity key={ingredient} style={styles.ingredient} onPress={this.deleteIngredientHandler}>
                               
                                    <Text key={ingredient} style={styles.ingredientTitle}>{ingredient}</Text>
                                    <Image 
                                            style={styles.deleteButton}
                                            source={require('./../../images/delete.png')}
                                        />    
                                
                                </TouchableOpacity>  
                        })
                        
                    }
                
                </View>
    }
    deleteIngredientHandler = (e) => {
        const {selectedIngredients} = this.state
        const value = e._dispatchInstances.child.child.key

        let deletedIngredients = selectedIngredients

        deletedIngredients = deletedIngredients.filter(ingredient => {
            return ingredient !== value
        })
        if(deletedIngredients.length === 0){
            this.setState({
                ...this.state,
                selectedIngredients: [],
                searchToggle: false
            })
        }else{
            this.setState({
                ...this.state,
                selectedIngredients: deletedIngredients,
                searchToggle: true
            })
        }
        
    }

    searchHandler = async () => {
        
        // Array.prototype.map.call(this.state.selectedIngredients, (ingredient) => {
        //     const result = fetch('http://localhost:3000/ingredients/getByIngredientName', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             ingredientName: ingredient,
        //         })
        //     })
        //     .then(res=> res.json())
        //     .then(res => {
        //         const id = res[0]._id
        //         this.setState(prevState => ({
        //             selectedIngredientIDs: [...prevState.selectedIngredientIDs, id]
        //         }))
        //     })
            
        // });
        const uniqueIDs = Array.prototype.filter.call(this.state.selectedIngredientIDs, (item, pos) => {
            return this.state.selectedIngredientIDs.indexOf(item) == pos;
        })

        this.props.navigation.navigate('Show Foods', {ingredients: uniqueIDs})

    }

    componentDidMount = async () => {
        this.setState({selectedIngredientIDs: []})
        const ingredients = await fetch('http://localhost:3000/ingredients', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(res=> res.json())
        
        ingredients.map(ingredient => {
            this.setState(prevState => ({
                ingredients: [...prevState.ingredients, ingredient]
            }))
        })
    }
    
    render(){
        return(
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={this.state.cancelToggle ? styles.bgSearchInput: styles.bgSearchInput2}>
                <View style={styles.inputView} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View styles={styles.inputContainer}>
                        <Animated.View style={{width: this.interpolateWidth, height: this.interpolateHeight, backgroundColor: this.interpolateBackgroundColor, paddingTop: this.interpolatePaddingTop}}>
                            <View style={styles.searchCancelView}>
                                <TextInput  style={styles.inputSearch} 
                                            ref={c => { this.textInput = c}}
                                            onPressIn={this.toggleSearchBox}
                                            placeholder={this.state.selectedIngredients.length>0 ? 'Click search button to see results!' : 'Tell us what you have!'}
                                            value={this.state.inputValue}
                                            onChangeText={this.onTextChanged}
                                            placeholderTextColor='#b1b1b3'
                                        />
                                            
                                <View style={styles.alignButtons}>
                                    <TouchableOpacity style={this.state.searchToggle ? styles.searchButtonTO : styles.hide} onPress={this.searchHandler}>
                                        <Image  
                                                style={styles.searchButton}
                                                source={require('./../../images/search.png')}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.addToggle ? styles.addButtonTO : styles.hide} onPress={this.addIngredientsHandler}>
                                        <Image  
                                                style={styles.addButton}
                                                source={require('./../../images/cancel.png')}
                                        />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={this.state.cancelToggle ? styles.cancelButtonTO : styles.hide} onPress={this.toggleCancel}>
                                        <Image  
                                                style={styles.cancelButton}
                                                source={require('./../../images/cancel.png')}
                                        />
                                    </TouchableOpacity>
                                   
                                    
                                </View>
                                
                            </View>
                            {this.renderSuggestions()}

                        </Animated.View>
                        {this.displaySelectedIngredients()}
                    </View>
                    </TouchableWithoutFeedback>
                    
                </View>
               
            </KeyboardAvoidingView>
        )
    }
}

