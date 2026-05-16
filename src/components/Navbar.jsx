"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getUser, removeAuth, isLoggedIn } from "../utils/auth";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const syncUser = useCallback(() => {
    setUser(isLoggedIn() ? getUser() : null);
  }, []);

  useEffect(() => {
    setMounted(true);
    syncUser();
  }, [pathname, syncUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    removeAuth();
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  };

  const getDashboardUrl = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin";
    if (user.role === "ngo") return "/dashboard/ngo";
    return "/dashboard/donor";
  };

  const labels = {
    en: { logout: "Logout", login: "Login", signup: "Get Started", dashboard: "Dashboard" },
    hi: { logout: "लॉग आउट", login: "लॉगिन", signup: "शुरू करें", dashboard: "डैशबोर्ड" },
    mr: { logout: "लॉग आउट", login: "लॉगिन", signup: "सुरुवात करा", dashboard: "डॅशबोर्ड" },
  };
  const t = labels[lang] || labels.en;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-green-200/50"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-sm font-bold text-white shadow-md">
            R
          </div>
          <span className="font-bold text-lg text-green-700 group-hover:text-green-800 transition-colors">
            RescueBite
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                pathname === link.href
                  ? "text-green-700 bg-green-50 shadow-sm"
                  : "text-gray-500 hover:text-green-700 hover:bg-green-50/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language */}
          <div className="relative group">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none text-xs border border-green-200 bg-white/50 rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer transition text-gray-600 hover:bg-white hover:shadow-sm"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none group-hover:text-green-600 transition-colors" />
          </div>

          {mounted &&
            (user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardUrl()}
                  className="text-sm px-4 py-2 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 font-medium transition"
                >
                  {t.dashboard}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all duration-300"
                >
                  {t.login}
                </Link>
                <Link
                  href="/signup"
                  className="text-sm px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold transition-all duration-300 shadow-[0_4px_14px_0_rgba(21,128,61,0.39)] hover:shadow-[0_6px_20px_rgba(21,128,61,0.23)] hover:-translate-y-0.5"
                >
                  {t.signup}
                </Link>
              </div>
            ))}
        </div>

        {/* Mobile: hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-lg transition text-green-700 hover:bg-green-50"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-green-100 bg-white px-6 py-4 flex flex-col gap-1 shadow-xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "text-green-700 bg-green-50 font-semibold"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-green-100 mt-3 pt-3 flex flex-col gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-xs border border-green-300 bg-white rounded-lg px-3 py-2 w-fit focus:outline-none text-gray-600"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>
            {mounted &&
              (user ? (
                <div className="flex gap-2">
                  <Link
                    href={getDashboardUrl()}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm px-4 py-2 rounded-lg border border-green-300 text-green-700 font-medium"
                  >
                    {t.dashboard}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white w-fit font-medium"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm px-4 py-2 rounded-lg border border-green-300 text-gray-600 font-medium"
                  >
                    {t.login}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm px-4 py-2 rounded-lg bg-green-700 text-white font-semibold"
                  >
                    {t.signup}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
