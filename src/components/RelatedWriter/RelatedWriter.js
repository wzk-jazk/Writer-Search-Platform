import {Avatar, Card, Flex, Space} from "antd";
import GuoMoRuo from "../../assets/GuoMoRuo.jpg";
import MaoDun from "../../assets/MaoDun.jpg"
import {TeamOutlined} from "@ant-design/icons";

const RelatedWriter = () =>{
    return(
        <div style={{marginLeft: "2rem", marginTop:"2rem", marginBottom: "2rem"}}>
            <Card style={{ backgroundColor:"rgba(255,255,255,0.6)", backdropFilter:"blur(8px)"}}>
                <Space align={"center"}>
                    <Avatar size={"large"} icon={<TeamOutlined />} style={{color: "black" , backgroundColor: "transparent"}}/>
                    <h3>相关作家</h3>
                </Space>
                <div>
                    <Flex justify={"space-between"}>
                        <a href={"localhost:3000"} style={{color: "#000000"}}>
                            <img alt={"GuoMoRuo"} src={GuoMoRuo} width={"150px"}></img>
                            <p style={{margin: "auto"}}>郭沫若</p>
                        </a>
                        <a href={"localhost:3000"} style={{color: "#000000"}}>
                            <img alt={"MaoDun"} src={MaoDun} width={"150px"}></img>
                            <p style={{margin: "auto"}}>矛盾</p>
                        </a>
                    </Flex>
                </div>
            </Card>
        </div>
    )
}
export default RelatedWriter;