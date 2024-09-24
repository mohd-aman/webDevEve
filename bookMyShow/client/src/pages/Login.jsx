import { Form, Button, Input, message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { LoginUser } from "../api/user";
export default function Login() {

  const navigate = useNavigate();
  const handleFinish = async (values)=>{
    try{
      const data = await LoginUser(values);
      if(data.success){
        message.success(data.message);
        const token = data.data;
        console.log(token);
        localStorage.setItem('token',token);
        navigate('/')
      }else{
        message.error(data.message);
      }
    }catch(err){
      message.error(err.message);
    }
    
  }
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>
          <section>
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item
                label="Email"
                name="email"
                htmlFor="email"
                className="d-block"
                rules={[{ required: true, message: "Please enter a email" }]}
              >
                <Input id="email" type="text" placeholder="Enter you email" />
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input id="password" type="password" placeholder="Enter your password" />
              </Form.Item>
              <Form.Item
                className="d-block"
              >
                <Button type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }} >
                    Login
                </Button>
              </Form.Item>
            </Form>
            <div>
                <p>
                    New User? <Link to="/register">Register</Link>
                </p>
                <p>
                  Forgot Password?<Link to="/forgot-password">Click Here</Link>
                </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}
