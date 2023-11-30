import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useDonationCamp from "../../hooks/useDonationCamp";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ campaignID, donatedAmount, maxDonation }) => {

    const stripe = useStripe();
    const elements = useElements();

    const { user } = useAuth();
    const [, , refetch] = useDonationCamp()

    const [errorMessage, setErrorMessage] = useState('');
    const [currentDonatedAmount, setCurrentDonatedAmount] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()

    console.log("onchange", currentDonatedAmount);

    const [alertMessage, setAlertMessage] = useState('')
    const handleCurrentDonation = (e) => {
        console.log("ab", e.target.value);

        const amount = Number(donatedAmount) + Number(e.target.value);
        console.log(amount, maxDonation);
        if (amount <= maxDonation) {
            setCurrentDonatedAmount(e.target.value)
            setAlertMessage('')
        }
        else {
            setAlertMessage("Donation amount must be less than or equal than Maximum Donation Amount")
            setClientSecret('')
        }
    }

    console.log("ab", clientSecret);
    useEffect(() => {
        const amount = Number(donatedAmount) + Number(currentDonatedAmount)
        if (amount <= maxDonation) {
            axiosSecure.post("/create-payment-intent", { amount: currentDonatedAmount })
                .then(res => {
                    // console.log("checkout stripe client secret ", res.data.clientSecret);
                    setClientSecret(res?.data?.clientSecret)
                })
        }

    }, [axiosSecure, currentDonatedAmount, donatedAmount, maxDonation])

    console.log("checkout stripe client secret ", clientSecret);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();


        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            // set error
            setErrorMessage(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // clear error
            setErrorMessage('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "annonymous",
                    email: user?.email || "annonymous",
                },
            },

        })

        if (confirmError) {
            console.log("checkout stripe confirm error", error);
        }
        else {
            console.log("checkout stripe confirm paymentIntent", paymentIntent);

            if (paymentIntent.status === "succeeded") {

                const totalDonation = Number(donatedAmount) + Number(currentDonatedAmount)

                // save details in the database
                const donatedDetails = {
                    email: user?.email,
                    name: user?.displayName,
                    img: user?.photoURL,
                    donatedAmount: currentDonatedAmount,
                    totalDonation: totalDonation,
                    transactionId: paymentIntent.id,
                    // date: new Date(), // need convert date utc. use moment js,
                    campaignID: campaignID
                }
                // add donation to userDonations and update total amount of main campaign donated amount
                const res = await axiosSecure.post('/userDonations', donatedDetails);

                console.log("successfully add", res.data);
                // update donation camp donated amount
                refetch()
                if (res.data?.addedDonation?.insertedId) {
                    Swal.fire({
                        title: `Thank you`,
                        text: "Donation success",
                        icon: "success"
                    });

                    navigate('/recommendedDonations', { state: { campaignID: campaignID } })
                }
            }

        }


    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-6 md:w-[45%]">
                <label className="block mb-1.5 text-sm font-semibold text-title-primary" >Donate Amount</label>
                <input
                    name='currentDonateAmount'
                    onChange={handleCurrentDonation}
                    placeholder="Enter your amount"
                    required
                    className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                    type="number"
                />
                {alertMessage && <span className="text-red-600">{alertMessage}</span>}
            </div>

            <h2 className="text-sm font-semibold text-title-primary mb-2">Card Details</h2>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            {errorMessage && <span className="text-red-600 mt-6 text-xs">{errorMessage}</span>}

            <button type="submit"
                className="mt-8 text-white bg-primary-bg font-title hover:bg-secondary-bg focus:shadow-none font-medium rounded text-base px-3 py-2 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2 capitalize"
                disabled={!stripe || !clientSecret}>
                Pay Donation
            </button>
        </form>
    );
};

export default CheckoutForm;