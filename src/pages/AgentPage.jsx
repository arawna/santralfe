import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { socket } from '../socket';
import { Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function AgentPage() {
  let [caller, setCaller] = useState({
    name: "",
    surName: "",
    phone: "",
    tc: "",
    payment: "",
    Id: null
  });
  let [note,setNote] = useState("");

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
      payment: data.payment || "",
      Id: data.Id || null
    })
    setNote(data.note)
  })

  const handleSave = () => {
    if(caller.Id){
      axios.post("http://38.242.146.83:3001/updateNote",{
        Id:caller.Id,
        Note:note
      }).then((res) => {
        Swal.fire({
          icon:"success",
          text:"Kayıt yapıldı"
        })
      })
    }else{
      Swal.fire({
        icon:"error",
        text:"Boş kayıt yapılamaz"
      })
    }
    
  }

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
                id="payment"
                label="Ödeme"
                value={caller.payment}
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ width: "100%", marginTop:"10px"}}
                />
            </div>
          </Grid>
        </Grid>
        <div style={{marginLeft:"7px"}}>
          <Button onClick={() => handleSave()} variant="contained">
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
