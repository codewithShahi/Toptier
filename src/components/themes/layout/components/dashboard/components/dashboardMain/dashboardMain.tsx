"use client";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const bookings = [
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Abdullah",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Zaheer",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Abbas",
      bookingId: "#BK20250607",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotels",
      date: "09 Oct 2025",
      price: "$300",
    },
    {
      client: "Ali Raza",
      bookingId: "#BK20250601",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "Usman Malik",
      bookingId: "#BK20250602",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$230",
    },
    {
      client: "Sarah Khan",
      bookingId: "#BK20250603",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$250",
    },
    {
      client: "John Smith",
      bookingId: "#BK20250604",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$180",
    },
    {
      client: "Fatima Zahra",
      bookingId: "#BK20250605",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$220",
    },
    {
      client: "David Lee",
      bookingId: "#BK20250901",
      pnr: "PNR54321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$320",
    },
    {
      client: "Qasim",
      bookingId: "#BK20250606",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Hotel",
      date: "09 Oct 2025",
      price: "$260",
    },
    {
      client: "Faisal",
      bookingId: "#BK20250607",
      pnr: "PNR654321",
      payment: "Paid",
      booking: "Flight",
      date: "09 Oct 2025",
      price: "$300",
    },
  ];

  const cards = [
    {
      label: "Wallet Balance",
      value: "USD 0",
      sub: "Total Wallet Balance",
      svg: (
        <svg
          width="24"
          height="22"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5H9"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.833 6H17.231C15.446 6 14 7.343 14 9C14 10.657 15.447 12 17.23 12H19.833C19.917 12 19.958 12 19.993 11.998C20.533 11.965 20.963 11.566 20.998 11.065C21 11.033 21 10.994 21 10.917V7.083C21 7.006 21 6.967 20.998 6.935C20.962 6.434 20.533 6.035 19.993 6.002C19.959 6 19.917 6 19.833 6Z"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M19.965 6C19.887 4.128 19.637 2.98 18.828 2.172C17.657 1 15.771 1 12 1H9C5.229 1 3.343 1 2.172 2.172C1.001 3.344 1 5.229 1 9C1 12.771 1 14.657 2.172 15.828C3.344 16.999 5.229 17 9 17H12C15.771 17 17.657 17 18.828 15.828C19.637 15.02 19.888 13.872 19.965 12"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            d="M16.9912 9H17.0012"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Bookings",
      value: "5",
      sub: "Total Bookings",
      svg: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.99998 1.75C7.19889 1.75 7.38965 1.82902 7.53031 1.96967C7.67096 2.11032 7.74998 2.30109 7.74998 2.5V3.263C8.41198 3.25 9.14098 3.25 9.94298 3.25H14.056C14.859 3.25 15.588 3.25 16.25 3.263V2.5C16.25 2.30109 16.329 2.11032 16.4696 1.96967C16.6103 1.82902 16.8011 1.75 17 1.75C17.1989 1.75 17.3897 1.82902 17.5303 1.96967C17.671 2.11032 17.75 2.30109 17.75 2.5V3.327C18.01 3.347 18.2563 3.37233 18.489 3.403C19.661 3.561 20.61 3.893 21.359 4.641C22.107 5.39 22.439 6.339 22.597 7.511C22.75 8.651 22.75 10.106 22.75 11.944V14.056C22.75 15.894 22.75 17.35 22.597 18.489C22.439 19.661 22.107 20.61 21.359 21.359C20.61 22.107 19.661 22.439 18.489 22.597C17.349 22.75 15.894 22.75 14.056 22.75H9.94498C8.10698 22.75 6.65098 22.75 5.51198 22.597C4.33998 22.439 3.39098 22.107 2.64198 21.359C1.89398 20.61 1.56198 19.661 1.40398 18.489C1.25098 17.349 1.25098 15.894 1.25098 14.056V11.944C1.25098 10.106 1.25098 8.65 1.40398 7.511C1.56198 6.339 1.89398 5.39 2.64198 4.641C3.39098 3.893 4.33998 3.561 5.51198 3.403C5.74531 3.37233 5.99164 3.347 6.25098 3.327V2.5C6.25098 2.30126 6.32986 2.11065 6.47029 1.97002C6.61073 1.8294 6.80124 1.75026 6.99998 1.75ZM5.70998 4.89C4.70498 5.025 4.12498 5.279 3.70198 5.702C3.27898 6.125 3.02498 6.705 2.88998 7.71C2.86731 7.88 2.84798 8.05967 2.83198 8.249H21.168C21.152 8.05967 21.1326 7.87967 21.11 7.709C20.975 6.704 20.721 6.124 20.298 5.701C19.875 5.278 19.295 5.024 18.289 4.889C17.262 4.751 15.907 4.749 14 4.749H9.99998C8.09298 4.749 6.73898 4.752 5.70998 4.89ZM2.74998 12C2.74998 11.146 2.74998 10.403 2.76298 9.75H21.237C21.25 10.403 21.25 11.146 21.25 12V14C21.25 15.907 21.248 17.262 21.11 18.29C20.975 19.295 20.721 19.875 20.298 20.298C19.875 20.721 19.295 20.975 18.289 21.11C17.262 21.248 15.907 21.25 14 21.25H9.99998C8.09298 21.25 6.73898 21.248 5.70998 21.11C4.70498 20.975 4.12498 20.721 3.70198 20.298C3.27898 19.875 3.02498 19.295 2.88998 18.289C2.75198 17.262 2.74998 15.907 2.74998 14V12Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      label: "Pending Invoices",
      value: "0",
      sub: "Pending Invoices",
      svg: (
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.944 0.25H11.056C12.894 0.25 14.35 0.25 15.489 0.403C16.661 0.561 17.61 0.893 18.359 1.641C19.107 2.39 19.439 3.339 19.597 4.511C19.75 5.651 19.75 7.106 19.75 8.944V13.056C19.75 14.894 19.75 16.35 19.597 17.489C19.439 18.661 19.107 19.61 18.359 20.359C17.61 21.107 16.661 21.439 15.489 21.597C14.349 21.75 12.894 21.75 11.056 21.75H8.944C7.106 21.75 5.65 21.75 4.511 21.597C3.339 21.439 2.39 21.107 1.641 20.359C0.893 19.61 0.561 18.661 0.403 17.489C0.25 16.349 0.25 14.894 0.25 13.056V8.944C0.25 7.106 0.25 5.65 0.403 4.511C0.561 3.339 0.893 2.39 1.641 1.641C2.39 0.893 3.339 0.561 4.511 0.403C5.651 0.25 7.106 0.25 8.944 0.25ZM4.71 1.89C3.704 2.025 3.124 2.279 2.7 2.702C2.278 3.125 2.024 3.705 1.889 4.711C1.751 5.739 1.749 7.093 1.749 9V13C1.749 14.907 1.751 16.262 1.889 17.29C2.024 18.295 2.278 18.875 2.701 19.298C3.124 19.721 3.704 19.975 4.71 20.11C5.738 20.248 7.092 20.25 8.999 20.25H10.999C12.906 20.25 14.261 20.248 15.289 20.11C16.294 19.975 16.874 19.721 17.297 19.298C17.72 18.875 17.974 18.295 18.109 17.289C18.247 16.262 18.249 14.907 18.249 13V9C18.249 7.093 18.247 5.739 18.109 4.71C17.974 3.705 17.72 3.125 17.297 2.702C16.874 2.279 16.294 2.025 15.288 1.89C14.261 1.752 12.906 1.75 10.999 1.75H8.999C7.092 1.75 5.739 1.752 4.71 1.89ZM5.25 9C5.25 8.80109 5.32902 8.61032 5.46967 8.46967C5.61032 8.32902 5.80109 8.25 6 8.25H14C14.1989 8.25 14.3897 8.32902 14.5303 8.46967C14.671 8.61032 14.75 8.80109 14.75 9C14.75 9.19891 14.671 9.38968 14.5303 9.53033C14.3897 9.67098 14.1989 9.75 14 9.75H6C5.80109 9.75 5.61032 9.67098 5.46967 9.53033C5.32902 9.38968 5.25 9.19891 5.25 9ZM5.25 13C5.25 12.8011 5.32902 12.6103 5.46967 12.4697C5.61032 12.329 5.80109 12.25 6 12.25H11C11.1989 12.25 11.3897 12.329 11.5303 12.4697C11.671 12.6103 11.75 12.8011 11.75 13C11.75 13.1989 11.671 13.3897 11.5303 13.5303C11.3897 13.671 11.1989 13.75 11 13.75H6C5.80109 13.75 5.61032 13.671 5.46967 13.5303C5.32902 13.3897 5.25 13.1989 5.25 13Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  // ✅ Pagination Logic (AFTER bookings)
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Handlers (if not defined already)
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e:any) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // 🔹 Pagination Helper
  const getPages = (current: number, total: number) => {
    const pages: (number | string)[] = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen w-full mx-auto bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-1">
        Welcome back, Hamza
      </h1>
      <p className="text-[#475569] text-base font-normal mb-8">
        Here’s a quick look at your travel account
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {cards.map((cards, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border border-[#F1F5F9]"
          >
            <div className="flex flex-col gap-4">
              <div className="text-white bg-blue-900 p-3 w-12 h-12 rounded-lg">
                {cards.svg}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-normal text-[#4B5563]">
                  {cards.label}
                </p>
                <p className="text-[#111827] font-bold text-3xl">
                  {cards.value}
                </p>
                <p className="text-sm font-normal text-[#64748B]">
                  {cards.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#F1F5F9]">
        <div className="flex bg-white justify-between items-center px-6 py-4">
          {/* Tabs */}
          <div className="flex gap-2 rounded-md p-1">
            {["Active (10)", "Past (12)", "Cancelled (20)"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-900 text-white"
                    : "text-gray-600 bg-[#F3F4F6] "
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* booking button */}
          <button className="flex gap-2 bg-blue-900 px-3 py-2 rounded-xl hover:bg-gray-900 transition">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <path
                d="M5.2125 1.31873V5.53123M5.2125 5.53123V9.74373M5.2125 5.53123H9.425M5.2125 5.53123H1"
                stroke="white"
                stroke-width="1.75521"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="text-white text-sm font-medium">
              Book a New Trip
            </span>
          </button>
        </div>
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
            {currentBookings.map((b, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition py-4"
              >
                <td className="py-6 px-6">{b.client}</td>
                <td className="py-6 px-6">{b.bookingId}</td>
                <td className="py-6 px-6">{b.pnr}</td>
                <td className="py-6 px-6">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                    {b.payment}
                  </span>
                </td>
                <td className="py-6 px-6">{b.booking}</td>
                <td className="py-6 px-6">{b.date}</td>
                <td className="py-6 px-6">{b.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between border-t px-8 py-6 items-center mt-4 text-sm text-gray-600">
          <div className="flex gap-2">
            <span className="mt-1">Showing</span>
            <div className="relative inline-block">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="appearance-none cursor-pointer border border-[#E2E8F0] py-1 pl-2 pr-6 rounded focus:outline-none"
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              {/* Custom SVG dropdown icon */}
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 text-gray-500"
              >
                <path
                  d="M8.02793 1.22046L4.61333 4.89772L1.19873 1.22046"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="mt-1">of {bookings.length} entries</span>
          </div>

          {/* Advanced Pagination Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100"
              } text-black border cursor-pointer border-[#E2E8F0] py-2 px-4 rounded-sm`}
            >
              Previous
            </button>

            {getPages(currentPage, totalPages).map((item, i) => (
              <button
                key={i}
                disabled={item === "..."}
                onClick={() => typeof item === "number" && setCurrentPage(item)}
                className={`px-2 py-1 rounded-sm border border-[#E2E8F0] text-sm ${
                  item === currentPage
                    ? "font-bold text-blue-900 bg-gray-100 "
                    : "hover:bg-gray-50 "
                }`}
              >
                {item}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100 "
              } text-black border cursor-pointer border-[#E2E8F0] py-2 px-4 rounded-sm`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
