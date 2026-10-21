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
        <button class="thumbnail" type="button" onclick="openPhoto(${i})">
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

                <button type="button" onclick="closePhoto()" aria-label="Close photo">
                    <img src="./assets/icons/x.png" alt="" />
                </button>
            </header>

            <div id="photo-content" class="photo-content"></div>
        </dialog>
    `;
}

function openPhoto(i) {
    document.getElementById("photo-title").innerHTML = images[i];

    document.getElementById("photo-content").innerHTML = `
        <img src="./assets/img/${images[i]}" alt="Photo ${i + 1}" />
    `;

    document.getElementById("photo-dialog").showModal();
}

function closePhoto() {
    document.getElementById("photo-dialog").close();
}
