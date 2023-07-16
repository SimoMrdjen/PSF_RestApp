import { Button, Checkbox, Form, Input, Layout, Image } from "antd";
import { login } from "../api/client-api";
import logo from "../APV.png";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";

const { Content, Footer } = Layout;

const LoginForm = ({ onLogin, access_token, setAccessToken }) => {
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

        onLogin(true);
      })
      .catch((err) => {
        err.response.json().then((res) => {});
        onLogin(false);
        setMessage("Pogresno ste uneli korisnicko ime ili lozinku!");
      })
      .finally(); //form.resetFields());

    console.log("Ovo je response from onFinish", access_token);
    //const { access_token, refresh_token} = response;
    const { email, password } = values;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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