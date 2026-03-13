import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GaugeComponent from "react-gauge-component";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

import "./App.css";

ChartJS.register(
LineElement,
CategoryScale,
LinearScale,
PointElement,
Legend,
Tooltip
);

type SensorReading = {
field1: number;
field2: number;
field3: number;
created_at: string;
};

function Dashboard(){

const navigate = useNavigate();

const [data,setData] = useState<SensorReading[]>([]);
const [dark,setDark] = useState(true);

useEffect(()=>{
fetchData();

const interval = setInterval(fetchData,5000);

return ()=>clearInterval(interval);

},[]);

const fetchData = async ()=>{

// const res = await axios.get("http://localhost:5000/api/sensor");
const res = await axios.get("https://gesture-controlled-rover-webpage.onrender.com/api/sensor");

setData(res.data.slice(-20));

};

const latest = data[data.length-1] || ({} as SensorReading);

const labels = data.map(d =>
new Date(d.created_at).toLocaleTimeString()
);

const tempData = data.map(d => Number(d.field1));

const humData = data.map(d => Number(d.field2));

const gasData = data.map(d => Number(d.field3));

const chartData = {

labels: labels,

datasets: [

{
label:"Temperature (°C)",
data:tempData,
borderColor:"#ff4d4d",
backgroundColor:"rgba(255,77,77,0.2)",
tension:0.4,
fill:true
},

{
label:"Humidity (%)",
data:humData,
borderColor:"#4da6ff",
backgroundColor:"rgba(77,166,255,0.2)",
tension:0.4,
fill:true
},

{
label:"Gas Level",
data:gasData,
borderColor:"#2ecc71",
backgroundColor:"rgba(46,204,113,0.2)",
tension:0.4,
fill:true
}

]

};

const chartOptions = {

responsive:true,

maintainAspectRatio:false,

plugins:{
legend:{
labels:{
color: dark ? "white" : "black"
}
}
},

scales:{
x:{
ticks:{ color: dark ? "white":"black" }
},
y:{
ticks:{ color: dark ? "white":"black" }
}
}

};

return(

<div className={dark ? "dashboard dark" : "dashboard light"}>

<div className="topBar">

<h1>🌍 IoT Environmental Monitoring</h1>

<div>

<button
className="btn"
onClick={()=>setDark(!dark)}

>

{dark ? "Light Mode" : "Dark Mode"}

</button>

<button
className="btn"
onClick={()=>navigate("/readings")}

>

Last 20 Readings

</button>

</div>

</div>

{/* GAUGES */}

<div className="gauges">

<div className="gaugeBox">

<h2>🌡 Temperature</h2>

<GaugeComponent
value={latest.field1 || 0}
minValue={0}
maxValue={60}
/>

</div>

<div className="gaugeBox">

<h2>💧 Humidity</h2>

<GaugeComponent
value={latest.field2 || 0}
minValue={0}
maxValue={100}
/>

</div>

<div className="gaugeBox">

<h2>🔥 Gas Level</h2>

<GaugeComponent
value={latest.field3 || 0}
minValue={0}
maxValue={600}
/>

</div>

</div>

{/* LIVE SENSOR CHART */}

<div className="chartBox">

<h2>📊 Live Sensor Data Chart</h2>

<Line
data={chartData}
options={chartOptions}
/>

</div>

</div>

);

}

export default Dashboard;
