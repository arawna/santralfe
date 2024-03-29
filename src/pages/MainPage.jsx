import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import AgentPage from './AgentPage';
import WallBoaldPage from './WallBoaldPage';
import CsvPage from './CsvPage';
import axios from 'axios';

export default function MainPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
    },[navigate])

    useEffect(() => {
        reloadValues()
    },[])

    let [activePage, setActivePage] = useState("agentpage");

    const handleChangeActivePage = (pageName) => {
        setActivePage(pageName);
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
    }

    let [queuList,setQueuList] = useState([]);
    let [agentList,setAgentList] = useState([]);

    let [queuAmount,setQueuAmount] = useState(0);

    const reloadValues = () => {
        if (activePage === 'wallboard') {
        //   api.getAgentConnection().then(resp => {
        //     setResponse(resp.data.data);
        //   });
        
    
        }
        if(localStorage.getItem("role") === "admin"){
            axios.post("http://38.242.146.83:3001/getActiveQueueConnection").then((res) => {
                setQueuList(res.data)
                setQueuAmount(res.data.filter(item => item.waitingCustomerName !== "-").length)
            })
            axios.post("http://38.242.146.83:3001/getActiveAgentConnection").then((res) => {
                setAgentList(res.data)
            })
        }
        
        var agentConnectionTimeout = setTimeout(reloadValues, 5000);
        // if (activePage !== 'wallboard') {
        //   clearTimeout(agentConnectionTimeout);
        // }
    };

  return (
    <div>
        <Grid container>
            <Grid xs={2}>
                <div className='leftMenu' style={{minHeight:"100vh",borderRight:"2px solid #41C9E2"}}>
                    <h1 className='logoText' style={{textAlign:"center",color:"#F7EEDD",paddingTop:"2px"}}>Quinn Soft</h1>
                    <Grid container>
                        <Grid xs={1}></Grid>
                        <Grid xs={10}>
                            <div style={{border:"1px solid #008DDA"}}></div>
                        </Grid>
                        <Grid xs={1}></Grid>
                    </Grid>
                    {localStorage.getItem("role") === "admin" && <div onClick={() => handleChangeActivePage("wallboard")} className='leftMenuPage'>Duvar Sayfası</div>}
                    {localStorage.getItem("role") === "admin" && <div onClick={() => handleChangeActivePage("csv")} className='leftMenuPage'>Csv Yükleme</div>}
                    <div onClick={() => handleChangeActivePage("agentpage")} className='leftMenuPage'>Agent Menü</div>
                    <div style={{marginTop:"20px",paddingLeft:"10px",paddingRight:"10px"}}>
                        <div onClick={() => handleLogOut()} style={{backgroundColor:"#E72929",textAlign:"center",padding:"10px",borderRadius:"7px",fontWeight:600,color:"#F7EEDD",cursor:"pointer"}}>
                            Çıkış Yap
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid xs={10}>
                <div style={{backgroundColor:"#F7EEDD",minHeight:"100vh"}}>
                    {activePage === "wallboard" && 
                        <div>
                            <WallBoaldPage queuList={queuList} agentList={agentList} queuAmount={queuAmount} />
                        </div>
                    }
                    {activePage === "csv" && 
                        <div>
                            <CsvPage/>
                        </div>
                    }
                    {activePage === "agentpage" && 
                        <div>
                            <AgentPage/>
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    </div>
  )
}
