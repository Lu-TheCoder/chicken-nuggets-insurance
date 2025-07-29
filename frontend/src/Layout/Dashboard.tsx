import { Outlet, Link } from "react-router-dom";
import './Dashboard.css';

// React Icons (Ionicons v5)
import {
  IoLogoSass,
  IoCloseOutline,
  IoClipboardOutline,
  IoFileTrayStackedOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import UserProfile from "@/components/userprofile/userProfile";

function Dashboard() {
  return (
    <section>
      <div className="sidebar">
        <aside>
          <div className="header">
            <IoLogoSass className="logo" />
            <div className="close">
              <IoCloseOutline />
            </div>
          </div>
          <div className="links">
            <div className="top">
              <Link to="/dashboard/alerts">
                <div className="left">
                  <IoClipboardOutline />
                  <span>Alerts</span>
                </div>
                <div className="right"></div>
              </Link>
              <Link to="/dashboard/health">
                <div className="left">
                  <IoFileTrayStackedOutline />
                  <span>AI Health</span>
                </div>
                <div className="right"></div>
              </Link>
            </div>
            <div className="bottom">
              <Link to="/dashboard/profile">
                <div className="left">
                  <IoSettingsOutline />
                  <span>Settings</span>
                </div>
                <div className="right"></div>
              </Link>
              <Link to="/dashboard/logout">
                <div className="left">
                  <IoLogOutOutline />
                  <span>Logout</span>
                </div>
                <div className="right"></div>
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <main>
        <div className="header">
          <div className="left">
            <div className="menu">
              <IoMenuOutline />
            </div>
            <div className="search-bar">
              <IoSearchOutline />
              <input id="search" type="text" placeholder="search here" />
            </div>
          </div>
          {/** Pop over here for the user to update information and password**/}
          <UserProfile />
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
