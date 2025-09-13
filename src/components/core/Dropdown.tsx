'use client'
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@components/core/button';

interface DropdownProps {
    label: string | React.ReactNode;
    children: React.ReactNode | ((props: { onClose: () => void }) => React.ReactNode);
    dropDirection?: 'up' | 'down';
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    label,
    children,
    dropDirection = 'down',
    className = ''
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const openDropdown = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setOpen(true);
    };

    const closeDropdown = () => {
        setOpen(false);
    };

    const handleMouseEnter = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        openDropdown();
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            closeDropdown();
        }, 150);
    };

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    // Render children with onClose if it's a function
    const renderChildren = () => {
        if (typeof children === 'function') {
            return children({ onClose: closeDropdown });
        }

        return React.Children.map(children, (child, index) => {
        if (
  React.isValidElement(child) &&
  typeof child.props === 'object' && // 👈 ADD THIS CHECK
  child.props !== null &&          // 👈 AND THIS (since typeof null === 'object')
  'onClose' in child.props
) {
  return React.cloneElement(child as React.ReactElement<any>, {
    onClose: closeDropdown,
    key: index,
  });
}
            return <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.05 }}>{child}</motion.div>;
        });
    };

    return (
        <div
            className={`relative inline-block text-left w-full ${className}`}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Button
                type="button"
                shape='circle'
                variant='plain'
                className={`
                    inline-flex items-center justify-between w-full cursor-pointer
                    border-0 hover:border-0 hover:outline-0
                    text-sm px-3.5 font-medium text-[#1E2939]
                    dark:text-gray-400
                    hover:bg-gray-50 dark:hover:bg-gray-600
                    transition-all duration-200 ease-out
                    ${open ? 'bg-gray-50 dark:bg-gray-600 ' : ''}
                `}
                onClick={handleClick}
            >
                <span>{label}</span>
                <svg
                    className={`
                        ml-2 h-5 w-5
                        transition-transform duration-300 ease-out
                        ${dropDirection === 'up'
                            ? (open ? 'rotate-0 text-blue-500' : 'rotate-180')
                            : (open ? 'rotate-180 text-blue-500' : 'rotate-0')
                        }
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.84a.75.75 0 01-1.02 0l-4.25-3.84a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: dropDirection === 'up' ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: dropDirection === 'up' ? 10 : -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`
                            absolute w-full md:min-w-50 border
                             border-gray-200 dark:border-gray-600
                            rounded-xl shadow-2xl
                            bg-white dark:bg-gray-800
                            backdrop-blur-sm

                            z-50
                            overflow-hidden
                            ${dropDirection === 'up' ? 'bottom-full mb-1 left-0' : 'right-0 mt-1'}
                        `}
                    >
                        <div className="py-2 relative">
                            {/* Subtle inner glow — pure Tailwind */}
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent dark:from-blue-900/10 rounded-xl pointer-events-none" />

                            <div className="relative z-10">
                                {renderChildren()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;