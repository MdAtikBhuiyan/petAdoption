import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51OF11DKOHMRAEy2H3HDoCyalyuCBZazEqb0LIQYcdBhym3Xtrb97X6IaHKuQIami1ErIC0r6i231rRYrTyaBjpHs00UztxdvDn');

const Payment = ({ campaignID, donatedAmount, maxDonation }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm campaignID={campaignID} donatedAmount={donatedAmount} maxDonation={maxDonation} />
            </Elements>
        </div>
    );
};

export default Payment;