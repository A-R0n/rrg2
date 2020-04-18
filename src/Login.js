import React, {useCallback, useContext} from 'react';
import {withRouter, Redirect} from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import './Login.css';

const Login = ({history}) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                    history.push("/");
            } catch (error) {
                alert(error);
            }
        }, [history]);

        const { currentUser} = useContext(AuthContext);

        if (currentUser) {
            return <Redirect to ="/" />;
        }

        return (
            <div className="login-form-container">
                <h1 id="login-form-title">Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <label>
                        Email
                        <input id="login-form-email" name="email" type="email" placeholder="email"></input>
                    </label>
                    <label>
                        Password
                        <input id="login-form-password" name="password" type="password" placeholder="password"></input>
                    </label>
                    <button id="login-form-submit-button" type="submit">
                        Submit
                    </button>
                    <button id="login-form-forgot-password-button">
                        Forgot your password
                    </button>
                </form>
            </div>
        );        
};

export default withRouter(Login);
