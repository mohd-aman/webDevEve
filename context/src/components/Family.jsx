import { useContext } from "react"
import Parent from "./Parent"
import FamilyContext from "../context/FamilyContext"
export default function Family(){
   const familyInfo = useContext(FamilyContext);
    return(
        <div className="family">
        <h1>{familyInfo.familyName}</h1>
            <Parent/>
        </div>
    )
}