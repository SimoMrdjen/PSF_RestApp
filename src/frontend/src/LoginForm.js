
import { Button, Checkbox, Form, Input, Layout, Image } from 'antd';
import { login } from './client';
import logo from './APV.png';
import {useContext, useState} from 'react';
import AuthContext from './context/AuthProvider';

const { Content, Footer } = Layout;

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const [form] = Form.useForm(); // Add this line to create a form instance
  const [access_token, setAToken] = useState('');


  const onFinish = async (values) => {

      const res = await login(values).then(res => res.json())
          .then(data => {
            console.log("Ovo je iz f-je login", data);
            setAToken(data.access_token);
            console.log("Ovo je iz token login", access_token);

          }).catch(err => {
            err.response.json().then(res => {
            });
          }).finally();  //form.resetFields());

        console.log("Ovo je response from onFinish", access_token);
       //const { access_token, refresh_token} = response;
       const { email, password} = values;
      // Set the auth context value
      setAuth({ email, password, access_token });

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
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
          <Form.Item
            label="Korisnicko ime: "
            name="email"
            rules={[
              {
                required: true,
                message: 'Molimo unesite korisnicko ime!',
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
                message: 'Molimo unesite lozinku!!',
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

      <Footer style={{ textAlign: 'center' }}>
        <Image width={500} src={logo} />
      </Footer>
    </Layout>
  );
};

export default LoginForm;