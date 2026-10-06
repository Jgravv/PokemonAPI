import { useState, useEffect, React } from "react";
import './pokemon.css'
export default function PokemonAPI() {
        const [error,setError] = useState([]);
        const [loading, setLoading] = useState([]);
        const [pokemon, setPokemon] = useState([]);
    useEffect(()=> {
        async function fetchData() {
            try {
                setLoading(true);
                setError(false);
                
                const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
                const pokemonData = await pokemonResponse.json();

                
                const pokemonDetails = await Promise.all (
                    pokemonData.results.map(async (pokemon) => {
                        const pokemonUrlResponse = await fetch(pokemon.url);
                        const pokemonUrlData = await pokemonUrlResponse.json();
                        return pokemonUrlData;

                    })
                )
             setPokemon(pokemonDetails);


            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchData();

       
    },[])

    if (loading) {
        return <p>Loading...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }
    return(
        <>
      
            <div className="pokemon-container-header">
                <div className="pokemon-container-back">
                <a href="/post"> &lt; POSTS</a>
                </div>
                <div className="pokemon-search">
                    🔍<input type="text" />
                </div>
            </div>
                <div className="pokemon-container">
                    <div className="pokemon-content">
                        {pokemon.map((pokemons)=> {
                            
                            return(
                                <article key={pokemons.id}>
                             <div className="pokemon-card">
                        <div className="card-header">
                            <div className="header-number">
                                <label htmlFor="">{"#" + String(pokemons.id).padStart(3,"0")}</label>
                               
                            </div>
                            <div className="header-default">
                               &#x2714; DEFAULT
                            </div>
                        </div>
                        <div className="card-color-header">
                            <div className="color1"></div>
                            <div className="color2"></div>
                            <div className="color3"></div>
                        </div>
                        <div className="card-content">
                            <div className="card-img">
                                <img src={pokemons.sprites.other.home.front_default} alt="" />
                            </div>
                            <div className="card-pokemon-name">
                                <h2>{pokemons.name?.toUpperCase() || Unknown}</h2>
                            </div>
                            <div className="card-content-color">
                                <div className="content-color1"></div>
                                <div className="content-color2"></div>
                            </div>
                            <div className="card-properties">
                                <div className="properties base-exp">
                                    <label htmlFor="">BASE EXPERIENCE</label>
                                </div>
                                <div className="properties-value exp">
                                    <label htmlFor="" style={{color:"rgb(245, 35, 2)"}}>{pokemons.base_experience}</label>
                                </div>
                            </div>
                             <div className="card-properties">
                                <div className="properties height">
                                <label htmlFor="">HEIGHT</label>
                                </div>
                                <div className="properties-value height">
                                    <label htmlFor="">{pokemons.height}</label>
                                </div>
                            </div>
                             <div className="card-properties">
                                <div className="properties weight">
                                <label htmlFor="">WEIGHT</label>
                                </div>
                                <div className="properties-value weight">
                                    <label htmlFor="">{pokemons.weight}</label>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="card id">
                                    <label htmlFor="" style={{fontSize:"8px", color:"grey"}}>ID</label>
                                    <label htmlFor="">{pokemons.id}</label>
                                </div>
                                <div className="card order">
                                    <label htmlFor="" style={{fontSize:"8px", color:"grey"}}>ORDER</label>
                                    <label htmlFor="">{pokemons.order}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    </article>
                    )
                    })}
                   
                    
                    </div>
                </div>
        </>
    )
}