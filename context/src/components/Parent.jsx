import { useContext } from "react"
import Child from "./Child"
import FamilyContext from "../context/FamilyContext"

export default  function Parent(){
    const familyInfo = useContext(FamilyContext)
    return (
        <div>
            {familyInfo.onlyForParent()}
            <Child/>
        </div>
    )
}