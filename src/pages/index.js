//imports
import Api from "../utils/api.js";
import "../vendor/normalize.css";
import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";

//modal
const modalForms = document.querySelectorAll(".modal__form");
const modalInputs = document.querySelectorAll(".modal__input");

//profile modal
const profileEditButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const profileCloseButton = document.querySelector(".modal__close-button");
const profileForm = editModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileInputName = document.querySelector("#profile-name-input");
const profileInputDescription = document.querySelector(
  "#profile-description-input"
);

//avatar modal
const avatarEditModal = document.querySelector("#edit-avatar-modal");
const avatarModalButton = document.querySelector(
  ".profile__avatar_edit-button "
);
const avatarForm = avatarEditModal.querySelector(".modal__form");
const avatarInput = avatarEditModal.querySelector("#avatar-image-link-input");
const avatarSubmitBtn = avatarEditModal.querySelector(".modal__save-button");
const profileAvatar = document.querySelector(".profile__avatar");

//delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteModalDeleteBtn = deleteModal.querySelector(".modal__delete-button");
const deleteModalCancelBtn = deleteModal.querySelector(".modal__cancel-button");

//cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardPreview = document.querySelector("#preview-modal");
const cardPreviewImage = cardPreview.querySelector(".modal__image");
const cardPreviewCaption = cardPreview.querySelector(".modal__image-caption");

//new post modal
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostlinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaption = newPostModal.querySelector("#image-caption-input");
const closeButtons = document.querySelectorAll(".modal__close-button");
const postSubmitButton = newPostModal.querySelector(".modal__save-button");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

//new instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a7e2f32d-b266-4245-9f55-f8910f712974",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([data, userData]) => {
    console.log("Initial card data:", data);
    api._userId = userData._id;

    profileAvatar.src = userData.avatar;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;

    data.forEach((item) => {
      renderCard(item);
    });
  })

  .catch((err) => {
    console.error(err);
  });

//functions
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  modal.removeEventListener("mousedown", handleOutsideClick);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  function handleLike(evt, id) {
    let isLiked = evt.target.classList.contains("card__like-button_liked");

    api
      .handleLikeStatus(id, isLiked)
      .then(() => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  }

  cardImage.addEventListener("click", () => {
    openModal(cardPreview);
    cardPreviewImage.src = data.link;
    cardPreviewImage.alt = data.name;
    cardPreviewCaption.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("mousedown", handleOutsideClick);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete");
    });
}

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");

  button.addEventListener("click", () => closeModal(popup));
});

profileEditButton.addEventListener("click", () => {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  resetValidation(
    profileForm,
    [profileInputName, profileInputDescription],
    settings
  );
  openModal(editModal);

  deleteModalCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });
});

avatarModalButton.addEventListener("click", () => {
  openModal(avatarEditModal);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

//handlers
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

let selectedCard, selectedCardId;

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: profileInputName.value,
      about: profileInputDescription.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleOutsideClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  const inputValues = {
    name: newPostCaption.value,
    link: newPostlinkInput.value,
  };

  api
    .addNewCard(inputValues)
    .then((cardData) => {
      renderCard(cardData);
      evt.target.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .updateProfilePicture({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarEditModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

profileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);
