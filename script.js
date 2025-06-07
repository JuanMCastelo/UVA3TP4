const { useState } = React;
const { CSSTransition, TransitionGroup } = ReactTransitionGroup;

// Tu array de 10 chistes (puedes personalizar)
const jokes = [
  "—¡Camarero! Este filete tiene muchos nervios. —Normal, es la primera vez que se lo comen.",
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin.",
  "—Oye, ¿cuál es tu plato favorito y por qué? —Pues el hondo, porque cabe más comida.",
  "¿Qué le dice una iguana a su hermana gemela? Somos iguanitas.",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "Mamá, en el colegio me llaman distraído. —Juanito, tú vives en la casa de enfrente.",
  "—¡Mi amor, eres la luz de mi vida! —¿Y eso a qué viene? Yo creí que era tu superluz.",
  "¿Sabes cómo se queda un mago después de comer? ¡Magordito!",
  "¿Por qué estaba feliz el libro de matemáticas? Porque tenía muchos problemas resueltos.",
  "—Papá, papá, el mundo es redondo. —No hijo, el mundo es plano, el que te ha visto no lo ha olvidado."
];

function JokeApp() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + jokes.length) % jokes.length);
  const next = () =>
    setIndex((i) => (i + 1) % jokes.length);

  return (
    <div className="joke-container">
      <TransitionGroup>
        <CSSTransition key={index} timeout={500} classNames="fade">
          <p className="joke-text">{jokes[index]}</p>
        </CSSTransition>
      </TransitionGroup>
      <div className="joke-buttons d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={prev}>
          Anterior
        </button>
        <button className="btn btn-outline-primary" onClick={next}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Montamos la app
ReactDOM.createRoot(document.getElementById("joke-root")).render(<JokeApp />);
