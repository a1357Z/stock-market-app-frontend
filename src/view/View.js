import React from 'react'
import {useEffect,useState} from 'react'
import Table from '../components/Table'
const View = () => {

    const [data,setData] = useState([])

    let getDataFromDatabase = ()=>{
        const requestOptions = {
            method: 'GET',
        };

        fetch('http://localhost:8000/', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            setData(data.data)
        });
    }

    useEffect(() => {
        getDataFromDatabase()
    }, [])

    let deleteData = (data) =>{
        console.log(data);

        const requestOptions = {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:8000/delete',requestOptions)
        .then(res=>{res.json()})
        .then(data=>{
            console.log(data);
        })

        getDataFromDatabase()
    }

    return (
        <div>
            {data.length === 0 ? null : <Table 
            data = {data} 
            button = "delete"
            delete = {deleteData}
            start ={0}
            end = {10000}
            />}
        </div>
    )
}

export default View
