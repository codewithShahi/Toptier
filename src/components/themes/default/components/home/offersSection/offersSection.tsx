import React from 'react';
const OfferSection = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div className="py-6 appHorizantalSpacing">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              Why Choose Us
            </h1>
            <p
              className="text-lg text-[#697488] max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: 'Urbanist, sans-serif' }}
            >
              Experience world-class comfort and unmatched hospitality — all in
              the heart of paradise.
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {/* CARD 1 */}
            <div className="relative max-w-[410px] max-h-[270px] bg-[#163C8C] rounded-2xl p-6 text-white overflow-hidden">
              <div className="relative z-10 text-left flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    Best Price Guarantee
                  </h3>
                  <p
                    className="text-blue-100 text-md leading-relaxed mb-7 max-w-[70%]"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    Enjoy unbeatable value with the lowest prices backed by our
                    promise of quality and comfort
                  </p>
                </div>
                <button
                  className="bg-white text-[#112233] cursor-pointer px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-fit"
                  style={{ fontFamily: 'Urbanist, sans-serif' }}
                  onClick={() => alert('Booking with confidence!')}
                >
                  Book with Confidence
                </button>
              </div>
              <div className="absolute -right-3 -bottom-1 opacity-100">
                <img src="./images/offer1.png" alt="" className="w-[130px] h-[130px] object-contain" />
              </div>
            </div>
            {/* CARD 2 */}
            <div className="relative  max-w-[410px] max-h-[270px] bg-[#163C8C] rounded-2xl p-6 text-white overflow-hidden">
              <div className="relative z-10 text-left flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    Easy & Quick Booking
                  </h3>
                  <p
                    className="text-blue-100 text-md leading-relaxed mb-7 max-w-[70%]"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    Book your stay in just a few clicks — fast, simple and
                    hassle-free from start to finish
                  </p>
                </div>
                <button
                  className="bg-white text-[#112233] cursor-pointer px-7 py-2.5  rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-fit"
                  style={{ fontFamily: 'Urbanist, sans-serif' }}
                  onClick={() => alert('Start booking now!')}
                >
                  Start Booking
                </button>
              </div>
              <div className="absolute -right-3 -bottom-1 opacity-100">
                <img src="./images/offer2.png" alt="" className="w-[190px] h-[160px] object-contain" />
              </div>
            </div>
            {/* CARD 3 */}
            <div className="relative max-w-[410px] max-h-[270px] bg-[#163C8C] rounded-2xl p-6 text-white overflow-hidden">
              <div className="relative z-10 text-left flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                    Customer Care 24/7
                  </h3>
                  <p
                    className="text-blue-100 text-md leading-relaxed mb-7 max-w-[70%]"
                    style={{ fontFamily: 'Urbanist, sans-serif' }}
                  >
                   We are here for you anytime, anywhere — with dedicated
                    support around the clock
                  </p>
                </div>
                <button
                  className="bg-white text-[#112233] cursor-pointer px-7 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-fit"
                  style={{ fontFamily: 'Urbanist, sans-serif' }}
                  onClick={() => alert('Booking with confidence!')}
                >
                  Contact Support
                </button>
              </div>
              <div className="absolute -right-3 -bottom-1 opacity-100">
                <img src="./images/offer3.png" alt="" className="w-[215px] h-[150px] object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OfferSection;