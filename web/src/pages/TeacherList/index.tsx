import React, {useState, FormEvent} from 'react'

import Input from '../../components/Input'
import Select from '../../components/Select'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import TeacherItem, {TeacherItemProps} from '../../components/TeacherItem'
import api from '../../services/api'

function TeacherList() {
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([]) 

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        api.get('/classes', {
            params: {
                subject,
                week_day,
                time,
            }
        }).then(response => {
            setTeachers(response.data)
        })
    }

    return (
        <div id="teacher-list">
            <PageHeader title='Este são os proffys disponíveis'>
                <form action="" className="filter" onSubmit={handleSubmit}>
                    <Select 
                        name='subject'
                        type='text'
                        label='Matéria'
                        title='Selecione a matéria'
                        onChange={(e) => {setSubject(e.target.value)}}
                    >
                        <option value="Português">Português</option>
                        <option value="História">História</option>
                        <option value="Geografia">Geografia</option>
                        <option value="Inglês">Inglês</option>
                        <option value="Matemática">Matemática</option>
                    </Select>

                    <Select 
                        name='subject'
                        type='text'
                        label='Dia da semana'
                        title='Selecione o dia'
                        onChange={(e) => {setWeek_day(e.target.value)}}
                    >
                        <option value="1">Segunda-Feira</option>
                        <option value="2">Terça-Feira</option>
                        <option value="3">Quarta-Feira</option>
                        <option value="4">Quinta-Feira</option>
                        <option value="5">Sexta-Feira</option>
                        <option value="6">Sábado</option>
                        <option value="0">Domingo</option>
                    </Select>

                    <Input 
                        name='time'
                        type='time'
                        label='Horário'
                        onChange={(e) => {setTime(e.target.value)}}
                    />

                    <button type='submit' className='submit-button'>Buscar</button>
                </form>
            </PageHeader>

            <div className='teacher-list-area'>
                {teachers.map((teacher: TeacherItemProps, index) => {
                    return (
                        <TeacherItem
                            key={index}
                            name={teacher.name}
                            subject={teacher.subject}
                            avatar={teacher.avatar}
                            whatsapp={teacher.whatsapp}
                            bio={teacher.bio}
                            cost={teacher.cost}
                            id={teacher.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TeacherList