import { Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/Context/UserContextProvider";
import LoaderUI from "../components/Loader/LoaderUI";

const LoginLayout = () => {
  const { authIsLoading } = useContext(UserContext);

  return authIsLoading ? (
    <LoaderUI />
  ) : (
    <div className="log">
      <Outlet />
      <div className="log__logo">
        <h1>MovAPP</h1>
      </div>
    </div>
  );
};

export default LoginLayout;
