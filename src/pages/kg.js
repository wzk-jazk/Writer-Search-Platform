import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Avatar, Card, Descriptions, Flex, Image, Input, Layout, Space } from "antd";
import { useLocation } from "react-router-dom";

function MyKG() {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const curName = params.get('name')     //传来的名字参数
    const id = params.get('id');          //作家id
    const chartRef = useRef(null);
    const kgURL = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/relation';
    const [relationship, setRelationship] = useState([])
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])

    const fetchData = async () => {
        let nodeTemp = []
        let linkTemp = []

        const response = await fetch(kgURL);
        const data = await response.json();

        setRelationship(data)
        nodeTemp = [
            {
                id: '0',
                name: curName,
                symbolSize: 50,
                x: 0,
                y: 0,
                value: 2,
                category: 0
            },
            {
                id: '1',
                name: '著作',
                symbolSize: 40,
                x: -50,
                y: 50,
                value: 4,
                category: 1
            },
            {
                id: '2',
                name: '同省作家',
                symbolSize: 40,
                x: 50,
                y: 10,
                value: 5,
                category: 3
            },
            {
                id: '3',
                name: '关系',
                symbolSize: 40,
                x: -10,
                y: -30,
                value: 3,
                category: 5
            },
            ...data.relation.map((name, index) => ({
                id: `3${index + 1}`,
                name,
                symbolSize: 20,
                x: -20 + 15 * Math.cos((2 * Math.PI * index + Math.PI/4) / data.relation.length),
                y: -30 + -15 * Math.sin((2 * Math.PI * index + Math.PI/4) / data.relation.length),
                value: 1,
                category: 6
            })),
            ...data.book.map((name, index) => ({
                id: `1${index + 1}`,
                name,
                symbolSize: 20,
                x: -50 + -15 * Math.cos((2 * Math.PI * index + Math.PI/2) / data.relation.length),
                y: 50 + -15 * Math.sin((2 * Math.PI * index + Math.PI/4) / data.relation.length),
                value: 1,
                category: 2
            })),
            ...data.other.map((name, index) => ({
                id: `2${index + 1}`,
                name,
                symbolSize: 20,
                x: 50 + 15 * Math.cos((2 * Math.PI * index + Math.PI/2) / data.relation.length),
                y: 10 + -15 * Math.sin((2 * Math.PI * index + Math.PI/2) / data.relation.length),
                value: 1,
                category: 4
            }))
        ]
        linkTemp = [
            { source: '0', target: '1' },
            { source: '0', target: '2' },
            { source: '0', target: '3' },
            ...data.book.map((_, index) => ({
                source: '1',
                target: `1${index + 1}`
            })),
            ...data.relation.map((_, index) => ({
                source: '3',
                target: `3${index + 1}`
            })),
            ...data.other.map((_, index) => ({
                source: '2',
                target: `2${index + 1}`
            }))
        ]
        setNodes(nodeTemp)
        setLinks(linkTemp)
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        let option;

        myChart.showLoading();
        const graph = {
            nodes: nodes,
            links: links,
            categories: [
                {
                    name: '作者',
                },
                {
                    name: '著作',
                },
                {
                    name: '拥有著作',
                },
                {
                    name: '所属省市',
                },
                {
                    name: '同省市作家'
                },
                {
                    name: '关系'
                },
                {
                    name: '相关人物'
                }
            ],
        };

        myChart.hideLoading();

        graph.nodes.forEach(function (node) {
            node.label = {
                show: node.symbolSize > 30,
            };
        });

        option = {
            title: {
                text: '作家关系知识图谱',
                top: 'bottom',
                left: 'right',
            },
            tooltip: {},
            legend: [
                {
                    data: graph.categories.map(function (a) {
                        return a.name;
                    }),
                },
            ],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: '',
                    type: 'graph',
                    layout: 'none',
                    draggable: 'true',
                    gravity: 0.1,
                    edgeLength: 100,
                    layoutAnimation: true,
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}',
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.2,
                        width: 3
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 10,
                        },
                    },
                },
            ],
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [nodes, links]);

    return (
        <Card style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)" }}>
            <Flex align={"center"}>
                <div ref={chartRef} style={{ width: '100%', height: '700px' }}></div>
            </Flex>
        </Card>
    );
}

export default MyKG;
