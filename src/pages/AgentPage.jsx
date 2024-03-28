import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { socket } from '../socket';
import { Button } from "@mui/material";

export default function AgentPage() {
  let [caller, setCaller] = useState({
    name: "",
    surName: "",
    phone: "",
    tc: "",
    note: "",
  });

  let [joined,setJoined] = useState(false);

  useEffect(() => {
    if(!joined){
      socket.emit("joinRoom", localStorage.getItem("token"));
      setJoined(true)
    }
  },[joined])

  socket.on("receiveMessage", (data) => {
    console.log(data)
    setCaller({
      name:data.callerName || "",
      surName:data.callerName || "",
      phone:data.callerNumber || "",
      tc:data.tc || "",
      note:data.note || ""
    })
  })

  return (
    <div>
      <h1 style={{marginLeft:"20px",paddingTop:"10px",color:"#008DDA"}}>Agent Sayfası</h1>
      <hr style={{marginTop:"10px",borderColor:"#008DDA"}}/>
      <div style={{ padding: "10px" }}>
        <Grid container>
          <Grid xs={6}>
            <div style={{padding:"10px"}}>
                <TextField
                disabled
                id="name"
                label="Ad"
                value={caller.name}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
          <Grid xs={6}>
            <div style={{padding:"10px"}}>
                <TextField
                disabled
                id="surName"
                label="Soy Ad"
                value={caller.surName}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
          <Grid xs={6}>
            <div style={{padding:"10px"}}>
                <TextField
                disabled
                id="phone"
                label="Telefon Numarası"
                value={caller.phone}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
          <Grid xs={6}>
            <div style={{padding:"10px"}}>
                <TextField
                disabled
                id="tc"
                label="Tc Numarası"
                value={caller.tc}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
          <Grid xs={12}>
            <div style={{padding:"10px"}}>
                <TextField
                multiline
                rows={4}
                id="note"
                label="Not"
                value={caller.note}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
        </Grid>
        <div style={{marginLeft:"7px"}}>
          <Button variant="contained">
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
