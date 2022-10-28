import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { ErrorFetch } from "./ErrorFetch";
import { Links } from "./Links";
import { Loader } from "./Loader";
import { PokemonCard } from "./PokemonCard";
import "./PokemonGrid.css";

export function PokemonGrid() {
  const {
    useFetchData,
    useFetchError,
    useFetchLoading,

    useFetchPrevLink,
    useFetchNextLink,
    useFetchHandlePrev,
    useFetchHandleNext,
    useFetchCurrentPage,
    useFetchHandleCurrentPage,
    useFetchSearchValue,
    useFetchHandleSearchPage,
  } = useFetch();

  // console.log(useFetchData);
  // console.log(useFetchError);
  // console.log(useFetchLoading);

  /* para evitar renderizados innecesarios si no hay datos aún. Esto se coloca porque en el primer renderizado no habrá información aún (cuando en useFetch.js en la variable de estado "data" es el valor inicial) y entonces queremos evitar el uso innecesario de rendimiento. Luego del primer renderizado ya en useFetch.js se ejecuta el useEffect() donde se hará la petición asíncrona y actualizará la variable de estado "data" y al modificar variables de estado entonces se hará un nuevo renderizado pero ya con la información de la API */
  if (!useFetchData) return null;

  return (
    <div className="section-content">
      {useFetchLoading && <Loader></Loader>}
      {useFetchError && !useFetchLoading && (
        <ErrorFetch error={useFetchError}></ErrorFetch>
      )}

      <div className="section-links">
        {!useFetchLoading && (
          <Links
            // prevLink={useFetchPrevLink.url}
            useFetchHandlePrev={useFetchHandlePrev}
            useFetchCurrentPage={useFetchCurrentPage}
            useFetchPrevLink={useFetchPrevLink}
          ></Links>
        )}

        {!useFetchLoading && (
          <div className="current-page">
            <input
              className="current-page-number"
              type="number"
              onChange={useFetchHandleCurrentPage}
              value={useFetchSearchValue}
              placeholder={useFetchCurrentPage}
            />

            <button onClick={useFetchHandleSearchPage} className="bt-search">
              Buscar
            </button>
          </div>
          // <p className="current-page">{useFetchCurrentPage}</p>
        )}

        {!useFetchLoading && (
          <Links
            // nextLink={useFetchNextLink.url}
            useFetchHandleNext={useFetchHandleNext}
            useFetchCurrentPage={useFetchCurrentPage}
            useFetchNextLink={useFetchNextLink}
          ></Links>
        )}
      </div>

      <div className="section-pokemon">
        {!useFetchLoading &&
          useFetchData.map((elemento) => (
            <Link to={elemento.name.toLowerCase()} key={elemento.id}>
              <PokemonCard elemento={elemento}></PokemonCard>
            </Link>
          ))}
      </div>
    </div>
  );
}
