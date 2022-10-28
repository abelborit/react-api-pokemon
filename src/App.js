import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PokemonDetails } from "./components/PokemonDetails";
import { Error404 } from "./pages/Error404";
import { PrincipalPage } from "./pages/PrincipalPage";
import { PokemonPage } from "./pages/PokemonPage";

function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path="/" element={<PrincipalPage></PrincipalPage>}></Route>
          <Route path="/pokemon" element={<PokemonPage></PokemonPage>}></Route>

          <Route
            path="/pokemon/:pokemonId"
            element={<PokemonDetails></PokemonDetails>}
          ></Route>

          <Route path="*" element={<Error404></Error404>}></Route>
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
