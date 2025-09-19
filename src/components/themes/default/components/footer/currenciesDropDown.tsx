import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@lib/redux/store";
import { Icon } from "@iconify/react";

// ✅ Map of symbols/logos by currency name

const currencyMap: Record<string, React.ReactNode> = {
  USD: (

     <Icon icon="flag:gb-4x3" width="22" height="22" />
  ),
  EUR: (
   <Icon icon="flag:eu-4x3" width="22" height="22" />
  ),
  GBP: (
 <Icon icon="flag:gb-eng-4x3" width="22" height="22" />
  ),
  SAR: (
  <Icon icon="flag:sa-4x3" width="22" height="22" />
  ),

};

export default function CurrencyDropdown() {
  const [selected, setSelected] = useState<string>("USD"); // default currency
  const [open, setOpen] = useState(false);
  const { currencies } = useAppSelector((state) => state.appData?.data);

// console.log('cur',currencies)

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = currencies?.find((c: any) => c.name === selected);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
         className=" relative flex items-center w-20 cursor-pointer justify-between  px-4 py-2 bg-white dark:bg-gray-900  border-gray-300 dark:border-gray-700   text-sm font-medium text-gray-700 dark:text-gray-200  dark:hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          {/* {currencyMap[selected] ?? <span className="font-bold">¤</span>} */}
          {selectedCurrency?.name}
        </span>
        <svg
          className={`w-3.5 h-3.5  transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

      </button>
      {/* Dropdown List */}
      {open && (
        <div className="absolute bottom-10 z-10 w-52 md:w-60 p-2 mt-1 space-y-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {currencies?.map((c: any) => (
            <button
              key={c.iso}
              onClick={() => {
                setSelected(c.name);
                setOpen(false);
              }}
              className={`flex items-center cursor-pointer gap-3 px-4 py-3 rounded-md text-sm text-gray-500 dark:text-gray-300 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selected === c.name ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              
            >
              {currencyMap[c.name] ?? <span className="font-bold">¤</span>}
              <div className="flex w-full justify-between items-center text-gray-700">
                <span className="font-medium text-gray-700" >{c.nicename}</span>
                <span className="font-medium text-gray-700">{c.name}</span>
              </div>

            </button>
          ))}
        </div>
      )}
    </div>
  );
}
