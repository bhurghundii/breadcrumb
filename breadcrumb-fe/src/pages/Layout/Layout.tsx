import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
