import logo from './logo.svg';
import './App.css';
import {
  HashRouter,
  Routes,
  Route,
} from  "react-router-dom";


import Main from "./component/Main/Main";
import styled from "styled-components"
import Navbar from "./component/Navbar/Navbar"

import Clothes from "./component/Shoes/Shoes_Main/Shoes_Main";
import { Outlet } from 'react-router-dom';

import Shoes_Detail from "./component/Shoes/Shoes_Detail/Shoes_Detail"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import './style/plate/reset.css'


const WithNav = () =>{
  return(
    <>
      <Outlet/>
      <Navbar/>
    </>
  )
}

const WithoutNav =()=>{
  return(
    <Outlet/>
  )
}

function App() {
  return (
    <RecoilRoot>
      <WebMain>
        <APP>
          <HashRouter>
            <Routes>
              <Route element={<WithNav/>}>
                <Route path ="/" element={<Main/>}/>
                <Route path="/clothes" element={<Clothes/>}/>

              </Route>

              <Route element={<WithoutNav/>}>
              <Route path="/clothes/detail/:id" element={<Shoes_Detail/>}/> 

              </Route>

            </Routes>
          </HashRouter>
        </APP>
      </WebMain>
    </RecoilRoot>
  );
}

//배경
const WebMain = styled.div`
  background-color:#ffffff;
  display:flex;
  justify-content:center;
  align-items:center;
`

//앱 크기
const APP = styled.div`
  width:100%;
  min-width:360px;
  max-width:450px;
  min-height:100vh;
  background-color:#ffffff;
`

export default App;
