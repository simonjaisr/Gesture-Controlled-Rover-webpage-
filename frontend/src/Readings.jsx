import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Readings(){

const navigate = useNavigate();
const [data,setData] = useState([]);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async ()=>{
const res = await axios.get("http://localhost:5000/api/sensor");
setData(res.data.slice(-20).reverse());
};

const latest = data[0] || {};

return(

<div className="readingsContainer">

<div className="topBar">

<h1>📊 Last 20 Sensor Readings</h1>

<button className="btnBack" onClick={()=>navigate("/")}>
⬅ Back to Dashboard
</button>

</div>

{/* SUMMARY CARDS */}

<div className="summaryCards">

<div className="summaryCard tempCard">

<h3>Temperature</h3>

<h2>{latest.field1 ? Number(latest.field1).toFixed(1) : "--"} °C</h2>

</div>

<div className="summaryCard humCard">

<h3>Humidity</h3>

<h2>{latest.field2 ? Number(latest.field2).toFixed(1) : "--"} %</h2>

</div>

<div className="summaryCard gasCard">

<h3>Gas Level</h3>

<h2>{latest.field3 ? Number(latest.field3).toFixed(0) : "--"}</h2>

</div>

</div>

{/* TABLE */}

<div className="tableContainer">

<table className="sensorTable">

<thead>

<tr>

<th>Time</th>
<th>Temperature (°C)</th>
<th>Humidity (%)</th>
<th>Gas</th>

</tr>

</thead>

<tbody>

{data.map((d,i)=>(

<tr key={i}>

<td>{new Date(d.created_at).toLocaleString()}</td>

<td className="tempValue">
{Number(d.field1).toFixed(1)}
</td>

<td className="humValue">
{Number(d.field2).toFixed(1)}
</td>

<td className="gasValue">
{Number(d.field3).toFixed(0)}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

export default Readings;