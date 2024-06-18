// Get references to elements
const activePhotoImg = document.getElementById("active-photo");
const activePhotoTitle = document.getElementById("active-photo-title");
const activePhotoDescription = document.getElementById(
  "active-photo-description"
);
const photoListItems = document.querySelectorAll(".photo-list-item");

// Add click event listeners to photo list items
photoListItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Set active photo details based on clicked item's data attributes
    const imgUrl = item.getAttribute("data-img");
    const title = item.getAttribute("data-title");
    const description = item.getAttribute("data-description");

    activePhotoImg.src = imgUrl;
    activePhotoTitle.textContent = title;
    activePhotoDescription.textContent = description;
  });
});
