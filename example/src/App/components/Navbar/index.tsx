import { Menu } from "@headlessui/react";
import { useAuth, useUser } from "nampi-use-api/bundle";
import { Link } from "react-router-dom";
import { LoadingPlaceholder } from "../LoadingPlaceholder";
import { NampiLogo } from "../NampiLogo";

export const Navbar = () => {
  const { authenticated, logout } = useAuth();
  const { initialized, loading, data } = useUser();
  return (
    <nav className="relative flex items-center justify-between flex-wrap  bg-gray-400 p-3 text-white">
      <div className="space-x-3 text-white flex items-center">
        <Link to="/" className="font-semibold text-2xl">
          <NampiLogo className="h-10 bg-white p-1 rounded" />
        </Link>
        <Link to="/acts">Acts</Link>
        <Link to="/aspects">Aspects</Link>
        <Link to="/authors">Authors</Link>
        <Link to="/events">Events</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/persons">Persons</Link>
        <Link to="/places">Places</Link>
        <Link to="/sources">Sources</Link>
      </div>
      <div>
        {initialized && !loading ? (
          authenticated && data ? (
            <Menu as="div" className="relative text-gray-800">
              <Menu.Button className="px-4 py-2 rounded bg-white text-sm">
                {data.username}
              </Menu.Button>
              <Menu.Items className="absolute min-w-max mt-1 right-0 bg-white shadow-lg rounded flex flex-col p-2">
                <Menu.Item>
                  {({ active }) => <Link to="/profile">Profile</Link>}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button type="button" onClick={() => logout()}>
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              to={{ pathname: "/login", state: { from: window.location.href } }}
            >
              Login
            </Link>
          )
        ) : (
          <LoadingPlaceholder />
        )}
      </div>
    </nav>
  );
};
