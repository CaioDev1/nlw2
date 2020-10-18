import React from 'react'

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'

export interface TeacherItemProps {
    name: string,
    subject: string,
    avatar: string,
    bio: string,
    cost: string,
    whatsapp: string,
    id: string
}

const TeacherItem: React.FC<TeacherItemProps> = ({name, subject, avatar, bio, cost, whatsapp, id}) => {
    function newConnection() {
        api.post('/connections', {
            user_id: id
        }).then(response => {
            console.log('connection created.')
        }).catch(err => console.log('error while trying to create new connection'))
    }

    return (
        <div className="teacher-item">
            <header className='teacher-item-header'>
                <img src={avatar} alt="avatar"/>
                <div className="teacher-item-header-info">
                    <p>{name}</p>
                    <span>{subject}</span>
                </div>
            </header>

            <p>{bio}</p>

            <div className="teacher-item-footer">
                <p>
                    Preço/Hora
                    <span>R$ {cost},00</span>
                </p>
                <a target='_blank' href={`https://wa.me/${whatsapp}`}>
                    <img src={whatsappIcon} alt="whatsapp" onClick={newConnection}/>
                    Entrar em contato
                </a>
            </div>
        </div>
    )
}


export default TeacherItem