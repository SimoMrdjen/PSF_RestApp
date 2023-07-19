import logo from '../logo.svg';
import React, {useState, useEffect} from 'react';
import {getAllUsers, editUser, getUsersLike} from "../api/client-api";
import {successNotification, errorNotification} from "./Notification";
import {Table, Spin, Empty, Button, Tag, Badge, Popconfirm, Radio} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UserDrawerForm from "./UserDrawerForm";
import UserEditorForm from "./UserEditorForm";
import '../App.css';
import LayoutApp from "./LayoutApp";

const onSearch = (value) => {
    console.log(value);
    //getCustomersLike(value);
};


function AdminMainForma() {

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const columnsUsers = //fetchUsers =>
        [
            {
                title: 'sifraradnika',
                dataIndex: 'sifraradnika',
                key: 'sifraradnika',
                width: 50
            },
            {
                title: 'za_sif_sekret',
                dataIndex: 'za_sif_sekret',
                key: 'za_sif_sekret',
                width: 50
            },
            {
                title: 'sif_oblast',
                dataIndex: 'sif_oblast',
                key: 'sif_oblast',
                width: 50
            },
            {
                title: 'ime',
                dataIndex: 'ime',
                key: 'ime',
                width: 150
            },
            {
                title: 'lozinka',
                dataIndex: 'lozinka',
                key: 'lozinka',
                width: 140
            },
            {
                title: 'sifra_pp',
                dataIndex: 'sifra_pp',
                key: 'sifra_pp',
                width: 150
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
                width: 90
            },
            {
                title: 'password',
                dataIndex: 'password',
                key: 'password',
                width: 120
            },
            {
                title: 'role',
                dataIndex: 'role',
                key: 'role',
                width: 200
            },
            {
                title: 'Actions ',
                dataIndex: 'actions',
                render: (text, user) =>
                    <Radio.Group>

                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure to edit customer ${user.email}`}
                            onConfirm={() => {
                                setShowEditor(!showEditor);
                                setUser(user);
                            }}
                            //add method to fetch user
                            okText='Yes'
                            cancelText='No'>
                            <Radio.Button value="small">Edit</Radio.Button>
                        </Popconfirm>

                    </Radio.Group>
                //width: 120
            }
        ];

    const fetchUsers = () =>
        getAllUsers().then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setFetching(false);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => setFetching(false));

    const fetchUsersLike = (value) =>
        getUsersLike(value).then(res => res.json())
            .then(data => {
                console.log(data);
                setUsers(data);
                setFetching(false);
            }).catch(err => {
            err.response.json().then(res => {
                errorNotification("There was an issue", `${res.message} [${res.status}] [${res.error}]`)
            });
        }).finally(() => setFetching(false));


    useEffect(() => {
        console.log("component is mounted");
        fetchUsers();

    }, []);

    const renderUsers = () => {
        if (fetching) {
            return <Spin/>
        }
        if (users.length <= 0) {
            return <>

                <UserDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchUsers={fetchUsers}
                />

                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New User
                </Button>
                <Empty/>
            </>
        }

        return <>
            <UserDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchUsers={fetchUsers}
            />
            <UserEditorForm
                showEditor={showEditor}
                setShowEditor={setShowEditor}
                fetchUsers={fetchUsers}
                user={user}
            />

            <Table
                dataSource={users}
                columns={columnsUsers}//fetchUsers)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of users</Tag>
                        <Badge count={users.length} className="site-badge-count-4"/>
                        <br/> <br/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                            Add New User
                        </Button>
                    </>
                }
                pagination={{pageSize: 10}}
                scroll={{y: 600}}
                rowKey={user => user.sifraradnika}
            />
        </>
    }
    return <LayoutApp fetchUsersLike={fetchUsersLike}
                      renderUsers={renderUsers()}/>
}

export default AdminMainForma;
