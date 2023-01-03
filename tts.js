let utter = new SpeechSynthesisUtterance()
let voices = [0]

const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported.")
    : console.log("Web Speech API not supported.")
}

checkBrowserCompatibility()

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices().filter(function (voice) { return voice.lang == 'en-US' || voice.lang == 'cs-CZ'; })
  utter.voice = voices[11]
  let voiceSelect = document.querySelector("#voices")
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
};

function speak() {
  utter.text = document.getElementById('text').value
  window.speechSynthesis.speak(utter)
}

function cancel() {
  utter.text = document.getElementById('text').value
  window.speechSynthesis.cancel()
}
