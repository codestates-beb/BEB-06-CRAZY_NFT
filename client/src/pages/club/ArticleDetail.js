import { Divider } from 'antd';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDetail } from '../../api/club';
/**“title” : <post title>, 
    “content”:<nickname>, 
    “nickname”:<회원 nick name>, 
    “create_at”: <작성일>,
    “like_num” : <좋아요 카운트>,
    “comment”: [ 
                              { “nickname”:<댓글 작성자 nick name>,  “content”:<댓글 내용> },
                                …,
                               { “nickname”:<댓글 작성자 nick name>,  “content”:<댓글 내용> }
                          ] */
const ArticleDetail =()=>{
    const [article,setArticle]=useState({});
    const {post_id}=useSelector((state) =>{
        return state.club;
    });
    useEffect(() => {

        const fetchData = async () => {
        const contents=await getDetail(post_id);
        
        setArticle(contents.data.data);
        };

        fetchData();
    }, []);
    return (
        <div>
            <div>article</div>
            <Divider />
            <div>Content</div>
            <Divider />
            <div>comments</div>
        </div>   
        
    );
};
export default ArticleDetail;