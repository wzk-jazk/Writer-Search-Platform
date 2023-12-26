import demo1 from '../../assets/fangtan1.jpg';
import demo2 from '../../assets/fangtan2.jpg';
import demo3 from '../../assets/fangtan3.jpg';
import back from '../../assets/background.jpg';
import logo from '../../assets/logo.png'
import React, {useState} from "react";
import {Card, Carousel, Col, Row, Space} from "antd";
import {Footer} from "antd/lib/layout/layout";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";

const data = [
    {
        url:"http://www.chinawriter.com.cn/n1/2023/0906/c405057-40071951.html",
        title:"余华：灵感的来源",
        description:'“贴——其实就是源源不断地去理解自己笔下的人物，就像去理解一位越来越亲密的朋友那样，因此生活远比我们想像的要丰富得多，就是我自己也要比我所认为的要丰富得多。”',
        img:demo1
    },
    {
        url:'https://www.thepaper.cn/newsDetail_forward_25276945',
        title:'《别样的鲁迅》：细读鲁迅的思想、学问、诗意',
        description: '“他是一位爱国主义者，他对国民性的批判，他的‘哀其不幸，怒其不争’中的‘哀’非常重要，‘哀’中同时又有爱。他的伟大是处处都是带有温度的，这种温度需要每个读者自己去阅读，去体会，去感受。”',
        img:demo2
    },
    {
        url:'https://www.thepaper.cn/newsDetail_forward_25418320',
        title:'现场｜纪念沈尹默诞辰140周年：诗书之间重看一代大家',
        description: '沈尹默之孙沈长建认为，“通过这次诗词、书法、文献的陈列，全面展示沈尹默作为一位历史文化清醒的先觉者——从倡导新文化运动的行动者，到传统文化艺术的坚定的守正者。对于当下，重新认识沈尹默的文化坚守和文化选择，有着现实的启示意义。”',
        img:demo3
    }
]

const HomePage=()=> {
    const navigate = useNavigate();
    const onSearch = (value, _e) =>{
        navigate(`/search?name=${value}`)
    }
    return (
        <div>
            <div style={{backgroundImage:`url(${back})`,backgroundRepeat:"no-repeat",backgroundSize:'cover',height:'760px'}}>
                <Row gutter={[16,2]}>
                    <Col offset={5} span={3}>
                        <img src={logo} alt="logo" style={{width:'200px'}}/>
                    </Col>
                    <Col span={8}>
                        <Search
                            placeholder="输入作家姓名进行搜索"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            style={{marginTop:'16%'}}
                            onSearch={onSearch}
                        />
                    </Col>
                </Row>
            </div>
            <Footer style={{ textAlign: 'center' }}>2023-2024秋冬 软件工程管理 G10小组</Footer>
        </div>


    );
}

export default HomePage;
