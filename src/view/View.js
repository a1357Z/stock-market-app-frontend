import React from 'react'
import {useEffect,useState} from 'react'
import Table from '../components/Table'
const View = () => {

    const [data,setData] = useState([])
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
        };

        fetch('http://localhost:8000/', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.data);
            setData(data.data)
        });
    }, [])
    return (
        <div>
            {data.length === 0 ? null : <Table data = {data} button = "delete"/>}
        </div>
    )
}

export default View
