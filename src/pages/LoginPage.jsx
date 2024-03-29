import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from 'sweetalert2';

export default function LoginPage() {

    let [userName,setUserName] = useState("");
    let [password,setPassword] = useState("");

    let [passwordRepead,setPasswordRepead] = useState("");

    let [registerState,setRegisterState] = useState(false);

    const navigate = useNavigate();

    const handleLogin = () => {
        console.log({userName,password})
        axios.post("http://38.242.146.83:3001/login",{
            Name: userName,
            Password: password
        }).then((res) => {
            console.log(res.data)
            if(res.data.loginStatus === true){
                localStorage.setItem("role",res.data.role)
                localStorage.setItem("token",userName)
                navigate("/")
            }
        }).catch((res) => {
            console.log(res.response.data)
            Swal.fire({
                icon:"error",
                title:"Hata!",
                text:"Kullanıcı adı yada şifre hatalı"
            });
        })

    }

    const handleRegister = () => {
        if(userName && password && passwordRepead){
            if(password !== passwordRepead){
                Swal.fire({icon:"error",text:"Şifreler eşleşmiyor"})
            }else{
                axios.post("http://38.242.146.83:3001/RegisterAgent",{
                    AgentNumber: userName,
                    AgentPassword: password
                }).then((res) => {
                    console.log(res)
                    if(!res.data.registerState){
                        Swal.fire({icon:"error",text:res.data.registerMessage})
                    }else{
                        Swal.fire({icon:"success",text:"Kayıt Başarılı"})
                        setRegisterState(false)
                    }
                }).catch((res) => {
                    Swal.fire({icon:"error",text:"Bir hata oluştu"})
                })
            }
        }else{
            Swal.fire({icon:"error",text:"Gerekli alanları doldurunuz"})
        }
        
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/")
        }
    },[navigate])

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}} className='bgColorDiv'>
        <div style={{backgroundColor:"#F7EEDD",width:"25vw",border:"2px solid #ACE2E1",borderRadius:"10px"}}>
            <div style={{padding:"20px"}}>
                {!registerState && <p style={{textAlign:"center",color:"#008DDA",fontWeight:"bold",fontSize:"20px"}}>Giriş Yap</p>}
                {registerState && <p style={{textAlign:"center",color:"#008DDA",fontWeight:"bold",fontSize:"20px"}}>Kayıt Ol</p>}
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
                {registerState && <TextField 
                    value={passwordRepead} 
                    onChange={(e) => setPasswordRepead(e.target.value)} 
                    id="password" 
                    label="Şifre Tekrar" 
                    variant="outlined" 
                    type="password" 
                    style={{width:"100%",marginTop:"10px"}} 
                />}
                {!registerState && <Button 
                    onClick={() => handleLogin()} 
                    style={{width:"100%", backgroundColor:"#008DDA",fontWeight:"bold",marginTop:"10px"}} 
                    variant="contained"
                >
                    Giriş Yap
                </Button>}
                {registerState && <Button 
                    onClick={() => handleRegister()} 
                    style={{width:"100%", backgroundColor:"#008DDA",fontWeight:"bold",marginTop:"10px"}} 
                    variant="contained"
                >
                    Kayıt Ol
                </Button>}
                {!registerState && <p onClick={() => setRegisterState(true)} style={{textAlign:"center",textDecoration:"underline",marginTop:"10px",cursor:"pointer"}}>Kayıt Ol</p>}
                {registerState && <p onClick={() => setRegisterState(false)} style={{textAlign:"center",textDecoration:"underline",marginTop:"10px",cursor:"pointer"}}>Giriş Yap</p>}
            </div>
        </div>
    </div>
  )
}
