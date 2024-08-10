import React from 'react'
 function Item({item,removeItem}) {
    console.log('Item re rendered')
  return (
    <div>
        <li key={item}>{item}
                <button onClick={()=>removeItem(item)}>Remove</button>
            </li>
    </div>
  )
}

export default React.memo(Item);