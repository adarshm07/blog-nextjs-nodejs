import React, { useState } from "react";
import toggleOff from "@/public/assets/images/toggle_off.svg";
import toggleOn from "@/public/assets/images/toggle_on.svg";
import { useRouter } from "next/router";
import {
  IconDashboard,
  IconFile,
  IconLogout,
  IconPencil,
  IconUsers,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/loginSlice";

export default function SideBar() {
  const router = useRouter();
  const dispatch = useDispatch();

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
                !router.pathname.toLowerCase().includes("/dashboard/posts") &&
                !router.pathname
                  .toLowerCase()
                  .includes("/dashboard/testimonials") &&
                !router.pathname.toLowerCase().includes("/dashboard/logo") &&
                !router.pathname
                  .toLowerCase()
                  .includes("/dashboard/portfolio") &&
                !router.pathname.toLowerCase().includes("/dashboard/contacts")
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
                <IconUsersGroup /> <span className="ml-2">Testimonials</span>
              </a>
            </li>
            <li
              className={
                router.pathname.toLowerCase().includes("/dashboard/logo")
                  ? "active"
                  : null
              }
            >
              <a href="#" onClick={() => router.push("/dashboard/logo")}>
                <IconWorld /> <span className="ml-2">Logo</span>
              </a>
            </li>
            <li
              className={
                router.pathname.toLowerCase().includes("/dashboard/portfolio")
                  ? "active"
                  : null
              }
            >
              <a href="#" onClick={() => router.push("/dashboard/portfolio")}>
                <IconFile /> <span className="ml-2">Portfolio</span>
              </a>
            </li>
            <li
              className={
                router.pathname.toLowerCase().includes("/dashboard/contacts")
                  ? "active"
                  : null
              }
            >
              <a href="#" onClick={() => router.push("/dashboard/contacts")}>
                <IconUsers /> <span className="ml-2">Contacts</span>
              </a>
            </li>
          </ul>
          <Link href="/" className="logout" onClick={() => dispatch(logout())}>
            <IconLogout />
            <span className="ml-2">Logout</span>
          </Link>
        </div>
      </div>
      <div className="mobile_menu">
        <button className="toggle" onClick={() => setAddclasses(!addClasss)}>
          <i className="las la-bars"></i>
        </button>
        <div className="brand">
          <span className="logo_text">Foster</span>
        </div>
      </div>
    </>
  );
}
