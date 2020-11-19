import React, { useState, useContext } from 'react';
import "./Login.css";
import BlockchainContext from "./BlockchainContext.js";
import { useHistory, Link } from "react-router-dom";


function Login() {

    const history = useHistory();
    const {  web3, accounts, contract } = useContext(BlockchainContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async(e) => {
        e.preventDefault();
        const res = await contract.methods.loginCustomer(username,password).call({ from: accounts[0] });
        if(res){
            history.push('/home');
            alert('lets goo');
        }
        else{alert("username or password invalid")}
    }

    const register = async(e) => {
        e.preventDefault();
        const pes = await contract.methods.signUpCustomer(username,password).send({ from: accounts[0] } );
        if(pes) {
            history.push('/home');
            alert("Account successfully created...");
        }
        else{alert("cant create your id");}
        
    }

    

    return (
        <div className="login">
           <div className="bank__detail"> 
                <h1>G-BLOCKYBANK</h1>
                <p>New era and new technology of money transfer.</p>
            </div>
            <div className="login__container">
                <h1>Log In</h1>

                <form>
                    <h5>Username</h5>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="login__signInButton" onClick={signIn}>Sign-In</button>
                </form>

                <p>By Signing In you agree all the terms and conditions applied by the 
                    bank upon the user for the security of the details of the user.
                </p>

                <button onClick={register}>Create Account</button>
            </div>
        </div>
    )
}

export default Login 
