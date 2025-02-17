import { useState,useEffect } from "react";
import { useAuth } from "../../Context/Auth";
import axios from 'axios';
import {Outlet} from 'react-router-dom'
import Spinner from "../Spinner";


export default function PrivateRoute ({role}){
    const [ok,setOk] =useState(false);
    const [auth,setAuth]=useAuth()


    useEffect(()=>{
        const authCheck = async ()=>{
            const res = await axios.get("/api/v1/auth/user-auth" );
        if(res.data.ok){
            setOk(true);
        }else{
            setOk(false)
        }
        };
        if(auth?.token) authCheck();
    },[auth?.token,role]);

    return ok ? <Outlet/> : <Spinner/>;
}