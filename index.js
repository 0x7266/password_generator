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
const copyIcon = document.querySelector(".material-symbols-outlined");

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
	copyIcon.style.color = "#a4ffaf";
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
	let size = length.value;
	if (size >= 12) score += 7;
	else if (size >= 8) score += 5;
	else if (size >= 5) score += 2;
	else score += 1;
	score = Math.floor(score / 2);
	const descriptions = {
		1: "VERY WEAK",
		2: "WEAK",
		3: "MODERATE",
		4: "STRONG",
		5: "VERY STRONG",
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
copy.addEventListener("click", async () => {
	try {
		if (passwordOutput.innerText !== "P4$5W0rD!" && passwordOutput.innerText) {
			await navigator.clipboard.writeText(passwordOutput.innerText);
		}
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
});

form.addEventListener("submit", generatePassword);
