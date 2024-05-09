import { useRef, useState } from "react"

const initialize ={
    name:"",
    sizevalue:""
}
const App = () => {
    const [data, setdata] = useState(initialize);
    const [qrdata, setqrdata] = useState("https://api.qrserver.com/v1/create-qr-code/?size=150x$150&data=welcome");
    const [load, setload] = useState(false);
    const element = useRef();

const dataChange = (e)=>{
    setdata({
        ...data,
        [e.target.name]:e.target.value
    })
}


const generatefunc = ()=>{
    setload(true);
    fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${data.sizevalue}x${data.sizevalue}&data=${data.name}`)
    .then((response)=>{
        return response.blob();
    })
    .then((blob)=>{
       const image = URL.createObjectURL(blob)
       setqrdata(image)
    })
    setload(false);
    setdata(initialize);
    element.current.focus();
}

const downloadQR = ()=>{
    const link = document.createElement("a");
    link.href=qrdata;
    link.download ="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


  return (
    <>
    <div  className="app-container">
        <h1>Generate QR code here!</h1>
        <img  src={qrdata} className="qr-image"/>
        {load && <p>loading...</p>}
        <div>
            <label htmlFor="dataInput" className="input-label">Data for QR code</label>
            <input type="text" id="dataInput"  name="name" value={data.name} placeholder="enter the data for QR code"  ref={element} onChange={dataChange}></input>
            <label htmlFor="sizeInput" className="input-label">Enter the Image size (e.g., 150)</label>
            <input type="text" id="sizeInput" name="sizevalue" value={data.sizevalue} placeholder="Enter the image size"  onChange={dataChange}></input>
            <button className="generate" onClick={generatefunc}>Generate QR code</button>
            <button className="download" onClick={downloadQR}>Download QR code</button>
        </div>
    </div>
    </>
  )
}

export default App