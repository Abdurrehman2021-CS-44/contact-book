import { useReducer, useState } from "react";
import InputField from "./InputField";
import ContactCard from "./ContactCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    const [details, dispatch] = useReducer(actionOnDetails, initialState);
    const [isClicked, setIsClicked] = useState(false);

    const products = [];

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({type: "UPDATE_CONTACT", payload: inputValue, field: inputName});
    }

    const handleClick = () => {
        setIsClicked(true);
    }

    const handleData = () =>{
        const fields = Object.keys(details);
        let isAllFilled = false;
        for(let i = 0; i < fields.length; i++){
            if (details[fields[i]] === ""){
                isAllFilled = true;
                break;
            }
        }
        if (!isAllFilled){
            products.push(details);
        }
        console.log(products);
    }

    return (
        <>
            <h1 className="display-6 my-2">Contact Details</h1>
            <div className="contact-details">
            {
                isClicked ? 
                <>
                    <InputField onClicked={dispatch} value={details.fName} name="fName" type="text" placeholder="First Name" />
                    <InputField onClicked={dispatch} value={details.lName} name="lName" type="text" placeholder="Last Name" />
                    <InputField onClicked={dispatch} value={details.email} name="email" type="email" placeholder="Email" />
                    <InputField onClicked={dispatch} value={details.phoneNum} name="phoneNum" type="phone" placeholder="Phone" />
                    <div class="mb-3">
                        <textarea name="address" className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Address" onChange={handleChange}></textarea>
                    </div>
                    <AddCircleIcon onClick={handleData} className="text-primary" style={{fontSize: "3rem", position: "absolute", bottom: "-27px", right: "455px"}} />
                </>
                :
                <input type="text" className="form-control" placeholder="Enter details" onClick={handleClick} />
            }
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-4 mt-3">
                        <ContactCard />
                    </div>
                </div>
            </div>
        </>
    )
};
 
export default ContactDetails;