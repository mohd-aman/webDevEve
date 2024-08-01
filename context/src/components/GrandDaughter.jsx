import React, { useContext } from 'react'
import FamilyContext from '../context/FamilyContext'

function GrandDaughter() {
   const familyInfo = useContext(FamilyContext);
  return (
    <div>GrandDaughter
    {familyInfo.onlyForGrandChildren()}</div>
  )
}

export default GrandDaughter