import React, {useEffect} from 'react';
import {Image} from 'react-native'
import styles from './Foods.scss'
export default function ImageDisplayer(props) {
    return ( 
        <Image
            style={styles.foodCoverImage}
            source={{uri: 'http://localhost:8081/'+props.path}} 
        />
    );
}