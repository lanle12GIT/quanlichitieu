import { Outlet } from "react-router-dom";
import Header from "./layout/header";
import Notifications from "./component/EventSource";

const App = () => {
  return (
    <>
      <Header />
      <Notifications/>
      <Outlet />
    </>
  );
};

export default App;
