//alpha advantage get price details
//https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AMZN&apikey=RL8262AMSHINMOF0

import { useEffect } from "react";
import { useState } from 'react'
import Table from '../components/Table'
//alpha advantage get company code
//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=amazon&apikey=RL8262AMSHINMOF0


export default function Home(){
    
     const [dataList, setData] = useState([])

    useEffect(()=> {

        if(dataList.length !== 0){
            return
        }

        let charsList=['amazon','microsoft','googl','facebook']
        let dataArray = []
        charsList.forEach(char=>{
            fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${char}&apikey=RL8262AMSHINMOF0`)
            .then(res=>res.json())
            .then(data=>{
                if(!data.bestMatches){
                    return
                }
                data.bestMatches.forEach(data=>{
                    // console.log('data',data);
                    let obj={
                        name : data['2. name'],
                        symbol : data['1. symbol']
                    }
                    // console.log( data['1. symbol'])
                    // console.log( data['2. name'])
                    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${obj.symbol}&apikey=RL8262AMSHINMOF0`)
                    .then(res=>res.json())
                    .then(data=>{
                        //console.log(data['Global Quote']);
                        if(data['Global Quote']){
                            obj.price = data['Global Quote']['05. price']
                            obj.volume = data['Global Quote']['06. volume']
                        }else{
                            obj.price = 'N.A.'
                            obj.volume = 'N.A.'
                        }
                        
                        dataArray.push(obj)
                        console.log('obj is',obj);
                    })
                })
              
                //console.log(data.bestMatches)
            })
        })
        setTimeout(()=>{
            console.log('dataArray is ',dataArray);
            setData(prev=>{
                return dataArray
            })       
        },5000)
        
    })

    return(
        <div>
            
            <div>
                
                <Table 
                data = {dataList}
                button = 'save'
                />
            </div>
        </div>
        

    )
    
}