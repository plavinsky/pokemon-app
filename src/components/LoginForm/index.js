import { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';
import InputPretty from "../InputPretty";
import s from "./style.module.css";

const LoginForm = ({isOpen, onSubmitLoginForm}) => {
    
    const [isRegister, setIsRegister] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const hanleLoginClick = async (e) => {
        e.preventDefault();

        //console.log("values:", {email, password});

        //onSubmitLoginForm && onSubmitLoginForm({email, password});
        if (isRegister)
        {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecurityToken: true
                })
            }
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw', requestOptions).then(res => res.json());
            console.log("response:", response);
            if (response.hasOwnProperty('error'))
            {
                NotificationManager.error(response.error.message, "Worng!")
            }
            else {
                NotificationManager.success("SignUp successfully!")
            }
        }
        else {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecurityToken: true
                })
            }
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw', requestOptions).then(res => res.json());
            console.log("response:", response);

            if (response.hasOwnProperty('error'))
            {
                NotificationManager.error(response.error.message, "Worng!")
            }
            else {
                NotificationManager.success("SignIn successfully!")
                localStorage.setItem('idToken', response.idToken);           
            }
        }


        
        
    }

    useEffect(() => {
        setEmail('');
        setPassword('');
    },[isOpen])

    

    return (
        <form
            onSubmit={hanleLoginClick}>
            <InputPretty
                name="emInput"
                type="text"
                label="E-mail"
                value={email}
                onChange={(val) => setEmail(val)}
                required
            />
            <InputPretty
                name="pasInput"
                type="password"
                label="password"
                value={password}
                onChange={(val) => setPassword(val)}
                required
            />
            <div className={s.wrapper}>
                <button >
                {isRegister ? "Register!" : "Login?"}
                </button>
                
                <span className={s.question}
                onClick={() => setIsRegister(prevState => !prevState)}>
                    {isRegister ? "Login?" : "Register?"}
                </span>
            </div>
            
        </form>
    );
};

export default LoginForm;