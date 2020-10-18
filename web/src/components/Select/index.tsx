import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    name: string,
    label: string,
    title: string
}
const Select: React.FC<SelectProps> = ({name, label, title, children, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select {...rest}>
                <option selected hidden disabled>{title}</option>
                {children}
            </select>
        </div>
    )
}

export default Select