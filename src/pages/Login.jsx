import { useState } from "react";
import {useLogin} from "../hooks/useLogin"
import {useGoogle} from "../hooks/useGoogle"
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'


function Login(){
    const navigate = useNavigate()
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error}= useLogin();

    const {google} = useGoogle();

    const handleSubmit= async (e)=>{
         e.preventDefault();
         await login(email, password);
    }

    const handleClick = async() => {
        window.open('https://expensebuddybackend.onrender.com/api/user/auth/google', '_self')
    }

    
    //conditional styling for light, dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return(
        <>
        <form className={`login ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`} onSubmit={handleSubmit}> 
            <h1 id = "label" className = "flex flex-wrap justify-center text-3xl font-light">Login</h1>

            <TextField 
                className = "w-full"
                id="outlined-basic" 
                label="Email" 
                variant="outlined"
                type="email"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                size="small"
            />
            <br></br>
            <br></br>
            <TextField 
                className = "w-full"
                id="outlined-basic" 
                label="Password" 
                variant="outlined"
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                size="small"
            />
            <br></br>
            <br></br>
             <button className = "my-5" disabled= {isLoading}>Login</button>
             {error && <div className="error">{error}</div>}
        </form>
        <div className = {`flex flex-wrap justify-center items-center font-semibold ${isDarkMode ? 'text-white' : 'text-gray-600'}`}>
            Don't have an Account? 
            <div className="mx-2 text-white">
            <Button variant="contained" onClick = {() => navigate('/signup')}>Sign Up</Button>
            </div>
        </div>
        <div className="flex flex-wrap justify-center my-4 text-white">
            <GoogleButton variant="contained" onClick = {handleClick}/>
        </div>
        </>
    )
}

export default Login;