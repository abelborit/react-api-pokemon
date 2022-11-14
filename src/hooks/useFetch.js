/* este hook peronalizado se hizo ya que como son varias peticiones que se harán en el proyecto, entonces convenía hacer un solo código y que nos traiga la información que solicitemos de la API y la guardaremos en variables de estado para luego poder retornarlas y utilizarlas */

import { useEffect, useState } from "react";

export const useFetch = () => {
  /* variable de estado que guardará la data que estamos solicitando */
  /* variable de estado que guardará el error en caso la petición falle */
  /* variable de estado que guardará el estado de que si se cargó o no la petición y con eso poder renderizar o no la interface */
  /* variable de estado que devolverá true o false si hay o no un link previo */
  /* variable de estado que devolverá true o false si hay o no un link siguiente */
  /* variable de estado que guardará en qué sección de la API estamos y qué "data" se mostrará según la URL */
  /* variable de estado que guardará el valor que se vaya colocando en el input */
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const [prevLink, setPrevLink] = useState(false);
  const [nextLink, setNextLink] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  let pokeAPI_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;

  const handlePrev = () => {
    if (search) {
      setSearch(search - 1);
      setCurrentPage(currentPage - 1);
      setOffset(offset - 20);
    } else {
      setCurrentPage(currentPage - 1);
      setOffset(offset - 20);
    }
  };

  const handleNext = () => {
    if (search) {
      setSearch(search + 1);
      setCurrentPage(currentPage + 1);
      setOffset(offset + 20);
    } else {
      setCurrentPage(currentPage + 1);
      setOffset(offset + 20);
    }
  };

  const handleCurrentPage = (e) => {
    setSearch(parseInt(e.target.value));
    // console.log();
  };

  const handleSearchPage = (e) => {
    if (!search) {
      setOffset(0);
      setCurrentPage(1);
    } else {
      setOffset(search * 20 - 20);
      setCurrentPage(search);
    }
    // console.log(search);
  };

  // let pokeAPI_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

  useEffect(() => {
    /* cuando hacemos peticiones fetch puede ser que al servidor donde hayamos hecho la petición esté caído y la petición fetch puede estar mucho tiempo ciclando/cargando porque no recibe ninguna respuesta, entonces se usa "new AbortController()" para que cuando detecte que no hay una respuesta del servidor podemos abortar la petición hecha */
    /* https://developer.mozilla.org/en-US/docs/Web/API/AbortController */
    /* https://www.youtube.com/watch?v=2RlqPI9uL5c&ab_channel=LatteAndCode */
    /* https://wanago.io/2022/04/11/abort-controller-race-conditions-react/ */

    const abortController = new AbortController();
    // console.log(abortController);

    const fetchData = async () => {
      setData([]);
      setloading(true);

      try {
        const respuesta = await fetch(pokeAPI_URL, {
          signal: abortController.signal,
        });
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

        /* *********************************************************************************************** */
        if (json.previous) {
          setPrevLink(true);
        } else if (!json.previous) {
          setPrevLink(false);
        }

        if (json.next) {
          setNextLink(true);
        } else if (!json.next) {
          setNextLink(false);
        }

        // console.log(prevLink);
        // console.log(nextLink);
        /* *********************************************************************************************** */

        for (let i = 0; i < json.results.length; i++) {
          let respuesta = await fetch(json.results[i].url);
          // console.log(respuesta);
          let pokemonJSON = await respuesta.json();
          // console.log(pokemonJSON);

          let pokemon = {
            id: pokemonJSON.id,
            name: pokemonJSON.name.toUpperCase(),
            image: pokemonJSON.sprites.front_default,
            hp: pokemonJSON.stats[0].base_stat,
            attack: pokemonJSON.stats[1].base_stat,
            defense: pokemonJSON.stats[2].base_stat,
            weight: pokemonJSON.weight,
            height: pokemonJSON.height,
          };

          if (pokemonJSON.types.length === 1) {
            pokemon.type = pokemonJSON.types[0].type.name.toUpperCase();
          } else if (pokemonJSON.types.length === 2) {
            pokemon.type =
              pokemonJSON.types[0].type.name.toUpperCase() +
              " / " +
              pokemonJSON.types[1].type.name.toUpperCase();
          }

          /* Actualizar el estado de forma funcional ya que en useFetch.js estamos colocando la forma en cómo recibiremos los datos para luego ser pasados a PokemonGrid.js */
          /* actualizar la variable de estado de forma funcional y esta función recibe el valor actual del estado que tiene en ese momento registrado en React para ese estado y nos pide que devolvamos el nuevo valor. Esto quiere decir que cuando se ejecute este "setData" ejecuta la función pasándole como argumento el valor del estado */
          // setData((currentData) => [...currentData, pokemon]);

          /* se coloca así para seguir con el mismo uso de palabras "data" tanto en la variable de estado como en la función que actualizará la variable de estado */
          setData((data) => [...data, pokemon]);

          /* Actualizar el estado de forma imperativa y de esta forma se tendrían que hacer modificaciones en el useFetch.js y en PokemonGrid.js ya que estamos recibiendo toda la data en bloque */
          // setData(pokemonJSON);
        }

        setError(null);
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log("The user aborted the request");
          const errorAbort = {
            status: "00",
            statusText:
              "El usuario abortó y/o canceló la solicitud de pedida de información",
          };

          setError(errorAbort);
          setData([]);
        } else {
          setError(error);
          // console.log(error);
          setData([]);
        }
      } finally {
        setloading(false);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [pokeAPI_URL]);

  /* *********************************************************************************************** */
  return {
    useFetchData: data,
    useFetchError: error,
    useFetchLoading: loading,

    useFetchPrevLink: prevLink,
    useFetchNextLink: nextLink,
    useFetchHandlePrev: handlePrev,
    useFetchHandleNext: handleNext,
    useFetchCurrentPage: currentPage,
    useFetchHandleCurrentPage: handleCurrentPage,
    useFetchSearchValue: search,
    useFetchHandleSearchPage: handleSearchPage,
  };
};
