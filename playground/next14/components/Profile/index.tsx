"use client"

import { PropsWithChildren, useEffect } from "react"
import {init} from 'react-find/next'
const Profile=(props:PropsWithChildren)=>{
    useEffect(()=>{
        init()
    },[])
    return <div>{props.children}</div>

}
export default Profile
