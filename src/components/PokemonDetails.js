import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BackBtn } from "./BackBtn";
import { Header } from "./Header";
import { HomeBtn } from "./HomeBtn";
import { Loader } from "./Loader";
import "./PokemonDetails.css";

export function PokemonDetails() {
  const { pokemonId } = useParams();
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  useEffect(() => {
    const pokemonData = async () => {
      setloading(true);

      try {
        const respuesta = await fetch(url);
        // console.log(respuesta);

        if (!respuesta.ok) {
          const errorFetch = {
            status: respuesta.status || "404",
            statusText:
              respuesta.statusText ||
              "Ocurrió un problema al mostrar la información",
          };

          throw errorFetch;
        }

        const json = await respuesta.json();
        // console.log(json);

        let pokemon = {
          name: json.name.toUpperCase(),
          imageFront: json.sprites.front_default,
          imageBack: json.sprites.back_default,
          imageFrontShiny: json.sprites.front_shiny,
          imageBackShiny: json.sprites.back_shiny,
          hp: json.stats[0].base_stat,
          attack: json.stats[1].base_stat,
          defense: json.stats[2].base_stat,
          specialAttack: json.stats[3].base_stat,
          specialDefense: json.stats[4].base_stat,
          speed: json.stats[4].base_stat,
          weight: json.weight,
          height: json.height,
        };

        if (json.types.length === 1) {
          pokemon.type = json.types[0].type.name.toUpperCase();
        } else if (json.types.length === 2) {
          pokemon.type =
            json.types[0].type.name.toUpperCase() +
            " / " +
            json.types[1].type.name.toUpperCase();
        }

        setPokemonData(pokemon);
        setError(null);
      } catch (error) {
        setError(error);
        // console.log(error);
        setPokemonData([]);
      } finally {
        setloading(false);
      }
    };

    pokemonData();
  }, [url]);

  return (
    <div className="all-container">
      <Header></Header>

      <HomeBtn></HomeBtn>
      <BackBtn></BackBtn>
      {loading && <Loader></Loader>}

      {!loading && !error && (
        <figure id="pokemon-card-1" className="pokemon-card-1">
          <div className="pokemon-card-info-1">
            <div className="pokemon-card-info-opacity-1">
              {/* **************************************************  */}
              <div className="pokemon-image-container-1">
                <div className="pokemon-image-content-1">
                  <div>
                    <span>Front Default</span>
                    <img
                      id="pokemon-image-1"
                      className="pokemon-image-1"
                      src={pokemonData.imageFront}
                      alt={pokemonData.name}
                    />
                  </div>

                  <div>
                    <span>Back Default</span>
                    <img
                      id="pokemon-image-1"
                      className="pokemon-image-1"
                      src={pokemonData.imageBack}
                      alt={pokemonData.name}
                    />
                  </div>
                </div>

                <div className="pokemon-image-content-1">
                  <div>
                    <span>Front Shiny</span>
                    <img
                      id="pokemon-image-1"
                      className="pokemon-image-1"
                      src={pokemonData.imageFrontShiny}
                      alt={pokemonData.name}
                    />
                  </div>

                  <div>
                    <span>Back Shiny</span>
                    <img
                      id="pokemon-image-1"
                      className="pokemon-image-1"
                      src={pokemonData.imageBackShiny}
                      alt={pokemonData.name}
                    />
                  </div>
                </div>
              </div>

              {/* **************************************************  */}
              <span id="pokemon-hp-1" className="span-info-1">
                HP {pokemonData.hp}
              </span>
              <figcaption id="pokemon-name-1" className="pokemon-name-1">
                {pokemonData.name}
              </figcaption>
              <span id="pokemon-type-1" className="span-info-1">
                {pokemonData.type}
              </span>

              {/* **************************************************  */}
              <div className="pokemon-stats-1">
                <span id="pokemon-attack-1" className="span-info-1">
                  ATTACK {pokemonData.attack}
                </span>
                <span id="pokemon-defense-1" className="span-info-1">
                  DEFENSE {pokemonData.defense}
                </span>
                <span id="pokemon-defense-1" className="span-info-1">
                  SPEED {pokemonData.defense}
                </span>
              </div>

              <div className="pokemon-stats-1">
                <span id="pokemon-attack-1" className="span-info-1">
                  SPECIAL ATTACK {pokemonData.attack}
                </span>
                <span id="pokemon-defense-1" className="span-info-1">
                  SPECIAL DEFENSE {pokemonData.defense}
                </span>
              </div>

              {/* **************************************************  */}
              <div className="pokemon-features-1">
                <span id="pokemon-weight-1" className="span-info-1">
                  WEIGHT {pokemonData.weight}
                </span>
                <span id="pokemon-height-1" className="span-info-1">
                  HEIGHT {pokemonData.height}
                </span>
              </div>
            </div>
          </div>
        </figure>
      )}

      {error && (
        <div className="error-fetch-containar-1">
          <p className="error-fetch-1">Error: {error.status}</p>
          <p className="error-fetch-1">{error.statusText}</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        </div>
      )}
    </div>
  );
}
