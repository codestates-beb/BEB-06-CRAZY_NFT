import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { publishArticle } from '../../api/club';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const CreateArticle =()=>{
    const navigate=useNavigate();
    const address=useSelector((state) =>{
        return state.account.address;
    });
    const {clubId,clubName}=useSelector((state) =>{
        return state.club;
    });
    const onFinish = async(values) => {
        const newArti={ ...values,address:address, club_id:clubId };
        await publishArticle(newArti);
        navigate(`/clubmain/${clubName}`);
      };
      return (
        <Form  name="nest-messages" onFinish={onFinish} >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="제목"/>
          </Form.Item>
            <Form.Item label="Catagory" name="category_id">
                <Select>
                <Select.Option value={1}>공지사항</Select.Option>
                <Select.Option value={2}>Q&A</Select.Option>
                <Select.Option value={3}>자유게시판</Select.Option>
                <Select.Option value={4}>클럽 활동</Select.Option>
                <Select.Option value={5}>레어글</Select.Option>
                <Select.Option value={6}>슈퍼레어글</Select.Option>
                </Select>
            </Form.Item>
          <Form.Item name={'content'} label="본문">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
};
export default CreateArticle;