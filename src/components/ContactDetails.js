import { useReducer, useState } from "react";
import ContactCard from "./ContactCard";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const actionOnDetails = (currentState, action) => {
    switch (action.type){
        case "UPDATE_CONTACT":
            return {
                ...currentState,
                [action.field]: action.payload
            }
        case "RESET_FIELDS":
            return {
                ...action.initializedContact
            }
        default:
            return {
                ...currentState
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
    const [contacts, setContacts] = useState([]);
    const [edit, setEdit] = useState(-1);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        dispatch({type: "UPDATE_CONTACT", payload: inputValue, field: inputName});
    }

    const handleClick = () => {
        setIsClicked(true);
    }

    const handleData = () =>{
        if (edit === -1) {
            const isPresent = contacts.filter((contact)=>contact.phoneNum === details.phoneNum);
            if (isPresent.length === 0){
                const fields = Object.keys(details);
                let isAllFilled = false;
                for(let i = 0; i < fields.length; i++){
                    if (details[fields[i]] === ""){
                        isAllFilled = true;
                        break;
                    }
                }
                if (!isAllFilled){
                    sendDataToServer();
                    alert("Contact has been added");
                    getDataFromServer();
                } else {
                    alert("Please enter all the details")
                }
            } else {
                alert("Contact with this phone number is already available with the name \n'" + isPresent[0].fName + " " + isPresent[0].lName + "'");
            }
        } else {
            editDataFromServer(edit);
            setEdit(-1);
        }
    }

    const editContact = (id) => {
        const foundContact = contacts.filter((contact,index)=>index === id);
        dispatch({type: "RESET_FIELDS", initializedContact: foundContact[0]})
        setEdit(contacts[id]._id);
        setIsClicked(true);
    }

    const sendDataToServer = async () => {
        const response = await fetch("http://localhost:5000/contacts", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details),
        })
        const data = await response.json();
        dispatch({type: "RESET_FIELDS", initializedContact: initialState});
    }

    const getDataFromServer = async () => {
        const response = await fetch("http://localhost:5000/contacts")
        const data = await response.json();
        setContacts(data.data);
    }

    const deleteDataFromServer = async (id) => {
        const response = await fetch("http://localhost:5000/contacts",{
            method:"DELETE",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id: contacts[id]._id})
        })
        const data = await response.json();
        getDataFromServer();
        alert(data.message);
    }

    const editDataFromServer = async (id) => {
        const response = await fetch("http://localhost:5000/contacts", {
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id, update: details})
        })
        const data = await response.json();
        dispatch({type: "RESET_FIELDS", initializedContact: initialState});
        getDataFromServer();
        alert(data.message);
    }

    useState(()=>{
        getDataFromServer();
    }, [])

    return (
        <>
            <h1 className="display-6 my-2">Contact Details</h1>
            <div className="contact-details">
            {
                isClicked ? 
                <>
                    <input name="fName" type="text" className="form-control border-bottom-0 rounded-0 rounded-top" placeholder="First Name" onChange={handleChange} value={details.fName}/>
                    <input name="lName" type="text" className="form-control border-bottom-0 rounded-0" placeholder="Last Name" onChange={handleChange} value={details.lName}/>
                    <input name="email" type="text" className="form-control border-bottom-0 rounded-0" placeholder="Email" onChange={handleChange} value={details.email}/>
                    <input name="phoneNum" type="text" className="form-control border-bottom-0 rounded-0" placeholder="Phone Number" onChange={handleChange} value={details.phoneNum}/>
                    <div className="mb-3">
                        <textarea name="address" className="form-control rounded-0 rounded-bottom" rows="2" placeholder="Address" value={details.address} onChange={handleChange}></textarea>
                    </div>
                    <AddCircleIcon onClick={handleData} className="text-primary button" style={{fontSize: "3rem", position: "absolute", bottom: "-27px", right: "455px"}} />
                </>
                :
                <input type="text" className="form-control input" placeholder="Enter details" onClick={handleClick} />
            }
            </div>
            <div className="container">
                <div className="row mb-5">
                    {
                        contacts.map((contact,index)=>{
                            return (<div className="col-lg-4 col-md-6 mt-3" key={index}>
                                <ContactCard 
                                    key = {index}
                                    id = {index}
                                    fName = {contact.fName}
                                    lName = {contact.lName}
                                    email = {contact.email}
                                    phoneNum = {contact.phoneNum}
                                    address = {contact.address}
                                    onDelete = {deleteDataFromServer}
                                    onEdit = {editContact}
                                />
                            </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
};
 
export default ContactDetails;