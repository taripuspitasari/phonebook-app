import Notification from "./Notification";

const LoginForm = ({
  handleLogin,
  username,
  usernameChangeHandler,
  password,
  passwordChangeHandler,
  message,
}) => {
  return (
    <div className="loginForm">
      <h2>Log in</h2>
      <Notification message={message} />
      <p>Enter your details to get sign in to your account</p>
      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="Username"
            type="text"
            value={username}
            name="Username"
            onChange={usernameChangeHandler}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            name="Password"
            onChange={passwordChangeHandler}
          />
        </div>
        <button type="submit">Sign In</button>
        <p>Don&apos;t have an account? Sign up Now</p>
      </form>
    </div>
  );
};

export default LoginForm;
