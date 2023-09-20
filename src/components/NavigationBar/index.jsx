import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../common/Alert";
import "./style.css";

// Action
import { logOut } from "../../redux/Actions/authAction";
import { useState } from "react";

export default function NavigtionBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const { userInfo, toggle } = useSelector((store) => store.auth);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = location.pathname;
  const wrapperRef = useRef(null);
  const [activeParent, setActiveParent] = useState(null);

  const clickHandle = () => {
    toggle ? dispatch({ type: "OFF" }) : dispatch({ type: "ON" });
  };
  console.log("toggle", toggle);
  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (dropdownMenu) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          wrapperRef &&
          !wrapperRef.current.contains(event.target)
        ) {
          setDropdownMenu(!dropdownMenu);
        }
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  useOutsideAlerter(wrapperRef);

  const navigationPaths = [
    {
      title: "Dashboard",
      path: "/",
      icon: "/images/icons/dashboard.png",
      activeIcon: "/images/icons/dashboard-active.png",
      permission: true,
    },
    {
      title: "User Group",
      path: "/WorkDiary",
      icon: "/images/icons/work-diary.png",
      activeIcon: "/images/icons/work-diary-active.png",
      permission: true,
    },
    {
      title: "WorkSpace",
      path: "/ResourceManagement",
      icon: "/images/icons/resource-management.png",
      activeIcon: "/images/icons/resource-management-active.png",
      permission: true,
    },

    {
      title: "Users",
      path: "/Subscription",
      icon: "/images/icons/Subscription-w.svg",
      activeIcon: "/images/icons/Subscription.svg",
      permission: true,
      submenu: [
        {
          title: "Submenu Item 1",
          path: "/Reports",
          icon: "/images/icons/resource-management.png",
          activeIcon: "/images/icons/resource-management-active.png",
          permission: true,
        },
        {
          title: "Submenu Item 2",
          path: "/Feedback",
          icon: "/images/icons/resource-management.png",
          activeIcon: "/images/icons/resource-management-active.png",
          permission: true,
        },
      ],
    },
  ];

  const handleLogOut = async () => {
    dispatch(logOut());
    navigate("/");
  };

  const checkActivePath = (path) => {
    return pathname === path
      ? true
      : path.length > 1
      ? pathname.includes(path)
      : false;
  };
  const LogoutAlert = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Alert
        message="Logout"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={handleLogOut}
      />
      <div className="nav-logo">
        <img src="/images/logo.png" alt="logo" height={50} onClick={() => clickHandle()}/>
      </div>
      <div
        className="user-menu"
        onClick={() => setDropdownMenu((prev) => !prev)}
        style={{display: toggle && "none" }}
      >
        <div className="user-menu-dropdown">
          <img
            className="user-menu-dropdown-profile-img"
            src={
              userInfo.profile_image
                ? userInfo.profile_image
                : "/images/landingPage/tes1.png"
            }
            alt="profile"
          />
          <div className="user-menu-dropdown-profile">
            <p>{userInfo.name}</p>
            <img
              src="/images/icons/arrow-down.png"
              alt="arrow"
              style={{ transform: dropdownMenu ? "rotate(180deg)" : "" }}
            />
          </div>
        </div>
        {dropdownMenu && (
          <div className="profile-section" ref={wrapperRef}>
            <div className="profile-section-outer">
              <Link to="/ProfileSettings" className="sub-nav-menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                &nbsp;&nbsp;Profile
              </Link>

              <Link
                to="/"
                className="sub-nav-menu"
                onClick={() => LogoutAlert()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-in-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                  />
                </svg>
                &nbsp;&nbsp;Logout
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="nav-menu-container">
        <div className="nav-menu-list">
          {navigationPaths.map((navigation) => (
            <>
              {navigation.permission === true && (
                <div key={navigation.path}>
                  <Link to={navigation.path}>
                    <div
                      className="nav-menu"
                      style={{
                        backgroundColor:
                          checkActivePath(navigation.path) &&
                          "var(--bs-border-color-translucent)",
                        borderRight:
                          checkActivePath(navigation.path) &&
                          "5px solid var(--app-yellow-color)",
                         padding: toggle && 15 
                      }}
                      onClick={() => {
                        if (activeParent === navigation.path) {
                          setActiveParent(null); // Close parent on second click
                        } else {
                          setActiveParent(navigation.path); // Open parent on first click
                        }
                      }}
                    >
                      <img
                        src={
                          checkActivePath(navigation.path)
                            ? navigation.activeIcon
                            : navigation.icon
                        }
                        alt="logo"
                      />
                      
                      <p
                        className={`nav-link ${
                          checkActivePath(navigation.path) && "active"
                        }`}
                      >
                        {toggle ? "" : navigation.title}
                        {/* {navigation.title} */}
                      </p>
                    </div>
                  </Link>
                  {navigation?.submenu && activeParent === navigation.path && (
                    <div className="submenu">
                      {navigation.submenu.map((submenuItem) => (
                        <Link to={submenuItem.path} key={submenuItem.path}>
                          <div
                            className="nav-menu"
                            style={{
                              backgroundColor:
                                checkActivePath(submenuItem.path) &&
                                "var(--bs-border-color-translucent)",
                              borderRight:
                                checkActivePath(submenuItem.path) &&
                                "5px solid var(--app-yellow-color)",
                            }}
                          >
                            <img
                              src={
                                checkActivePath(submenuItem.path)
                                  ? submenuItem.activeIcon
                                  : submenuItem.icon
                              }
                              alt="logo"
                            />
                            <p
                              className={`nav-link ${
                                checkActivePath(submenuItem.path) && "active"
                              }`}
                            >
                              {submenuItem.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ))}
        </div>
        {/* <button
          style={{ display: "flex" }}
          className={change ? "openbtn" : "openbtn"}
          onClick={() => {
            setChange(!change);
            clickHandle();
          }}
        >
          {<span className={change ? "arror" : "back"}></span>}
        </button> */}
      </div>
    </>
  );
}
