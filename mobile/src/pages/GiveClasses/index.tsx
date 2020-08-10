import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import bgImg from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';

function GiveClasses(){

    const {goBack} = useNavigation();

    function handleNavigateBack(){
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground resizeMode="contain" source={bgImg} style={styles.content} >
                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>
                <Text style={styles.description}>
                    Para se cadastrar voce deve acessar a plataforma web
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>
                    Tudo bem
                </Text>
            </RectButton>

        </View>
    );
}

export default GiveClasses;