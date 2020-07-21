class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def new
    pokemon = Pokemon.new
  end

  def create
    trainer = Trainer.find(params['trainer_id'])
    if(trainer.pokemons.length >= 6)
      render json: {errors: ['Too many pokemon! Please release one back into the wild before adding more (max 6).']}, status: :unauthorized
    else 
      pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::FunnyName.name, trainer_id: params["trainer_id"]);
      render json: pokemon
    end
  end

  def destroy
    pokemon = Pokemon.find(params['id'])
    trainerId = Trainer.find(pokemon.trainer_id)
    species = pokemon.species
    nickname = pokemon.nickname
    pokemon.destroy
    render json: {species: species, nickname: nickname, id: params['id'], trainer_id: trainerId}
  end

  private

  def pokemonParams
    params.require(:pokemon).permit(:species, :nickname)
  end
end
