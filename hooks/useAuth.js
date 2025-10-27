import { useContext } from "react";
import AuthContext from "../context/authprovide";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;