import { useState } from "react";
import { Container, Logo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Checklist", slug: "/checklist", active: authStatus },
    { name: "History", slug: "/history", active: authStatus },
    { name: "Dashboard", slug: "/dashboard", active: authStatus },
  ];

  if (loading) {
    return (
      <div className="py-3 px-6">
        <Logo width="70px" />
      </div>
    );
  }

  return (
    <header className="py-3 shadow md:px-24">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="py-1 ml-1 px-6 text-sm font-extralight rounded-full hover:bg-gray-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl ml-auto"
          >
            ☰
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 bg-gray-100 rounded-xl shadow-lg overflow-hidden">
            <ul className="flex flex-col">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-6 py-3 text-sm hover:bg-gray-300"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <div className="px-6 py-3 border-t">
                  <LogoutBtn />
                </div>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
