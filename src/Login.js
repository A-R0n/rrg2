import React, {useReducer} from 'react';
import './Login.css';
import {login} from './utils';

function loginReducer(state, action) {
    switch (action.type) {
        case 'field': {
            return {
                ...state,
                [action.field]: action.value

            }
        }
        case 'login': {
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        }
        case 'success': {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        case 'error': {
            return {
                ...state,
                error: 'incorrect username or password',
                isLoading: false,
                username: '',
                password: ''
            }
        }
        case 'logout': {
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                username: '',
                password: ''
            }
        }
    
        default:
            break;
    }
    return state;
}

const initialState = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false
};

export default function Login(){
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const {username, password, isLoading, error, isLoggedIn} = state;
    const onSubmit = async e => {
        e.preventDefault();

        dispatch({type: 'login'});

        try {
            await login({ username, password });
            dispatch({type: 'success'});
        } catch(error){
            dispatch({type: 'error'})
        }
    };

    return (
        <div className="Login">
            <div className="login-container">
                {isLoggedIn ? (
                 <>
                    <div className="greetings">Greetings {username}</div>{' '}
                    <button onClick={()=>dispatch({type: 'logout'})}>Log out</button>
                </>
                ) :
                <form className='loginForm' onSubmit={onSubmit}>
                    <p className="pleaseLogin">Login</p>
                    <input
                        id='username'
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => dispatch({type: 'field', field: 'username', value: e.currentTarget.value})}></input>
                    <input 
                        id='password'
                        type="password"
                        placeholder="password"
                        autocomplete="new-password"
                        value={password}
                        onChange={e => dispatch({type: 'field', field: 'password', value: e.currentTarget.value})}>
                    </input>
                    {error && <p className="error">{error}</p>}
                    <button id="loginButton" type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Submit"}
                    </button>
                </form>}
            </div>
        </div>
    )

}