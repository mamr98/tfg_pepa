import React from "react";
import Lenis from "lenis";
import Footer from "../Pages/Footer";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
      <h1>Home</h1>
      <p>Bienvenido a la página principal.</p>
    </main>
  );
}

export default Home;
