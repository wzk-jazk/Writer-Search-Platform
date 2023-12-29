import ReactEcharts from 'echarts-for-react';
import 'echarts-wordcloud';
import {Avatar, Card, Space} from "antd";
import {TeamOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
const WordCloud = (props) =>{
    const id = props.id;//作家id
    const [word , setWord] = useState([])
    const url = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/getWordCloud';
    useEffect(() => {
        fetch(url).then(resp => resp.json())
            .then(data =>{
                console.log(data)
                setWord(data)
            })
    },[])

    const option = {
        series: [
            {
                type: 'wordCloud',
                gridSize: 2,
                sizeRange: [10, 50],
                rotationRange: [-90, 90],
                width: "100%",
                height: "100%",
                shape: 'circle',
                textStyle: {
                    fontFamily: 'sans-serif',
                    normal: {
                        color: () => {
                            return (
                                'rgb(' +
                                [
                                    Math.floor(Math.random() * 255.0),
                                    Math.floor(Math.random() * 255.0),
                                    Math.floor(Math.random() * 255.0),
                                ].join(',') +
                                ')'
                            );
                        },
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                    },
                },
                data: word
            },
        ]
    };

    return(
        <div style={{marginLeft: "2rem", marginTop:"2rem", marginBottom: "2rem"}}>
            <Card style={{ backgroundColor:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>
                <Space align={"center"}>
                    <Avatar size={"large"} icon={<TeamOutlined />} style={{color: "black" , backgroundColor: "transparent"}}/>
                    <h3>关键词</h3>
                </Space>
                <ReactEcharts
                    option={option}
                    notMerge
                    lazyUpdate
                    style={{ height: '300px', width: '100%' }}
                />
            </Card>
        </div>
    )
}
export default WordCloud;
