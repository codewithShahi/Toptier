import useLocale from '@hooks/useLocale';
import React, { useRef, useEffect, ChangeEvent } from 'react';

interface PriceRangeSliderProps {
    min?: number;
    max?: number;
    value: { min: number; max: number };
    onChange: (values: { min: number; max: number }) => void;
}

export default function PriceRangeSlider({
    min = 215,
    max = 2291,
    value,
    onChange,
}: PriceRangeSliderProps) {
    const range = useRef<HTMLDivElement>(null);
    const { locale } = useLocale();
    const dir = locale === 'ar' ? 'right' : 'left';
    const minVal = value.min;
    const maxVal = value.max;
    // Update fill bar between thumbs
    useEffect(() => {
        const minPercent = ((minVal - min) / (max - min)) * 100;
        const maxPercent = ((maxVal - min) / (max - min)) * 100;

        if (range.current) {
            range.current.style[dir] = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, min, max, dir]);

    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), maxVal - 1);
        onChange({ min: newMin, max: maxVal });
    };

    const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), minVal + 1);
        onChange({ min: minVal, max: newMax });
    };

    return (
        <div className=" pb-3">
            {/* Min & Max Labels */}
            <div className="flex justify-between text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {/* <span>${min}</span>
                <span>${max}</span> */}
            </div>

            {/* Slider Track */}
            <div className="relative w-full h-6 mb-3 mx-auto overflow-hidden">
                {/* Background track */}
                <div className="absolute top-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full z-0" />

                {/* Fill bar with blue gradient */}
                <div
                    ref={range}
                    className="absolute top-2 h-1.5 bg-gradient-to-l from-blue-700 to-blue-400 rounded-full z-10"
                    style={{
                        // background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', // Optional inline for consistency
                    }}
                />

                {/* Range Inputs (Thumbs) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    onChange={onMinChange}
                    className="range-thumb z-30"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    onChange={onMaxChange}
                    className="range-thumb z-20"
                />
            </div>

            {/* Min & Max Value Badges */}
            <div className="flex justify-between">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-600 dark:text-blue-200 px-2 py-1 rounded-lg text-xs font-bold">
                    ${minVal}
                </div>
                <div className="bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-600 dark:text-blue-200 px-2 py-1 rounded-lg text-xs font-bold">
                    ${maxVal}
                </div>
            </div>
        </div>
    );
}