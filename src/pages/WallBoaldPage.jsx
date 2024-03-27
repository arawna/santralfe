import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

export default function WallBoaldPage() {
  let [quieList, setQuieList] = useState([
    {
      phone: "05357845687",
      name: "Adnan Oktar",
      quieName: "Kuyruk1",
      startTime: "25.03.2024 17:53",
      waitTime: "00:34",
    },
    {
      phone: "05343534634",
      name: "Veli Velisoy",
      quieName: "Kuyruk1",
      startTime: "25.03.2024 17:43",
      waitTime: "00:43",
    },
    {
      phone: "05334346333",
      name: "Hakan Vural",
      quieName: "Kuyruk1",
      startTime: "25.03.2024 17:52",
      waitTime: "00:51",
    },
    {
      phone: "058693958473",
      name: "Volkan Demirel",
      quieName: "Kuyruk1",
      startTime: "25.03.2024 17:51",
      waitTime: "01:02",
    },
    {
      phone: "054674665837",
      name: "Müslüm Gürses",
      quieName: "Kuyruk1",
      startTime: "25.03.2024 17:49",
      waitTime: "01:15",
    },
  ]);

  let [callList,setCallList] = useState([
    {phone:"05784218942",callerName:"Hakkı Haklı",agentName:"Tuğba",startTime:"26.03.2024 17:42",duration:"01:18"},
    {phone:"05359677468",callerName:"Ayşe Nazlı",agentName:"İdil",startTime:"26.03.2024 17:39",duration:"03:42"},
    {phone:"05358473758",callerName:"Yılmaz Demirel",agentName:"Şule",startTime:"26.03.2024 17:37",duration:"04:34"},
  ])

  return (
    <div>
      <h1 style={{ marginLeft: "20px", paddingTop: "10px", color: "#008DDA" }}>
        Duvar Sayfası
      </h1>
      <hr style={{ marginTop: "10px", borderColor: "#008DDA" }} />
      <div style={{padding:"10px"}}>
        <Grid container spacing={1}>
          <Grid xs={6}>
            <div style={{textAlign:"center",backgroundColor:"#008DDA",padding:"5px",color:"#F7EEDD",fontWeight:"bold",borderRadius:"10px 10px 0px 0px"}}>Kuyruk Listesi</div>
            <TableContainer component={Paper} style={{borderRadius:"0px 0px 10px 10px"}}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Arayan No</TableCell>
                    <TableCell>Arayan İsim</TableCell>
                    <TableCell>Kuyruk Adı</TableCell>
                    <TableCell>Arama Başlangıç</TableCell>
                    <TableCell>Bekleme Süresi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quieList.map((item) => (
                    <TableRow key={item.phone}>
                      <TableCell component="th" scope="row">
                        {item.phone}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quieName}</TableCell>
                      <TableCell>{item.startTime}</TableCell>
                      <TableCell>{item.waitTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={6}>
            <div style={{textAlign:"center",backgroundColor:"#008DDA",padding:"5px",color:"#F7EEDD",fontWeight:"bold",borderRadius:"10px 10px 0px 0px"}}>Görüşme Listesi</div>
            <TableContainer component={Paper} style={{borderRadius:"0px 0px 10px 10px"}}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Arayan No</TableCell>
                    <TableCell>Arayan İsim</TableCell>
                    <TableCell>Agent Adı</TableCell>
                    <TableCell>Arama Başlangıç</TableCell>
                    <TableCell>Konuşma Süresi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {callList.map((item) => (
                    <TableRow key={item.phone}>
                      <TableCell component="th" scope="row">
                        {item.phone}
                      </TableCell>
                      <TableCell>{item.callerName}</TableCell>
                      <TableCell>{item.agentName}</TableCell>
                      <TableCell>{item.startTime}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
