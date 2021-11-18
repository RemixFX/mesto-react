import Card from './Card.js'

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={props.userAvatar} alt="" />
          <button className="profile__avatar-button" type="button"
            onClick={props.onEditAvatar}></button>
          <div className="profile__info-block">
            <h1 className="profile__name">{props.userName}</h1>
            <button className="profile__edit-button" type="button"
              onClick={props.onEditProfile}></button>
            <p className="profile__job">{props.userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button"
          onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => <Card key={card.id} card={card}
          onCardClick={props.onCardClick} />)}
      </section>
    </main>
  )
}

export default Main;
