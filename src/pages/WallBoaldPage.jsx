import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

export default function WallBoaldPage({queuList,agentList,queuAmount}) {

  return (
    <div>
      <h1 style={{ marginLeft: "20px", paddingTop: "10px", color: "#008DDA" }}>
        Duvar Sayfası
      </h1>
      <hr style={{ marginTop: "10px", borderColor: "#008DDA" }} />
      <div style={{padding:"10px"}}>
        <div style={{textAlign:"center",fontSize:"18px",fontWeight:"600",marginBottom:"10px",color:"#008DDA"}} >Kuruk Sayısı: {queuAmount}</div>
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
                    <TableCell>Bekleme Süresi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queuList.map((item,index) => (
                    <TableRow key={index} style={item.waitingNumber !== "-" ? {backgroundColor:"orange"} : {}}>
                      <TableCell style={{padding:"2px"}} component="th" scope="row">
                        {item.waitingNumber}
                      </TableCell>
                      <TableCell style={{padding:"2px"}}>{item.waitingCustomerName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.queueName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.waitingTime !== "-" ? item.waitingTime.slice(0,-8) : item.waitingTime}</TableCell>
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
                    <TableCell>Konuşma Süresi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agentList.filter(item => item.connectionNumber !== "-").map((item,index) => (
                    <TableRow key={index} style={{backgroundColor:"#90D26D"}}>
                      <TableCell style={{padding:"2px"}} component="th" scope="row">
                        {item.connectionNumber}
                      </TableCell>
                      <TableCell style={{padding:"2px"}}>{item.connectionName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.agentName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.connectionTime.slice(0,-8)}</TableCell>
                    </TableRow>
                  ))}
                  {agentList.filter(item => item.connectionNumber === "-").map((item,index) => (
                    <TableRow key={index}>
                      <TableCell style={{padding:"2px"}} component="th" scope="row">
                        {item.connectionNumber}
                      </TableCell>
                      <TableCell style={{padding:"2px"}}>{item.connectionName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.agentName}</TableCell>
                      <TableCell style={{padding:"2px"}}>{item.connectionTime}</TableCell>
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
