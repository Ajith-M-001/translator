const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".To-text"),
    selectTag = document.querySelectorAll("select"),
    exhangeIcon = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "ta-LK") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding option tag inside select tag
    }
});

exhangeIcon.addEventListener("click", () => {
    let tempTxt = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempTxt;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value, // getting from select tag value
        translateTo = selectTag[1].value;  // getting toSelect tag value
    if (!text) return;
    toText.setAttribute("placeholder", "translating...")
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching api response and returning it with parsing into js obj
    // and in another method receving that obj
    fetch(apiURL).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "translation")
    })
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
                console.log("from text speech")
            } else {
                utterance = new SpeechSynthesisUtterance(ftoText.value);
                utterance.lang = selectTag[1].value;
                console.log("to text speech")
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    })
})