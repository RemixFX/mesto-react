import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js'

function Main(props) {

  const [userData, setUserData] = React.useState({
    avatar: '',
    name: '',
    about: ''
  });

  React.useEffect(() => {
    api.getUserData().then((res) => setUserData(res))
      .catch((err) => console.log(err))
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res.map((item) => ({
        id: item._id,
        link: item.link,
        name: item.name,
        likes: item.likes.length
      })))
    })
      .catch((err) => console.log(err))
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img className="profile__avatar" src={userData.avatar} alt="" />
          <button className="profile__avatar-button" type="button"
            onClick={props.onEditAvatar}></button>
          <div className="profile__info-block">
            <h1 className="profile__name">{userData.name}</h1>
            <button className="profile__edit-button" type="button"
              onClick={props.onEditProfile}></button>
            <p className="profile__job">{userData.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button"
          onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => <Card key={card.id} card={card}
          onCardClick={props.onCardClick} />)}
      </section>
    </main>
  )
}

export default Main;
