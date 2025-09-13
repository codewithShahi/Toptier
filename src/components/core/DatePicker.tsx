import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Icon } from "@iconify/react";

interface DatePickerProps {
    onSelect: (date: Date | undefined) => void;
    disabledDates?: Date[];
    direction?: "ltr" | "rtl";
    className?: string;
    showCalendarIcon?: boolean;
}

// Format date in UTC to prevent timezone issues
// const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat("en-GB", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         timeZone: "UTC",
//     }).format(date);
// };
const formatDate = (date: Date) => {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

const DatePicker: React.FC<DatePickerProps> = ({
    onSelect,
    disabledDates = [],
    direction = "ltr",
    className = "",
    showCalendarIcon = true,
}) => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const today = new Date();
    const defaultDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    const [selected, setSelected] = useState<Date | undefined>(defaultDate);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    return (
        <div className={`relative ${className}`} dir={direction}>
            <div className={`flex items-center gap-2 ${direction === "rtl" ? "justify-start pr-2" : "pl-2"}`}>
                {showCalendarIcon && (
                    <span
                        className={`z-10 text-gray-400 dark:text-gray-400 cursor-pointer ${direction === "rtl" ? "ml-2" : "mr-2"}`}
                        onClick={() => setOpen((v) => !v)}
                    >
                      <Icon icon="material-symbols:calendar-today-outline" width="25" height="25" className={direction === "rtl" ? "scale-x-[-1]" : ""} />
                    </span>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    readOnly
                    value={selected ? formatDate(selected) : ""}
                    onClick={() => setOpen((v) => !v)}
                    className={`datePicker w-full h-10 py-2 border-0 rounded-lg font-medium text-sm placeholder-gray-400 bg-transparent text-gray-800 dark:text-gray-50 focus:outline-none cursor-pointer ${direction === "rtl" ? "text-right" : "text-left"}`}
                    placeholder="Select date"
                />
            </div>
            {open && (
                <div
                    ref={popoverRef}
                    className={`absolute z-50 mt-2 ${direction === "rtl" ? "right-0" : "left-0"} bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2`}
                    style={{ minWidth: 260 }}
                >
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={(date) => {
                            if (date) {
                                // ✅ Normalize date to UTC to avoid local timezone offset
                                const normalized = new Date(
                                    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
                                );
                                setSelected(normalized);
                                onSelect(normalized);
                                setOpen(false);
                            }
                        }}
                        disabled={disabledDates}
                        // classNames={{
                        //     month_caption: 'text-gray-800 dark:text-gray-100 rdp-month_caption',
                        //     nav: 'rdp-nav text-gray-800 dark:text-gray-100',
                        //     chevron: 'fill-current',
                        //     day: " text-gray-900 dark:text-gray-100! rounded-full hover:bg-primary/20 dark:hover:bg-primary/40",
                        //     day_selected: "bg-primary text-white dark:bg-primary-dark",
                        //     day_disabled: "text-gray-300 dark:text-gray-600 cursor-not-allowed",
                        // }}

                        styles={{
                            caption: { direction },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;