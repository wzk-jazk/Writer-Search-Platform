import background from "../../assets/background.jpg";
import {Avatar, Button, ConfigProvider, Drawer, Flex, FloatButton, Input, Layout} from "antd";
import logo from "../../assets/logo.png";
import React, {useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import {Footer} from "antd/lib/layout/layout";
import {Link, Outlet, useNavigate} from "react-router-dom";
import Chat from "../Chat/Chat";
import s from './Layout.css';
const ChatDrawer =() =>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <FloatButton onClick={showDrawer}>
                Open
            </FloatButton>
            <Drawer title="问问AI" placement="right" onClose={onClose} open={open} size={"large"}>
                <Chat/>
            </Drawer>
        </>
    );
}
const MyLayout =() =>{
    const navigate = useNavigate();//路由跳转
    const onSearch = (value, _e) =>{
        navigate(`/search?name=${value}`)
    }
    const ret =() =>{
        navigate('/')
    }

    return(
        <Layout className="layout" style={{backgroundImage: `url(${background})`, backgroundAttachment: 'fixed',backgroundSize: "100%",backgroundRepeat:"no-repeat"}}>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: "transparent", backdropFilter: "blur(8px)"}}>
                <Flex align={"center"} style={{width: "100%"}} justify={"space-between"}>
                    <Avatar size={150} src={logo} onClick={ret}></Avatar>
                    <h1 className={"title"} style={{color: "#ffffff", width: "100%", marginLeft:"1rem"}} onClick={ret}>
                        作家之窗
                    </h1>
                        <Search
                            placeholder="输入作家名字"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            style={{marginRight:"1rem"}}
                            onSearch={onSearch}
                        />
                </Flex>
            </Header>
            <Content className={"content"} style={{ padding: '0 50px', backgroundSize: "100%" }}>
                <Outlet/>
                <ChatDrawer/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>2023-2024秋冬 软件工程管理 G10小组</Footer>
        </Layout>
    )
}
export default MyLayout;
