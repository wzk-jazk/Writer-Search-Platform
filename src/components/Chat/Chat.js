// import axios from "axios";
// import {Button, Card, Input} from "antd";
// import {useState} from "react";
// import {fetchEventSource} from "@microsoft/fetch-event-source";
// const {Search} = Input;
// const AK = "YpTzxnFlUBopLXtzfWwunVZL"
// const SK = "8VfpMYnGoPFz6SlG8TvZtTPOqX3ZTRhy"
// const Chat =() =>{
//     const [load, setLoad] = useState(false)
//     const [answer, setAnswer] = useState([])//存放请求返回的问题答案
//     //生成签名信息
//     const postData = async () => {
//         const url = '/api1/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK;
//         try {
//             const response = await axios.post(url, {
//
//             });
//             const data = response.data
//             return data.access_token
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     //利用签名来调用api来生成回答
//     const getMsg =async (value) => {
//         const token = await postData();
//         const url = `/api1/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${token}`;
//         setAnswer([])//初始化清空界面
//         const eventSource = await fetchEventSource(url,{
//             method:'POST',
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({
//                 messages:[
//                     {
//                         role:'user',
//                         content:value
//                     }
//                 ],
//                 stream:true         //获取流式输出
//             }),
//             onmessage(e){
//                 setAnswer(prevMessages => [...prevMessages, JSON.parse(e.data).result]);
//                 console.log(JSON.parse(e.data))
//             },
//             onclose(){
//                 setLoad(false)
//             }
//         })
//     }
//     const onSearch =async (value, _e) => {
//         setLoad(true)
//         getMsg(value)
//     }
//     return (
//         <div>
//             <Search placeholder="输入问题" enterButton="搜索" size="middle" onSearch={onSearch} loading={load}/>
//             <Card>
//                 <div style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'Microsoft YaHei'}}>
//                     {answer.join('')}
//                 </div>
//             </Card>
//         </div>
//     )
// }
// export default Chat;
import axios from "axios";
import { Button, Card, Input } from "antd";
import { useState, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const { Search } = Input;
const AK = "YpTzxnFlUBopLXtzfWwunVZL";
const SK = "8VfpMYnGoPFz6SlG8TvZtTPOqX3ZTRhy";

const Chat = () => {
    const [load, setLoad] = useState(false);
    const [answer, setAnswer] = useState([]); // 存放请求返回的问题答案
    const [displayedAnswer, setDisplayedAnswer] = useState(""); // 存放逐字显示的答案
    const [finish, setFinish] = useState(false)//是否获得全部的结果


    // 生成签名信息
    const postData = async () => {
        const url =
            "/api1/oauth/2.0/token?grant_type=client_credentials&client_id=" +
            AK +
            "&client_secret=" +
            SK;
        try {
            const response = await axios.post(url, {});
            const data = response.data;
            return data.access_token;
        } catch (error) {
            console.error(error);
        }
    };

    // 利用签名来调用api来生成回答
    const getMsg = async (value) => {
        const token = await postData();
        const url = `/api1/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${token}`;
        setAnswer([]); // 初始化清空界面
        setDisplayedAnswer(""); // 初始化清空逐字显示的答案
        setFinish(false);
        const eventSource = await fetchEventSource(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "user",
                        content: value,
                    },
                ],
                stream: true, // 获取流式输出
            }),
            onmessage(e) {
                const newAnswer = JSON.parse(e.data).result;
                setAnswer((prevMessages) => [...prevMessages, newAnswer]);
            },
            onclose() {
            },
        });
    };

    useEffect(() => {
        let timer;
        if (answer.length > 0) {
            const text = answer.join("");
            let index = displayedAnswer.length;
            timer = setInterval(() => {
                if (index < text.length) {
                    index++;
                    setDisplayedAnswer((prevAnswer) => prevAnswer + text[index-1]);
                } else {
                    clearInterval(timer);
                    if(index > 10){
                        setLoad(false)
                    }
                }
            }, 50);
        }

        return () => {
            clearInterval(timer);
        };
    }, [answer]);

    const onSearch = async (value, _e) => {
        setLoad(true);
        getMsg(value);
    };

    return (
        <div>
            <Search
                placeholder="输入问题"
                enterButton="搜索"
                size="middle"
                onSearch={onSearch}
                loading={load}
            />
            <Card>
                <div
                    style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        fontFamily: "Microsoft YaHei",
                    }}
                >
                    {displayedAnswer}
                </div>
            </Card>
        </div>
    );
};

export default Chat;
