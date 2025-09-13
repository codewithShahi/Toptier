import React from 'react';
import { Icon } from '@iconify/react';
interface SpinnerProps {
    className?: string;
    size?: number;
    color?: string;
    enableTheme?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ className = '', size = 20, color = 'currentColor', enableTheme = true }) => {
    return (
        <svg
            className={`animate-spin ${className}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color }}
        >
            <circle
                className={enableTheme ? 'opacity-25' : ''}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className={enableTheme ? 'opacity-75' : ''}
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>

    );
};

export { Spinner };
export default Spinner;


{/* <Icon icon="svg-spinners:180-ring-with-bg" fontSize={size} className={className} color={color} /> */}







