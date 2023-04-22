const passwordOutput = document.getElementById("password_output");
const copy = document.getElementById("copy");
const form = document.getElementById("form");
const length = document.getElementById("length");
const lengthOutput = document.getElementById("length_output");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generate = document.getElementById("generate");

const SYMBOLS = "_-¿!@#$%^&*()?¡";
const NUMBERS = "0123456789";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generatePassword(e) {
	e.preventDefault();
	// at least one of the options must be checked
	if (
		![
			lowercase.checked,
			uppercase.checked,
			numbers.checked,
			symbols.checked,
		].some((element) => element)
	) {
		passwordOutput.style.color = "#62616a";
		passwordOutput.innerText = "P4$5W0rD!";
		// TODO: SHOW ERROR MESSAGE
		alert("Password");
		return;
	}
	let password = [
		...(symbols.checked ? SYMBOLS : []),
		...(numbers.checked ? NUMBERS : []),
		...(lowercase.checked ? LOWERCASE_LETTERS : []),
		...(uppercase.checked ? UPPERCASE_LETTERS : []),
	]
		.join("")
		.split("")
		.sort(function () {
			return 0.5 - Math.random();
		})
		.join("")
		.slice(0, Number(length.value));
	passwordOutput.style.color = "white";
	passwordOutput.innerText = password;
}

length.addEventListener("input", (e) => {
	lengthOutput.innerText = e.target.value;
});

form.addEventListener("submit", generatePassword);
