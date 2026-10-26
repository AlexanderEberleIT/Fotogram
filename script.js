const images = [
    "car-1.png",
    "car-2.png",
    "car-3.png",
    "car-4.png",
    "car-5.png",
    "car-6.png",
    "car-7.png",
    "car-8.png",
    "car-9.png",
    "car-10.png",
    "car-11.png",
    "car-12.png",
];

const imageDescriptions = [
    "Dezent getunter Mazda RX-7 auf einer japanischen Bergstraße bei Dämmerung",
    "Silberner Nissan Skyline GT-R R33 in einem herbstlichen Park",
    "Dunkelblauer Nissan Skyline GT-R R34 an einer beleuchteten Uferstraße bei Nacht",
    "Weißer Nissan Silvia S15 Spec-R an einer Küstenstraße im Abendlicht",
    "Roter Honda S2000 an einem See bei Sonnenaufgang",
    "Silberner Acura NSX NA1 auf einer ruhigen Straße in Kyoto",
    "Blauer Subaru Impreza 22B auf einer Straße am Waldrand",
    "Weißer Mitsubishi Lancer Evolution IV auf einem herbstlichen Bergpass",
    "Dunkelgrauer Nissan 350Z an einer japanischen Uferstraße bei Nacht",
    "Roter Honda NSX der zweiten Generation an einem Bergsee",
    "Weißer Toyota Supra RZ von 1996 auf einer japanischen Küstenstraße",
    "Dunkelroter Nissan 180SX Type X von 1996 auf einer herbstlichen Waldstraße",
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
        <figure class="photo-figure">
            <button
                class="thumbnail"
                type="button"
                onclick="openPhoto(${i})"
                aria-label="Foto ${i + 1} öffnen"
                aria-describedby="image-caption-${i}">
                <img
                    src="./assets/img/${images[i]}"
                    alt="" />
            </button>

            <figcaption
                id="image-caption-${i}"
                class="visually-hidden"
                lang="de">
                ${imageDescriptions[i]}
            </figcaption>
        </figure>
    `;
}

function renderDialog() {
    document.getElementById("dialog-container").innerHTML = getHTMLForDialog();
}

function getHTMLForDialog() {
    return `
        <dialog id="photo-dialog" 
                class="photo-dialog"
                aria-labelledby="photo-title"
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
                <ul class="photo-navigation-list">
                    <li>
                        <button class="previous-button" type="button"
                            onclick="previousPhoto()" aria-label="Previous photo">
                            <img src="./assets/icons/arrow.png" alt="" />
                        </button>
                    </li>

                    <li>
                        <p id="photo-counter" class="photo-counter"
                        aria-live="polite" aria-atomic="true"></p>
                    </li>

                    <li>
                        <button type="button" onclick="nextPhoto()"
                            aria-label="Next photo">
                            <img src="./assets/icons/arrow.png" alt="" />
                        </button>
                    </li>
                </ul>
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
