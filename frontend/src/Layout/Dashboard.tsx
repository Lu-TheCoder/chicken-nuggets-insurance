import { Outlet, Link } from "react-router-dom";
import './Dashboard.css';

// React Icons (Ionicons v5)
import {
  IoCloseOutline,
  IoClipboardOutline,
  IoFileTrayStackedOutline,
  IoLogOutOutline,
  IoApertureSharp,
  IoPin,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/userprofile/userProfile";

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token")
  }
  return (
    <section>
      <div className="sidebar">
        <aside>
          <div className="header">
            <IoApertureSharp className="logo" />
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
              <Link to="/dashboard/monitoredDestinations">
                <div className="left">
                  <IoPin />
                  <span>Destinations</span>
                </div>
                <div className="right"></div>
              </Link>
              {
                // <Button onClick={() => { logout }}>
                //   <div className="left">
                //     <IoLogOutOutline />
                //     <span>Logout</span>
                //   </div>
                //   <div className="right"></div>
                // </Button>
              }
            </div>
          </div>
        </aside>
      </div>
      <main>
        <div className="header">
          <div className="left">
            <div className="menu">
            </div>
            <div className="search-bar">
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
