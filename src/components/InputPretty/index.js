import s from "./style.module.css";

const InputPretty = ({name, type="text", label, value, onChange, required=true}) => {
    
    const handleInputChange = (e) => {
        onChange && onChange(e.target.value);
    }

    return (
        <div className={s.root}>
        <input 
            type={type} 
            value={value} 
            className={s.input} 
            required={required}
            onChange={handleInputChange}/>
        <span className={s.highlight}></span>
        <span className={s.bar}></span>
        <label className={s.label}>{label}</label>
      </div>
    );
};

export default InputPretty;