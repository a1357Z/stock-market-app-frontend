//alpha vantage get price details
//https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AMZN&apikey=RL8262AMSHINMOF0

//alpha vantage get marketcap and other details of company
//https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo

//alpha vantage get company symbol
//https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=amazon&apikey=RL8262AMSHINMOF0

import { useEffect } from "react";
import { useState,useRef } from 'react'
import Fuse from 'fuse.js'
import Table from '../components/Table'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

export default function Home(){
    
     const [dataList, setData] = useState([])
     const [startIndex,setStartIndex] = useState(0)
     const [endIndex,setEndIndex] = useState(4)
     const database = useRef([]);
     const maxIndex = useRef(null)
     const minIndex = useRef(0)

     const fuse = new Fuse(dataList, {
        keys: ["name", "symbol"],
      });

    useEffect(()=> {

        if(dataList.length !== 0){
            return
        }


        //list of words for which the query is to be performed
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

                    let obj={
                        name : data['2. name'],
                        symbol : data['1. symbol']
                    }

                    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${obj.symbol}&apikey=RL8262AMSHINMOF0`)
                    .then(res=>res.json())
                    .then(data=>{

                        if(data['Global Quote']){
                            obj.price = data['Global Quote']['05. price']
                            obj.volume = data['Global Quote']['06. volume']
                        }else{
                            obj.price = 'N.A.'
                            obj.volume = 'N.A.'
                        }
                                               
                    })

                    fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${obj.symbol}&apikey=RL8262AMSHINMOF0`)
                    .then(res=>res.json())
                    .then(data=>{
                        //console.log('market cap is ',data);
                        if(data.MarketCapitalization){
                            obj.marketCap = data.MarketCapitalization
                        }else{
                            obj.marketCap = 'N.A.'
                        }
                        dataArray.push(obj)
                        //console.log('obj is',obj);
                    })
                })
              
            })
        })
        setTimeout(()=>{
            console.log('dataArray is ',dataArray);
            database.current = dataArray
            maxIndex.current = dataArray.length - 1
            setData(prev=>{
                return dataArray
            })       
        },4000) 
    })

    let handleSearchChange=(event)=>{
        //console.log(event.target.value);
        let foundItems = fuse.search(event.target.value)
        console.log('founditems are',foundItems);
        if(foundItems.length !== 0){
            let arr = foundItems.map(item=>{
                return item.item
            })
            setData(arr)
        }else{
            setData(database.current)
        }
    }

    let handleNextClick = ()=>{
        if(startIndex + 5 <= maxIndex.current && endIndex + 5 <= maxIndex.current){
            setStartIndex((i)=>i+5)
            setEndIndex((i)=>i+5)
        }else if(startIndex + 5 <= maxIndex.current){
            setStartIndex((i)=>i+5)
            setEndIndex(maxIndex.current)
        }
        //console.log(`start index is ${startIndex}, endIndex is ${endIndex}`);
    }

    let handlePrevClick = () =>{
        if(startIndex - 5 >= minIndex.current ){
            setStartIndex((i)=>i-5)
            setEndIndex((i)=>startIndex-1)   
        }
        //console.log(`start index is ${startIndex}, endIndex is ${endIndex}`);
    }

    return(
        <div>
            
            <div>
                {dataList.length===0 ? <h1 style={{"textAlign":"center"}}>Loading...</h1> : null}

                {dataList.length===0 ? null : 
                <SearchBar 
                    onChange={handleSearchChange}
                />}

                {dataList.length===0 ? null :
                 <Table 
                    data = {dataList}
                    button = 'save'
                    start = {startIndex}
                    end = {endIndex}
                />}

                {dataList.length===0 ? null : 
                 <Pagination
                    next = {handleNextClick}
                    previous = {handlePrevClick}
                />}
               
                
            </div>
        </div>
        

    )
    
}