import React from "react";
import {Layout, Input, Flex, Avatar, Row, Col} from 'antd';
import WriterDetail from "../../components/WriterDetail/WriterDetail";
import "./WriterInfo.css"
import WordCloud from "../../components/WordCloud/WordCloud";
import LifeTime from "../../components/LifeTime/LifeTime";
import Related from "../../components/Related/Related";
import {useLocation} from "react-router-dom";
const WriterInfo = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const name = params.get('name')     //传来的名字参数
    const id = params.get('id')
    return (
        <Row gutter={[16,5]} style={{display:"flex"}}>
            <Col span={16}>
                <WriterDetail name={name} id={id}/>
            </Col>
            <Col span={8}>
                <LifeTime name={name} id={id}/>
            </Col>
            <Col span={16}>
                <Related id={id}/>
            </Col>
            <Col span={8}>
                <WordCloud id={id}/>
            </Col>
        </Row>
    )
}
export default WriterInfo;
