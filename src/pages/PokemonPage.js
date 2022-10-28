import React from "react";
import { Header } from "../components/Header";
import { HomeBtn } from "../components/HomeBtn";
import { PokemonGrid } from "../components/PokemonGrid";
import { ScrollTopBtn } from "../components/ScrollTopBtn";

export function PokemonPage() {
  return (
    <div>
      <Header></Header>
      <HomeBtn></HomeBtn>
      <PokemonGrid></PokemonGrid>
      <ScrollTopBtn></ScrollTopBtn>
    </div>
  );
}
