const output = document.getElementById("pwd");
const copy = document.getElementById("copy");
const form = document.getElementById("form");
const length = document.getElementById("length");
const lengthOutput = document.getElementById("length_output");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbersOption = document.getElementById("numbers");
const symbolsOption = document.getElementById("symbols");
const generate = document.getElementById("generate");

const SYMBOLS = "_-¿!@#$%^&*()?¡".split("");
const NUMBERS = "0123456789".split("");
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function generatePassword(e) {
	e.preventDefault();
	// at least one of the options must be checked
	if (
		![
			lowercase.checked,
			uppercase.checked,
			numbersOption.checked,
			symbolsOption.checked,
		].some((element) => element)
	) {
		alert("Password"); // TODO: SHOW ERROR MESSAGE
	}
}

length.addEventListener("input", (e) => {
	lengthOutput.innerText = e.target.value;
});

form.addEventListener("submit", generatePassword);
