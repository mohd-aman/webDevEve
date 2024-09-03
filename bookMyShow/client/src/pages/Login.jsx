import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>
          <section>
            <Form layout="vertical">
              <Form.Item
                label="Email"
                htmlFor="email"
                className="d-block"
                rules={[{ required: true, message: "Please enter a email" }]}
              >
                <Input id="email" type="text" placeholder="Enter you email" />
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                className="d-block"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input id="password" type="text" placeholder="Enter your password" />
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
            </div>
          </section>
        </main>
      </header>
    </>
  );
}
