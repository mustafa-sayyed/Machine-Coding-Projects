// This is different approach than I took initially
// It is Learnt from Rakesh Sir ( Codersgyan )

const starContainer = document.querySelector("#star-container");
const starCount = document.querySelector("#star-count");
const TOTAL_STARS = 5;
let rating = 0;

const renderStar = (totalStar) => {
  for (let i = 0; i < totalStar; i++) {
    const el = document.createElement("span");
    el.textContent = "★";
    el.classList.add("star");

    el.addEventListener("mousemove", (ev) => {
      highlightStar(Math.max(i+1, rating));
    });

    el.addEventListener("mouseout", (ev) => {
      highlightStar(rating);
    });

    el.addEventListener("click", (ev) => {
      rating = i + 1;
      highlightStar(rating);
      starCount.textContent = `Rating: ${rating}`;
    });

    starContainer.appendChild(el);
  }
};

function highlightStar(rating) {
  const allStars = document.querySelectorAll(".star");
  allStars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("filled");
    } else {
      star.classList.remove("filled");
    }
  });
}

renderStar(TOTAL_STARS);
