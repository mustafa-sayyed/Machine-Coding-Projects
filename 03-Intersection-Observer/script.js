const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    //   if (entry.isIntersecting) cardObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.6,
  }
);

const lastCardObserver = new IntersectionObserver((entries) => {
  console.log(entries);
  if (entries[0].isIntersecting) {
    loadMoreCards();
    lastCardObserver.unobserve(entries[0].target);
  }
  lastCardObserver.observe(document.querySelector(".card:last-child"));
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  cardObserver.observe(card);
});

function loadMoreCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "This is New Card";
    cardObserver.observe(card);
    cardContainer.appendChild(card);
  }
}
