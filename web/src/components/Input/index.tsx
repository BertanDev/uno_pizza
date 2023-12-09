import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

import styles from './Input.module.scss'

interface InputAppProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaAppProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function InputApp({...rest}: InputAppProps){
    return (
        <input className={styles.inputApp} {...rest}/>
    )
}

export function TextAreaApp({...rest}: TextAreaAppProps){
    return (
        <textarea className={styles.inputApp} {...rest}></textarea>
    )
}