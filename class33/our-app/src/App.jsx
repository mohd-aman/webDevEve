import './App.css';
import Header from './Components/Header';
import UserProfile from './Components/UserProfile';
import Button from './Components/Button';
import Counter from "./Components/Counter";


const users = [
  {name:"John",age:"15",location:"India"},
  {name:"Anderson",age:"42",location:"England"},
  {name:"Sky",age:"30",location:"India"},
  {name:"Bumrah",age:"31",location:"Mumbai"},
  {name:"Rohit",age:"30",location:"India"},
  {name:"DK",age:"30",location:"India"},
]

function App() {
  return (
    // fragment  
    <> 
      {/* <h1>I am heading</h1>
      <p>I am para</p>
      <Header/>
      <Header/>
      <Header/>
      <Header/>
      <Header/>
      <Header/> */}
      <Header/>
      <Counter/>
      {/* <Button/> */}
      {/* <UserProfile name={users[0].name} age = "42" location="England" /> */}
      {/* {users.map(function(user,index){
        return <UserProfile key={index} name={user.name} age={user.age} location={user.location}/>
      })} */}
    </>
  )
}

export default App;//default export

export const a = 10; //named export
