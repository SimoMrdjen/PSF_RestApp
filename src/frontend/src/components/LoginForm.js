import { Button, Checkbox, Form, Input, Layout, Image } from "antd";
import { login } from "../api/client-api";
import logo from "../APV.png";
import { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {errorNotification, successNotification} from "./Notification";


const { Content, Footer } = Layout;

const LoginForm = ({ onLogin, access_token, setAccessToken, role, setRole }) => {
  const { setAuth } = useAuth();
  const [form] = Form.useForm(); // Add this line to create a form instanc
  const [message, setMessage] = useState("");

  const onFinish = async (values) => {
    const res = await login(values)
      .then((res) => res.json())
      .then((data) => {
        console.log("Ovo je iz f-je login", data);
        setAccessToken(data.access_token);
        console.log("Ovo je iz token login", access_token);
        setRole(data.role);
        onLogin(true);
         localStorage.removeItem("token");
        localStorage.setItem("token", data.access_token);
      })
      .catch((err) => {
        //err.response.json().then((res) => {});
        onLogin(false);
        errorNotification("Pogresno ste uneli korisnicko ime ili lozinku!");
        //setMessage("Pogresno ste uneli korisnicko ime ili lozinku!");
      })
      .finally(); //form.resetFields());

    console.log("Ovo je response from onFinish", access_token);
    //const { access_token, refresh_token} = response;
    const { email, password } = values;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const handleInputChange = () => {
    setMessage(""); // Clear the message when the user starts entering letters
  };


  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Form
          form={form} // Assign the form instance to the form prop
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 32 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <span>
            {" "}
            <h3>{message}</h3>
          </span>
          <br />
          <Form.Item
            label="Korisnicko ime: "
            name="email"
            rules={[
              {
                required: true,
                message: "Molimo unesite korisnicko ime!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lozinka"
            name="password"
            rules={[
              {
                required: true,
                message: "Molimo unesite lozinku!!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 24 }}>
            <Button type="primary" htmlType="submit">
              Prijava
            </Button>
          </Form.Item>
        </Form>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        <Image width={500} src={logo} />
      </Footer>
    </Layout>
  );
};

export default LoginForm;
