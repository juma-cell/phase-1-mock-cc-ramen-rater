// write your code here
// Define constants
const API_URL = "http://localhost:3000";
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const newRamenForm = document.querySelector("#new-ramen");
const editRamenForm = document.querySelector("#edit-ramen");

// Fetch all ramen from the API and display them in the ramen menu
fetch(`${API_URL}/ramens`)
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => displayRamenDetails(ramen));
      ramenMenu.append(img);
    });
    // Display details for the first ramen on page load
    displayRamenDetails(ramens[0]);
  });

// Display details for a specific ramen in the ramen detail section
function displayRamenDetails(ramen) {
  ramenDetail.innerHTML = `
    <img src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
    <div class="rating">${ramen.rating}</div>
    <form id="edit-ramen">
      <h4>Update the Featured Ramen</h4>
      <label for="rating">Rating: </label>
      <input type="number" name="rating" id="new-rating" value="${ramen.rating}" />
      <label for="new-comment">Comment: </label>
      <textarea name="new-comment" id="new-comment">${ramen.comment}</textarea>
      <input type="submit" value="Update" />
    </form>
  `;
  // Add submit listener for the edit form
  editRamenForm.addEventListener("submit", event => {
    event.preventDefault();
    const newRating = document.querySelector("#new-rating").value;
    const newComment = document.querySelector("#new-comment").value;
    updateRamen(ramen.id, newRating, newComment);
    ramen.rating = newRating;
    ramen.comment = newComment;
  });
}

// Update the rating and comment for a specific ramen
function updateRamen(id, newRating, newComment) {
  fetch(`${API_URL}/ramens/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      rating: newRating,
      comment: newComment
    })
  });
}

// Add submit listener for the new ramen form
newRamenForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#new-name").value;
  const restaurant = document.querySelector("#new-restaurant").value;
  const image = document.querySelector("#new-image").value;
  const rating = document.querySelector("#new-rating").value;
  const comment = document.querySelector("#new-comment").value;
  const newRamen = { name, restaurant, image, rating, comment };
  displayNewRamen(newRamen);
  clearNewRamenForm();
});

// Display a new ramen in the ramen menu
function displayNewRamen(ramen) {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => displayRamenDetails(ramen));
  ramenMenu.append(img);
}


