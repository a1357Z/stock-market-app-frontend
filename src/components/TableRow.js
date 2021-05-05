import React from 'react'
import { useState } from 'react'
const TableRow = (props) => {
    // const[button,setButton]=useState('Save')

    // setButton(()=>props.viewLink)
         
    

    return (
        <div>
            <ul>
                <li>{props.data.name}</li>
                <li>{props.data.symbol}</li>
                <li>
                    {props.data.price}
                </li>
                <li>{props.data.marketCap}</li>
                <li><button onClick = {()=>{props.button ==='save'? props.save() : props.delete(props.data)}}>{props.button}</button></li>
            </ul>
        </div>
    )
}

export default TableRow
