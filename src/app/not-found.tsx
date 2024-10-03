import ErrorModal from "./components/ErrorModal";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <ErrorModal error={["OOPS! Page Not Found."]} isNotDismissable={true} />
  );
};

export default NotFound;
