const starContainer = document.querySelector("#star-container");
const starCount = document.querySelector("#star-count ");
const TOTAL_STAR = 5;
let rating = 0;

// Rendering the Stars
const renderStar = (totalStar) => {
  starContainer.innerHTML = "";

  for (let i = 0; i < totalStar; i++) {
    const el = document.createElement("span");
    el.innerText = "★";
    el.setAttribute("data-index", i+1);
    el.classList.add("star");

    starContainer.appendChild(el);
  }
};
renderStar(TOTAL_STAR);



// Managing Click and Hover effects
const allStars = document.querySelectorAll(".star");

const removeAllGoldColor = (e) => {
  allStars.forEach((el) => (el.style.color = ""));
};

function paintPreviousStars(element) {
  const val = element.target.getAttribute("data-index");
  allStars.forEach((star) => {
    const index = star.getAttribute("data-index");
    if (index <= val) {
      star.style.color = "gold";
    }
  });
}

function removePreviousGoldColor() {
  allStars.forEach((star) => {
    const index = star.getAttribute("data-index");
    if (index > rating) {
      star.style.color = "";
    }
  });
}

allStars.forEach((star) => {
  star.addEventListener("mouseover", paintPreviousStars);
  star.addEventListener("mouseleave", removePreviousGoldColor);
});


starContainer.addEventListener("click", (el) => {
  removeAllGoldColor();
  paintPreviousStars(el);
  rating = Number(el.target.getAttribute("data-index"));
  starCount.textContent = `Rating: ${rating}`;
});

starCount.textContent = `Rating: ${rating}`;
