import { notification, Button } from "antd";


const openNotification = (type, message, description) => {
  const key = `${type}-${Date.now()}`;
  const commonConfig = {
    message,
    description: <pre>{description}</pre>,
    key,
    duration: 0,
  };

  notification[type](commonConfig);
};

// Specific notification types
export const successNotification = (message, description) => openNotification("success",description, message);
export const infoNotification = (message, description) => openNotification("info", description, message);
export const warningNotification = (message, description) => openNotification("warning", description, message);
export const errorNotification = (message, description) => openNotification("error", description, message);




// import { notification, Button } from "antd";
//
// const openNotificationWithIcon = (type, message, description) => {
//   notification[type]({ message, description });
// };
//
// export const successNotification = (message, description) =>
//   openNotificationWithIcon("success", message, description);
//
//
//
// export const infoNotification = (message, description) =>
//   openNotificationWithIcon("info", message, description);
//
// //export const warningNotification  = (message, description) =>
// //  openNotificationWithIcon("warning", message, description);
//
// export const warningNotification = (description, message) => {
//   const key = `warning-${Date.now()}`;
//
//   notification.warning({
//     description: <pre>{description}</pre>, // Use the pre tag to preserve new lines
//     message,
//    // description: responseText, // Use the response text directly as the description
//     key,
//     duration: 0,
//     // You can add other options as needed
//   });
// };
//   ///////
//
// export const errorNotification = (message, description) => {
//   const key = `error-${Date.now()}`;
//
// //  const closeNotification = () => {
// //    notification.close(key);
// //  };
// //
// //  const content = (
// //    <>
// //      <p>{description}</p>
// //      <Button type="primary" size="small" onClick={closeNotification}>
// //        OK
// //      </Button>
// //    </>
// //  );
// //
//   notification.error({
//     message,
//     description: <pre>{description}</pre>, // Use the pre tag to preserve new lines,
//     key,
//     duration: 0, // Set duration to 0 to make the notification sticky until manually closed
// //    btn: (
// //      <Button type="primary" size="small" onClick={closeNotification}>
// //        OK
// //      </Button>
// //    ),
//     //onClose: closeNotification, // This will handle the "close" button click event
//   });
// };
