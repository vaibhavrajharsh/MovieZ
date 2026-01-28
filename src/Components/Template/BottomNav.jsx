import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1
     ${
       isActive ? "text-amber-500" : "text-zinc-400"
     }`;

  return (
    <div
      className="
        fixed bottom-0 left-0
        w-full
        h-16
        bg-zinc-900
        border-t border-zinc-700
        flex justify-around items-center
        lg:hidden
        z-50
      "
    >
      <NavLink to="/" className={navClass}>
        <i className="ri-home-4-fill text-xl"></i>
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink to="/explore" className={navClass}>
        <i className="ri-search-2-line text-xl"></i>
        <span className="text-xs">Search</span>
      </NavLink>

      <NavLink to="/trendings" className={navClass}>
        <i className="ri-fire-fill text-xl"></i>
        <span className="text-xs">Trending</span>
      </NavLink>

      <NavLink to="/movies" className={navClass}>
        <i className="ri-film-fill text-xl"></i>
        <span className="text-xs">Movies</span>
      </NavLink>

      <NavLink to="/people" className={navClass}>
        <i className="ri-team-fill text-xl"></i>
        <span className="text-xs">People</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
