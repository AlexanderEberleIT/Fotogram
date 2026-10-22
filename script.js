const images = [
    "picture-1.jpg",
    "picture-2.jpg",
    "picture-3.png",
    "picture-4.jpg",
    "picture-5.jpg",
    "picture-6.jpg",
    "picture-7.jpg",
    "picture-8.jpg",
    "picture-9.jpg",
    "picture-10.jpg",
    "picture-11.jpg",
    "picture-12.jpg",
];

let currentIndex = 0;

function init() {
    render();
    renderDialog();
}

function render() {
    document.getElementById("gallery").innerHTML = "";

    for (let i = 0; i < images.length; i++) {
        document.getElementById("gallery").innerHTML += getHTMLForButton(i);
    }
}

function getHTMLForButton(i) {
    return `
        <button class="thumbnail" 
            type="button" 
            onclick="openPhoto(${i})">
                <img src="./assets/img/${images[i]}" alt="Photo ${i + 1}" />
        </button>
    `;
}

function renderDialog() {
    document.getElementById("dialog-container").innerHTML = getHTMLForDialog();
}

function getHTMLForDialog() {
    return `
        <dialog id="photo-dialog" 
                class="photo-dialog">
                    <header class="dialog-header">
                    <h2 id="photo-title">Bildtitel</h2>

                    <button type="button" 
                        onclick="closePhoto()">
                            <img src="./assets/icons/x.png" alt="" />
                    </button>
                    </header>

            <div id="photo-content" class="photo-content"></div>

            <nav class="photo-navigation">
                <button class="previous-button" type="button"
                        onclick="previousPhoto()">
                    <img src="./assets/icons/arrow.png" alt="" />
                </button>

                <p id="photo-counter"></p>

                <button type="button"
                        onclick="nextPhoto()">
                    <img src="./assets/icons/arrow.png" alt="" />
                </button>
            </nav>
        </dialog>
    `;
}

function openPhoto(i) {
    currentIndex = i;
    updatePhoto();
    document.getElementById("photo-dialog").showModal();
}

function updatePhoto() {
    document.getElementById("photo-title").innerHTML = images[currentIndex];

    document.getElementById("photo-content").innerHTML = `
        <img src="./assets/img/${images[currentIndex]}"
            alt="Photo ${currentIndex + 1}" />
    `;

    document.getElementById("photo-counter").innerHTML =
        `${currentIndex + 1} / ${images.length}`;
}

function closePhoto() {
    document.getElementById("photo-dialog").close();
}

function previousPhoto() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updatePhoto();
}

function nextPhoto() {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    updatePhoto();
}
