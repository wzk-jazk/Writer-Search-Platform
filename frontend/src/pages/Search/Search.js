
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Layout,
    Menu,
    MenuProps, Pagination,
    Radio,
    Row,
    Space,
    Table
} from "antd";
import {useContext, useEffect, useState} from "react";
import {FileSearchOutlined, ReadOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";

import demo1 from '../../assets/demo1.png';
import demo2 from '../../assets/demo2.png';
import demo3 from '../../assets/demo3.png';
import demo4 from '../../assets/luxun.png'
import demo5 from '../../assets/liucixin.png'
import demo6 from '../../assets/beidao.png'
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { RangePicker } = DatePicker;

const Search=()=>{

    const items = [
        {
            label: '搜索结果',
            key: 'result',
            icon: <FileSearchOutlined />,
        },
        {
            label: '高级搜索',
            key: 'advanced',
            icon: <SettingOutlined  />,
        },
    ];

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const name = params.get('name')     //传来的名字参数

    const [current, setCurrent] = useState('result');
    const navigate = useNavigate();
    const [ data, setData ] = useState([])
    const [ author, setAuthor ] = useState([])
    const [ popularAuthor, setPopularAuthor ] = useState([])
    const [ HotNews, setNews ] = useState([])
    const [ page, setPage ] = useState(0)
    const [authorCard, setAuthorCard] = useState(null)

    // fetch("http://localhost:8080/searchAuthor")
    //     .then(response=>{
    //         const mappedPopularAuthorList = Object.values(response.data).map(item => ({
    //             name: item.name,
    //             imgUrl: item.imgUrl,
    //         }));
    //         setPopularAuthor(mappedPopularAuthorList);
    //     })
    //
    // fetch("http://localhost:8080/getNews")
    //     .then(response=>{
    //         const mappedNewsList = Object.values(response.data).map(item => ({
    //             title: item.title,
    //             URL: item.URL,
    //         }));
    //         setNews(mappedNewsList);
    //     })

    useEffect(() => {
        const cards = drawAuthorCard();
        setAuthorCard(cards);
    }, );


    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);

    };
    useEffect(() =>{
        const dt = {
            name:name
        }
        const url = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/search';
        axios.post(url,dt)
            .then(response=>{
                const mappedAuthorList = Object.values(response.data).map(item => ({
                    id:item.id,
                    name: item.name,
                    imgUrl: item.imgUrl,
                    birthDate : item.birthDate,
                    deathDate :item.deathDate,
                    sex:item.sex,
                    honors:item.honors,
                    provence:item.provence,
                    city:item.city,
                    pseudonym:item.pseudonym
                }));
                setPage(1)
                setAuthor(mappedAuthorList)

                // setPage(1)
            })
    },[])

    function valueChange(allValues) {
        if (allValues.BEtime && allValues.BEtime[0] && allValues.BEtime[1]) {
            let Byear=allValues.BEtime[0].$y;
            let Bmonth=allValues.BEtime[0].$M+1;
            let Bday=allValues.BEtime[0].$D;

            let Eyear=allValues.BEtime[1].$y;
            let Emonth=allValues.BEtime[1].$M+1;
            let Eday=allValues.BEtime[1].$D;

            let Fage=allValues.age;
            let ageFrom;
            let ageTo;
            if(Fage===0){
                ageFrom=0;
                ageTo=20;
            }
            else if(Fage===1){
                ageFrom=20;
                ageTo=40;
            }
            else if(Fage===2){
                ageFrom=40;
                ageTo=60;
            }
            else if(Fage===2){
                ageFrom=60;
                ageTo=9999;
            }
            console.log(Fage)
            setData({
                name:name,
                provence:allValues.provence,
                city:allValues.city,
                school:allValues.school,
                style:allValues.style,
                birthDateFrom:Byear+Bmonth+Bday,
                birthDateTo:Eyear+Emonth+Eday,
                ageFrom:ageFrom,
                ageTo:ageTo
            })
        }
        const url = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/search';
        axios.post(url,data)
            .then(response=>{
                const mappedAuthorList = Object.values(response.data).map(item => ({
                    name: item.name,
                    imgUrl: item.imgUrl,
                    birthDate : item.birthDate,
                    deathDate :item.deathDate,
                    sex:item.sex,
                    honors:item.honors,
                    provence:item.provence,
                    city:item.city,
                    pseudonym:item.pseudonym
                }));
                setPage(1)
                console.log(mappedAuthorList[0])
                setAuthor(mappedAuthorList)

                setPage(1)
            })
    }

    function drawAuthorCard() {
        let authorCardList=[];
        console.log(author)
        if(author.length === 0){
            authorCardList.push(
                <Col span={21}>
                    <Card  hoverable={false} style={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(8px)" }}>
                        暂无信息！
                    </Card>
                </Col>
            )
        }
        else{
            for(let i=(page-1)*3;author&&i<Math.min(author.length,(page-1)*3+3);i++){
                authorCardList.push(
                    <Col span={21}>
                        <Card title={author[i].name} hoverable={false} style={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(8px)" }}
                              onClick={() => navigate(`/writer?name=${author[i].name}&id=${author[i].id}`)}
                        >
                            <Row gutter={[24, 1]}>
                                <Col span={4}>
                                    <img src={author[i].imgUrl} alt="logo" style={{ zIndex: -1, width: "100px", height: "150px" }} />
                                </Col>
                                <Col span={20}>
                                    <Row gutter={[24, 20]}>
                                        <Col span={8}>
                                            原名：{author[i].name}
                                        </Col>
                                        <Col span={8}>
                                            性别：{author[i].sex}
                                        </Col>
                                        <Col span={8}>
                                            笔名/别名：{author[i].pseudonym}
                                        </Col>
                                        <Col span={8}>
                                            出生日期：{author[i].birthDate}
                                        </Col>
                                        <Col span={8}>
                                            逝世日期：{author[i].birthDate}
                                        </Col>
                                        <Col span={8}>
                                            籍贯：{`${author[i].provence}+${author[i].city}`}
                                        </Col>
                                        <Col span={24}>
                                            毕业院校：{author[i].school}
                                        </Col>
                                        <Col span={24}>
                                            主要成就：{author[i].honors}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                )
            }
        }

        return  authorCardList;
    }

    function drawPopularAuthor() {
        let popularAuthorList=[];
        for(let i=0;popularAuthor&&i<popularAuthor.length;i++){
            popularAuthorList.push(
                <Col span={8} title={popularAuthor[i].name}>
                    <Avatar src={popularAuthor[i].imgURL} style={{width:"80px",height:"80px"}}
                            onClick={()=>navigate(`/writer?name=${popularAuthor[i].name}`)}/>
                    <p style={{width:"80px",textAlign: "center"}}>{popularAuthor[i].name}</p>
                </Col>
            )
        }
        return popularAuthorList;
    }

    function drawNews() {
        let newsList=[];
        if(HotNews){
            newsList.push(
                <Col span={24}>
                    <Avatar style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>1</Avatar>
                    <span
                        style={{cursor: 'pointer'}}
                        onClick={() => window.open(`${HotNews[0].URL}`, '_blank')}
                    >
                    {HotNews[0].title}
                </span>
                </Col>
            )
            newsList.push(
                <Col span={24}>
                    <Avatar style={{ backgroundColor: '#ff6a00', color: '#FFFFFF' }}>2</Avatar>
                    <span
                        style={{cursor: 'pointer'}}
                        onClick={() => window.open(`${HotNews[1].URL}`, '_blank')}
                    >
                    {HotNews[1].title}
                </span>
                </Col>
            )
            newsList.push(
                <Col span={24}>
                    <Avatar style={{ backgroundColor: '#ffb700', color: '#FFFFFF' }}>2</Avatar>
                    <span
                        style={{cursor: 'pointer'}}
                        onClick={() => window.open(`${HotNews[2].URL}`, '_blank')}
                    >
                    {HotNews[2].title}
                </span>
                </Col>
            )
        }

        return newsList
    }

    return (
        <div>
            <Row gutter={[24,0]}>
                <Col span={22} offset={1}>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{backgroundColor:"rgba(255,255,255,0.6)"}}/>
                </Col>
                <Col span={24}/>
                {current==='advanced'&&
                    <Col span={22} offset={1}>
                        <Card style={{ backgroundColor:"rgba(255,255,255,0.6)"}}>
                            <Form
                                mode="horizontal"
                                onFinish={valueChange}
                            >
                                <Form.Item label={"籍贯:省"} style={{ maxWidth: 600 }} name={"provence"}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={"籍贯:市"} style={{ maxWidth: 600 }} name={"city"}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={"毕业院校"} style={{ maxWidth: 600 }} name={"school"}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={"作品风格"} style={{ maxWidth: 600 }} name={"style"}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="出生时间范围" name={"BEtime"}>
                                    <RangePicker />
                                </Form.Item>
                                <Form.Item label="年龄" name={"age"}>
                                    <Radio.Group>
                                        <Radio value="20"> 小于20岁 </Radio>
                                        <Radio value="40"> 20-40岁 </Radio>
                                        <Radio value="60"> 40-60岁 </Radio>
                                        <Radio value="80"> 大于60岁 </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit">设置条件</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                }
            </Row>
            <Row gutter={24}>
                <Col span={14} offset={1}>
                    <Card hoverable={"false"} style={{backgroundColor:"rgba(255,255,255,0.6)",backdropFilter:"blur(8px)"}}>
                        <Row gutter={[24,16]}>
                            <Col span={24}>
                                <Row gutter={[24,16]}>
                                    {authorCard}
                                    {/*<Col span={21}>*/}
                                    {/*    <Card title="余华" hoverable={false} style={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(8px)" }}*/}
                                    {/*          onClick={() => navigate("/writer?name="+"余华")}*/}
                                    {/*    >*/}
                                    {/*        <Row gutter={[24, 1]}>*/}
                                    {/*            <Col span={4}>*/}
                                    {/*                <img src={demo1} alt="logo" style={{ zIndex: -1, width: "100px", height: "150px" }} />*/}
                                    {/*            </Col>*/}
                                    {/*            <Col span={20}>*/}
                                    {/*                <Row gutter={[24, 20]}>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        原名：余华*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        性别：男*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        笔名/别名：花石*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        出生日期：1960.4.3*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        逝世日期：--*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={8}>*/}
                                    {/*                        籍贯：浙江省杭州市*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={24}>*/}
                                    {/*                        毕业院校：鲁迅文学院*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={24}>*/}
                                    {/*                        主要成就：1998年获意大利格林扎纳·卡佛文学奖*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Card>*/}
                                    {/*</Col>*/}

                                    {/*<Col span={21}>*/}
                                    {/*    <Card title="余秋雨" hoverable={false} style={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(8px)" }}>*/}
                                    {/*        <Row gutter={[24, 1]}>*/}
                                    {/*            <Col span={4}>*/}
                                    {/*                <img src={demo2} alt="logo" style={{ zIndex: -1, width: "100px", height: "150px" }} />*/}
                                    {/*            </Col>*/}
                                    {/*            <Col span={20}>*/}
                                    {/*                <Row gutter={[24, 20]}>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        原名：余秋雨*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        性别：男*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        笔名/别名：秋雨*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        出生日期：1946.8.26*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        逝世日期：--*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        籍贯：浙江省慈溪市*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"24"}>*/}
                                    {/*                        毕业院校：上海戏剧学院*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"24"}>*/}
                                    {/*                        主要成就：1987年获国家级突出贡献专家荣誉称号*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Card>*/}
                                    {/*</Col>*/}

                                    {/*<Col span={21}>*/}
                                    {/*    <Card title="余光中" hoverable={false} style={{ backgroundColor: "rgba(255,255,255,0)", backdropFilter: "blur(8px)" }}>*/}
                                    {/*        <Row gutter={[24, 1]}>*/}
                                    {/*            <Col span={4}>*/}
                                    {/*                <img src={demo3} alt="logo" style={{ zIndex: -1, width: "100px", height: "150px" }} />*/}
                                    {/*            </Col>*/}
                                    {/*            <Col span={20}>*/}
                                    {/*                <Row gutter={[24, 20]}>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        原名：余光中*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        性别：男*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        笔名/别名：--*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        出生日期：1928.10.21*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        逝世日期：2017.12.14*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"8"}>*/}
                                    {/*                        籍贯：江苏省南京市*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"24"}>*/}
                                    {/*                        毕业院校：厦门大学、台湾大学、爱荷华大学*/}
                                    {/*                    </Col>*/}
                                    {/*                    <Col span={"24"}>*/}
                                    {/*                        主要成就：获得吴三连文学奖、中国时报奖、金鼎奖、国家文艺奖等台湾所有重要奖项*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Card>*/}
                                    {/*</Col>*/}

                                </Row>
                            </Col>

                            <Col span={24}>
                                {author&&<Pagination
                                    defaultCurrent={1}
                                    total={author.length}
                                    defaultPageSize={3}
                                    onChange={(page) => {
                                        setPage(page);
                                    }}
                                />}
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8} >
                    <Row gutter={[24,30]} >
                        <Col span={24}>
                            <Card title={"其他人还在搜"} style={{backgroundColor: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)" }}>
                                <Row gutter={[24,5]}>
                                    {/*{drawPopularAuthor()}*/}
                                    {/*<Col span={8} title={"鲁迅"}>*/}
                                    {/*    <Avatar src={demo4} style={{width:"80px",height:"80px"}}*/}
                                    {/*            onClick={()=>navigate("/writer?name="+"鲁迅")}/>*/}
                                    {/*    <p style={{width:"80px",textAlign: "center"}}>鲁迅</p>*/}
                                    {/*</Col>*/}
                                    {/*<Col span={8} title={"刘慈欣"}>*/}
                                    {/*    <Avatar src={demo5} style={{width:"80px",height:"80px"}}/>*/}
                                    {/*    <p style={{width:"80px",textAlign: "center"}}>刘慈欣</p>*/}
                                    {/*</Col>*/}
                                    {/*<Col span={8} title={"北岛"}>*/}
                                    {/*    <Avatar src={demo6} style={{width:"80px",height:"80px"}}/>*/}
                                    {/*    <p style={{width:"80px",textAlign: "center"}}>北岛</p>*/}
                                    {/*</Col>*/}
                                </Row>
                            </Card>

                        </Col>
                        <Col span={24}>
                            <Card title={"最新资讯"} style={{backgroundColor: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)" }}>
                                <Row gutter={[24,16]}>
                                    {/*{drawNews()}*/}
                                    {/*<Col span={24}>*/}
                                    {/*    <Avatar style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>1</Avatar>*/}
                                    {/*    <span*/}
                                    {/*        style={{cursor: 'pointer'}}*/}
                                    {/*        onClick={() => window.open('http://www.chinawriter.com.cn/n1/2023/1225/c403994-40146332.html', '_blank')}*/}
                                    {/*    >*/}
                                    {/*        文学的视阈——《涛自大海生》首发式暨河南思客第九届年会在郑州举行*/}
                                    {/*    </span>*/}
                                    {/*</Col>*/}
                                    {/*<Col span={24}>*/}
                                    {/*    <Avatar style={{ backgroundColor: '#ff6a00', color: '#FFFFFF' }}>2</Avatar>*/}
                                    {/*    作家出版社成立70周年座谈会在京举行*/}
                                    {/*</Col>*/}
                                    {/*<Col span={24}>*/}
                                    {/*    <Avatar style={{ backgroundColor: '#ffb700', color: '#FFFFFF' }}>3</Avatar>*/}
                                    {/*    莫言文学艺术馆在山东高密揭牌启用*/}
                                    {/*</Col>*/}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Search;
