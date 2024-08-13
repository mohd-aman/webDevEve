import Ref from './components/Ref'
import './App.css'
import { useState } from 'react'

function App() {
  const [show,setShow] = useState(true);
  return(
   <>
   <h1>Hello world</h1>
    {show && <Ref/>}
    <button onClick={()=>setShow(!show)}>Toggle Ref component</button>
   </>
  )
}

export default App
