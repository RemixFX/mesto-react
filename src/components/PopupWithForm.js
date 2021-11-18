function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button"
          onClick={props.onClose}>
        </button>
        <h3 className="popup__heading">{props.title}</h3>
        <form noValidate name={props.name} className="form">
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
