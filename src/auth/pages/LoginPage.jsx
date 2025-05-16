import Signup from "./AuthFirebase";
import Analytics from "../../assets/images/svg/13246824_5191077.svg";

function LoginPage() {
  return (
    <Signup
      title="Welcome Back"
      credentials="Please enter your credentials"
      subtitle="Please enter your credentials."
      // onSuccessPath="/"
      type="Login"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkPath="/signup"
      analyticsImage={Analytics}
    />
  );
}

export default LoginPage;
