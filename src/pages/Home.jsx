import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Pages.module.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`${styles.homeContainer} container mx-auto px-5 py-2 lg:px-32 lg:pt-12`}>
      <h1>Ejemplo de componente galeria implementado con tailiwnd-elements</h1>
      <div class="-m-1 flex flex-wrap md:-m-2">
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// return (
//   <div className={styles.div}>
//     <h2 clas>Home</h2>
//     {currentUser ? 'Hay User' : 'No hay User'}
//   </div>
// );
