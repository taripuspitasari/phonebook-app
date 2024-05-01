const Notification = ({message}) => {
  if (message === null) {
    return null;
  }
  if (
    message.includes("deleted") ||
    message.includes("failed") ||
    message.includes("Wrong")
  ) {
    return <div className="notification error">{message}</div>;
  } else if (message.includes("added") || message.includes("changed")) {
    return <div className="notification success">{message}</div>;
  }
};

export default Notification;
