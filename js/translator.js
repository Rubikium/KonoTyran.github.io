window.onload = function () {
    addGlyph();
    document.getElementById('btn-add-glyph').addEventListener('click', addGlyph);

    document.getElementById('btn-add-space').addEventListener('click', addSpace);

    document.getElementById('btn-reset').addEventListener('click', function (event) {
        consonants = {}
        vowels = {}
        reverse = {}
        glyph_number = 0;
        order = []

        document.getElementById('container').innerHTML = "";
        addGlyph()
        document.getElementById('human-out').innerHTML = "";
        document.getElementById('image-out').classList.toggle("hidden", true)
    })

    document.getElementById('btn-speak').addEventListener('click', function (event) {
        let speech = new SpeechSynthesisUtterance();

        let outString = getENG();

        speech.lang = "en-US";

        speech.text = outString
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    })

    document.getElementById('btn-generate-image').addEventListener('click', generateImage)

    document.getElementById('btn-save-image').addEventListener('click', saveImage)

    document.getElementById('btn-copy-image').addEventListener('click', copyImage)
}

document.addEventListener('click', glyphClick);

function glyphClick(event) {
    /** @type {HTMLElement} */
    let element = event.target
    let glyph = element.closest("div[id^=\"glyph\"]");
    if (glyph == null )
        return;

    let id = glyph.getAttribute("id").substring(5);

    if(event.altKey) {
        glyph.remove()
        order = order.filter(glyph => glyph.id != id)
        return;
    }

    glyph = order.filter(g => g.id == id).shift();

    if(glyph.space)
        return;

    switch (element.dataset.type) {
        case "vowel":
            glyph.vowel ^= element.dataset.line
            break;
        case "consonant":
            glyph.consonant ^= element.dataset.line
            break;
        case "reverse":
            glyph.flipped = !glyph.flipped
            break;
        case "midline":
        case "none":
            return;
    }

    glyph.update()

    document.getElementById('eng-out').innerText = getENG()
}

function saveImage() {
    const link = document.createElement('a')
    const canvas = document.getElementById('image-out')
    link.download = 'glyphs.png'
    link.href = canvas.toDataURL();
    link.click()
    link.remove()
}

function copyImage() {
    document.getElementById('image-out').toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png':blob})]))
}
