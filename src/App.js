import logo from './logo.svg';
import './App.css';
import {
  HashRouter,
  Routes,
  Route,
} from  "react-router-dom";
import LoginMain from "./component/User/Login_Main"
import Login from "./component/User/Login/User_Login"
import RegisterTel from "./component/User/Register/Register_Tel"
import RegisterNickname from "./component/User/Register/Register_Nickname"
import RegisterCrew from "./component/User/Register/Register_Crew"

import Main from "./component/Main/Main";
import styled from "styled-components"
import Navbar from "./component/Navbar/Navbar"

import Clothes from "./component/Shoes/Shoes_Main/Shoes_Main";
import { Outlet } from 'react-router-dom';
import ShoesSearch from "./component/Shoes/Shoes_Search/Shoes_Search"
import Shoes_Detail from "./component/Shoes/Shoes_Detail/Shoes_Detail"
import ShoesAdd from "./component/Shoes/Shoes_Add/Shoes_Add"

import Crew from "./component/Crew/Crew_Main/Crew_Main"
import CrewLocation from "./component/Crew/Crew_Location/Crew_Location"
import CrewDetail from './component/Crew/Crew_Detail/Crew_Detail';
import CrewSearch from "./component/Crew/Crew_Search/Crew_Search"
import CrewAdd from "./component/Crew/Crew_Add/Crew_Add"

import { motion, AnimatePresence } from 'framer-motion';
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
                {/* <Route path='/schedule' element = {<Schedule/>}/>
                <Route path='/schedule/search' element ={<ScheduleSearch/>}/>

                <Route path='/shoes' element ={<Shoes/>}/>
                <Route path='/shoes/search' element ={<ShoesSearch/>}/>

                <Route path='/crew' element ={<Crew/>}/>
                <Route path="/crew/location" element={<CrewLocation/>}/>
                <Route path="/crew/detail/:id" element={<CrewDetail/>}/>
                <Route path='/crew/search' element ={<CrewSearch/>}/>

                <Route path="/runnertalk" element={<RunnerTalk/>}/>
                <Route path="/runnertalk/search" element={<RunnerTalkSearch/>}/> */}
                
              </Route>

              <Route element={<WithoutNav/>}>
              <Route path="/clothes/detail/:id" element={<Shoes_Detail/>}/> 
                {/* <Route path="/login/main" element={<LoginMain/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register/tel" element={<RegisterTel/>}/>
                <Route path="/register/nickname" element={<RegisterNickname/>} />
                <Route path="/register/crew" element={<RegisterCrew/>} />

                <Route path='/competition/detail/:id' element ={<Competition_Detail/>}/>  
                <Route path='/competition/add' element ={<CompetitionAdd/>}/>

                <Route path="/shoes/add" element={<ShoesAdd/>}/>

                <Route path="/runnertalk/category/:id" element={<RunnerTalkFilter/>}/>
                <Route path="/runnertalk/detail/:id" element={<RunnerTalkDetail/>}/>
                <Route path="/runnertalk/write" element={<RunnerTalkWrite/>}/>

                <Route path="/crew/add" element={<CrewAdd/>}/> */}
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
  background-color:#141414;
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
