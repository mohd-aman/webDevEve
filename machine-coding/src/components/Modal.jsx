export default function Modal({isVisible,hide}){
    //safe guard or early return
    if(!isVisible)return null;
    return (
        <>
            <h1>Modal Comp</h1>
            <p>This is a modal</p>
            <button onClick={hide}>Hide Modal</button>
        </>
    )
}