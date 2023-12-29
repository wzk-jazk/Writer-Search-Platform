import {LeftCircleOutlined, LeftOutlined, ReadOutlined, RightCircleOutlined, RightOutlined} from "@ant-design/icons";
import {Avatar, Button, Card, Carousel, Col, Drawer, Image, Row, Space, Table} from "antd";
import {useEffect, useRef, useState} from "react";
import Meta from "antd/es/card/Meta";
import BookDetail from "../BookDetail/BookDetail";

const images = [
  {
    img:'LuXun.jpg',
    name:'鲁迅'
  },
  {
    img:'demo1.png',
    name:'aa'
  },
  {
    img:'demo2.png',
    name:'bb'
  },
  {
    img:'demo3.png',
    name:'cc'
  },
  {
    img:'liucixin.png',
    name:'dd'
  }
]

const Related = (props) =>{
  const [bookImgs,setBookImgs] = useState([])//走马灯的信息
  const [curBook,setCurBook] = useState(0)//当前书的序号
  const id = props.id;//当前作家id
  //点击书
  const handleClick =(e) =>{
    setOpen(true)
    setCurBook(e)
  }
  const [open,setOpen] = useState(false)
  const onClose =() =>{
    setOpen(false)
  }
  const [books,setBooks] = useState([])//所有书的信息

  //获取书的信息
  const url = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/getBooks'
  useEffect(() => {
    fetch(url).then(response => response.json())
        .then(data =>{
          setBooks(data)
          const imgs = data.map(item => ({name:item.title,img:item.imgUrl}))
          setBookImgs(imgs)
        })
  },[])
  //轮播信息
  const InfoCarousel =() =>{

    const rf = useRef(null);//用来加箭头
    return (
        <div>
          <Row>
            <Col span={2}>
              <LeftCircleOutlined onClick={()=>{
                rf.current.prev()
              }} style={{marginTop:'80px', fontSize:'30px', color:'#92795a'}}/>
            </Col>
            <Col span={20}>
              <Carousel arrows={true} dots={false} slidesToShow={bookImgs.length < 3 ? bookImgs.length : 3} ref={rf}>
                {bookImgs.map((image, index) => (
                    <div onClick={() => handleClick(index)}>
                      <img src={image.img} alt={`Image ${index}`} style={{width:'160px',height:'220px'}}/>
                      <div style={{marginLeft:'60px', fontWeight:"bold"}}>{image.name}</div>
                    </div>
                ))}
              </Carousel>
            </Col>
            <Col span={2}>
              <RightCircleOutlined onClick={()=>{
                rf.current.next()
              }} style={{marginTop:'80px', fontSize:'30px', color:'#92795a'}}/>
            </Col>
          </Row>
        </div>
    )
  }



  return(
    <div style={{marginTop:"2rem", marginBottom:"2rem"}}>
      <Card style={{width: "95%", backgroundColor:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>
        <Space align={"center"}>
          <Avatar size={"large"} icon={<ReadOutlined/>} style={{color: "black" , backgroundColor: "transparent"}}/>
          <h3>相关作品</h3>
        </Space>
        {/*<Table dataSource={dataSource} columns={columns} />*/}
        <InfoCarousel/>
        <Drawer placement={'left'} open={open} onClose={onClose} getContainer={false}>
          <BookDetail book={books[curBook]} />
        </Drawer>
      </Card>
    </div>
  )
}
export default Related;
