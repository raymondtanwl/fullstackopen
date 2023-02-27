export const EnumNotifType = {
  SuccessNotif: 1,
  ErrorNotif: -1,
};
const Notification = (props) => {
  if (
    props.errorMessage === null ||
    props.errorMessage.message === null ||
    props.errorMessage.message === undefined ||
    props.errorMessage.message.length === 0
  ) {
    return null;
  }

  const { message, type } = props.errorMessage;
  const notifStyle = type === EnumNotifType.ErrorNotif ? "error" : "success";

  return <div className={"notification " + notifStyle}>{message}</div>;
};

export default Notification;
