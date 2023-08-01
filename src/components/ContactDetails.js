import InputField from "./InputField";

const ContactDetails = () => {
    return (
        <>
            <h1 className="display-6 my-2">Contact Details</h1>
            <div className="contact-details">
                <InputField type="text" placeholder="First Name" />
                <InputField type="text" placeholder="Last Name" />
                <InputField type="email" placeholder="Email" />
                <InputField type="phone" placeholder="Phone" />
                <div class="mb-3">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Address"></textarea>
                </div>
            </div>

        </>
    )
};
 
export default ContactDetails;