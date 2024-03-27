import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import AgentPage from './AgentPage';
import WallBoaldPage from './WallBoaldPage';
import CsvPage from './CsvPage';

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
        navigate("/login")
    }

    const reloadValues = () => {
        console.log("aaaaaaaaaaa")
        if (activePage === 'wallboard') {
        //   api.getAgentConnection().then(resp => {
        //     setResponse(resp.data.data);
        //   });
        console.log("istek gitti")
    
        }
    
        var agentConnectionTimeout = setTimeout(reloadValues, 5000);
        if (activePage !== 'wallboard') {
          clearTimeout(agentConnectionTimeout);
        }
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
                    <div onClick={() => handleChangeActivePage("wallboard")} className='leftMenuPage'>Duvar Sayfası</div>
                    <div onClick={() => handleChangeActivePage("csv")} className='leftMenuPage'>Csv Yükleme</div>
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
                            <WallBoaldPage/>
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
