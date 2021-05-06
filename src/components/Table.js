import TableRow from "./TableRow"
export default function Table(props){

    return(
        <div>
            <ul>
                <li>Name</li>
                <li>Symbol</li>
                <li>Price</li>
                <li>MarketCap</li>
                <li>Option</li>
            </ul>
            {props.data.map((dataItem,index) => {
                
                if(index >= props.start && index <= props.end){
                    return (<TableRow 
                        data = {dataItem}
                        key = {index}
                        button = {props.button}
                        delete = {props.delete}
                        save = {async (event)=>{
                            
                            const requestOptions = {
                                method: 'POST',
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
                    />)
                }else{
                    return null;
                }
                
            })}
        </div>
    )
}