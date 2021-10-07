import { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../store/user";
import InputPretty from "../InputPretty";
import s from "./style.module.css";

const loginSignUpResponse = async (isReg, email, password) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecurityToken: true
        })
    }
    
    if (isReg)
        return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw', requestOptions).then(res => res.json());

    return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw', requestOptions).then(res => res.json());
}


const LoginForm = ({isOpen, onSubmitLoginForm}) => {
    
    const [isRegister, setIsRegister] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const hanleLoginClick = async (e) => {
        e.preventDefault();

        const response = await loginSignUpResponse(isRegister, email, password);
        console.log("response",response);

        if (response.hasOwnProperty('error'))
        {
            NotificationManager.error(response.error.message, "Worng!")
        }
        else {
            if (isRegister)
            {
                const pokemonsResponse = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                console.log("pokemonsResponse", pokemonsResponse)

                pokemonsResponse?.data.forEach(element => {
                    fetch(`https://pokemon-game-2bc55-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(element)
                    })
                });
            }
            
            NotificationManager.success("SignIn successfully!")
            localStorage.setItem('idToken', response.idToken);
            dispatch(getUserAsync());
             
            
            onSubmitLoginForm && onSubmitLoginForm();
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
                <button 
                disabled={email === '' || password === ''}>
                {isRegister ? "Register!" : "Login!"}
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