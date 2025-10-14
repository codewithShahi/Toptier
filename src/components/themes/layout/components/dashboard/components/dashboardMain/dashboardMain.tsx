"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetch_dashboard_data, get_profile } from "@src/actions";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20] as const;

export default function Dashboard() {
  const [filters, setFilters] = useState({
    search: "",
    payment_status: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // Debounce search input
  const [searchTerm, setSearchTerm] = useState("");
  useMemo(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // =============== Fetch dashboard  data via React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "dashboard",
      pagination.page,
      pagination.limit,
      filters.search,
      filters.payment_status,
    ],
    queryFn: async () => {
      const payload = {
        page: String(pagination.page),
        limit: String(pagination.limit),
        search: filters.search,
        payment_status: filters.payment_status,
      };
      return await fetch_dashboard_data(payload);
    },
    // keepPreviousData: true,
   staleTime: Infinity,  // Data never becomes stale
  gcTime: Infinity,     // Cache never gets garbage collected
  });

  const bookings = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pagination.limit);

//  ========================== fetch profile data ==========
const { data: cartResults, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: get_profile,
    staleTime: Infinity,  // Data never becomes stale
  gcTime: Infinity,
  });
 const { total_bookings = "0", pending_bookings = "0", balance = "0" } = cartResults?.data[0] || {};


  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination({ page: 1, limit: Number(e.target.value) });
  };

  const handlePageChange = (newPage: number) => {
     setPagination((prev) => ({ ...prev, page: newPage }));
    if (newPage >= 1 && newPage <= totalPages) {

    }
  };
  // Numeric Pagination Logic with Ellipsis
const getPageNumbers = () => {
  const totalVisible = 5; // Always show up to 5 page numbers
  const pages: (number | string)[] = [];

  //  Case 1: Few pages total → show all
  if (totalPages <= totalVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  }
  //  Case 2: Many pages → show leading/trailing with ellipsis
  else {
    const start = Math.max(1, pagination.page - 2);
    const end = Math.min(totalPages, pagination.page + 2);

    // Always show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    // Show middle range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};


  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-gray-50  py-10 appHorizantalSpacing">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-1">Welcome back</h1>
      <p className="text-[#475569] text-base font-normal mb-8">
        Here’s a quick look at your travel account
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Wallet Balance" value={balance} sub="Total Wallet Balance" title="wallet" />
        <StatCard label="Bookings" value={total_bookings} sub="Total Bookings" title="booking"/>
        <StatCard label="Pending Invoices" value={pending_bookings} sub="Pending Invoices"  title="invoice" />
      </div>

      <div className="border border-gray-200 rounded-2xl bg-white shadow-md">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-gray-100">


<div className="flex gap-2">
  {[
    { label: "All", value: "" },
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Cancelled", value: "cancelled" },
  ].map((option) => (
    <button
      key={option.value}
      onClick={() => {
        setFilters((prev) => ({ ...prev, payment_status: option.value }));
        setPagination((prev) => ({ ...prev, page: 1 }));
      }}
      className={`px-4 py-1.5 text-xs rounded-xl border transition-colors cursor-pointer ${
        filters.payment_status === option.value
          ? "bg-blue-900 text-white border-blue-900"
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100 "
      }`}
    >
      <span className="text-sm">{option.label}</span>
    </button>
  ))}
</div>
    <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
className="border border-gray-200 hover:bg-gray-100 text-sm rounded-xl w-64 px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-200"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center h-110 py-10 items-center w-full ">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-6 text-red-500">
            {(error as Error).message || "Something went wrong"}
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
          <>
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-[#F9FAFB] text-gray-500 uppercase text-xs">
                <tr>
                  <th className="py-5 px-6 text-left">Client Name</th>
                  <th className="py-5 px-6 text-left">Booking ID</th>
                  <th className="py-5 px-6 text-left">PNR</th>
                  <th className="py-5 px-6 text-left">Payment</th>
                  <th className="py-5 px-6 text-left">Booking</th>
                  <th className="py-5 px-6 text-left">Date</th>
                  <th className="py-5 px-6 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b: any, index: number) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-6 px-6">{b.customer}</td>
                      <td className="py-6 px-6">#{b.reference}</td>
                      <td className="py-6 px-6">{b.pnr || "—"}</td>
                      <td className="py-6 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            b.payment === "paid"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {b.payment.charAt(0).toUpperCase() + b.payment.slice(1)}
                        </span>
                      </td>
                      <td className="py-6 px-6 capitalize">{b.service}</td>
                      <td className="py-6 px-6">{formatDate(b.date)}</td>
                      <td className="py-6 px-6">${b.total_price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/*  Pagination */}
            <div className="flex justify-between border-t px-8 py-6 items-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Showing</span>
                <select
                  value={pagination.limit}
                  onChange={handleLimitChange}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span>of {bookings.length} entries</span>
              </div>

  <div className="flex items-center gap-2">
    <button
      onClick={() => handlePageChange(pagination.page - 1)}
      disabled={pagination.page === 1}
      className={`px-3 py-1 rounded border ${
        pagination.page === 1
          ? "text-gray-400 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
    >
      Prev
    </button>

    {getPageNumbers().map((page, idx) =>
      page === "..." ? (
        <span key={idx} className="px-2">...</span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page as number)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            pagination.page === page
              ? "bg-blue-900 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      )
    )}

    <button
      onClick={() => handlePageChange(pagination.page + 1)}
      disabled={pagination.page === totalPages}
      className={`px-3 py-1 rounded border ${
        pagination.page === totalPages
          ? "text-gray-400 cursor-not-allowed"
          : "hover:bg-gray-100"
      }`}
    >
      Next
    </button>
  </div>


            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ✅ Reusable Stat Card
function StatCard({
  label,
  value,
  sub,
  title
}: {
  label: string;
  value: string;
  sub: string;
  title:string;
}) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 border border-[#F1F5F9]">
      <div className="flex flex-col gap-4">
        <div className="text-white flex items-center justify-center bg-blue-900 p-3 w-12 h-12 rounded-lg">
{title === "wallet" ? (
  <svg
    width="22"
    height="18"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5H9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.833 6H17.231C15.446 6 14 7.343 14 9C14 10.657 15.447 12 17.23 12H19.833C19.917 12 19.958 12 19.993 11.998C20.533 11.965 20.963 11.566 20.998 11.065C21 11.033 21 10.994 21 10.917V7.083C21 7.006 21 6.967 20.998 6.935C20.962 6.434 20.533 6.035 19.993 6.002C19.959 6 19.917 6 19.833 6Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M19.965 6C19.887 4.128 19.637 2.98 18.828 2.172C17.657 1 15.771 1 12 1H9C5.229 1 3.343 1 2.172 2.172C1.001 3.344 1 5.229 1 9C1 12.771 1 14.657 2.172 15.828C3.344 16.999 5.229 17 9 17H12C15.771 17 17.657 17 18.828 15.828C19.637 15.02 19.888 13.872 19.965 12"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M16.9912 9H17.0012"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) : title === "booking" ? (

<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99998 0.75C6.19889 0.75 6.38965 0.829018 6.53031 0.96967C6.67096 1.11032 6.74998 1.30109 6.74998 1.5V2.263C7.41198 2.25 8.14098 2.25 8.94298 2.25H13.056C13.859 2.25 14.588 2.25 15.25 2.263V1.5C15.25 1.30109 15.329 1.11032 15.4696 0.96967C15.6103 0.829018 15.8011 0.75 16 0.75C16.1989 0.75 16.3897 0.829018 16.5303 0.96967C16.671 1.11032 16.75 1.30109 16.75 1.5V2.327C17.01 2.347 17.2563 2.37233 17.489 2.403C18.661 2.561 19.61 2.893 20.359 3.641C21.107 4.39 21.439 5.339 21.597 6.511C21.75 7.651 21.75 9.106 21.75 10.944V13.056C21.75 14.894 21.75 16.35 21.597 17.489C21.439 18.661 21.107 19.61 20.359 20.359C19.61 21.107 18.661 21.439 17.489 21.597C16.349 21.75 14.894 21.75 13.056 21.75H8.94498C7.10698 21.75 5.65098 21.75 4.51198 21.597C3.33998 21.439 2.39098 21.107 1.64198 20.359C0.893976 19.61 0.561977 18.661 0.403977 17.489C0.250977 16.349 0.250977 14.894 0.250977 13.056V10.944C0.250977 9.106 0.250977 7.65 0.403977 6.511C0.561977 5.339 0.893976 4.39 1.64198 3.641C2.39098 2.893 3.33998 2.561 4.51198 2.403C4.74531 2.37233 4.99164 2.347 5.25098 2.327V1.5C5.25098 1.30126 5.32986 1.11065 5.47029 0.970023C5.61073 0.8294 5.80124 0.750265 5.99998 0.75ZM4.70998 3.89C3.70498 4.025 3.12498 4.279 2.70198 4.702C2.27898 5.125 2.02498 5.705 1.88998 6.71C1.86731 6.88 1.84798 7.05967 1.83198 7.249H20.168C20.152 7.05967 20.1326 6.87967 20.11 6.709C19.975 5.704 19.721 5.124 19.298 4.701C18.875 4.278 18.295 4.024 17.289 3.889C16.262 3.751 14.907 3.749 13 3.749H8.99998C7.09298 3.749 5.73898 3.752 4.70998 3.89ZM1.74998 11C1.74998 10.146 1.74998 9.403 1.76298 8.75H20.237C20.25 9.403 20.25 10.146 20.25 11V13C20.25 14.907 20.248 16.262 20.11 17.29C19.975 18.295 19.721 18.875 19.298 19.298C18.875 19.721 18.295 19.975 17.289 20.11C16.262 20.248 14.907 20.25 13 20.25H8.99998C7.09298 20.25 5.73898 20.248 4.70998 20.11C3.70498 19.975 3.12498 19.721 2.70198 19.298C2.27898 18.875 2.02498 18.295 1.88998 17.289C1.75198 16.262 1.74998 14.907 1.74998 13V11Z" fill="white"/>
</svg>

) : (

<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.944 0.25H11.056C12.894 0.25 14.35 0.25 15.489 0.403C16.661 0.561 17.61 0.893 18.359 1.641C19.107 2.39 19.439 3.339 19.597 4.511C19.75 5.651 19.75 7.106 19.75 8.944V13.056C19.75 14.894 19.75 16.35 19.597 17.489C19.439 18.661 19.107 19.61 18.359 20.359C17.61 21.107 16.661 21.439 15.489 21.597C14.349 21.75 12.894 21.75 11.056 21.75H8.944C7.106 21.75 5.65 21.75 4.511 21.597C3.339 21.439 2.39 21.107 1.641 20.359C0.893 19.61 0.561 18.661 0.403 17.489C0.25 16.349 0.25 14.894 0.25 13.056V8.944C0.25 7.106 0.25 5.65 0.403 4.511C0.561 3.339 0.893 2.39 1.641 1.641C2.39 0.893 3.339 0.561 4.511 0.403C5.651 0.25 7.106 0.25 8.944 0.25ZM4.71 1.89C3.704 2.025 3.124 2.279 2.7 2.702C2.278 3.125 2.024 3.705 1.889 4.711C1.751 5.739 1.749 7.093 1.749 9V13C1.749 14.907 1.751 16.262 1.889 17.29C2.024 18.295 2.278 18.875 2.701 19.298C3.124 19.721 3.704 19.975 4.71 20.11C5.738 20.248 7.092 20.25 8.999 20.25H10.999C12.906 20.25 14.261 20.248 15.289 20.11C16.294 19.975 16.874 19.721 17.297 19.298C17.72 18.875 17.974 18.295 18.109 17.289C18.247 16.262 18.249 14.907 18.249 13V9C18.249 7.093 18.247 5.739 18.109 4.71C17.974 3.705 17.72 3.125 17.297 2.702C16.874 2.279 16.294 2.025 15.288 1.89C14.261 1.752 12.906 1.75 10.999 1.75H8.999C7.092 1.75 5.739 1.752 4.71 1.89ZM5.25 9C5.25 8.80109 5.32902 8.61032 5.46967 8.46967C5.61032 8.32902 5.80109 8.25 6 8.25H14C14.1989 8.25 14.3897 8.32902 14.5303 8.46967C14.671 8.61032 14.75 8.80109 14.75 9C14.75 9.19891 14.671 9.38968 14.5303 9.53033C14.3897 9.67098 14.1989 9.75 14 9.75H6C5.80109 9.75 5.61032 9.67098 5.46967 9.53033C5.32902 9.38968 5.25 9.19891 5.25 9ZM5.25 13C5.25 12.8011 5.32902 12.6103 5.46967 12.4697C5.61032 12.329 5.80109 12.25 6 12.25H11C11.1989 12.25 11.3897 12.329 11.5303 12.4697C11.671 12.6103 11.75 12.8011 11.75 13C11.75 13.1989 11.671 13.3897 11.5303 13.5303C11.3897 13.671 11.1989 13.75 11 13.75H6C5.80109 13.75 5.61032 13.671 5.46967 13.5303C5.32902 13.3897 5.25 13.1989 5.25 13Z" fill="white"/>
</svg>

)}

        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-normal text-[#4B5563]">{label}</p>
          <p className="text-[#111827] font-bold text-3xl">{value}</p>
          <p className="text-sm font-normal text-[#64748B]">{sub}</p>
        </div>
      </div>
    </div>
  );
}
