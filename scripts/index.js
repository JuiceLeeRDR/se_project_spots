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

//profile modal
const profileEditButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-modal");
const modalCloseButton = document.querySelector(".modal__close-button");
const modalForm = editModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const modalInputName = document.querySelector("#profile-name-input");
const modalInputDescription = document.querySelector(
  "#profile-description-input"
);

//cards
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

//new post modal
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostlinkInput = newPostModal.querySelector("#image-link-input");
const newPostCaption = newPostModal.querySelector("#image-caption-input");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardPreview = document.querySelector("#preview-modal");
  const cardPreviewCloseButton = document.querySelector(
    ".modal__close-button_type_preview"
  );
  const cardPreviewImage = cardPreview.querySelector(".modal__image");
  const cardPreviewCaption = cardPreview.querySelector(".modal__image-caption");

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
    cardPreviewCaption.alt = data.name;
    cardPreviewCaption.textContent = data.name;
  });

  cardPreviewCloseButton.addEventListener("click", () => {
    cardPreview.classList.remove("modal_opened");
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeProfile(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeProfile();
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  console.log(newPostlinkInput.value);
  console.log(newPostCaption.value);
  const inputValues = {
    name: newPostCaption.value,
    link: newPostlinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeProfile();
}

profileEditButton.addEventListener("click", () => {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
  openModal(editModal);
});

modalCloseButton.addEventListener("click", () => {
  closeProfile(editModal);
});

modalForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});

newPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", () => {
  closeProfile(newPostModal);
});
