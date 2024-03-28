import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Papa from "papaparse";
import axios from "axios";

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
  let [arrayData, setArrayData] = useState([]);

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

  const handleUpload = () => {
    Papa.parse(file, {
      complete: function(results) {
        //console.log("Finished:", results.data.length);
        setArrayData(results.data)
      }}
    )
  }

  useEffect(() => {
    if(arrayData.length > 0){
      let dataList = [];
      arrayData.forEach((item) => {
        if(item.length > 1){
          dataList.push({
            Name: item[0],
            PhoneNumber: item[1],
            TC: item[2]
          })
        }
      })
      console.log(dataList)
      // api isteği burada gidecek
      axios.post("http://38.242.146.83:3001/insertCustomer",dataList).then((res) => {
        console.log(res.data)
        Swal.fire({
          icon:"success",
          text:"Yükleme başarılı"
        })
      }).catch((res) => {
        console.log(res)
      })
    }
  },[arrayData])

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
          <Button onClick={() => handleUpload()} variant="contained" style={{width:"500px",marginTop:"15px"}}>Yükle</Button>
        </div>
      </div>
    </div>
  );
}
