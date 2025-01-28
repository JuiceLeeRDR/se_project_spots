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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditExitButton = document.querySelector(".modal__close-button");
const proileEditModalForm = profileEditModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const modalInputName = document.querySelector("#profile-name-input");
const modalInputDescription = document.querySelector(
  "#profile-description-input"
);
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = "Description of the image";

  return cardElement;
}

function editProfile() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

function closeProfile() {
  profileEditModal.classList.remove("modal_opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeProfile.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", editProfile);

profileEditExitButton.addEventListener("click", closeProfile);
proileEditModalForm.addEventListener("submit", handleEditProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
