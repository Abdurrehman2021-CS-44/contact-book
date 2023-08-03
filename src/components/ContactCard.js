import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ContactCard = (props) => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseOver = () => {
        setIsMouseOver(true);
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    }

    const handleDelete = () => {
        props.onDelete(props.id);
    }

    const handleEdit = () => {
        props.onEdit(props.id);
    }

    return (
        <>
            <div className="card" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className="card-body">
                    <h4 className="card-title my-0" style={{position: "relative"}}>{props.fName} <EditIcon onClick={handleEdit} className="text-primary button" style={{position: "absolute", right: "40px", top: "3px"}} /> <DeleteIcon onClick={handleDelete} className="text-primary button" style={{position: "absolute", right: "5px", top: "3px"}} /></h4>
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