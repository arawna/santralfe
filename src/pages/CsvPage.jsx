import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


export default function CsvPage() {

  let [file,setFile] = useState();

  const MySwal = withReactContent(Swal)

  const handleSelectFile = (e) => {
    console.log(e.target.files[0])
    if(e.target.files[0].type !== "text/csv"){
      MySwal.fire({
        title: "Hata!!!",
        text: "Sadece csv uzantılı dosya yüklenebilir.",
        icon: 'error',
        confirmButtonText:"Tamam"
      })
      return;
    }
    setFile(e.target.files[0])
  }

  return (
    <div>
      <h1 style={{ marginLeft: "20px", paddingTop: "10px", color: "#008DDA" }}>
        Csv Yükleme
      </h1>
      <hr style={{ marginTop: "10px", borderColor: "#008DDA" }} />
      <div style={{padding:"10px"}}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          Dosya Seç
          <VisuallyHiddenInput onChange={(e) => handleSelectFile(e)} type="file" />
        </Button>
        {file && <span style={{marginLeft:"10px"}}><b>Seçilen Dosya:</b> {file.name}</span>}
        <div>
          <Button variant="contained" style={{width:"500px",marginTop:"15px"}}>Yükle</Button>
        </div>
      </div>
    </div>
  );
}
