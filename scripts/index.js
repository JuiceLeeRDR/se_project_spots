const initialCards = [
  {
    name: "Walking through a Japanese side street ",
    alt: "Walking through a Japanese side street",
    link: "https://images.unsplash.com/photo-1508504509543-5ca56440e013?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Outdoor cafe near stream in Italy",
    alt: "Outdoor cafe near stream in Italy",
    link: "https://images.unsplash.com/photo-1553342385-111fd6bc6ab3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mount Oso, Japan",
    alt: "Mount Oso, Japan",
    link: "https://images.unsplash.com/photo-1520312501384-dbdb83a1cb11?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pyramid in Egypt",
    alt: "Pyramid in Egypt",
    link: "https://images.unsplash.com/photo-1562679299-d21b8e13ac09?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "View of ocean from villa steps in Greece",
    alt: "View of ocean from villa steps in Greece",
    link: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Downtown Tokyo",
    alt: "Downtown Tokyo",
    link: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function closeModal(modal) {
  console.log("Closing modal:", modal);
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

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

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
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(editModal);
}

function handleOutsideClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  console.log(newPostlinkInput.value);
  console.log(newPostCaption.value);
  const inputValues = {
    name: newPostCaption.value,
    link: newPostlinkInput.value,
  };

  renderCard(inputValues);
  evt.target.reset();

  closeModal(newPostModal);
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
});

profileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach((item) => {
  renderCard(item);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});
