//import { Button, Checkbox, Form, Input, Layout, Image } from 'antd';
//import { login } from './client';
//import logo from './APV.png';
//
//const { Content, Footer } = Layout;
//
////const onFinish = (values) => {
////  login(values);
////   // console.log('Response:', response);
////  console.log('Success:', values);
////};
//
//const onFinish = async (values) => {
//  try {
//    const response = await login(values);
//    console.log('Success:', values);
//    console.log(JSON.stringify(response));
//  } catch (error) {
//    console.log('Error:', error);
//  }
//};
//
//
//const onFinishFailed = (errorInfo) => {
//  console.log('Failed:', errorInfo);
//};
//
//const LoginForm = () => (
//  <Layout>
//    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//      <Form
//        name="basic"
//        labelCol={{ span: 12 }}
//        wrapperCol={{ span: 32 }}
//        style={{ maxWidth: 800}}
//        initialValues={{ remember: true }}
//        onFinish={onFinish}
//        onFinishFailed={onFinishFailed}
//        autoComplete="off"
//      >
//        <Form.Item
//          label="Korisnicko ime: "
//          name="email"
//          rules={[
//            {
//              required: true,
//              message: 'Molimo unesite korisnicko ime!',
//            },
//          ]}
//        >
//          <Input />
//        </Form.Item>
//
//        <Form.Item
//          label="Lozinka"
//          name="password"
//          rules={[
//            {
//              required: true,
//              message: 'Molimo unesite lozinku!!',
//            },
//          ]}
//        >
//          <Input.Password />
//        </Form.Item>
//
//        <Form.Item wrapperCol={{ offset: 12, span: 24 }}>
//          <Button type="primary" htmlType="submit">
//            Prijava
//          </Button>
//        </Form.Item>
//      </Form>
//    </Content>
//
//    <Footer style={{ textAlign: 'center' }}>
//      <Image width={500} src={logo} />
//    </Footer>
//  </Layout>
//);
//
//export default LoginForm;

import { Button, Checkbox, Form, Input, Layout, Image } from 'antd';
import { login } from './client';
import logo from './APV.png';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';

const { Content, Footer } = Layout;

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const [form] = Form.useForm(); // Add this line to create a form instance


  const onFinish = async (values) => {
    try {
      const response = await login(values);
      console.log('Success:', values);
      console.log('Response:', response);

      // Extract email, password, and accessToken from the response
     // const { email, password, access_token } = response;
      console.log("Print email", email);
    // Extract the access_token from the response
   // const { access_token } = response.data;

//    if (response && response.access_token) {
//      // Extract the access_token from the response
//      const { access_token } = response;
//      console.log('Access Token:', access_token);
//    } else {
//      console.log('Access Token not found in response.');
//    }

      // Set the auth context value
      //setAuth({ email, password, access_token });
    } catch (error) {
      console.log('Error:', error);
    } finally {
           // Reset the form fields
           //form.resetFields();
         }
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
