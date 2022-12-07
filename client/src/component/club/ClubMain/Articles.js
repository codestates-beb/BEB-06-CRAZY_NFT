import { Table, Button, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clubContents } from "api/club";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/**User
{id: , nickname: , profileurl:'}
content,
createdAt,
id,
img,
title
}
 */
const columns = [
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "닉네임",
    dataIndex: "User",
    key: "User",
    render: (tags) => <>{tags.nickname}</>,
  },
  {
    title: "작성일",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const curLoca = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubId, clubName, catagoryId, catagory } = useSelector((state) => {
    return state.club;
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(clubId, catagoryId);
      try {
        const result = await clubContents(clubId, catagoryId);
        const contents = result.data.data;
        setArticles(contents);
      } catch (error) {
        setArticles([]);
      }
    };

    fetchData();
  }, [clubId, catagoryId]);

  const selectArticle = (id) => {
    dispatch({ type: "clubSlice/selectPost", payload: { post_id: id } });
    navigate(curLoca.pathname + `/articledetail/${id}`);
  };

  return (
    <>
      <div style={{ fontSize: "25px", marginBottom: "10px" }}>
        {catagory}{" "}
        <Button
          onClick={() => navigate(`/clubmain/${clubName}/createarticle`)}
          icon={<EditOutlined />}
        >
          새 글 쓰기
        </Button>
      </div>
      <Divider />
      <Table
        onRow={(record) => {
          return {
            onClick: () => selectArticle(record.id), // click row
          };
        }}
        columns={columns}
        dataSource={articles}
      />
    </>
  );
};
export default Articles;
