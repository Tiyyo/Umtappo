import { Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/Context/UserContextProvider";
import LoaderUI from "../components/Loader/LoaderUI";

const LoginLayout = () => {
  const { authIsLoading } = useContext(UserContext);

  return authIsLoading ? (
    <LoaderUI position={"fixed"} />
  ) : (
    <div className="log">
      <Outlet />
      <div className="log__logo">
        <h1>
          Umpt<span>a</span>ppo
        </h1>
      </div>
    </div>
  );
};

export default LoginLayout;
