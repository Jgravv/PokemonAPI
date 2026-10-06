import { useEffect, useState } from "react";
import "./pokemon-modal.css";


export default function PokemonModal({ pokemon, onClose }) {
  const isOpen = Boolean(pokemon);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchAbilities, setFetchAbilities] = useState([]);




  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(()=> {
    async function fetchDetails() {

      
      const abilityDetails = await Promise.all(
        pokemon.abilities.map(async(pokemons)=> {
          const response = await fetch(pokemons.ability.url);
          const data = await response.json();
          return data;

        })
      )
      setFetchAbilities(abilityDetails);
    }
    fetchDetails();
  })

  if (!isOpen) return null;

  const abilities = [1, 2, 3, 4];
  const stats = ["HP", "ATTACK", "DEFENSE", "SP. ATTACK", "SP. DEFENSE", "SPEED"];
  const moves = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(fetchAbilities);
  return (
    
    <div className="pm-overlay" onClick={onClose}>
      <div
        className="pm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="pm-stripe" />

        {/* Header */}
        <header className="pm-header">
          <div>
            <span className="pm-id">{"#" + String(pokemon.id).padStart(3, "0")}</span>
            <h2 id="pm-title" className="pm-name">{pokemon.name.toUpperCase()}</h2>
          </div>
          <button className="pm-close" onClick={onClose} aria-label="Close">
            &#x2715;
          </button>
        </header>
        <div className="pm-body">
          <div className="pm-left">
            <div className="pm-image">
                <img src={pokemon.sprites.other.home.front_default} alt="" />
            </div>
            <section className="pm-panel">
              <h3 className="pm-label">TYPE</h3>
              <div className="pm-types">
                <span className="pm-chip">TYPE 1</span>
                <span className="pm-chip pm-chip-alt">TYPE 2</span>
              </div>
              <dl className="pm-facts">
                <div><dt>Height</dt><dd>{pokemon.height}</dd></div>
                <div><dt>Weight</dt><dd>{pokemon.weight}</dd></div>
                <div><dt>Base EXP</dt><dd>{pokemon.base_experience}</dd></div>
              </dl>
            </section>
          </div>

          <div className="pm-right">
            <section className="pm-panel">
              <h3 className="pm-label">DESCRIPTION</h3>
              <p className="pm-text">Placeholder description of this Pokémon.</p>
            </section>

            <section>
              <h3 className="pm-label">ABILITIES</h3>
              <div className="pm-abilities">
                {abilities.map((n) => (
                  <div className="pm-ability" key={n}>
                    <div className="pm-ability-icon">ICON</div>
                    <h4>Ability {n}</h4>
                    <p>Placeholder ability description.</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="pm-split">
              <section>
                <h3 className="pm-label">BASE STATS</h3>
                {stats.map((s) => (
                  <div className="pm-stat" key={s}>
                    <span>{s}</span>
                    <div className="pm-bar"><i style={{ width: "50%" }} /></div>
                    <b>XX</b>
                  </div>
                ))}
              </section>

              <section>
                <h3 className="pm-label">MOVES</h3>
                <div className="pm-moves">
                  {moves.map((m) => (
                    <span className="pm-move" key={m}>MOVE</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
