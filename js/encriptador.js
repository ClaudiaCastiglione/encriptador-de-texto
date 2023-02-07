const input = document.querySelector("#input");
const encryptorScreen = document.querySelector("#screen");
const encryptorBtn = document.querySelector("#btn-encrypt");
const decryptBtn = document.querySelector("#btn-decrypt");
const message = document.querySelector("#message");
const copyBtn = document.querySelector("#copy");
const image = document.querySelector(".center");
const screenContainer = document.querySelector(".screen-container");
const copyMessage = document.querySelector(".copy");

const keys = ["ai", "enter", "imes", "ober", "ufat"];

function getText() {
  const text = input.value;
  const messageSpan = message.querySelector("span");
  const messageP = message.querySelector("p");

  if (!isValid(text)) {
    messageSpan.classList.add("error");
    messageP.classList.add("error");
    message.style.animation = "shake 0.8s ease both";
  } else {
    messageSpan.classList.remove("error");
    messageP.classList.remove("error");
    message.style.animation = "";
  }

  return isValid(text) ? text : "";
}

function showEncryptedMessage() {
  const text = getText();
  if (text) {
    encryptorBtn.removeEventListener("click", showEncryptedMessage);
    typewriterAnimation(encrypt(text), encryptorBtn, showEncryptedMessage);
    image.classList.add("hidden");
    screenContainer.classList.remove("hidden");
  } else {
    image.classList.remove("hidden");
    screenContainer.classList.add("hidden");
  }
}

function showDecryptedMessage() {
  const text = getText();
  if (text) {
    decryptBtn.removeEventListener("click", showDecryptedMessage);
    typewriterAnimation(decrypt(text), decryptBtn, showDecryptedMessage);
    image.classList.add("hidden");
    screenContainer.classList.remove("hidden");
  } else {
    image.classList.remove("hidden");
    screenContainer.classList.add("hidden");
  }
}

function encrypt(text) {
  let encryptedMessage = "";

  for (let i = 0; i < text.length; i++) {
    switch (text[i]) {
      case "a":
        encryptedMessage += keys[0];
        break;
      case "e":
        encryptedMessage += keys[1];
        break;
      case "i":
        encryptedMessage += keys[2];
        break;
      case "o":
        encryptedMessage += keys[3];
        break;
      case "u":
        encryptedMessage += keys[4];
        break;
      default:
        encryptedMessage += text[i];
    }
  }

  return encryptedMessage;
}

function decrypt(text) {
  let encryptedMessage = text;

  keys.forEach((key) => {
    encryptedMessage = encryptedMessage.replaceAll(key, key[0]);
  });

  return encryptedMessage;
}

function isValid(text) {
  return text ? !/[^a-z\sñ]/.test(text) : true;
}

function copy() {
  const text = encryptorScreen.innerText;

  if (text) {
    navigator.clipboard.writeText(text);
    document.styleSheets[0].addRule(".copy:after", "display: " + "flex" + ";");
    setTimeout(() => {
      document.styleSheets[0].addRule(
        ".copy:after",
        "display: " + "none" + ";"
      );
    }, 3000);
  }
}

function typewriterAnimation(text, btn, callback) {
  encryptorScreen.innerText = "";
  let init = 0;
  let last = text.length - 1;
  const interval = setInterval(() => {
    if (init <= last) {
      if (text[init] == " ") {
        encryptorScreen.innerText += "\u00A0";
      } else {
        encryptorScreen.innerText += text[init];
      }
      init++;
    } else {
      clearInterval(interval);
      btn.addEventListener("click", callback);
    }
  }, 30);
}

input.addEventListener("input", getText);
encryptorBtn.addEventListener("click", showEncryptedMessage);
decryptBtn.addEventListener("click", showDecryptedMessage);
copyBtn.addEventListener("click", copy);















/*function encriptar(traduccion){
    document.querySelector("#warning").removeAttribute("style");
    var textarea = document.querySelector("#text");
    const texto = textarea.value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#text_out");
    if (texto != ""){
        var out = ""
        for(var i=0; i < texto.length; i++){
            if(((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')){
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            }
            else if((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == ""){
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
            if(texto[i] == 'a'){
                out += traduccion["a"] ;
            }
            else if(texto[i] == 'e'){
                out += traduccion["e"];
            }
            else if(texto[i] == 'i'){
                out += traduccion["i"]; 
            }
            else if(texto[i] == 'o'){
                out += traduccion["o"]; 
            }
            else if(texto[i] == 'u'){
                out += traduccion["u"]; 
            }
            else{
                out += texto[i];
            }
        }

        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        texto_out.innerHTML = out;
    }

    return;

}

function desencriptar(traduccion){
    document.querySelector("#warning").removeAttribute("style");
    var textarea = document.querySelector("#text");
    var texto = textarea.value;
    var area_default = document.querySelector("#default");
    var area_result = document.querySelector("#result");
    var texto_out = document.querySelector("#text_out");
    if (texto != ""){
        for(var i=0; i < texto.length; i++){
            if(((texto[i] < 'a') || (texto[i] > 'z')) && (texto[i] != ' ')){
                document.querySelector("#warning").style.color = "red";
                document.querySelector("#warning").style.fontSize = "16px";
                return;
            }
            else if((texto.length == 1 && texto == " ") || texto.replace(/ /g, "") == ""){
                area_default.classList.remove("invisible");
                area_result.classList.add("invisible");
                return;
            }
        }
        area_default.classList.add("invisible");
        area_result.classList.remove("invisible");
        texto = texto.replace(new RegExp(traduccion["a"], "g"), "a");
        texto = texto.replace(new RegExp(traduccion["e"], "g"), "e");
        texto = texto.replace(new RegExp(traduccion["i"], "g"), "i");
        texto = texto.replace(new RegExp(traduccion["o"], "g"), "o");
        texto = texto.replace(new RegExp(traduccion["u"], "g"), "u");
        texto_out.innerHTML = texto;
    }
    return;
}

function clipboard(){
    const texto_out = document.querySelector("#text_out");
    navigator.clipboard.writeText(texto_out.value);
}

const enc = document.querySelector('#btn_encriptar');
const des = document.querySelector('#btn_desencriptar');
const copy = document.querySelector('#btn_copiar');

var traduccion = {"a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"};

enc.addEventListener( 'click', function() {encriptar(traduccion);} );
des.addEventListener( 'click', function() {desencriptar(traduccion);} );
copy.addEventListener( 'click', function() {clipboard();} );
*/