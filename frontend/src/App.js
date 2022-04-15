import './App.css';
import {useState, useEffect} from 'react'
import {ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend} from 'recharts'

function App() {

  const [apiData, setApiData] = useState([])

  function getApiData(){
    fetch("http://localhost:8000/api/techratings")
    .then((resp)=>{
      resp.json().then((result)=>{
        console.log(result)
        setApiData(result)
      })
    })
  }

  useEffect(()=>{
    getApiData()
  },[])


  return (
    <div className="App">
      <h1 style={{color:"darkgoldenrod", fontFamily:"sans-serif",padding:"1rem"}}>Line Chart</h1>

      <h3 style={{color:"darkturquoise"}}>Total Number of Questions Posted on Stack Overflow with Specific Technology from 2008 to 2019</h3>
      
      <ResponsiveContainer width={1450} height= {450}>
        <LineChart width={550} height= {450} data = {apiData} margin={{top:10, left:70}}>
          <Tooltip/>
          <XAxis dataKey="month" interval="preserveStartEnd" />
          <YAxis/>
          <CartesianGrid strokeDasharray="6 5" />
          <Line dataKey= "python" type="monotone" activeDot={{stroke:"red", strokeWidth:2, r:7}} stroke="red"/>
          <Line dataKey= "r" type="monotone" activeDot={{stroke:"green", strokeWidth:2, r:7}} stroke="green"/>
          <Line dataKey= "matlab" type="monotone" activeDot={{stroke:"blue", strokeWidth:2, r:7}} stroke="blue"/>
          <Legend verticalAlign='top' align='center' height={40} />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default App;
