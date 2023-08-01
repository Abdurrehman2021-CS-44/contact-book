import { useReducer } from "react";
import InputField from "./InputField";

const actionOnDetails = (currentState, action) => {
    switch (action.type){
        case "UPDATE_CONTACT":
            return {
                ...currentState,
                [action.field]: action.payload
            }
    }
}

const ContactDetails = () => {
    const initialState = {
        fName: "",
        lName: "",
        email: "",
        phoneNum: "",
        address:"",
    }
    const [details, dispatch] = useReducer(actionOnDetails, initialState)

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({type: "UPDATE_CONTACT", payload: inputValue, field: inputName});
        console.log(details);
    }

    return (
        <>
            <h1 className="display-6 my-2">Contact Details</h1>
            <div className="contact-details">
                <InputField onClicked={dispatch} value={details.fName} name="fName" type="text" placeholder="First Name" />
                <InputField onClicked={dispatch} value={details.lName} name="lName" type="text" placeholder="Last Name" />
                <InputField onClicked={dispatch} value={details.email} name="email" type="email" placeholder="Email" />
                <InputField onClicked={dispatch} value={details.phoneNum} name="phoneNum" type="phone" placeholder="Phone" />
                <div class="mb-3">
                    <textarea name="address" className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Address" onChange={handleChange}></textarea>
                </div>
            </div>

        </>
    )
};
 
export default ContactDetails;