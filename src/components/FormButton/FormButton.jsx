import './FormButton.css'

const FormButton = ({isLoading=false, children, handleRequest, customStyles={}}) => {
    return <button 
            className={`form-btn ${isLoading ? 'disabled-form-btn' : 'active-form-btn'}`} 
            disabled={isLoading} 
            onClick={handleRequest} 
            style={customStyles} >
                {
                    isLoading ? 
                    <i className="fa-solid fa-spinner fa-spin"></i> : 
                    children
                }
        </button>
}

export default FormButton;