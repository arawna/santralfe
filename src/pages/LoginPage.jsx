import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginPage() {

    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log({userName,password})
        localStorage.setItem("token","abctoken")
        navigate("/")
    }

    useEffect(() => {
        if(localStorage.getItem("token") === "abctoken"){
            navigate("/")
        }
    },[navigate])

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}} className='bgColorDiv'>
        <div style={{backgroundColor:"#F7EEDD",width:"25vw",border:"2px solid #ACE2E1",borderRadius:"10px"}}>
            <div style={{padding:"20px"}}>
                <p style={{textAlign:"center",color:"#008DDA",fontWeight:"bold",fontSize:"20px"}}>Giriş Yap</p>
                <TextField 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    id="userName" 
                    label="Kullanıcı Adı" 
                    variant="outlined" 
                    style={{width:"100%",marginTop:"10px"}} 
                />
                <TextField 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password" 
                    label="Şifre" 
                    variant="outlined" 
                    type="password" 
                    style={{width:"100%",marginTop:"10px"}} 
                />
                <Button 
                    onClick={() => handleLogin()} 
                    style={{width:"100%", backgroundColor:"#008DDA",fontWeight:"bold",marginTop:"10px"}} 
                    variant="contained"
                >
                    Giriş Yap
                </Button>
            </div>
        </div>
    </div>
  )
}
