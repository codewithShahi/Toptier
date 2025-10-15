"use client";
import React from "react";
import { Icon } from "@iconify/react";
import useCurrency from "@hooks/useCurrency";
import { useRouter } from "next/navigation";

// type Room = {
//   id?: string | number;
//   name?: string;
// };

const RoomOption: React.FC<{
  room?: any;
  options?: any;
  getAmenityIcon?: (amenity: string) => string;
  onReserve?: (room?: any, option?: any) => void;
}> = ({ room, options, getAmenityIcon, onReserve }) => {
      console.log("New Room data:", room);
    
  // Normalize amenities into an array of strings
  const amenitiesList: string[] = React.useMemo(() => {
    const a = room?.amenities;
    if (!a) return [];
    if (Array.isArray(a)) return a.map((x) => String(x).trim()).filter(Boolean);
    if (typeof a === "string") return a.split(",").map((s) => s.trim()).filter(Boolean);
    // if it's a single value (number/other), convert to string
    return [String(a)];
  }, [room?.amenities]);


  const { priceRateConverssion } = useCurrency();
  const router = useRouter();

  return (
    <div className="rounded-lg">
  <h2 className="text-xl font-bold mb-4 text-black">{room?.name || 'One Bedroom Apartment'}</h2>

  <div className="overflow-x-auto">
    <table className="min-w-[800px] w-full border-collapse overflow-hidden">
      <thead className="bg-[#1C398E] text-white">
        <tr>
          <th className="px-4 py-4 text-left">Room Type</th>
          <th className="px-4 py-4 text-left">Features</th>
          <th className="px-4 py-4 text-left">Travellers</th>
          <th className="px-4 py-4 text-left">Price</th>
          <th className="px-4 py-4 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {(room?.options || options?.list || []).map((opt: any, idx: number) => {
          
          const merged: string[] = [];
          if (amenitiesList && amenitiesList.length > 0) merged.push(...amenitiesList);
          if (opt?.breakfast === "1" || options?.breakfast === "1") merged.push("Free breakfast");
          if (opt?.cancellation === "1" || options?.cancellation === "1") merged.push("Free cancellation");
          const optionAmenities = Array.from(new Set(merged));

          return (
            <tr key={opt?.id ?? idx} className="hover:bg-gray-50 border-b">
              <td className="bg-gray-100 px-4 py-2">
                <img
                  src="https://images.unsplash.com/photo-1760340641889-7d215d84bda3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
                  alt="Room"
                  className="w-36 h-24 object-cover rounded-md"
                />
              </td>
              <td className="bg-gray-100 text-blue-500 font-bold px-4 py-2">
                {optionAmenities.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {optionAmenities.map((amenity, aidx) => (
                      <li key={aidx} className="flex items-center gap-2 text-sm text-[#0F172B] font-[500]">
                        {getAmenityIcon ? (
                          <Icon icon={getAmenityIcon(amenity)} width={16} height={16} />
                        ) : null}
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm">N/A</span>
                )}
              </td>
              <td className="bg-gray-100 font-bold px-4 py-2">{opt?.adults || options?.adults || "0"} Adults, {opt?.child || options?.child || "0"} Children</td>
              <td className="bg-gray-100 text-[#AD8628] font-bold px-4 py-2">{
                priceRateConverssion(
                  parseFloat(String(opt?.price ?? options?.price ?? room?.price ?? 0))
                )
              }</td>
              <td className="bg-gray-200 py-3 font-medium">
                <div className="flex flex-col items-center text-center gap-2">
                  <button
                    onClick={() => {
                      if (onReserve) return onReserve(room, opt);
                      // fallback redirect
                      const roomId = room?.id ?? room?.room_id ?? "";
                      const optId = opt?.id ?? "";
                      if (roomId) router.push(`/rooms/${roomId}?option=${optId}`);
                    }}
                    className="bg-[#1C398E] text-white px-4 py-2 rounded-full cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default RoomOption;
