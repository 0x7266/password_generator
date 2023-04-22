const passwordOutput = document.getElementById("password_output");
const copy = document.getElementById("copy");
const form = document.getElementById("form");
const length = document.getElementById("length");
const lengthOutput = document.getElementById("length_output");
const strengthOutput = document.getElementById("strength_output");
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
	checkStrength();
}

function checkStrength() {
	let options = [
		lowercase.checked,
		uppercase.checked,
		numbers.checked,
		symbols.checked,
	].filter((element) => Boolean(element)).length;
	let score =
		lowercase.checked + uppercase.checked + numbers.checked + symbols.checked;
	console.log(score);
	if (length.value >= 12) score += 7;
	else if (length.value >= 8) score += 5;
	else if (length.value >= 6) score += 2;
	else length += 1;
	score = Math.floor(score / 2);
	const descriptions = {
		1: "Very weak",
		2: "Weak",
		3: "Moderate",
		4: "Strong",
		5: "Very Strong",
	};
	strengthOutput.innerText = descriptions[score];
}

document.querySelectorAll("input[type=checkbox]").forEach((i) =>
	i.addEventListener("change", (e) => {
		// at least one of the options must be checked
		if (
			![
				lowercase.checked,
				uppercase.checked,
				numbers.checked,
				symbols.checked,
			].some((element) => element)
		) {
			e.target.checked = true;
			return;
		}
		checkStrength();
	})
);

length.addEventListener("input", (e) => {
	lengthOutput.innerText = e.target.value;
	checkStrength();
});

form.addEventListener("submit", generatePassword);
