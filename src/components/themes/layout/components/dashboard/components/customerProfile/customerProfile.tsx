export default function CustomerProfile() {
  return (
    <div className=" bg-gray-50 flex justify-center">
      <div className="bg-white shadow-md rounded-xl px-8 py-5 mt-4 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1.5">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Phone Code */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">
              Phone Code
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Code"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* State */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* City */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </form>
        <div className="flex flex-col gap-5 mt-4">
          {/* Address 1 */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">
              Address 1
            </label>
            <input
              type="text"
              name="address1"
              placeholder=" Address 1"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {/* Address 2 */}
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="block text-gray-600 text-sm mb-1">
              Address 2
            </label>
            <input
              type="text"
              name="address2"
              placeholder=" Address 2"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
            />
          </div>
        </div>
        {/* Button */}
        <div className="md:col-span-2 flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-900 text-white w-full font-medium px-8 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
