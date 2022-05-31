function getBackend() {
    return 'https://api-apassphrase.herokuapp.com/'
}

async function getPassphrase() {
    let backend = getBackend() + 'passphrase'
    try {
        await fetch(backend).then(response => response.json()).then(data => displayPassphrase(data.passphrase));
    } catch (e) {
        displayPassphrase("Could not connect to: " + backend);
    }
}

function displayPassphrase(data) {
    document.getElementById("passphrase").innerHTML = data;
}

async function getEmojiphrase() {
    let backend = getBackend() + 'emojiphrase'
    try {
        await fetch(backend).then(response => response.json()).then(data => displayEmojiphrase(data));
    } catch (e) {
        displayEmojiphrase("Could not connect to: " + backend);
    }
}

function displayEmojiphrase(data) {
    if (typeof data === 'string' || data instanceof String) {
        document.getElementById("emojiphrase").innerHTML = data;
    } else {
        document.getElementById("emojiphrase").innerHTML = data.emojiphrase;
        document.getElementById("emojis").innerHTML = data.emojis;
    }
}