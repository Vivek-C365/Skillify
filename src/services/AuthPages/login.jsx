import { Form, Input, Button, Checkbox, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useFirebase } from "../firebase";

const { Text, Title } = Typography;

function UserLoginForm() {
  const firebase = useFirebase();
  console.log("firebase", firebase);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <Title level={3} className="!text-2xl !mb-2">
              Welcome Back
            </Title>
            <Text className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Register <ArrowRightOutlined />
              </a>
            </Text>
          </div>

          <Form layout="vertical">
            <Form.Item label="Email Address" name="email" className="!mb-6">
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Password" name="password" className="!mb-6">
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <div className="flex justify-between items-center mb-6">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="!mb-0"
              >
                <Checkbox>Keep me logged in</Checkbox>
              </Form.Item>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password ?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!rounded-full !h-12 !text-base !font-semibold"
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-8 text-xs text-gray-500">
            <p>
              By clicking 'Log In' above, you agree to our{" "}
              <a href="#" className="underline">
                Terms of use
              </a>
              .{" "}
              <a href="#" className="underline">
                Privacy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Cookie Policy
              </a>
              . This is a protective by reCAPTCHA and the Google{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>

          <div className="flex justify-between items-center mt-8 text-xs text-gray-500">
            <span>CERTSCOPE © 2024</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">
                Help
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Banner */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-8">
          <div className="text-center">
            <Title level={3} className="!text-4xl !text-white !font-medium">
              Pursue your{" "}
              <span className="font-bold text-yellow-300">PASSION</span>
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoginForm;
