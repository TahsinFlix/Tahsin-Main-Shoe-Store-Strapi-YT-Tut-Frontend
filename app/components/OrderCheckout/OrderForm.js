
const divisions = [
    'Dhaka', 'Chittagong', 'Khulna', 'Barishal',
    'Mymonsingh', 'Rajshahi', 'Rangpur', 'Sylhet'
];

const districts = [
    'Savar', 'Ashulia', 'Narasyangonj', 'Hemayetpur', 'Dhaka'
];

export default function OrderForm({ customerDetails, handleInputChange, errors }) {

    //     let formErrors = {};

    //     if (!customerDetails.fullName) {
    //         formErrors.fullName = "Full Name is required";
    //     }
    //     if (!customerDetails.email) {
    //         formErrors.email = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
    //         formErrors.email = "Email address is invalid";
    //     }
    //     if (!customerDetails.phoneNumber) {
    //         formErrors.phoneNumber = "Phone Number is required";
    //     }
    //     if (!customerDetails.division) {
    //         formErrors.division = "Division is required";
    //     }
    //     if (!customerDetails.district) {
    //         formErrors.district = "District is required";
    //     }
    //     if (!customerDetails.fullAddress) {
    //         formErrors.fullAddress = "Full Address is required";
    //     }

    //     setErrors(formErrors);
    //     return Object.keys(formErrors).length === 0;
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (validateForm()) {
    //         handlePlaceOrder();
    //     }
    // };

    return (
        <form className='flex flex-col'>
            <input
                type="text"
                name="fullName"
                value={customerDetails.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="border p-2 mb-4"
                required
            />
            {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
            <input
                type="email"
                name="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 mb-4"
                required
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
            <input
                type="text"
                name="phoneNumber"
                value={customerDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="border p-2 mb-4"
                required
            />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
            <select
                name="division"
                value={customerDetails.division}
                onChange={handleInputChange}
                className="border p-2 mb-4"
                required
            >
                <option value="">Select City</option>
                {divisions.map((division) => (
                    <option key={division} value={division}>
                        {division}
                    </option>
                ))}
            </select>
            {errors.division && <span className="text-red-500">{errors.division}</span>}
            <select
                name="district"
                value={customerDetails.district}
                onChange={handleInputChange}
                className="border p-2 mb-4"
                required
            >
                <option value="">Select District</option>
                {districts.map((district) => (
                    <option key={district} value={district}>
                        {district}
                    </option>
                ))}
            </select>
            {errors.district && <span className="text-red-500">{errors.district}</span>}
            <textarea
                name="fullAddress"
                value={customerDetails.fullAddress}
                onChange={handleInputChange}
                placeholder="Full Address"
                className="border p-2 mb-4"
                required
            />
            {errors.fullAddress && <span className="text-red-500">{errors.fullAddress}</span>}
            <textarea
                name="comments"
                value={customerDetails.comments}
                onChange={handleInputChange}
                placeholder="Additional Comments"
                className="border px-4 py-8 mb-4"
            />
        </form>
    );
}
