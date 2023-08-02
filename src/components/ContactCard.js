import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const ContactCard = (props) => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseOver = () => {
        setIsMouseOver(true);
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    }

    const handleClick = () => {
        props.onDelete(props.id);
    }

    return (
        <>
            <div className="card" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className="card-body">
                    <h4 className="card-title my-0" style={{position: "relative"}}>{props.fName} <DeleteIcon onClick={handleClick} className="text-primary" style={{position: "absolute", right: "5px", top: "3px"}} /></h4>
                    {
                        isMouseOver &&
                        <>
                            <h5 className="card-title">{props.lName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{props.email}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">{props.phoneNum}</h6>
                            <p className="card-text">{props.address}</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
};

export default ContactCard;