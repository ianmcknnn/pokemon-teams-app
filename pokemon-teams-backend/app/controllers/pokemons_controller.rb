class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def new
    pokemon = Pokemon.new
  end

  def create
    pokemon = Pokemon.create(pokemonParams);

  end

  private

  def pokemonParams
    params.require(:pokemon).permit(:species, :nickname)
  end
end
