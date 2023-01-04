let utter = new SpeechSynthesisUtterance()
let voices = [0]

'speechSynthesis' in window ? console.log("Web Speech API supported.") : console.log("Web Speech API not supported.")

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices().filter(function(voice) {
        return voice.lang == 'en-US' || voice.lang == 'cs-CZ';
    })
    let voiceSelect = document.querySelector("#voices-menu")
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
};

function speak() {
    utter.text = document.getElementById('text').value
    // This works but you can't select voice 0
    if (document.querySelector("#voices-menu").value == 0) {
        utter.voice = voices.filter(function(voice) {
            return voice.name == 'Microsoft Jenny Online (Natural) - English (United States)'
        })[0]
    } else {
        utter.voice = voices[document.querySelector("#voices-menu").value]
    }
    window.speechSynthesis.speak(utter)
}

function cancel() {
    utter.text = document.getElementById('text').value
    window.speechSynthesis.cancel()
}