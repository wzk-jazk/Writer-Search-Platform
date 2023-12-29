import React, {createRef} from 'react';
import './App.css';
import {BrowserRouter, Route, Router, Routes, useLocation} from "react-router-dom";
import MyKG from "./pages/kg";
import MyLayout from "./components/Layout/MyLayout";
import HomePage from "./pages/home/HomePage";
import Search from "./pages/Search/Search";
import WriterInfo from "./pages/WriterInfo/WriterInfo";
import Temp from "./Temp";
import {ConfigProvider} from "antd";
import {CSSTransition, TransitionGroup} from "react-transition-group";

//实现路由跳转以及跳转动画
const MyRoutes =() =>{
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames={'page'} timeout={600}>
                <Routes>
                    <Route path={"/"} element={<HomePage/>} />
                    <Route element={<MyLayout/>}>
                        <Route path={"/writer"} element={<WriterInfo/>} />
                        <Route path={"/kg"} element={<MyKG/>} />
                        <Route path={"/search"} element={<Search/>}/>
                        <Route path={"/temp"} element={<Temp/>}/>
                    </Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
}
const App =() =>{
  return (
      <ConfigProvider theme={{
          token:{
              colorPrimary:'b49765'
          }
      }}
      >
          <BrowserRouter>
                  <MyRoutes/>
          </BrowserRouter>
      </ConfigProvider>
  );
}

export default App;
