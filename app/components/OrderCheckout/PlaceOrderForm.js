'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import OrderForm from './OrderForm';
import { makeCodPaymentRequest } from '@/utils/api';
import { clearCart } from '@/store/cartSlice';

// import cancelConfirmNavigation from '@/lib/cancelCofirmNavigation';
// import calculateDelivery from '@/utils/calculateDelivery';

export default function PlaceOrderForm() {
    const [customerDetails, setCustomerDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        division: '',
        district: '',
        fullAddress: '',
        comments: '',
    });
    // const [deliveryDetails, setDeliveryDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const { cartItems } = useSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    }


        const validateForm = () => {
            let formErrors = {};
    
            if (!customerDetails.fullName) {
                formErrors.fullName = "Full Name is required";
            }
            if (!customerDetails.email) {
                formErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
                formErrors.email = "Email address is invalid";
            }
            if (!customerDetails.phoneNumber) {
                formErrors.phoneNumber = "Phone Number is required";
            }
            if (!customerDetails.division) {
                formErrors.division = "Division is required";
            }
            if (!customerDetails.district) {
                formErrors.district = "District is required";
            }
            if (!customerDetails.fullAddress) {
                formErrors.fullAddress = "Full Address is required";
            }
    
            setErrors(formErrors);
            return Object.keys(formErrors).length === 0;
        };


        // if (name === 'city' || name === 'district') {
        //     const deliveryInfo = calculateDelivery(customerDetails.city, customerDetails.district);
        //     setDeliveryDetails(deliveryInfo);
        // }

    const handlePlaceOrder = async () => {
        try {
            setLoading(true)
            const paymentData = await makeCodPaymentRequest('/api/orders', {
                products: cartItems,
                // customerDetails: { ...customerDetails, ...deliveryDetails }
                ...customerDetails 
            });
            console.log(paymentData);
            

            if (!paymentData.order) {
                throw new Error(`Failed to make payment: ${paymentData.error}`);
            }


            const { CodGatewayId } = await paymentData; // Extract CodGatewayId from response


            if (!CodGatewayId) {
                throw new Error('Failed to retrieve CodGatewayId');
            }

            // Redirect to the dynamic success page with the CodGatewayId
            // window.location.href = `/${CodGatewayId}/success/thank-you`;

            dispatch(clearCart())
            console.log('Payment Successful', paymentData);

             router.push(`/${CodGatewayId}/success/thank-you`);


        } catch (error) {
            setLoading(false);
            console.error(error.message);
            // Optionally, display an error message to the user
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            handlePlaceOrder();
        }
    };


    // cancelConfirmNavigation();

return (
    <div className="min-h-screen flex justify-center items-center">
        <div className="w-[25rem] md:w-1/2 rounded-lg p-5 mx-auto flex flex-col">
            <div className="text-2xl font-bold mb-4">Place Your Order</div>
                <OrderForm 
                    customerDetails={customerDetails}
                    handleInputChange={handleInputChange}
                    errors={errors}
                />

                {/* <div className="text-lg font-bold mb-4">
                    Delivery Charge: &#8377;{deliveryDetails.deliveryCharge || 0}
                </div>
                <div className="text-lg font-bold mb-4">
                    Estimated Delivery Time: {deliveryDetails.estimatedDeliveryTime || 'N/A'}
                </div> */}

                <button
                    onClick={handleSubmit}
                    // type='submit'
                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                    // disabled={loading}
                >
                    Checkout
                    {loading && <img src="/assets/spinner.svg" alt="loading" />}
                </button>

        </div>
    </div>

    )
}