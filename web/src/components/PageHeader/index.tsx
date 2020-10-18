import React from 'react'

import './styles.css'

import backIcon from '../../assets/images/icons/back.svg'
import logoIcon from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
    title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({title, children}) => {
    return (
        <header className='page-header'>
            <div id="top-bar">
                <Link to='/'><img src={backIcon} alt="voltar" id='back-icon'/></Link>
                <img src={logoIcon} alt="logo" id='logo-icon'/>
            </div>

            <div id='page-header-content'>
                <strong><h2>{title}</h2></strong>
                {children}
            </div>
        </header>
    )
}

export default PageHeader