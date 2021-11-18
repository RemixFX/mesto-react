import React from 'react';
import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={() => setIsEditProfilePopupOpen(!isEditProfilePopupOpen)}
        onAddPlace={() => setIsAddPlacePopupOpen(!isAddPlacePopupOpen)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)}
        onCardClick={handleCardClick} />

      <Footer />

      <PopupWithForm title="Редактировать профиль" name="edit-profile" buttonText='Сохранить'
        isOpen={isEditProfilePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}>
        <fieldset className="form__field">
          <input type="text" autoComplete="off" name="name" id="name"
            required minLength="2" maxLength="40" className="form__input form__input_type_name" />
          <span id="name-error" className="form__error"></span>
          <input type="text" autoComplete="off" name="about" id="about"
            required minLength="2" maxLength="200" className="form__input form__input_type_job" />
          <span id="about-error" className="form__error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="add-card" buttonText='Создать'
        isOpen={isAddPlacePopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}>
        <fieldset className="form__field">
          <input type="text" autoComplete="off" name="name" id="title" placeholder="Название"
            required minLength="2" maxLength="30" className="form__input form__input_type_name-card" />
          <span id="title-error" className="form__error"></span>
          <input type="url" autoComplete="off" name="link" id="link" placeholder="Ссылка на картинку"
            required className="form__input form__input_type_link" />
          <span id="link-error" className="form__error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="avatar-edit" buttonText='Сохранить'
        isOpen={isEditAvatarPopupOpen ? 'popup_opened' : ''}
        onClose={closeAllPopups}>
        <fieldset className="form__field">
          <input type="url" autoComplete="off" name="avatar" id="avatar" placeholder="Ссылка на картинку"
            required className="form__input form__input_type_link" />
          <span id="avatar-error" className="form__error"></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="confirmation" buttonText='Да'
        class={'form__confirmation-button'} />

      <ImagePopup
        isOpen={selectedCard.link ? 'popup_opened' : ''}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
