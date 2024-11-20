import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const fetchLatestGames = async () => {
      try {
        const response = await axios.get("http://localhost:3001/games/latest");
        setLatestGames(response.data);
      } catch (error) {
        console.error("Error fetching latest games:", error);
      }
    };

    fetchPlayers();
    fetchLatestGames();
    const interval = setInterval(fetchPlayers, 3000); // Actualizar cada 3 segundos
    return () => clearInterval(interval); // Limpiar intervalo al desmontar

      

  }, []);

  return (
    <div className="backoffice">
      <header className="backoffice-header">
        <h1>Power The Future - Jugadores</h1>
      </header>
      <main className="backoffice-content">
        {players.length > 0 ? (
          <div className="player-list">
            {players.map((player) => (
              <div key={player.id} className="player-card">
                <h2>{player.nickname}</h2>
                <p><strong>Equipo:</strong> {player.team}</p>
                <p><strong>Estado:</strong> {player.playing ? "Jugando" : "Inactivo"}</p>

                <table class="games-table">
                <thead>
                  <tr>
                    
                    <th>Taps</th>
                    <th>Duración</th>
                    <th>avg</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody id="games-data">
                 
                  {latestGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.taps}</td>
                      <td>{game.duration}</td>
                      <td>{(game.taps/game.duration).toFixed(2)}</td>
                      <td>{new Date(game.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
          
       

              </div>
            ))}
          </div>
        ) : (
          <p>No hay jugadores registrados en este momento.</p>
        )}
      </main>
    </div>
  );
};

export default App;
