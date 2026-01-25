import { Link, NavLink } from "react-router-dom";

const SideNav = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-5 py-3 transition
     ${
       isActive
         ? "bg-amber-600 text-white"
         : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
     }`;

  return (
    <div
      className="
        hidden lg:flex
        lg:w-64
        shrink-0
        h-screen overflow-y-auto
        border-r border-zinc-600
        p-6 xl:p-10
        text-white
      "
    >
      <div className="w-full">
        <h1 className="text-xl font-bold">
          <i className="ri-movie-2-fill text-amber-600 mr-2"></i>
          <Link to="/" className="text-2xl">
            MovieZ
          </Link>
        </h1>

        <nav
          className="
            flex flex-col
            gap-4
            pt-10
            mb-2
            text-zinc-400
            text-sm
            sm:text-base
            md:text-m
            xl:text-lg
          "
        >
          <NavLink to="/" className={navLinkClass}>
            <i className="mr-2 ri-home-4-fill"></i>Home
          </NavLink>
          <NavLink to="/explore" className={navLinkClass}>
            <i className="mr-2 ri-search-2-line"></i>Search
          </NavLink>
          <NavLink to="/trendings" className={navLinkClass}>
            <i className="ri-fire-fill mr-2"></i>Trending
          </NavLink>
          <NavLink to="/popular" className={navLinkClass}>
            <i className="ri-bard-fill mr-2"></i>Popular
          </NavLink>
          <NavLink to="/Movies" className={navLinkClass}>
            <i className="ri-film-fill mr-2"></i>Movies
          </NavLink>
          <NavLink to="/tvshows" className={navLinkClass}>
            <i className="ri-tv-fill mr-2"></i>Tv Shows
          </NavLink>
          <NavLink to="/people" className={navLinkClass}>
            <i className="ri-team-fill mr-2"></i>People
          </NavLink>
        </nav>

        <hr className="h-px border-none bg-zinc-600" />

        <nav className="
            flex flex-col
            pt-4
            gap-2
            mb-2
            text-zinc-400
            text-sm
            sm:text-base
            md:text-m
            xl:text-lg
          ">
          <h1 className="mt-8 mb-5 font-semibold text-white">
            Website Info
          </h1>
          <NavLink to="/aboutus" className={navLinkClass}>
            <i className="ri-information-fill mr-2"></i>About 
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            <i className="ri-mail-fill mr-2"></i>Contact
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
