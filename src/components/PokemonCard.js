import React from "react";
import "./PokemonCard.css";

export function PokemonCard(props) {
  return (
    <>
      <figure id="pokemon-card" className="pokemon-card">
        <div className="pokemon-card-info">
          <div className="pokemon-card-info-opacity">
            {/* **************************************************  */}
            <img
              id="pokemon-image"
              className="pokemon-image"
              src={props.elemento.image}
              alt={props.elemento.name}
            />

            {/* **************************************************  */}
            <span id="pokemon-hp" className="span-info">
              HP {props.elemento.hp}
            </span>
            <figcaption id="pokemon-name" className="pokemon-name">
              {props.elemento.name}
            </figcaption>
            <span id="pokemon-type" className="span-info">
              {props.elemento.type}
            </span>

            {/* **************************************************  */}
            <div className="pokemon-stats">
              <span id="pokemon-attack" className="span-info">
                ATTACK {props.elemento.attack}
              </span>
              <span id="pokemon-defense" className="span-info">
                DEFENSE {props.elemento.defense}
              </span>
            </div>

            {/* **************************************************  */}
            <div className="pokemon-features">
              <span id="pokemon-weight" className="span-info">
                WEIGHT {props.elemento.weight}
              </span>
              <span id="pokemon-height" className="span-info">
                HEIGHT {props.elemento.height}
              </span>
            </div>
          </div>
        </div>
      </figure>
    </>
  );
}
