import React from 'react';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState();
  const [userData, setUserData] = React.useState([]);
  const [cards, getCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState([]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  React.useEffect(() => {
    api.getUserData().then((res) => setUserData(res))
    .catch((err) => console.log(err))
  }, []);

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      getCards(res.map((item) => ({
        id: item._id,
        link: item.link,
        name: item.name,
        likes: item.likes.length
      })))
    })
    .catch((err) => console.log(err))
  }, []);

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={() => setIsEditProfilePopupOpen(!isEditProfilePopupOpen)}
        onAddPlace={() => setIsAddPlacePopupOpen(!isAddPlacePopupOpen)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)}
        userName={userData.name}
        userDescription={userData.about}
        userAvatar={userData.avatar}
        cards={cards}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm title="Редактировать профиль" name="edit-profile"
        isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}
        children={
          <>
            <fieldset className="form__field">
              <input type="text" autoComplete="off" name="name" id="name"
                required minLength="2" maxLength="40" className="form__input form__input_type_name" />
              <span id="name-error" className="form__error"></span>
              <input type="text" autoComplete="off" name="about" id="about"
                required minLength="2" maxLength="200" className="form__input form__input_type_job" />
              <span id="about-error" className="form__error"></span>
            </fieldset>
            <button className="form__submit-button" autoFocus type="submit">Сохранить</button>
          </>
        }
      />
      <PopupWithForm title="Новое место" name="add-card"
        isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}
        children={
          <>
            <fieldset className="form__field">
              <input type="text" autoComplete="off" name="name" id="title" placeholder="Название"
                required minLength="2" maxLength="30" className="form__input form__input_type_name-card" />
              <span id="title-error" className="form__error"></span>
              <input type="url" autoComplete="off" name="link" id="link" placeholder="Ссылка на картинку"
                required className="form__input form__input_type_link" />
              <span id="link-error" className="form__error"></span>
            </fieldset>
            <button className="form__submit-button" type="submit">Создать</button>
          </>
        }
      />
      <PopupWithForm title="Обновить аватар" name="avatar-edit"
        isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}
        children={
          <>
            <fieldset className="form__field">
              <input type="url" autoComplete="off" name="avatar" id="avatar" placeholder="Ссылка на картинку"
                required className="form__input form__input_type_link" />
              <span id="avatar-error" className="form__error"></span>
            </fieldset>
            <button className="form__submit-button" type="submit">Сохранить</button>
          </>
        }
      />
      <PopupWithForm title="Вы уверены?" name="confirmation"
        children={
          <button className="form__submit-button form__confirmation-button" type="submit">Да</button>
        }
      />
      <ImagePopup
        isOpen={isImagePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </div>
  );
}


export default App;
