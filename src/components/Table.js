import TableRow from "./TableRow"
import {
    Link
  } from "react-router-dom";
export default function Table(props){

    // let save=(event)=>{
    //     console.log(event);
    //     console.log(dataitem);
    // }
    

    return(
        <div>
            <ul>
                <li>Name</li>
                <li>Symbol</li>
                <li>Price</li>
                <li>Volume</li>
                <li>Option</li>
            </ul>
            {props.data.map((dataItem,index) => {
                return <TableRow 
                data = {dataItem}
                key = {index}
                button = {props.button}
                viewLink = {<Link to="/view">Views</Link>}
                save = {async (event)=>{
                    console.log(event);
                    console.log(dataItem);
                    //send a post request
                    const requestOptions = {
                        method: 'POST',
                        // mode: 'no-cors',
                        // Access-Control-Allow-Origin : '*',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dataItem)
                    };

            

                    try{
                        let response = await fetch('http://localhost:8000/save', requestOptions)
                        console.log('response is',response);
                        try{
                        let ans = await response.json()
                        console.log('ans is',ans);
                        }catch(e){
                            console.log(e);
                        }
                    }catch(e){
                        console.log(e);
                    }
                        
                }}
                />
            })}
        </div>
    )
}