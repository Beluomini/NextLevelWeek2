import React from 'react';

import './styles.css';
import whatsIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/37910256?s=400&u=f942c595c5860fe4fc6bedd60cb72e3e95c04db2&v=4" alt="foto pessoal"/>
                <div>
                    <strong>Lucas Beluomini</strong>
                    <span>matematica</span>
                </div>
            </header>

            <p>
                skasasakaskaskaksakskaskaksasa
                sskaskaskaksakskakskkskaksas
                aaksaksaksakskaskaksaskaskas
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 4,00</strong>
                </p>
                <button type="button" >
                    <img src={whatsIcon} alt="contato"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;