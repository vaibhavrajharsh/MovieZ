import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ value, onChange, options = [], placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-44 text-white">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold shadow-md ring-1 ring-white/10 transition hover:bg-zinc-800"
      >
        {selected ? selected.label : placeholder}

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu */}
      <div
        className={`absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl bg-zinc-900 shadow-xl ring-1 ring-white/10 transition-all duration-300 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
            className={`flex w-full items-center px-4 py-2 text-sm transition hover:bg-zinc-800 ${
              value === option.value
                ? "bg-zinc-800 text-orange-400"
                : "text-zinc-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
