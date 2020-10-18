import React, {useState, FormEvent} from 'react'

import {useHistory} from 'react-router-dom'

import PageHeader from '../../components/PageHeader'

import './styles.css'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [cost, setCost] = useState('')
    
    const [subject, setSubject] = useState('')
    const [schedule, setSchedule] = useState([{
        week_day: '',
        from: '',
        to: ''
    }])

    function addSchedule() {
        setSchedule([
            ...schedule,
            {week_day: '', from: '', to: ''}
        ])
    }

    function changeSchedule(index: number, name: string, value: string) {
        const updatedSchedule = schedule.map((item, scheduleIndex) => {
            if(index == scheduleIndex) {
                return {...item, [name]: value}
            }

            return item
        })

        setSchedule(updatedSchedule)
    }

    async function handlePostData(e: FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            bio,
            whatsapp,
            cost,
            subject,
            schedule,
        }).then(response => {
            alert('CADASTRADO COM SUCESSO')
            history.push('/')
        }).catch(err => console.log(err))
    }

    return (
        <div id='teacher-form'>
            <PageHeader title='Que incrível que você quer dar aulas'>
                <p>O primeiro passo é preencher esses formulário de inscrição</p>
            </PageHeader>

            <div id='teacher-form-content'>
                <main>
                    <form action="" id='form' onSubmit={handlePostData}>
                        <fieldset>
                            <legend>Seus dados</legend>
                            <Input 
                                name='name' 
                                label='Nome completo' 
                                value={name} 
                                onChange={(e) => {setName(e.target.value)}} 
                            />
                            <Input 
                                name='avatar'
                                label='Avatar' 
                                value={avatar} 
                                onChange={(e) => {setAvatar(e.target.value)}}
                            />
                            <Textarea 
                                name='bio' 
                                label='Biografia' 
                                value={bio} 
                                onChange={(e) => {setBio(e.target.value)}}
                            />
                            <Input 
                                name='whatsapp' 
                                label='Whatsapp' 
                                value={whatsapp} 
                                onChange={(e) => {setWhatsapp(e.target.value)}}
                            />
                        </fieldset>
    
                        <fieldset>
                            <legend>Sobre a aula</legend>
                            <Select 
                                name='subject'
                                type='text'
                                label='Matéria'
                                title='Selecione a matéria'
                                id='subject'
                            
                                onChange={(e) => {setSubject(e.target.value)}}
                            >
                                <option value="Português">Português</option>
                                <option value="História">História</option>
                                <option value="Geografia">Geografia</option>
                                <option value="Inglês">Inglês</option>
                                <option value="Matemática">Matemática</option>
                            </Select>
                            <Input 
                                name='cost' 
                                label='Custo da sua hora por aula' 
                                id='cost' 
                                value={cost} 
                                onChange={(e) => {setCost(e.target.value)}}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>
                                Horários disponíveis
                                <button onClick={addSchedule} type='button'>+ Novo horário</button>
                            </legend>
                            {schedule.map((item, index) => {
                                return (
                                    <div className="schedule-block">
                                        <Select 
                                            name='subject'
                                            type='text'
                                            label='Matéria'
                                            title='Selecione o dia'
                                            value={item.week_day}
                                            onChange={(e) => {changeSchedule(index, 'week_day', e.target.value)}}
                                        >
                                            <option value="1">Segunda-Feira</option>
                                            <option value="2">Terça-Feira</option>
                                            <option value="3">Quarta-Feira</option>
                                            <option value="4">Quinta-Feira</option>
                                            <option value="5">Sexta-Feira</option>
                                            <option value="6">Sábado</option>
                                            <option value="0">Domingo</option>
                                        </Select>
                                        <Input name='from' value={item.from} label='Das' type='time' onChange={(e) => {changeSchedule(index, 'from', e.target.value)}}/>
                                        <Input name='to' value={item.to} label='Até' type='time' onChange={(e) => {changeSchedule(index, 'to', e.target.value)}}/>
                                    </div>
                                )
                            })}
                        </fieldset>
                        <footer className="submit-area">
                            <p>
                                <img src={warningIcon} alt="aviso"/>
                                Importante! <br/> Preencha todos os dados
                            </p>
    
                            <button type='submit' className='submit-button'>Cadastrar</button>
                        </footer>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default TeacherForm