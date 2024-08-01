import React from 'react'
import GrandSon from './GrandSon'
import GrandDaughter from './GrandDaughter'
export default function Child() {
  return (
    <div>Child Comp
    <GrandSon />
    <GrandDaughter />
    </div>
  )
}
