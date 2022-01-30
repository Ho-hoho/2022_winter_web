import { Axios } from "axios";
import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useDispatch } from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from 'react-router-dom'

function Auth(SpecificComponent,option,adminRoute = null){
    function AuthenticationCheck(props){
    let navigate = useNavigate();
    const dispatch = useDispatch()
    // response.payload.isAuth : 유저의 로그인 상태
    // option 페이지의 권한 필요 여부

    useEffect( () => {
        dispatch(auth()).then(response =>{
            console.log(response)

            if(!response.payload.isAuth){
                if(option){
                    navigate('/login')
                }
            }else{
                if(adminRoute && !response.payload.isAdmin){
                    navigate('/')
                }else{
                    if(!option){
                        navigate('/')
                    }
                }
            }
        })        

        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}

export default Auth