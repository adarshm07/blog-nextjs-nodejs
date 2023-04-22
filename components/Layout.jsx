import SideBar from "@/container/Sidebar";
import AuthWrapper from "./AuthWrapper";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "14% 86%",
        // gap: "40px",
        height: "100%",
      }}
    >
      <SideBar />
      <div>{children}</div>
    </div>
  );
}

export default AuthWrapper(Layout);
