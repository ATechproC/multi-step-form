let inputs = document.querySelectorAll("input");
let nextBtns = document.querySelectorAll(".btn_next");
let backBtns = document.querySelectorAll(".btn_prev")
let formSteps = document.querySelectorAll(".form_step");
let stepNumbers = document.querySelectorAll(".step_number");
let progressBar = document.querySelector(".progress");
let errElements = document.querySelectorAll(".err_msg");
let err;
let pgrWidth = 0;
let isCorrect = [];

for (let i = 0; i < nextBtns.length; i++) {
    isCorrect[i] = false;
}

function validateForm() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", function () {
            validate(i);
        })
    }
};

function validate(index) {
    let regex = new RegExp(inputs[index].pattern, "ig");
    let inputValue = inputs[index].value.trim();
    if (regex.test(inputValue)) {
        isCorrect[index] = true;
        inputs[index].style.borderColor = "green";
        errElements[index].innerHTML = "";
    } else {
        isCorrect[index] = false;
        validateChampAgain(index);
    }
}

function validateChampAgain(index) {
    if (inputs[index].value === "") {
        inputs[index].style.borderColor = "transparent";
        errElements[index].innerHTML = "";
    } else {
        inputs[index].style.borderColor = "red";
        if (index === 0) {
            err = "Veuillez entrer un nom valide (minimum 2 caractères, lettres uniquement)";
        } else if (index === 1) {
            err = "❌ Entrez une adresse e-mail valide, comme exemple@email.com"
        } else if (index === 2) {
            err = "❌ Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
        }
        errElements[index].innerHTML = err;
    }
}

validateForm();

(function passToTheNextChamp() {
    for (let i = 0; i < nextBtns.length; i++) {
        nextBtns[i].addEventListener("click", function () {
            if (isCorrect[i]) {
                pgrWidth += 25;
                formSteps[i].classList.remove("active");
                formSteps[i + 1].classList.add("active");
                stepNumbers[i].classList.add("purple");
                stepNumbers[i + 1].classList.add("activeColor");
                progressBar.style.width = `${pgrWidth}%`;
                if (i === 2) {
                    localStorage.setItem("password", inputs[i].value);
                }
            } else {
                alert("veuillez verifer ce champ!");
            }
        })
    }
})();

for (let i = 0; i < backBtns.length; i++) {
    backBtns[i].addEventListener("click", function () {
        pgrWidth -= 25;
        formSteps[i].classList.add("active");
        formSteps[i + 1].classList.remove("active");
        stepNumbers[i].classList.remove("purple");
        stepNumbers[i + 1].classList.remove("activeColor");
        progressBar.style.width = `${pgrWidth}%`;
        inputs[i + 1].value = "";
        validate(i + 1);
    })
}

let inscrire = false;
index = inputs.length - 1;
inputs[index].addEventListener("input", function () {
    if (inputs[index].value.trim() != "") {
        if (inputs[index].value.trim() === localStorage.getItem("password")) {
            err = "";
            inscrire = true;
        } else {
            inscrire = false;
            err = "❌ Les mots de passe ne correspondent pas. Veuillez les saisir à l'identique.";
        }
    }
    errElements[errElements.length - 1].innerHTML = err;
    validate(inputs.length - 1);
})

// toggle password : 

let passwordEyes = document.querySelectorAll(".toggle_password");
let mood = "normal";

for (let i = 0; i < passwordEyes.length; i++) {
    passwordEyes[i].addEventListener("click", function () {
        let currentInput = passwordEyes[i].parentElement.querySelector("input");
        let followInputValue = currentInput.value.trim();
        if (followInputValue != "") {
            if (mood === "normal") {
                let str = [];
                for (let j = 0; j < followInputValue.length; j++) {
                    str[str.length] = ".";
                }
                currentInput.value = str.join("");
                mood = "change";
            } else {
                currentInput.value = localStorage.getItem("password");
                mood = "normal";
            }
        }
    })
}

// creation d'un compte : 

let formCard = document.querySelector(".form_card");
let boxAlert = document.querySelector(".box_alert");
let singUp = document.querySelector(".singUp");

singUp.addEventListener("click", function () {
    pgrWidth += 25;
    progressBar.style.width = `${pgrWidth}%`;
    stepNumbers[index].classList.add("purple");
    setTimeout(inscription, 1500);
});

function inscription() {
    if (inscrire === true) {
        formCard.style.display = "none";
        boxAlert.style.display = "block";
    } else {
        console.log("verifier votre information!");
    }
}
