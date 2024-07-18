import './App.css';
import Header from './Components/Header';
import UserProfile from './Components/UserProfile';

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
      <UserProfile name="Anderson" age = "42" location="England" />
      <UserProfile name="Sky" age="30" location="India"/>
      <UserProfile name="Bumrah" age="31" location="Mumbai"/>
    </>
  )
}

export default App;//default export

export const a = 10; //named export
