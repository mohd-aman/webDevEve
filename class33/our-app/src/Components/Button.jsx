export default function Button(){
    // const showMessage = true;

    function handleClick(){
        console.log("Button Clicked");
    }
    
    return (
        <>
        {/* {
            showMessage ?
              <h1>This is conditional rendering</h1> :
               <h1>Not rendering</h1>
        } */}
       {/* {
        showMessage &&  <h1>This is conditional rendering</h1>
       } */}
        
        <button onClick={handleClick}>
            Click Me and check console
        </button>
        </>
    )
}