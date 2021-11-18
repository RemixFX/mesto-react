function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name}
        onClick={handleClick} />
      <button className="element__delete-button" type="button"></button>
      <div className="element__description">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button"></button>
          <span className="element__like-value">{props.card.likes}</span>
        </div>
      </div>
    </article>
  )
}


export default Card;
