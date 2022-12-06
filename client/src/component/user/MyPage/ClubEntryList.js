import { List, Avatar, message, Collapse } from "antd";
import { useSelector } from "react-redux";
import { clubEntry, clubEntryList, myAdminClub } from "api/my";
import React, { useState, useEffect } from "react";
const { Panel } = Collapse;

const ClubEntryList = () => {
  const [club, setClub] = useState([]);
  const [entry, setEntry] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const admin = await myAdminClub(address);
        setClub(admin.data.data);
        console.log("클럽승인 확인", admin.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [address]);

  const onChange = async (key) => {
    if (!!key) {
      const list = await clubEntryList(address, key);
      console.log(list.data.data.signup_list);
      setEntry(list.data.data.signup_list);
      console.log(entry);
    }
  };

  const acceptEntry = async (id, userAddress, clubId) => {
    try {
      await clubEntry(address, clubId);
      console.log("test", address, clubId);
      message.success("승인 됐습니다");
      //제거
      setEntry(entry.filter((el) => el.id !== id));
    } catch (error) {
      message.error("승인이 실패 했습니다");
    }
  };

  return (
    <>
      <Collapse accordion onChange={onChange}>
        {club.map((item) => (
          <Panel header={item.title} key={item.id}>
            <List
              size="large"
              dataSource={entry}
              renderItem={(el) => (
                <List.Item style={{ border: "1px solid gray" }}>
                  <List.Item.Meta
                    avatar={<Avatar src={el.profileurl} />}
                    title={<p>{el.nickname}</p>}
                    description={el.createdAt}
                  />
                  <div>
                    가입:{" "}
                    <button
                      onClick={() => acceptEntry(el.id, el.address, item.id)}
                    >
                      승인
                    </button>
                  </div>
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
export default ClubEntryList;
