import SideBar from "@/container/Sidebar";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "18% 82%",
        // gap: "40px",
        height: "100%",
      }}
    >
      <SideBar />
      <div>{children}</div>
    </div>
  );
}
