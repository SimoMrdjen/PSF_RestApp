import logo from "../logo.svg";
import React, { useState, useEffect } from "react";
import { getAllUsers, editUser, getUsersLike } from "../api/client-api";
import { successNotification, errorNotification } from "./Notification";
import {
  Table,
  Spin,
  Empty,
  Button,
  Tag,
  Badge,
  Popconfirm,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UserDrawerForm from "./UserDrawerForm";
import UserEditorForm from "./UserEditorForm";
import "../App.css";
import LayoutApp from "./LayoutApp";

const onSearch = (value) => {
  console.log(value);
  //getCustomersLike(value);
};

function AdminMainForma({ access_token }) {
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const columnsUsers =
    //fetchUsers =>
    [
      {
        title: "Sifra",
        dataIndex: "sifraradnika",
        key: "sifraradnika",
        width: 100,
      },
      {
        title: "Sekr.",
        dataIndex: "za_sif_sekret",
        key: "za_sif_sekret",
        width: 100,
      },
      {
        title: "Oblast",
        dataIndex: "sif_oblast",
        key: "sif_oblast",
        width: 100,
      },
      {
        title: "Ime",
        dataIndex: "ime",
        key: "ime",
        width: 150,
      },
      {
        title: "Lozinka",
        dataIndex: "lozinka",
        key: "lozinka",
        width: 140,
      },
      {
        title: "Ind.Kor.",
        dataIndex: "sifra_pp",
        key: "sifra_pp",
        width: 100,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 200,
      },
      {
        title: "password",
        dataIndex: "password",
        key: "password",
        width: 120,
      },

      {
        title: "Actions ",
        dataIndex: "actions",
        render: (text, user) => (
          <Radio.Group>
            <Popconfirm
              placement="topRight"
              title={`Are you sure to edit customer ${user.email}`}
              onConfirm={() => {
                setShowEditor(!showEditor);
                setUser(user);
              }}
              //add method to fetch user
              okText="Yes"
              cancelText="No"
            >
              <Radio.Button value="small">Edit</Radio.Button>
            </Popconfirm>
          </Radio.Group>
        ),
        //width: 120
      },
    ];

  const fetchUsers = (access_token) =>
    getAllUsers(access_token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setFetching(false);
      })
      .catch((err) => {
        err.response.json().then((res) => {
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`,
          );
        });
      })
      .finally(() => setFetching(false));

  const fetchUsersLike = (value, access_token) =>
    getUsersLike(value, access_token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setFetching(false);
      })
      .catch((err) => {
        err.response.json().then((res) => {
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`,
          );
        });
      })
      .finally(() => setFetching(false));

  useEffect(() => {
    console.log("component is mounted");
    fetchUsers(access_token);
  }, []);

  const renderUsers = () => {
    if (fetching) {
      return <Spin />;
    }
    if (users.length <= 0) {
      return (
        <>
          <UserDrawerForm
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            fetchUsers={fetchUsers}
            access_token={access_token}
          />

          <Button
            onClick={() => setShowDrawer(!showDrawer)}
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size="small"
          >
            Add New User
          </Button>
          <Empty />
        </>
      );
    }

    return (
      <>
        <UserDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchUsers={fetchUsers}
          access_token={access_token}
        />
        <UserEditorForm
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          fetchUsers={fetchUsers}
          user={user}
          access_token={access_token}
        />

        <Table
          dataSource={users}
          columns={columnsUsers} //fetchUsers)}
          bordered
          title={() => (
            <>
              <Tag>Number of users</Tag>
              <Badge count={users.length} className="site-badge-count-4" />
              <br /> <br />
              <Button
                onClick={() => setShowDrawer(!showDrawer)}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="small"
              >
                Add New User
              </Button>
            </>
          )}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 600 }}
          rowKey={(user) => user.sifraradnika}
        />
      </>
    );
  };
  return (
    <LayoutApp fetchUsersLike={fetchUsersLike} renderUsers={renderUsers()} />
  );
}

export default AdminMainForma;
