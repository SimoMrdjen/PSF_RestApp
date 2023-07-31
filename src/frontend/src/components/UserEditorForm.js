import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {editUser} from "../api/client-api";
import {useEffect, useState} from 'react';
import {successNotification, errorNotification} from './Notification.js';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


function UserEditorForm({showEditor, setShowEditor, fetchUsers, user, access_token}) {
    const onCLose = () => setShowEditor(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      console.log("Drawer is mounted");
      //fetchUsers(access_token);
      console.log("Token fro Edit : ", access_token);
    }, []);
    const onFinish = (userEdit, access_token) => {
        setSubmitting(true)
        console.log(JSON.stringify(user, null, 2))
        console.log("Token:", access_token)
        editUser(userEdit, access_token)
            .then(() => {
                console.log("User Edited")
                onCLose();
                successNotification(
                    "User successfully edited",
                    `${userEdit.email} was edited`
                )
                fetchUsers(access_token);
            }).catch(err => {
            console.log(err);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
            });
        }).finally(() => {
            setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Edit"
        destroyOnClose={true}
        width={720}
        onClose={onCLose}
        visible={showEditor}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              initialValues={user}
              hideRequiredMark>

  <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="sifraradnika"
                        label="sifraradnika"
                        rules={[{required: true, message: 'Please enter sifraradnika'}]}
                    >
                        <Input placeholder="Please enter sifra radnika"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="za_sif_sekret"
                        label="za_sif_sekret"
                        rules={[{required: true, message: 'Please enter za_sif_sekret'}]}
                    >
                        <Input placeholder="Please enter za_sif_sekret"/>
                    </Form.Item>
                </Col>
                 <Col span={12}>
                     <Form.Item
                         name="sif_oblast"
                         label="sif_oblast"
                         rules={[{required: true, message: 'Please enter sif_oblast'}]}
                     >
                         <Input placeholder="Please enter sif_oblast"/>
                     </Form.Item>
                 </Col>
            </Row>

            <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="ime"
                        label="ime"
                        rules={[{required: true, message: 'Please enter ime'}]}
                    >
                        <Input placeholder="Please enter ime"/>

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={25}>
                    <Form.Item
                        name="lozinka"
                        label="lozinka"
                        rules={[{required: true, message: 'Please enter lozinka'}]}
                    >
                        <Input placeholder="Please enter lozinka"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="sifra_pp"
                        label="sifra_pp"
                        rules={[{required: true, message: 'Please enter sifra_pp'}]}
                    >
                        <Input placeholder="Please enter sifra_pp"/>
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item
                        name="email"
                        label="email"
                        rules={[{required: true, message: 'Please enter email'}]}
                    >
                        <Input placeholder="Please enter email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="password"
                        label="password"
                        rules={[{required: false, message: 'Please enter password'}]}
                    >
                        <Input placeholder="Please enter password"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="role"
                        label="role"
                        rules={[{required: false, message: 'Please enter role'}]}
                    >
                        <Input placeholder="Please enter role"/>
                    </Form.Item>
                </Col>
            </Row>            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon}/>}
            </Row>
        </Form>
    </Drawer>
}

export default UserEditorForm;