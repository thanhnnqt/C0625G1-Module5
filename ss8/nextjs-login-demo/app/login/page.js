'use client'
import { useRouter } from 'next/navigation'
import styles from './Login.module.css'

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formContent}>
                <h2 className='text-red-600'>Login</h2>
                <input className='text-green-400' type="text" placeholder="Username" />
                <input className='text-green-400' type="password" placeholder="Password" />
                <div>
                    <button className={styles.button} onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </div>
    );
}