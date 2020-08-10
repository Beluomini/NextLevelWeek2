import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import api from '../../services/Api',

function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(()=>{
        api.get('/connections').then(response => {

            const {total} = response.data;

            setTotalConnections(total);
        })
    }, []);

    const {navigate} = useNavigation();

    function handleNavigateGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToPages(){
        navigate('Study');
    }

    return(

        <View style={styles.container} >
            <Image style={styles.banner} source={landingImg} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>

                <RectButton onPress={handleNavigateToPages} style={[styles.button, styles.buttonPrimary]} >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText} >Estudar</Text>
                </RectButton>
                
                <RectButton onPress={handleNavigateGiveClassesPage} style={[styles.button, styles.buttonSecondary]} >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText} >Dar aulas</Text>
                </RectButton>

            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexoes {' '}
                <Image source={heartIcon} />
            </Text>

        </View>

    )
}

export default Landing;