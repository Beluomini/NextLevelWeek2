import React, {useState, FormEvent} from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItens, setScheduleItens] = useState([
        { week_day: 0, from: '', to:''}
    ]);

    function addNewScheduleItem(){
        setScheduleItens([
            ...scheduleItens,
            {week_day: 0, from: '', to:''}
        ]);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens,

        }).then(()=>{
            alert('Cadastro realizado com sucesso')
        }).catch(()=>{
            alert('Erro no cadastro!')
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItens = scheduleItens.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });

        setScheduleItens(updatedScheduleItens)
    }

    return(
        <div id="page-teacher-form" className="container">
           <PageHeader 
            title="Que incrivel que voce quer dar aulas"
            description="o primeiro passo é preencher esse formulário"    
            />
            <main>
                <form onSubmit={handleCreateClass}>

                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input name="name" label="Nome Completo" value={name} 
                                onChange={(e) => { setName(e.target.value) }} 
                        />

                        <Input name="avatar" label="Avatar" value={avatar}
                                onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input name="whatsapp" label="Whatsapp" value={whatsapp}
                                onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <TextArea name="bio" label="biografia" value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                        />  

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>

                        <Select 
                            name="subject" label="Materia" 
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matematica', label: 'Matematica' },
                                { value: 'Fisica', label: 'Fisica' },
                                { value: 'Geografia', label: 'Geografia' },
                            ]}
                        />


                        <Input name="cost" label="Custo da aula por hora" value={cost}
                                onChange={(e) => { setCost(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horario
                            </button>
                        </legend>

                        {scheduleItens.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" label="Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda' },
                                            { value: '2', label: 'Terça' },
                                            { value: '3', label: 'Quarta' },
                                            { value: '4', label: 'Quinta' },
                                            { value: '5', label: 'Sexta' },
                                            { value: '6', label: 'Sabado' },
                                        ]}
                                    />

                                    <Input name="from" label="Das" type="time" value={scheduleItem.from}
                                            onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }}
                                    />
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to}
                                            onChange={(e) => { setScheduleItemValue(index, 'to',e.target.value) }}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar todos os dados
                        </button>
                    </footer>
                </form>
            </main>
       </div>
    )
}

export default TeacherForm;