import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const Header = () => {

    const styling = {
        fontSize: "3rem",
        position: "relative",
        bottom: "4px"
    }

    return (
        <nav className="navbar bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 ms-4 h1 text-light"><ImportContactsIcon style={styling} /> Contact Book</span>
            </div>
        </nav>
    )
};
 
export default Header;          