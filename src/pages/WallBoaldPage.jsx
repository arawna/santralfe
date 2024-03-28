import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

export default function WallBoaldPage({queuList,agentList}) {

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
                    <TableCell>Bekleme Süresi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queuList.map((item,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.waitingNumber}
                      </TableCell>
                      <TableCell>{item.waitingCustomerName}</TableCell>
                      <TableCell>{item.queueName}</TableCell>
                      <TableCell>{item.waitingTime}</TableCell>
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
                  {agentList.map((item,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.connectionNumber}
                      </TableCell>
                      <TableCell>{item.connectionName}</TableCell>
                      <TableCell>{item.agentName}</TableCell>
                      <TableCell>{item.connectionTime}</TableCell>
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
