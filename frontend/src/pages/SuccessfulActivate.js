import email from "../assets/email.svg"
import '../styles/activate.css'
const SuccessfulActivate = () => {

    return ( 
        <div className="activation-container">
            <div className="icon">
                <h2>Activate account</h2>
                <img src={email} alt="email" />
            </div>
                
            <div className="message">
                {/* <h2>Activate account</h2> */}
                <p>Thanks for registeration. Please check your email to activate your account.</p>

                <div className="re-send">
                    <p>Didn't receive an email?  </p>
                    <button className="activate">Resend</button>
                </div>
                {/* <button className="activate">Activate account</button> */}
            </div>
        </div>
     );
}
 
export default SuccessfulActivate;