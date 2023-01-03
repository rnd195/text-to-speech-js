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
  let voiceSelect = document.querySelector("#voices-menu")
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
};

function speak() {
  utter.text = document.getElementById('text').value
  // This works but it's not good
  if (document.querySelector("#voices-menu").value == 0) {
    // Microsoft Jenny is number 11 if you filter 'en-US' and 'cs-CZ' in MS Edge
    utter.voice = voices[11]
  } else {
    utter.voice = voices[document.querySelector("#voices-menu").value]
  }
  window.speechSynthesis.speak(utter)
}

function cancel() {
  utter.text = document.getElementById('text').value
  window.speechSynthesis.cancel()
}
