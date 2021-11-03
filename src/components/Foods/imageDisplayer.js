import React, {useEffect} from 'react';
import {Image} from 'react-native'
import styles from './Foods.scss'
export default function ImageDisplayer(props) {

    const path = props.default != 1 ? props.path : 'http://localhost:8081/' + props.path;
    
    return ( 
        <Image
            style={styles.foodCoverImage}
            source={{uri: path}} 
        />
    );
}