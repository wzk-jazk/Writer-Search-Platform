import axios from "axios";
import {Button} from "antd";
import {useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";

const AK = "YpTzxnFlUBopLXtzfWwunVZL"
const SK = "8VfpMYnGoPFz6SlG8TvZtTPOqX3ZTRhy"
const Temp =() =>{
    //生成签名信息
    const postData = async () => {
        const url = '/api1/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK;
        try {
            const response = await axios.post(url, {

            });
            const data = response.data
            return data.access_token
        } catch (error) {
            console.error(error);
        }
    };
    const [dat, setDat] = useState("asd")
    const getMsg =async () => {
        const token = await postData();
        const url = `/api1/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${token}`;
        const header ={
            'Content-Type':'application/json'
        };
        const data = {
            messages:[
                {
                    role:'user',
                    content:'介绍一下'
                }
            ],
        };
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages:[
                    {
                        role:'user',
                        content:'介绍一下鲁迅'
                    }
                ],
            stream:true
            })
        };
            const eventSource = await fetchEventSource(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages:[
                        {
                            role:'user',
                            content:'介绍一下鲁迅'
                        }
                    ],
                    stream:true
                }),
                onmessage(e){
                    setDat(e.data)
                    console.log(e.data)
                },
                onclose(){
                    console.log('close')
                }
            });
    }
    return (
        <div>
            <Button onClick={getMsg}>click</Button>
            <div>{dat}</div>
        </div>
    )
}
export default Temp;
