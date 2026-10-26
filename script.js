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

const imageDescriptions = [
    "Schneebedeckte Berge an einem türkisfarbenen See",
    "Beleuchtete Straße bei Nacht mit Spiegelungen auf dem Boden",
    "Dunkle Gewitterwolken mit durchscheinendem Sonnenlicht",
    "Eine Blaumeise auf einem Ast",
    "Ein Hurrikan aus dem Weltraum betrachtet",
    "Verschneite Berge spiegeln sich in einem ruhigen See",
    "Eine Ente schwimmt auf blauem Wasser",
    "Eine Person auf einem Felsen unter dem Sternenhimmel",
    "Ein kleiner heller Vogel auf dunklen Felsen",
    "Ein junger Schneeleopard auf moosbewachsenen Felsen",
    "Sonnenlicht auf schneebedeckten Berggipfeln",
    "Ein einzelner vereister Baum in einer Schneelandschaft",
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
                <img src="./assets/img/${images[i]}" alt="${imageDescriptions[i]}" />
        </button>
    `;
}

function renderDialog() {
    document.getElementById("dialog-container").innerHTML = getHTMLForDialog();
}

function getHTMLForDialog() {
    return `
        <dialog id="photo-dialog" 
                class="photo-dialog"
                onclick="closeOnBackclick(event)"
                onkeydown="dialogKeydown(event)">

                    <header class="dialog-header">
                        <h2 id="photo-title">Bildtitel</h2>

                            <button
                                type="button"
                                onclick="closePhoto()"
                                aria-label="Foto schließen">
                                <img src="./assets/icons/x.png" alt="" />
                            </button>
                    </header>

            <div id="photo-content" class="photo-content"></div>

            <nav class="photo-navigation" aria-label="Browse photos">
                <button class="previous-button" type="button"
                    onclick="previousPhoto()" aria-label="Previous photo">
                    <img src="./assets/icons/arrow.png" alt="" />
                </button>

                    <p id="photo-counter" class="photo-counter"></p>

                <button type="button"
                    onclick="nextPhoto()" aria-label="Next photo">
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
    document.getElementById("photo-title").innerHTML =
        imageDescriptions[currentIndex];

    document.getElementById("photo-content").innerHTML = `
        <img src="./assets/img/${images[currentIndex]}"
            alt="${imageDescriptions[currentIndex]}" />
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

function closeOnBackclick(event) {
    const dialogBounds = document
        .getElementById("photo-dialog")
        .getBoundingClientRect();

    const outsideX =
        event.clientX < dialogBounds.left || event.clientX > dialogBounds.right;

    const outsideY =
        event.clientY < dialogBounds.top || event.clientY > dialogBounds.bottom;

    if (outsideX || outsideY) {
        closePhoto();
    }
}

function dialogKeydown(event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousPhoto();
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPhoto();
    }
}
