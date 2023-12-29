import {Avatar, Card, Descriptions, DescriptionsProps, Flex, Image, Space} from "antd";
import "./WriterDetail.css"
import Meta from "antd/es/card/Meta";
import {useEffect, useState} from "react";
const labelMap = new Map([
  ['name','姓名'],
  ['age','年龄'],
  ['gender','性别'],
  ['date' , '生卒日期'],
    ['Writtingstyle','写作风格'],
    ['provence','所属省份'],
    ['pseudonym','别名'],
    ['Representative','代表作'],
    ['BriefIntroduction','简介'],
    ['honors','荣誉']
])
const WriterDetail = (props) =>{
  const {name,id} = props//作家名，id
  const [items, setItems] = useState([])
  const [img,setImg] = useState('')
  const writerURL = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/writerDetail'
  useEffect(() =>{
    fetch(writerURL).then(resp => resp.json())
        .then(data =>{
          //获取作家信息，不显示imgUrl
          const itemTemp = Object.entries(data).map(([key,value], index) =>{
            if(key !== 'imgUrl'){
              return {
                key:(index+1).toString(),
                label:labelMap.get(key),
                children:value,
              };
            }
            return null;
            }).filter(item => item != null)
          setItems(itemTemp)
          setImg(data.imgUrl)
        })
  },[])
  return(
    <div style={{color: "#ffffff", marginTop:"2rem",marginBottom: "2rem"}}>
      <Card style={{width: "95%", backgroundColor:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>
        <Flex align={"center"}>
          <Meta
            avatar={<Image src={img} width={"150px"}></Image>}
          />
          <Descriptions title={name} items={items} column={2} size={"middle"} className={'custom-description'}/>
        </Flex>
      </Card>
    </div>
  )
}
export default WriterDetail;
