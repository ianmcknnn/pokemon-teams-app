class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def new
    pokemon = Pokemon.new
  end

  def create
    pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::FunnyName.name, trainer_id: params["trainer_id"]);
    render json: pokemon
  end

  private

  def pokemonParams
    params.require(:pokemon).permit(:species, :nickname)
  end
end
