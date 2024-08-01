import React, { useContext } from 'react'
import FamilyContext from '../context/FamilyContext'

export default function GrandSon() {
   const familyInfo = useContext(FamilyContext)
  return (
    <div>GrandSon
    {familyInfo.onlyForGrandChildren()}</div>
  )
}
