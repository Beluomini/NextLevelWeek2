import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';

import TeacherItem, {Teacher} from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');
    const [week_day, setWeekDay] = useState('');

    const [teachers, setTeachers] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then( response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map( (teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFilttersSubmit(){

        loadFavorites();

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            }
        })

        setIsFiltersVisible(false);
        setTeachers(response.data);

    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys Disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible} >
                        <Feather name='filter' size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Materia</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria"
                            placeholderTextColor="#C1BCCC"
                        />

                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia da Semana"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual a hora do dia"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFilttersSubmit} style={styles.submitButton} >
                            <Text style={styles.submitButtonText} >Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>


            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {

                    return <TeacherItem 
                                key={teacher.id} 
                                teacher={teacher}
                                favorited={favorites.includes(teacher.id)}
                            />
                })}

            </ScrollView>
        </View>
    );
}

export default TeacherList;