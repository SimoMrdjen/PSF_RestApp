import { Drawer, Input, Col, Select, Form, Row, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { addNewUser } from "../api/client-api";
import { useState,useEffect } from "react";
import { successNotification, errorNotification } from "./Notification.js";

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UserDrawerForm({ showDrawer, setShowDrawer, fetchUsers , access_token}) {
  const onCLose = () => setShowDrawer(false);
  const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      console.log("Drawer is mounted");
      //fetchUsers(access_token);
      console.log("Token fro AddUser : ", access_token);
    }, []);


  const onFinish = (user) => {
    setSubmitting(true);
    //console.log(JSON.stringify(user, null, 2));
    console.log("Token:", access_token);
    addNewUser(user, access_token)
      .then(() => {
        console.log("User added");
        onCLose();
        successNotification(
          "User successfully added",
          `${user.email} was added`,
        );
        fetchUsers(access_token);
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
        err.response.json().then((res) => {
          console.log(res);
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`,
            "bottomLeft",
          );
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };

  return (
    <Drawer
      title="Create new user"
      width={720}
      onClose={onCLose}
      destroyOnClose={true}
      visible={showDrawer}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCLose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >

      <Form
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        //access_token = {access_token}
        hideRequiredMark
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="sifraradnika"
              label="Sifra Radnika"
              rules={[{ required: true, message: "Please enter sifraradnika" }]}
            >
              <Input placeholder="Please enter sifra radnika" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="za_sif_sekret"
              label="za_sif_sekret"
              rules={[
                { required: true, message: "Please enter za_sif_sekret" },
              ]}
            >
              <Input placeholder="Please enter za_sif_sekret" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sif_oblast"
              label="sif_oblast"
              rules={[{ required: true, message: "Please enter sif_oblast" }]}
            >
              <Input placeholder="Please enter sif_oblast" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={20}>
            <Form.Item
              name="ime"
              label="ime"
              rules={[{ required: true, message: "Please enter ime" }]}
            >
              <Input placeholder="Please enter ime" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={25}>
            <Form.Item
              name="lozinka"
              label="lozinka"
              rules={[{ required: true, message: "Please enter lozinka" }]}
            >
              <Input placeholder="Please enter lozinka" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="sifra_pp"
              label="sifra_pp"
              rules={[{ required: true, message: "Please enter sifra_pp" }]}
            >
              <Input placeholder="Please enter sifra_pp" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: false, message: "Please enter password" }]}
            >
              <Input placeholder="Please enter password" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: false, message: "Please enter role" }]}
            >
              <Input placeholder="Please enter role" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>{submitting && <Spin indicator={antIcon} />}</Row>
      </Form>
    </Drawer>
  );
}

export default UserDrawerForm;
