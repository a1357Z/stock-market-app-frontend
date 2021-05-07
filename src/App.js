

//alphavantage api key
//RL8262AMSHINMOF0

import './App.css';
import {React} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home/Home'
import View from './view/View'
import { useEffect,useState,useRef } from 'react';

export default function App() {

  const [dataList, setData] = useState([])
  const database = useRef([]);

  useEffect(()=> {

    if(dataList.length !== 0){
        return
    }


    //list of words for which the query is to be performed
    let charsList=['amazon','microsoft','googl','facebook']
    let dataArray = []
    
    charsList.forEach((char,i)=>{

        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${char}&apikey=RL8262AMSHINMOF0`)
        .then(res=>res.json())
        .then(data=>{
            if(!data.bestMatches){
                return
            }
            console.log('data.bestMatches are',data.bestMatches);
            data.bestMatches.forEach((data,j)=>{

                let obj={
                    name : data['2. name'],
                    symbol : data['1. symbol']
                }

                fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${obj.symbol}&apikey=RL8262AMSHINMOF0`)
                .then(res=>res.json())
                .then(det=>{

                    if(det['Global Quote']){
                        obj.price = det['Global Quote']['05. price']
                        obj.volume = det['Global Quote']['06. volume']
                    }else{
                        obj.price = 'N.A.'
                        obj.volume = 'N.A.'
                    }

                    fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${obj.symbol}&apikey=RL8262AMSHINMOF0`)
                    .then(res=>res.json())
                    .then(dat=>{
                        //console.log('market cap is ',data);
                        if(dat.MarketCapitalization){
                            obj.marketCap = dat.MarketCapitalization
                        }else{
                            obj.marketCap = 'N.A.'
                        }
                        dataArray.push(obj)
                        
                        //console.log('obj is',obj);
                        if(i===charsList.length-1){
                            console.log('dataArray is ',dataArray);
                            database.current = dataArray
                            //maxIndex.current = dataArray.length - 1
                            setData(prev=>{
                                return dataArray
                            })  
                        }
                    })
                                           
                })

                
            })
          
        })
    })
    // setTimeout(()=>{
    //     console.log('dataArray is ',dataArray);
    //     database.current = dataArray
    //     maxIndex.current = dataArray.length - 1
    //     setData(prev=>{
    //         return dataArray
    //     })       
    // },4000) 
})


  return (
    <Router>
      
      <div>
        <nav>
          <ul className="header">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/view">Saved Items</Link>
            </li>
          </ul>
        </nav>
        <div>

        </div>

        <Switch>
    
          <Route path="/view">
            <View />
          </Route>
          <Route path="/home">
            <Home 
            data={dataList}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


 