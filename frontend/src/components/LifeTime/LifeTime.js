import {Avatar, Button, Card, Space, Timeline} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
const LifeTime = (props) =>{
    const {name,id} = props
    const [flag, setFlag] = useState(false)
    const [timeline, setTimeLine] = useState([])
    const url = 'https://www.fastmock.site/mock/0a62bd1eaff571e6a131a772cdd8d3cd/api/getTimeLine'
    useEffect(() => {
        fetch(url).then(resp => resp.json())
            .then(data =>{
                setTimeLine(data)
            })
        setFlag(true)
    },[])
    if(flag){
        return (
            <div style={{marginLeft: "2rem", marginTop:"2rem"}}>
                <Card style={{backgroundColor:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>
                    <Space>
                        <Avatar size={"large"} icon={<CalendarOutlined />} style={{color: "black" , backgroundColor: "transparent"}}/>
                        <h3>生平简介</h3>
                    </Space>
                    <Timeline
                        mode={"left"}
                        items={timeline}
                    />
                    <div style={{marginLeft:'70%'}}>
                        <Link to={`/kg?name=${name}&id=${id}`}>查看知识图谱-></Link>
                    </div>
                </Card>
            </div>
        )
    }

}
export default LifeTime;
