import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function (SpecificComponent, option, Route = '/login/main') {

    const sessionid = window.localStorage.getItem('sessionid');


    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck() {
        const navigate = useNavigate();
        
        useEffect(() => {
            //로그인 X
            if(!(sessionid)){
                //로그인 하지 않은 유저가 로그인한 유저만 출입 가능한 곳 접근
                if(option){
                    navigate(Route);
                }
            }

            //로그인 상태
            else{
                if(option !== null){
                    //로그인한 유저 출입 불가능한 곳 접근
                    if(!option){
                        navigate(Route);
                    }
                }
            }
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}