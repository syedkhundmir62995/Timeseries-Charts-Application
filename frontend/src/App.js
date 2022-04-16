import './App.css';
import {useState, useEffect} from 'react'
import {ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend} from 'recharts'
import {Form} from 'react-bootstrap'

function App() {

  const [apiData, setApiData] = useState([])
  const [selectedTech, setSelectedTech] = useState([])
  const [displayingTech, setDisplayingTech] = useState([])

  function getApiData(){
    fetch("http://localhost:8000/api/techratings")
    .then((resp)=>{
      resp.json().then((result)=>{
        console.log(result)
        setApiData(result)
        getSelectedTech(result)
      })
    })
  }

  useEffect(()=>{
    getApiData()
  },[])

  function getSelectedTech(apiInfo){
    let data = Object.keys(apiInfo[0])
    let res = data.filter((item)=>{
      return item != "month"
    })
    setSelectedTech(res)
    console.log(res)
  }

  function displayTech(tech){
    const data = [tech]
    setDisplayingTech(data)
  }

  return (
    <div className="App">
      <h1 style={{color:"darkgoldenrod", fontFamily:"sans-serif",padding:"1rem"}}>Line Chart</h1>

      <h3 style={{color:"darkturquoise"}}>Total Number of Questions Posted on Stack Overflow with Specific Technology from 2008 to 2019</h3>

      <select onChange={(e)=>{displayTech(e.target.value)}} style={{height:"2rem", width:"12rem", textAlign:"center", padding:"0.3rem", color:"steelblue", borderRadius:"1rem"}}>
        <option>Select Technology</option>
        {
          selectedTech.map((item, index)=>
         
          <option value={item}>{item.toUpperCase()}</option>
          )
        }
      </select>


      <ResponsiveContainer width={1450} height= {450}>
        <LineChart width={550} height= {450} data = {apiData} margin={{top:10, left:70}}>
          <Tooltip/>
          <XAxis dataKey="month" interval="preserveStartEnd" />
          <YAxis/>
          <CartesianGrid strokeDasharray="6 5" />
          {displayingTech.map((item, index)=>
            
            <Line dataKey= {item} type="monotone" activeDot={{stroke:"green", strokeWidth:2, r:7}} stroke="darkgreen"/>
          )
          }
          <Legend verticalAlign='top' align='center' height={40}/>

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default App;
