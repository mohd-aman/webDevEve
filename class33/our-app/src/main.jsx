import ReactDOM from 'react-dom/client'
import './index.css'

import AppFxn from './App.jsx'
import {a} from "./App.jsx"
console.log(a);
console.log(AppFxn);
ReactDOM.createRoot(document.getElementById('root')).render(
    <AppFxn />
)
