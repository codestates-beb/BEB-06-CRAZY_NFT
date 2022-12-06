import { Button, Divider,Form, List,Input,Avatar } from 'antd';
import { HeartTwoTone,MessageOutlined } from '@ant-design/icons';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDetail,getCommLike,postCommWrite } from '../../api/club';
const { TextArea } = Input;
const initArti={
    id: 0,
    title: "",
    content: "",
    img: "",
    createdAt: "",
    user: "",
    comment: [],
    like_num: 0,
};
const ArticleDetail =()=>{
    const [article,setArticle]=useState(initArti);
    const {address,nickname,isLogin}=useSelector((state) =>{
        return state.account;
    });
    const {post_id}=useSelector((state) =>{
        return state.club;
    });
    const fetchData = async () => {
        try {
            const contents=await getDetail(post_id);
            setArticle(contents.data.data);
            console.log(contents.data.data);
        } catch (error) {
            console.log(error);
        }
    
    };
    useEffect(() => {
        fetchData();
    },[]);

    const clickLike=async()=>{
        try {
            const like=await getCommLike(post_id,address);
            setArticle({...article,like_num:like.data.data.like_num});
        } catch (error) {
            console.log(error);
        }
        
    };
    const onFinish = async(values) => {
        try {
            await postCommWrite({ address, post_id, content:values.content });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
        
        
      };
      const fail = (values)=>{
        console.log(values);
      }
    return (
        <div >
            {/*글정보 범위*/}
            <div style={{fontSize:"30px"}}>{article.title}</div>
            <div><Avatar src={article.user.profileurl} />{article.user.nickname}</div>
            <div>{article.createdAt}<MessageOutlined />{article.comment.length}</div>
            <Divider />
            {/*콘탠츠 범위*/}
            <div style={{marginBottom:"20px"}}>{article.content}</div>
            <div onClick={clickLike} style={{fontSize:"12px"}}><HeartTwoTone twoToneColor="#eb2f96" />좋아요{article.like_num}</div>
            <Divider />
            {/**댓글 범위 */}
            <div style={{ fontSize: "17px",marginBottom:"10px",fontWeight:"bold"}}>댓글</div>
            <List
                itemLayout="horizontal"
                dataSource={article.comment}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.User.profileurl} />}
                    title={<p>{item.User.nickname}</p>}
                    description={item.content}
                    />
                </List.Item>
                )}
            />
            {/**댓글 작성 */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{background:"#ffffff",border:"1px solid #8a1dde3d",padding:"20px 20px 0px 20px"}}
                onFinish={onFinish}
                onFinishFailed={fail}
                autoComplete="off"
                disabled={!isLogin}
            >
                {nickname}
            <Form.Item
                name="content"
                rules={[
                {
                    required: true,
                },
                ]}
            >
            <TextArea
                showCount
                maxLength={100}
                bordered={false}
                style={{resize:"none",width:"870px"}}
                placeholder="댓글을 남겨 보세요"
                rows={2}
            />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">
                    등록
                </Button>
            </Form.Item>
            
            </Form>
        </div>   
        
    );
};
export default ArticleDetail;
