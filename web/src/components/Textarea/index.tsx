import React, { InputHTMLAttributes } from 'react'

import './styles.css'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{
    name: string,
    label: string,
}

const Textarea: React.FC<TextAreaProps> = ({name, label, ...rest}) => {
    return (
        <div className='textarea-block'>
            <label htmlFor={name}>{label}</label>
            <textarea name={name} {...rest}>
            </textarea>
        </div>
    )
}

export default Textarea