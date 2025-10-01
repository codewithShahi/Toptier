import React from 'react';
import { Icon } from '@iconify/react';

interface Guest {
  traveller_type: string;
  title: string;
  first_name: string;
  last_name: string;
  nationality: string;
}

interface RoomData {
  id: string;
  name: string;
  price: string;
  currency: string;
}

const HotelInvoice: React.FC = () => {
  const booking = {
    booking_id: "207",
    booking_ref_no: "20251001070317",
    booking_date: "2025-10-01",
    booking_status: "pending",
    price_markup: "200.00",
    first_name: "afnan",
    last_name: "khan",
    email: "adm@gmail.com",
    phone_country_code: "93",
    phone: "345899000",
    country: "United Arab Emirates",
    stars: "5",
    hotel_name: "Movenpick Grand Al Bustan",
    hotel_address: "Casablanca St - Garhoud - Dubai - United Arab Emirates",
    location: "Dubai",
    hotel_img: "https://toptiertravel.vip/uploads/527605-28-01-2023-1674874276.jpg",
    checkin: "2025-10-01",
    checkout: "2025-10-02",
    currency_markup: "USD",
    payment_status: "unpaid",
    payment_gateway: "PayPal"
  };

  const roomData: RoomData[] = JSON.parse('[{"id":"16","name":"Single","price":"200.00","currency":"USD"}]');
  const guests: Guest[] = JSON.parse('[{"traveller_type":"adults","title":"Mr","first_name":"sdfsdfs","last_name":"khsdfs"},{"traveller_type":"adults","title":"Mr","first_name":"sddsfsf","last_name":"dfsdfs"},{"traveller_type":"adults","title":"Mr","first_name":"sdfsf","last_name":"sdfsdf"},{"traveller_type":"adults","title":"Mr","first_name":"sfsdfs","last_name":"sdfsfdsf"}]');

  const calculateNights = () => {
    const checkIn = new Date(booking.checkin);
    const checkOut = new Date(booking.checkout);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header Bar */}
      <div className="bg-white border-b print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Invoice</h1>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-gray-700 hover:text-[#163C8C] transition-colors">
              <Icon icon="mdi:arrow-left" width="18" height="18" />
              <span className="text-sm font-medium">BACK</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-[#163C8C] transition-colors">
              <Icon icon="mdi:email-outline" width="18" height="18" />
              <span className="text-sm font-medium">SEND MAIL</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-gray-700 hover:text-[#163C8C] transition-colors"
            >
              <Icon icon="mdi:printer" width="18" height="18" />
              <span className="text-sm font-medium">PRINT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-10 py-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              {/* Hotel Logo and Info */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#163C8C] to-[#0f2d6b] rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:hotel" width="32" height="32" className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#163C8C] mb-1">TOP TIER TRAVEL</h2>
                  <p className="text-sm text-gray-700 font-medium">{booking.hotel_name}</p>
                  <p className="text-sm text-gray-600 mt-1">{booking.hotel_address}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <Icon icon="mdi:phone" width="14" height="14" className="inline mr-1" />
                    +{booking.phone_country_code} {booking.phone} |
                    <Icon icon="mdi:email" width="14" height="14" className="inline mx-1" />
                    {booking.email}
                  </p>
                </div>
              </div>

              {/* Invoice Number */}
              <div className="text-right min-w-[200px]">
                <h3 className="text-lg font-bold text-gray-900 mb-1">INVOICE</h3>
                <p className="text-sm text-gray-600">#{booking.booking_ref_no}</p>
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Ref No.:</span> {booking.booking_id}</p>
                  <p><span className="font-medium">Date:</span> {formatDate(booking.booking_date)}</p>
                  <p><span className="font-medium">Valid Till:</span> {formatDate(booking.checkout)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Details Section */}
          <div className="px-10 py-6 bg-gray-50">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Guest Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">FULL NAME</p>
                <p className="text-sm text-gray-900 font-medium capitalize">{booking.first_name} {booking.last_name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">EMAIL</p>
                <p className="text-sm text-gray-900">{booking.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CONTACT</p>
                <p className="text-sm text-gray-900">+{booking.phone_country_code} {booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Reservation Details Section */}
          <div className="px-10 py-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Reservation Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">CHECK-IN</p>
                <p className="text-sm text-gray-900 font-medium">{formatDate(booking.checkin)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CHECK-OUT</p>
                <p className="text-sm text-gray-900 font-medium">{formatDate(booking.checkout)}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-bold text-gray-900">{roomData[0].name} Room</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Elegantly designed room offering luxury, comfort, and convenience.
              Includes welcome drink and refreshing cold towel on arrival.
              Accommodates {guests.length} guest{guests.length !== 1 ? 's' : ''} for {nights} night{nights !== 1 ? 's' : ''} in {booking.location}.
            </p>
          </div>

          {/* Payment Details Section */}
          <div className="px-10 py-6 bg-gray-50">
            <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Payment Summary</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Total Amount</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.currency_markup} {booking.price_markup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Amount Paid</span>
                  <span className="text-sm font-semibold text-gray-900">{booking.currency_markup} {(parseFloat(booking.price_markup) * 0.5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300">
                  <span className="text-sm font-bold text-gray-900">Balance Due at Hotel</span>
                  <span className="text-sm font-bold text-[#163C8C]">{booking.currency_markup} {(parseFloat(booking.price_markup) * 0.5).toFixed(2)}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-4">Accepted Payment Methods</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Credit Cards</p>
                    <div className="flex gap-3">
                      <div className="w-12 h-8 bg-white border rounded flex items-center justify-center">
                        <Icon icon="logos:mastercard" width="24" height="16" />
                      </div>
                      <div className="w-12 h-8 bg-white border rounded flex items-center justify-center">
                        <Icon icon="logos:visa" width="24" height="16" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Digital Wallets</p>
                    <div className="flex gap-3">
                      <div className="w-12 h-8 bg-white border rounded flex items-center justify-center">
                        <Icon icon="logos:paypal" width="24" height="16" />
                      </div>
                      <div className="w-12 h-8 bg-white border rounded flex items-center justify-center">
                        <Icon icon="logos:apple-pay" width="24" height="16" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-[#163C8C] hover:bg-[#0f2d6b] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .bg-gradient-to-br {
            background: #163C8C !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HotelInvoice;