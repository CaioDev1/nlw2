import React, { useState, useEffect } from 'react'

import {Link} from 'react-router-dom'

import './styles.css'

import proffy from '../../assets/images/logo.svg'
import landing from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections').then(response => {
            setTotalConnections(response.data)
        })
        .catch(err => console.log(err))
    })

    return (
        <div id='page-landing'>
            <div id='page-landing-content' className='container'>
                <div className="BrandTitle">
                    <img src={proffy} alt="logo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                
                <img className='hero-image' src={landing} alt="landing-photo"/>
    
                <h2>Seja bem vindo. <br/> <span>o que deseja fazer?</span></h2>
                
                <div className="LandingButtons">
                    <Link to='/teacherlist' id='StudyButton'>
                        <img src={studyIcon} alt=""/>
                        Estudar
                    </Link>
    
                    <Link to='/teacherform' id='GiveClassesButton'>
                        <img src={giveClassesIcon} alt=""/>
                        Dar aulas
                    </Link>
                </div>
    
                <span className="TotalConnections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt='coração roxo'/>
                </span>
            </div>
        </div>
    )
}

export default Landing