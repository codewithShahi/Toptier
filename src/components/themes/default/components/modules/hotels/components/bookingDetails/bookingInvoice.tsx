"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";

interface Traveller {
  traveller_type: string;
  title: string;
  first_name: string;
  last_name: string;
}

interface RoomData {
  id: string;
  name: string;
  price: string;
  currency: string;
}

interface Invoice {
  booking_id: string;
  booking_ref_no: string;
  booking_date: string;
  booking_status: string;
  payment_status: string;
  hotel_name: string;
  hotel_address: string;
  hotel_phone: string;
  hotel_email: string;
  hotel_website: string;
  stars: string;
  checkin: string;
  checkout: string;
  location: string;
  email: string;
  phone: string;
  hotel_img: string;
  country: string;
  currency_markup: string;
  room_data: string;
  guest: string;
  first_name: string;
  last_name: string;
  tax: string;
  price_markup: string;
}

interface HotelInvoiceProps {
  invoiceDetails: Invoice[];
}

const HotelInvoice: React.FC<HotelInvoiceProps> = ({ invoiceDetails }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!invoiceDetails?.length) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        No invoice details found.
      </div>
    );
  }

  const data = invoiceDetails[0];
  const travellers: Traveller[] = JSON.parse(data.guest || "[]");
  const rooms: RoomData[] = JSON.parse(data.room_data || "[]");

  const bookingData = {
    paymentStatus: data.payment_status,
    bookingStatus: data.booking_status,
    phone: data.phone,
    email: data.email,
    bookingId: data.booking_id,
    bookingReference: data.booking_ref_no,
    bookingDate: data.booking_date,
    travellers,
    hotel: {
      name: data.hotel_name,
      rating: Number(data.stars) || 0,
      address: data.hotel_address,
      location: data.location,
      phone: data.hotel_phone,
      email: data.hotel_email,
      website: data.hotel_website,
      image: data.hotel_img,
    },
    room: {
      checkin: data.checkin,
      checkout: data.checkout,
      totalNights: 1,
      type: rooms[0]?.name || "N/A",
      quantity: rooms.length,
      price: rooms[0]?.price || data.price_markup,
      currency: rooms[0]?.currency || data.currency_markup,
    },
    taxes: data.tax || "0",
    total: `${data.currency_markup} ${data.price_markup}`,
    customer: {
      email: data.email,
      contact: data.phone,
      address: "N/A",
    },
    customerCare: {
      email: "support@toptiertravel.vip",
      contact: "+971-000-0000",
      website: "https://toptiertravel.vip",
    },
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality will be implemented later.");
  };

  const handleShareWhatsApp = () => {
    const message = `Hotel Booking Confirmation
Booking Reference: ${bookingData.bookingReference}
Hotel: ${bookingData.hotel.name}
Check-in: ${bookingData.room.checkin}
Check-out: ${bookingData.room.checkout}
Guest: ${travellers[0]?.first_name || "N/A"}
Total: ${bookingData.total}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div ref={invoiceRef} className="bg-white shadow-lg">

          {/* Header */}
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={bookingData.hotel.image || "https://via.placeholder.com/150"}
                  alt="Hotel"
                  className="h-14 w-auto object-contain rounded-md"
                />
              </div>

              {/* Booking Info */}
              <div className="flex-1 text-left sm:text-right">
                <div className="mb-2">
                  <span className="text-sm font-semibold">Payment Status </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {bookingData.paymentStatus}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold">Booking Status </span>
                  <span className="text-sm text-blue-600 font-semibold">
                    {bookingData.bookingStatus}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Phone:</span> {bookingData.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {bookingData.email}
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 border-2 border-gray-300 rounded p-1">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Booking:${bookingData.bookingReference}`}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-gray-50 p-3 sm:p-4 text-xs text-gray-700">
            Payable through Toptier Travel acting as agent for the service operating company.
          </div>

          {/* Booking Details */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">Booking ID</div>
                <div className="text-sm font-medium">{bookingData.bookingId}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">Reference</div>
                <div className="text-sm font-medium">{bookingData.bookingReference}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">Date</div>
                <div className="text-sm font-medium">{bookingData.bookingDate}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1">Location</div>
                <div className="text-sm font-medium">{bookingData.hotel.location}</div>
              </div>
            </div>

            {/* Travellers */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Travellers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-2 font-semibold text-gray-600">No</th>
                      <th className="text-left p-2 font-semibold text-gray-600">SR</th>
                      <th className="text-left p-2 font-semibold text-gray-600">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {travellers.map((t, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{t.title}</td>
                        <td className="p-2">{t.first_name} {t.last_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hotel */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-6 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(bookingData.hotel.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {bookingData.hotel.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{bookingData.hotel.address}</p>
              <div className="text-sm text-gray-700">
                <div><span className="font-semibold">Phone:</span> {bookingData.hotel.phone}</div>
                <div><span className="font-semibold">Email:</span> {bookingData.hotel.email}</div>
                <div><span className="font-semibold">Website:</span> {bookingData.hotel.website}</div>
              </div>
            </div>

            {/* Room */}
            <div className="mb-6 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Room Details</h3>
              <p className="text-sm mb-2">
                <span className="font-semibold">Checkin:</span> {bookingData.room.checkin} {" "}
                <span className="font-semibold">Checkout:</span> {bookingData.room.checkout}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Type:</span> {bookingData.room.type}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Total:</span> {bookingData.total}
              </p>
            </div>
             <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-3">Rate Comment</h4>
                <p className="text-xs text-gray-700">
                  Estimated total amount of taxes & fees for this booking: {bookingData.taxes} payable on
                  arrival. Please note that the city tax for accommodations with more than 1 bedroom shall be
                  charged per bedroom per night. Car rate YES (with additional debit notes). Check-in hour 14:00 -
                  00:00. Check-out hour 12:30 - 12:00.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3">Fare Details</h4>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
                  <span className="text-sm font-semibold">TAX</span>
                  <span className="text-sm font-semibold">% 0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                  <span className="text-sm font-bold">Total</span>
                  <span className="text-sm font-bold">{bookingData.total}</span>
                </div>
              </div>

            {/* Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Customer</h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Email:</span> {bookingData.customer.email}</p>
                  <p><span className="font-semibold">Contact:</span> {bookingData.customer.contact}</p>
                  <p><span className="font-semibold">Address:</span> {bookingData.customer.address}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Customer Care</h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Email:</span> {bookingData.customerCare.email}</p>
                  <p><span className="font-semibold">Contact:</span> {bookingData.customerCare.contact}</p>
                  <p><span className="font-semibold">Website:</span> {bookingData.customerCare.website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            <Icon icon="material-symbols:download" width="20" />
            Download PDF
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            <Icon icon="ic:baseline-whatsapp" width="20" />
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelInvoice;
