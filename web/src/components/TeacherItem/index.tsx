import React from 'react';

import './styles.css';
import whatsIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher{
    name: string,
        avatar: string,
        bio: string,
        cost: number,
        id: number,
        subject: string,
        whatsapp: string,
}

interface TeacherItemsProps{
    teacher: Teacher,
}

const TeacherItem: React.FC<TeacherItemsProps> = ({teacher}) => {

    function createNewConnection (){
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="foto pessoal"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a  rel="noopener noreferrer" target="_blank" 
                    onClick={createNewConnection}
                    href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsIcon} alt="contato"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;