import { useContext } from "react";
import NotificationContext from "../components/NotificationContext";

const useNotify = () => useContext(NotificationContext);

export default useNotify;
