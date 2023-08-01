const InputField = (props) => {
    const handleChange = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;
        props.onClicked({type: "UPDATE_CONTACT", payload: inputValue, field: inputName});
    }

    return (
        <input name={props.name} type={props.type} className="form-control" placeholder={props.placeholder} onChange={handleChange} value={props.value}/>
    )
};
 
export default InputField;