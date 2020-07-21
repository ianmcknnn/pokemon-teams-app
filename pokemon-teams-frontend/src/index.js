const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", (e) => {

	function getTrainers() {
		return fetch(TRAINERS_URL)
			.then(resp => resp.json())
			.then(json => displayTrainers(json))
	}

	function getPokemons(trainer) {
		return fetch (POKEMONS_URL)
			.then(resp => resp.json())
			.then(json => displayPokemons(json))
	}

	function displayTrainers(json){
		const main = document.getElementById("main")

		json.forEach(trainer => displayTrainer(trainer))
	}

	function displayTrainer(trainer){
		const card = document.createElement("div");
		const name = trainer.name;
		const id = trainer.id;
		const nameP = document.createElement("p");
		const addPokeButton = document.createElement("button");
		const pokeUl = document.createElement("ul");

		card.setAttribute("class", "card");
		card.setAttribute("data-id", `${id}`);
		nameP.textContent = name;

		card.append(nameP);

		addPokeButton.setAttribute("data-trainer-id", `${id}`);
		addPokeButton.textContent = "Add Pokemon";
		addPokeButton.addEventListener("click", (e) => {
			fetch(POKEMONS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					"trainer_id": id
				})
			})
				.then(resp => resp.json())
				.then(json => {if(!json.errors){
					displayPokemon(json)}
					else{json.errors.forEach((error) => {alert(error)})}
				});
		})

			card.append(addPokeButton);

			main.append(card);
		}

	//	function createForm(e){
	//		const formDiv = document.createElement("div");
	//		const h3 = document.createElement("h3");
	//		const speciesInput = document.createElement("input");
	//		const nicknameInput = document.createElement("input");
	//		const submit = document.createElement("input");
	//
	//		form.setAttribute("class", "add-pokemon-form");
	//		h3.textContent = "Create a Pokemon";
	//		speciesInput.setAttribute("type", "text");
	//		speciesInput.setAttribute("name", "species");
	//		speciesInput.setAttribute("value", "");
	//		speciesInput.setAttribute("placeholder", "Species");
	//		speciesInput.setAttribute("class", "input-text");
	//		nicknameInput.setAttribute("type", "text");
	//		nicknameInput.setAttribute("name", "nickname");
	//		nicknameInput.setAttribute("value", "");
	//		nicknameInput.setAttribute("placeholder", "Nickname");
	//		nicknameInput.setAttribute("class", "input-text");
	//		submit.setAttribute("type", "submit");

	//		form.append(h3);
	//		form.append(speciesInput);
	//		form.append(nicknameInput);
	//		form.append(submit);
	//		e.target.parentElement.append(form);

	//		const formInsides = `<form class="add-pokemon-form">
	//		<h3>Create a Pokemon</h3>
	//			<input
	//				type="text"
	//				name="species"
	//				value=""
	//				placeholder="Species"
	//				class="input-text"
	//			/>
	//		</form>`;
	//		formDiv.innerHtml = formInsides;
	//		e.target.parentNode.appendChild(formDiv);
	//	}

	function displayPokemons(json){
		json.forEach(pokemon => displayPokemon(pokemon))
	}

	function displayPokemon(pokemon){
		const trainerId = pokemon.trainer_id;
		const pokemonId = pokemon.id;
		const nickname = pokemon.nickname;
		const species = pokemon.species;
		const trainerCard = document.querySelector(`[data-id="${trainerId}"]`);
		const pokeLi = document.createElement("li");
		const releaseButton = document.createElement("button");

		releaseButton.setAttribute("class", "release");
		releaseButton.setAttribute("data-pokemon-id", `${pokemonId}`);
		releaseButton.textContent = "Release";
		releaseButton.addEventListener("click", (e) => {
			fetch(POKEMONS_URL + `/${pokemonId}`, {
				method: "DELETE"
			})
				.then(resp => resp.json())
				.then(json => {
					removePokemon(json['id']);
					alert(`${json['nickname']} the ${json['species']} has been released!`);
				})
				.catch(error => console.log(error.messages))
		})

		pokeLi.textContent = `${species} (${nickname})`;
		pokeLi.append(releaseButton);
		//		console.log(trainerCard);
		trainerCard.appendChild(pokeLi);
	}

	function removePokemon(id){
		const pokemon = document.querySelector(`[data-pokemon-id="${id}"]`)
		pokemon.parentElement.remove(pokemon)
	}



	getTrainers();
	getPokemons();
})
