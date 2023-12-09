import { ReactNode, ButtonHTMLAttributes } from 'react'
import { FaSpinner } from 'react-icons/fa'

import styles from './Button.module.scss'

interface ButtonAppProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean,
    children: ReactNode
}

export function ButtonApp({ isLoading, children, ...rest }: ButtonAppProps){
    return (
        <button
            className={styles.buttonApp}
            disabled={isLoading}
            {...rest}
        >
            {   
                isLoading ? (
                    <FaSpinner color='#FFF' size={16}/>
                ): (
                    <span className={styles.buttonAppText}>{children}</span>
                )
            }
            
        </button>
    )
}