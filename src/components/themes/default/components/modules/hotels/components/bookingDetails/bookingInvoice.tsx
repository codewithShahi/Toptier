"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@lib/redux/store";

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
  invoiceDetails: any[];
}

const HotelInvoice: React.FC<HotelInvoiceProps> = ({ invoiceDetails }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [showInvoiceImage, setShowInvoiceImage] = useState(false);

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
  const appData = useAppSelector((state) => state.appData?.data?.app);

  // Generate the invoice URL for QR code
  const invoiceUrl = `${window.location.origin}/invoice/${data.booking_ref_no}`;

  const bookingData = {
    paymentStatus: data.payment_status,
    bookingStatus: data.booking_status,
    phone: data.phone || "N/A",
    email: data.email || "N/A",
    bookingId: data.booking_id,
    bookingReference: data.booking_ref_no,
    bookingDate: data.booking_date,
    travellers,
    hotel: {
      name: data.hotel_name,
      rating: Number(data.stars) || 0,
      address: data.hotel_address || "N/A",
      location: data.location,
      phone: data.hotel_phone || "N/A",
      email: data.hotel_email || "N/A",
      website: data.hotel_website || "N/A",
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
      email: data.email || "N/A",
      contact: data.phone || "N/A",
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
Total: ${bookingData.total}

View Invoice: ${invoiceUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-4 sm:px-6">
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <img
            src={appData.header_logo_img || "https://via.placeholder.com/150"}
            alt="Hotel"
            className="h-16 w-auto object-contain rounded-md"
          />

          <div className="flex-1 text-left sm:text-right">
            <div className="">
              <span className="text-sm font-semibold">Payment Status: </span>
              <span className="text-sm text-green-600 font-semibold">
                {bookingData.paymentStatus}
              </span>
            </div>
            <div className="">
              <span className="text-sm font-semibold">Booking Status: </span>
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

          {/* QR Code - links to invoice page */}
          <div className="w-20 h-20 p-1 cursor-pointer" onClick={() => setShowInvoiceImage(true)}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(invoiceUrl)}`}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-6">
          {/* Booking Note */}
          <div className="border bg-[#F5F5F5] border-gray-200 rounded-lg p-4 text-start">
            Payable through Toptier Travel acting as agent for the service operating company.
          </div>

          {/* Booking Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-gray-200 rounded-lg p-4">
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
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Travellers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-2 font-semibold text-gray-600">No</th>
                    <th className="text-left p-2 font-semibold text-gray-600">SR</th>
                    <th className="text-left p-2 font-semibold text-gray-600">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {travellers.map((t, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{t.title}</td>
                      <td className="p-2">
                        {t.first_name} {t.last_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hotel Info */}
          <div className="border border-gray-200 rounded-lg p-4 text-start">
            <div className="flex mb-2">
              {[...Array(bookingData.hotel.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{bookingData.hotel.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{bookingData.hotel.address}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <div>
                <span className="font-semibold">Phone:</span> {bookingData.hotel.phone}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {bookingData.hotel.email}
              </div>
              <div>
                <span className="font-semibold">Website:</span> {bookingData.hotel.website}
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Room Details</h3>
            <p className="text-sm mb-2">
              <span className="font-semibold">Checkin:</span> {bookingData.room.checkin}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Checkout:</span> {bookingData.room.checkout}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Type:</span> {bookingData.room.type}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Total:</span> {bookingData.total}
            </p>
          </div>

          {/* Fare + Tax Info */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-2xl font-bold text-gray-800 text-center mb-3">Rate Comment</h4>
            <p className="text-gray-700 mb-4">
              Estimated total amount of taxes & fees for this booking: {bookingData.taxes} payable on
              arrival. City tax may vary by accommodation. Check-in hour 14:00 - 00:00. Check-out hour
              12:30 - 12:00.
            </p>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded mb-2">
              <span className="text-sm font-semibold">TAX</span>
              <span className="text-sm font-semibold">
                {"%"} {invoiceDetails[0].tax}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
              <span className="text-sm font-bold">Total</span>
              <span className="text-sm font-bold">{bookingData.total}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-700 mb-3">Customer</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Email:</span> {bookingData.customer.email}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span> {bookingData.customer.contact}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {bookingData.customer.address}
                </p>
              </div>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-bold text-gray-700 mb-3">Customer Care</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Email:</span> {appData.contact_email}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span> {appData.contact_phone}
                </p>
                <p>
                  <span className="font-semibold">Website:</span> {appData.site_url}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-200 bg-white py-5 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
<Icon icon="mdi:tray-arrow-down" width="24" height="24" />            Download PDF
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            <Icon icon="mdi:payment" width="24" height="24" />
            {/* <Icon icon="ic:baseline-whatsapp" width="20" /> */}
            Pay Now
          </button>
        </div>
      </div>


    </div>
  );
};

export default HotelInvoice;