import { Link, NavLink } from "react-router-dom";

const SideNav = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-center lg:justify-start
     rounded-lg px-4 py-3 transition
     ${
       isActive
         ? "bg-amber-600 text-white"
         : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
     }`;

  return (
    <div
      className="
       
        hidden lg:flex
        
        w-min lg:w-[15vw]
        shrink-0
        h-screen overflow-y-auto
        border-r border-zinc-600
      
        p-3 lg:p-5 xl:p-8
        text-white
        z-10
      "
    >
      <div className="w-full flex flex-col items-center lg:items-start">
        
        {/* Logo */}
        <h1 className="text-xl font-bold flex items-center pt-3">
          <i className="ri-movie-2-fill text-amber-600 text-3xl"></i>
          <Link to="/" className="hidden lg:inline text-2xl ml-2">
            MovieZ
          </Link>
        </h1>

        {/* Main Nav */}
        <nav className="flex flex-col gap-4 pt-10 w-full">
          <NavLink to="/" className={navLinkClass}>
            <i className="ri-home-4-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">Home</span>
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            <i className="ri-search-2-line text-xl"></i>
            <span className="hidden lg:inline ml-3">Search</span>
          </NavLink>

          <NavLink to="/trendings" className={navLinkClass}>
            <i className="ri-fire-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">Trending</span>
          </NavLink>

          <NavLink to="/popular" className={navLinkClass}>
            <i className="ri-bard-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">Popular</span>
          </NavLink>

          <NavLink to="/movie" className={navLinkClass}>
            <i className="ri-film-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">Movies</span>
          </NavLink>

          <NavLink to="/tv" className={navLinkClass}>
            <i className="ri-tv-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">TV Shows</span>
          </NavLink>

          <NavLink to="/person" className={navLinkClass}>
            <i className="ri-team-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">People</span>
          </NavLink>
        </nav>

        {/* Divider */}
        <hr className="w-full my-6 bg-zinc-700 border-none h-px" />

        {/* Info Nav */}
        <nav className="flex flex-col gap-3 w-full">
          <h1 className="hidden lg:block font-semibold text-white mb-2">
            Website Info
          </h1>

          <NavLink to="/aboutus" className={navLinkClass}>
            <i className="ri-information-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">About</span>
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            <i className="ri-mail-fill text-xl"></i>
            <span className="hidden lg:inline ml-3">Contact</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
