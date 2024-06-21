import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { useState, useEffect } from 'react';
// import { InitUser } from '../App';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// require('dotenv').config()

const Login = () => {
    const navigate = useNavigate();
    const {setUser, setDepartment, department, setName} = useStateContext();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const {erpData, setErpData, setActiveOrders} = useStateContext();

    const retrieveOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/erp/get`,{
        headers: {
          'Authorization': `${localStorage.getItem("token")}`
        }}
      )
      if(response.data.message){
        toast.error(response.data.message)
      }
      console.log(response.data);
      setErpData(response.data.orders);
      setActiveOrders(response.data.active);
    }

    const init = async () => {
        try {
            console.log('1');
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/me`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            console.log('hello2')
            console.log(response.data);
            if(response.data.username){
              console.log(response.data)
              setName(response.data.name);
              setUser(response.data.username);
              setDepartment(response.data.department);
            }else{
            
              toast.error(response.data.message);
              setName(null);
              setUser(null);
              setDepartment(null);
            }  
        }
        catch (e) {
          setUser(null)
        }
      };
    useEffect(() => {
        if (department) {
            console.log(department);
            retrieveOrders();
            if(['master', 'admin'].includes(department)){
              navigate(`/`);
              return;
            }
            navigate(`/${department}-department`);
        }
    }, [department, navigate]);

  return (
    <div className='flex flex-col justify-center h-screen w-full items-center' >
      <Toaster/>
      <div className="flex flex-col gap-6 h-1/2 p-10 w-96 bg-white rounded-lg border-2 items-center">
        <h2 className='text-lg'>Login</h2>
        
        <input type='email' id='email' className='border-1 p-2 w-full' onChange={(e) => {  
            setUsername(e.target.value);
        }} placeholder='username'/>
        
        
        <input type="password" id='password' className='border-1 p-2 w-full' onChange={(e) => {
            setPassword(e.target.value);
        }} placeholder='password'/>
        <button className='border-1 p-2 w-1/2 rounded-lg text-white bg-slate-500' onClick={async () => {
            await console.log('hello');
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/login`, {
                method: "POST",
                body: JSON.stringify({
                  username: username,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);
            localStorage.setItem("token",data.token);
            // localStorage.setItem("token",null);
            await init();
            console.log(department);
            // navigate('/');
            // navigate(`/${department}-department`);
            // window.location = "/";
        }}>Submit</button>
        </div>
    </div>
  )
}

export default Login