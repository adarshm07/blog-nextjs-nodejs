import React, { useState } from "react";
import toggleOff from "@/public/assets/images/toggle_off.svg";
import toggleOn from "@/public/assets/images/toggle_on.svg";
import { useRouter } from "next/router";
import { IconDashboard, IconPencil } from "@tabler/icons-react";

export default function SideBar() {
  const router = useRouter();

  const [addClasss, setAddclasses] = useState(false);
  const [addClasss2, setAddclasses2] = useState(false);
  return (
    <>
      <div
        className={addClasss ? "menu_dropshadow show" : "menu_dropshadow"}
        onClick={() => setAddclasses(false)}
      ></div>

      <div
        id="navigation"
        className={
          addClasss
            ? addClasss2
              ? "sidebar off"
              : "sidebar mobileOn"
            : addClasss2
            ? "sidebar off"
            : "sidebar"
        }
      >
        <div className="logo">
          <a hef="dashboard.html">
            <span className="logo_text" style={{ fontSize: "20px" }}>
              Foster
            </span>
          </a>
          <button
            className="toggle for-desktop-btn"
            onClick={() => {
              setAddclasses(!addClasss);
              setAddclasses2(!addClasss2);
            }}
          >
            <img src={addClasss && addClasss2 ? toggleOff : toggleOn} alt="" />
          </button>
          <button
            className="toggle for-mobile-btn"
            onClick={() => setAddclasses(!addClasss)}
          >
            {/* <img src={toggleOff} alt="" /> */}
          </button>
        </div>
        <div className="navi">
          <ul>
            <li
              className={
                router.pathname.toLowerCase().includes("/dashboard") &&
                !router.pathname.toLowerCase().includes("/dashboard/posts")
                  ? "active"
                  : null
              }
            >
              <a href="#" onClick={() => router.push("/dashboard")}>
                <IconDashboard />
                <span className="ml-2">Dashboard</span>
              </a>
            </li>
            <li
              className={
                router.pathname.toLowerCase().includes("/dashboard/posts")
                  ? "active"
                  : null
              }
            >
              <a href="#" onClick={() => router.push("/dashboard/posts")}>
                <IconPencil /> <span className="ml-2">Posts</span>
              </a>
            </li>
            <li
              className={
                router.pathname
                  .toLowerCase()
                  .includes("/dashboard/testimonials")
                  ? "active"
                  : null
              }
            >
              <a
                href="#"
                onClick={() => router.push("/dashboard/testimonials")}
              >
                <IconPencil /> <span className="ml-2">Testimonials</span>
              </a>
            </li>
          </ul>
          <a href="/logout" className="logout">
            <i className="las la-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div className="mobile_menu">
        <button className="toggle" onClick={() => setAddclasses(!addClasss)}>
          <i className="las la-bars"></i>
        </button>
        <div className="brand">
          {/* <img src={brand} alt="" className="logo_icon" /> */}
          <span className="logo_text">Foster</span>
        </div>
      </div>
    </>
  );
}
