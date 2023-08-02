import { useState } from "react";

const ContactCard = () => {
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseOver = () => {
        setIsMouseOver(true);
    }

    const handleMouseLeave = () => {
        setIsMouseOver(false);
    }

    return (
        <>
            <div className="card" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className="card-body">
                    <h4 className="card-title my-0">Abdur Rehman</h4>
                    {
                        isMouseOver &&
                        <>
                            <h5 className="card-title">Muhammad Faheem</h5>
                            <h6 className="card-subtitle mb-2 text-muted">abdurrehmanbinfaheem@gmail.com</h6>
                            <h6 className="card-subtitle mb-2 text-muted">03265841159</h6>
                            <p className="card-text">House No 227, Street No 7, Arif Town, 21st Km Ferozepur Road, Lahore</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
};

export default ContactCard;