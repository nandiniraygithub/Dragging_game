const image_input = document.querySelector("#image_input");
const display_image = document.querySelector("#display_image");
let uploaded_images = [];

const MAX_IMAGES = 15;
image_input.addEventListener("change", function() {
    const files = this.files;
    handleFiles(files);
});

function handleFiles(files) {
    if (uploaded_images.length >= 15) {
        alert("You can only upload up to 15 images.");
        return;
    }

    for (let i = 0; i < files.length && uploaded_images.length < 5; i++) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploaded_images.push(reader.result);
            displayImages();
        });
        reader.readAsDataURL(files[i]);
    }
}

function displayImages() {
    display_image.innerHTML = "";
    uploaded_images.forEach((image, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "image-wrapper";
        imgContainer.style.position = "absolute";
        imgContainer.style.cursor = "move";
        imgContainer.innerHTML = `
            <img src="${image}" alt="Uploaded image ${index + 1}">
            <button onclick="deleteImage(${index})">Delete</button>
        `;
        display_image.appendChild(imgContainer);
        makeDraggable(imgContainer);
    });
}

function deleteImage(index) {
    uploaded_images.splice(index, 1);
    displayImages();
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

