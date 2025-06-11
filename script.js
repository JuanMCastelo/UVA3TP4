const { useState } = React;
const { CSSTransition, TransitionGroup } = ReactTransitionGroup;

// Chistes iniciales de respaldo
const initialJokes = [
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
  const [jokes, setJokes] = useState(initialJokes);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es&type=single");
      const data = await res.json();
      const newJoke = data.joke || "No se encontró chiste.";
      setJokes((prev) => [...prev, newJoke]);
      setIndex(jokes.length);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al obtener un nuevo chiste.");
    } finally {
      setLoading(false);
    }
  };

  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const next = () => {
    if (index < jokes.length - 1) {
      setIndex((i) => i + 1);
    } else {
      fetchJoke();
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(jokes[index]);
  };

  return (
    <div className="joke-container">
      <TransitionGroup>
        <CSSTransition key={index} timeout={500} classNames="fade">
          <p className="joke-text">{loading ? 'Cargando...' : jokes[index]}</p>
        </CSSTransition>
      </TransitionGroup>
      {error && <p className="text-danger">{error}</p>}
      <div className="joke-buttons d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={prev} disabled={index === 0 || loading}>
          Anterior
        </button>
        <button className="btn btn-outline-secondary" onClick={copy} disabled={loading}>
          Copiar
        </button>
        <button className="btn btn-outline-primary" onClick={next} disabled={loading}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Montamos la app
ReactDOM.createRoot(document.getElementById("joke-root")).render(<JokeApp />);
