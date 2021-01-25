import React from "react";

import { Avatar, IconButton } from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <div class="app-header header-shadow">
        <div class="app-header__content">
          <div class="app-header-left">
            <div class="search-wrapper">
              <div class="input-holder">
                <input
                  type="text"
                  class="search-input"
                  placeholder="Type to search"
                />
                <button class="search-icon">
                  <span></span>
                </button>
              </div>
              <button class="close"></button>
            </div>
            <ul class="header-menu nav">
              <Link to="/">
                <li class="nav-item">
                  <a href="javascript:void(0);" class="nav-link">
                    <i class="nav-link-icon fa fa-home"> </i>
                    Dashboard
                  </a>
                </li>
              </Link>
              <Link to="/field-owners">
                <li class="btn-group nav-item">
                  <a href="javascript:void(0);" class="nav-link">
                    <i class="nav-link-icon fa fa-user"></i>
                    Field Owners
                  </a>
                </li>
              </Link>
              <Link to="/users">
                <li class="dropdown nav-item">
                  <a href="javascript:void(0);" class="nav-link">
                    <i class="nav-link-icon fa fa-users"></i>
                    Users
                  </a>
                </li>
              </Link>
            </ul>
          </div>
          <div class="app-header-right">
            <div class="header-btn-lg pr-0">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  <div class="widget-content-left">
                    <div class="btn-group">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <img
                          width="42"
                          class="rounded-circle"
                          src="assets/images/avatars/1.jpg"
                          alt=""
                        />
                        <i class="fa fa-angle-down ml-2 opacity-8"></i>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <button
                          type="button"
                          tabindex="0"
                          class="dropdown-item"
                        >
                          User Account
                        </button>
                        <button
                          type="button"
                          tabindex="0"
                          class="dropdown-item"
                        >
                          Settings
                        </button>
                        <h6 tabindex="-1" class="dropdown-header">
                          Header
                        </h6>
                        <button
                          type="button"
                          tabindex="0"
                          class="dropdown-item"
                        >
                          Actions
                        </button>
                        <div tabindex="-1" class="dropdown-divider"></div>
                        <button
                          type="button"
                          tabindex="0"
                          class="dropdown-item"
                        >
                          Dividers
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content-left  ml-3 header-user-info">
                    <div class="widget-heading">Administrator</div>
                    <div class="widget-subheading">Online</div>
                  </div>
                  <div class="widget-content-right header-user-info ml-3">
                    <button
                      type="button"
                      class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                    >
                      <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
