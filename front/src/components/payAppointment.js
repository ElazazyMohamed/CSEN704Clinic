export default function PayAppointment() {
    return (
        
        <div className="Upper-Section">
            <a href="http://localhost:3000/patient/wallet" className="button">
                Pay With Wallet
            </a>
            <a href="http://localhost:4000/api/patient/payment-appointment" className="button">Pay With Stripe</a>
        </div>
    );
}