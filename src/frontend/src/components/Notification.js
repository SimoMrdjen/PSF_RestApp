import { notification, Button } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({ message, description });
};

export const successNotification = (message, description) =>
  openNotificationWithIcon("success", message, description);



export const infoNotification = (message, description) =>
  openNotificationWithIcon("info", message, description);

export const warningNotification  = (message, description) =>
  openNotificationWithIcon("warning", message, description);

  ///////

export const errorNotification = (message, description) => {
  const key = `error-${Date.now()}`;

//  const closeNotification = () => {
//    notification.close(key);
//  };
//
//  const content = (
//    <>
//      <p>{description}</p>
//      <Button type="primary" size="small" onClick={closeNotification}>
//        OK
//      </Button>
//    </>
//  );
//
  notification.error({
    message,
       //description: content,
    key,
    duration: 0, // Set duration to 0 to make the notification sticky until manually closed
//    btn: (
//      <Button type="primary" size="small" onClick={closeNotification}>
//        OK
//      </Button>
//    ),
    //onClose: closeNotification, // This will handle the "close" button click event
  });
};
