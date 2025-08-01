const infoYear = document.querySelector("#info-year");
if (infoYear) infoYear.innerHTML = new Date().getFullYear();

const calcAge = () => {
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const birth = new Date(2000, 8, 10, 0, 0, 0, 0);

	const currMonth = now.getMonth();
	const birthMonth = birth.getMonth();
	const currDay = now.getDate();
	const birthDay = birth.getDate();

	let age = now.getFullYear() - birth.getFullYear();

	if (currMonth < birthMonth || (currMonth == birthMonth && currDay < birthDay)) age--;
	return age;
};

const myInfo = document.querySelector("#my-info");
if (myInfo) myInfo.innerHTML += `, ${calcAge()} anos`;

async function reqJSON(name) {
	try {
		const data = await fetch(`/portfolio/assets/${name}.json`);
		return await data.json();
	} catch (e) {
		console.error(e);
	}
}

const getBadges = async () => await reqJSON("badges");
const getProjects = async () => await reqJSON("portfolio");

getBadges().then((badges) => {
	const stackInfo = document.querySelector(".stack-info");

	Object.entries(badges).forEach(([k, v]) => {
		const h3 = document.createElement("h3");
		h3.textContent = k;

		stackInfo.appendChild(h3);
		Array.from(v).forEach((value) => {
			const img = document.createElement("img");
			const src = `/portfolio/assets/badges/${value}.svg`;
			img.src = src;
			img.alt = `${value} badge`;

			stackInfo.appendChild(img);
		});
	});
});

getProjects().then((projects) => {
	const projectsInfo = document.querySelector(".project-info");

	Object.entries(projects).forEach(([k, v]) => {
		const h3 = document.createElement("h3");
		h3.textContent = k;

		projectsInfo.appendChild(h3);
		const ul = document.createElement("ul");
		Array.from(v).forEach((value) => {
			const { name, desc, url } = value;
			const li = document.createElement("li");
			li.className = "project";

			const a = document.createElement("a");
			const i = document.createElement("i");
			i.className = "nf nf-fa-external_link";
			li.appendChild(i);
			a.href = url;
			a.textContent = name;
			a.target = "_blank";

			const span = document.createElement("span");
			span.textContent = `: ${desc}`;
			li.appendChild(a);
			li.appendChild(span);
			ul.appendChild(li);
			projectsInfo.appendChild(ul);
		});
	});
});

document.querySelectorAll(".sections button").forEach((btn) => {
	const go = btn.dataset.go;
	const target = document.getElementById(go);

	btn.textContent = target.textContent;
	btn.addEventListener("click", () => {
		target.scrollIntoView({ behavior: "smooth" });
	});
});
