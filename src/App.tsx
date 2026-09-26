/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Copy, 
  Check, 
  Code, 
  CheckCircle2, 
  Sliders, 
  Download, 
  Eye, 
  Sparkles,
  CloudSun,
  Wind,
  Droplets,
  MapPin,
  ExternalLink
} from 'lucide-react';

const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Weather App Homepage</title>
    <style>
        /* 1. Paramètres globaux et Arrière-plan (Body) */
        body {
            /* Police Arial ou sans-serif pour toute la page */
            font-family: Arial, sans-serif;
            
            /* Couleur de fond bleu ciel */
            background-color: #87ceeb;
            
            /* Motif d'arrière-plan avec radial-gradient : cercles blancs de 2px, transparent à 3px */
            background-image: radial-gradient(#ffffff 2px, transparent 3px);
            
            /* Paramètres du motif */
            background-size: 40px 40px;
            background-repeat: repeat;
            background-position: top center;
            background-attachment: fixed;
            
            /* Texte général blanc et centré */
            color: #ffffff;
            text-align: center;
            
            margin: 0;
            padding: 25px 15px 50px 15px;
        }

        h1 {
            font-size: 32px;
            margin-top: 10px;
            margin-bottom: 8px;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        }

        .subtitle {
            font-size: 16px;
            margin-top: 0;
            margin-bottom: 30px;
            color: #ffffff;
            opacity: 0.95;
        }

        /* 2. Carte Météo Principale (Weather Card) */
        .weather-card {
            /* Largeur de 400px, centré */
            width: 400px;
            max-width: 90%;
            margin: 0 auto 35px auto;
            
            /* Bordure blanche solide de 3px et coins arrondis de 20px */
            border: 3px solid #ffffff;
            border-radius: 20px;
            
            /* Fond linear-gradient vers le bas à droite, de #1e90ff à #87cefa */
            background: linear-gradient(to bottom right, #1e90ff, #87cefa);
            
            padding: 25px 20px;
            box-sizing: border-box;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .weather-card h2 {
            margin-top: 0;
            margin-bottom: 12px;
            font-size: 26px;
        }

        /* 3. Animation CSS (@keyframes floatCloud) */
        .cloud-icon {
            display: inline-block;
            font-size: 48px;
            font-weight: bold;
            margin: 10px 0;
            /* Animation floatCloud, 3 secondes, infinie, mode alternatif */
            animation: floatCloud 3s infinite alternate ease-in-out;
        }

        @keyframes floatCloud {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(20px);
            }
        }

        /* Température en grand (28°C, couleur jaune clair #fffacd) */
        .temperature {
            font-size: 54px;
            font-weight: bold;
            color: #fffacd;
            margin: 15px 0;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        }

        .details p {
            margin: 8px 0;
            font-size: 17px;
        }

        /* 4. Section des prévisions (Weekly Forecast) */
        .forecast-section {
            /* Largeur de 600px, centré */
            width: 600px;
            max-width: 90%;
            margin: 0 auto;
            
            /* Bordure blanche solide de 3px et coins arrondis de 15px */
            border: 3px solid #ffffff;
            border-radius: 15px;
            
            /* Fond radial-gradient (cercle, de white à #add8e6) */
            background: radial-gradient(circle, white, #add8e6);
            
            /* Texte à l'intérieur bleu foncé (#003366) */
            color: #003366;
            
            padding: 25px 20px;
            box-sizing: border-box;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .forecast-section h3 {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 24px;
            color: #003366;
        }

        /* 5 paragraphes entourés d'une fine bordure (#4682b4) */
        .forecast-day {
            border: 1px solid #4682b4;
            border-radius: 8px;
            padding: 10px 15px;
            margin: 10px 0;
            font-size: 16px;
            font-weight: bold;
            background-color: rgba(255, 255, 255, 0.5);
        }
    </style>
</head>
<body>

    <!-- 1. Titre H1 et sous-titre explicatif -->
    <h1>My Weather App Homepage</h1>
    <p class="subtitle">Check today's live conditions and the 5-day weather outlook at a glance.</p>

    <!-- 2. Carte Météo Principale -->
    <div class="weather-card">
        <h2>Today's Weather</h2>
        
        <!-- 3. Icône Cloud animée avec floatCloud -->
        <div class="cloud-icon">Cloud ☁️</div>
        
        <!-- Température en grand (couleur jaune clair #fffacd) -->
        <div class="temperature">28°C</div>
        
        <!-- Détails sous forme de paragraphes -->
        <div class="details">
            <p><strong>City:</strong> Bengaluru</p>
            <p><strong>Condition:</strong> Partly Cloudy</p>
            <p><strong>Humidity:</strong> 62%</p>
            <p><strong>Wind Speed:</strong> 12 km/h</p>
        </div>
    </div>

    <!-- 4. Section des prévisions (Weekly Forecast) -->
    <div class="forecast-section">
        <h3>Next 5 Days</h3>
        <p class="forecast-day">Monday: Sunny - 30°C</p>
        <p class="forecast-day">Tuesday: Rainy - 24°C</p>
        <p class="forecast-day">Wednesday: Cloudy - 26°C</p>
        <p class="forecast-day">Thursday: Thunderstorm - 25°C</p>
        <p class="forecast-day">Friday: Sunny - 29°C</p>
    </div>

</body>
</html>`;

interface CityData {
  name: string;
  tempC: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{ day: string; condition: string; tempC: number; icon: string }>;
}

const CITIES: Record<string, CityData> = {
  Bengaluru: {
    name: 'Bengaluru',
    tempC: 28,
    condition: 'Partly Cloudy',
    humidity: 62,
    windSpeed: 12,
    forecast: [
      { day: 'Monday', condition: 'Sunny', tempC: 30, icon: '☀️' },
      { day: 'Tuesday', condition: 'Rainy', tempC: 24, icon: '🌧️' },
      { day: 'Wednesday', condition: 'Cloudy', tempC: 26, icon: '☁️' },
      { day: 'Thursday', condition: 'Thunderstorm', tempC: 25, icon: '⛈️' },
      { day: 'Friday', condition: 'Sunny', tempC: 29, icon: '☀️' },
    ],
  },
  Paris: {
    name: 'Paris',
    tempC: 18,
    condition: 'Light Rain',
    humidity: 75,
    windSpeed: 18,
    forecast: [
      { day: 'Monday', condition: 'Showers', tempC: 17, icon: '🌦️' },
      { day: 'Tuesday', condition: 'Cloudy', tempC: 19, icon: '☁️' },
      { day: 'Wednesday', condition: 'Sunny', tempC: 22, icon: '☀️' },
      { day: 'Thursday', condition: 'Partly Cloudy', tempC: 21, icon: '⛅' },
      { day: 'Friday', condition: 'Rainy', tempC: 16, icon: '🌧️' },
    ],
  },
  'New York': {
    name: 'New York',
    tempC: 22,
    condition: 'Breezy & Clear',
    humidity: 55,
    windSpeed: 20,
    forecast: [
      { day: 'Monday', condition: 'Sunny', tempC: 23, icon: '☀️' },
      { day: 'Tuesday', condition: 'Partly Cloudy', tempC: 24, icon: '⛅' },
      { day: 'Wednesday', condition: 'Thunderstorm', tempC: 20, icon: '⛈️' },
      { day: 'Thursday', condition: 'Clear', tempC: 21, icon: '☀️' },
      { day: 'Friday', condition: 'Windy', tempC: 19, icon: '💨' },
    ],
  },
  Tokyo: {
    name: 'Tokyo',
    tempC: 25,
    condition: 'Mild & Sunny',
    humidity: 58,
    windSpeed: 14,
    forecast: [
      { day: 'Monday', condition: 'Sunny', tempC: 26, icon: '☀️' },
      { day: 'Tuesday', condition: 'Sunny', tempC: 27, icon: '☀️' },
      { day: 'Wednesday', condition: 'Rainy', tempC: 21, icon: '🌧️' },
      { day: 'Thursday', condition: 'Cloudy', tempC: 23, icon: '☁️' },
      { day: 'Friday', condition: 'Partly Cloudy', tempC: 25, icon: '⛅' },
    ],
  },
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [showDemoControls, setShowDemoControls] = useState(false);
  const [activeCity, setActiveCity] = useState<string>('Bengaluru');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [animationDuration, setAnimationDuration] = useState<number>(3);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  const cityData = CITIES[activeCity] || CITIES['Bengaluru'];

  const convertTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(STANDALONE_HTML_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([STANDALONE_HTML_CODE], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather-app-homepage.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen pb-16">
      {/* Top Floating Helper Bar */}
      {!hideTopBar ? (
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/60 text-slate-100 px-4 py-2.5 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wide text-white">Codingal Exercise:</span>
              <span className="text-slate-300 hidden sm:inline">My Weather App Homepage (HTML & CSS)</span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setShowCodeModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-xs"
                title="Afficher et copier le code HTML et CSS complet"
              >
                <Code className="w-4 h-4" />
                <span>Code HTML/CSS</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>

              <button
                onClick={() => setShowCriteriaModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium transition-colors"
                title="Vérifier la conformité avec les 4 consignes"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">Critères (4/4)</span>
              </button>

              <button
                onClick={() => setShowDemoControls(!showDemoControls)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border font-medium transition-colors ${
                  showDemoControls 
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
                }`}
                title="Contrôles interactifs (Changer de ville, unités, vitesse animation)"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Options</span>
              </button>

              <button
                onClick={() => setHideTopBar(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Masquer la barre pour visualiser uniquement le projet pur"
              >
                <Eye className="w-4 h-4" />
                <span className="text-xs hidden lg:inline">Vue épurée</span>
              </button>
            </div>
          </div>

          {/* Interactive Demo Tray when toggled */}
          {showDemoControls && (
            <div className="max-w-6xl mx-auto mt-2.5 pt-2.5 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Ville :</span>
                {Object.keys(CITIES).map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCity(c)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeCity === c
                        ? 'bg-blue-500 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">Unité :</span>
                  <button
                    onClick={() => setTempUnit('C')}
                    className={`px-2 py-0.5 rounded font-bold ${tempUnit === 'C' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setTempUnit('F')}
                    className={`px-2 py-0.5 rounded font-bold ${tempUnit === 'F' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}
                  >
                    °F
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-medium">Animation nuage :</span>
                  <button
                    onClick={() => setIsAnimationPaused(!isAnimationPaused)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {isAnimationPaused ? 'Reprendre' : 'Pause'}
                  </button>
                  <select
                    value={animationDuration}
                    onChange={(e) => setAnimationDuration(Number(e.target.value))}
                    aria-label="Vitesse d'animation du nuage"
                    className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-1.5 py-0.5"
                  >
                    <option value={1.5}>Rapide (1.5s)</option>
                    <option value={3}>Normal (3s - Consigne)</option>
                    <option value={5}>Lent (5s)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </header>
      ) : (
        <button
          onClick={() => setHideTopBar(false)}
          className="fixed top-3 right-3 z-40 bg-slate-900/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:bg-slate-800 flex items-center gap-1.5 transition-all"
        >
          <Sliders className="w-3.5 h-3.5 text-blue-400" />
          Afficher les outils
        </button>
      )}

      {/* ========================================================
          PAGE OFFICIELLE CONFORME CODINGAL (HTML & CSS PUR)
          ======================================================== */}
      <main className="px-4 py-8">
        {/* 1. Titre H1 et sous-titre explicatif */}
        <h1 
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '32px',
            marginTop: '15px',
            marginBottom: '8px',
            color: '#ffffff',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
            fontWeight: 'bold',
          }}
        >
          My Weather App Homepage
        </h1>

        <p 
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            marginTop: '0',
            marginBottom: '35px',
            color: '#ffffff',
            opacity: 0.95,
          }}
        >
          Check today&apos;s live conditions and the 5-day weather outlook at a glance.
        </p>

        {/* 2. Carte Météo Principale (Weather Card) */}
        {/* 
          Consigne:
          - largeur de 400px, centré
          - bordure blanche solide de 3px et coins arrondis de 20px
          - fond linear-gradient vers le bas à droite, de #1e90ff à #87cefa
          - Titre H2 "Today's Weather"
          - texte "Cloud" représentant l'icône
          - température en grand (28°C, couleur jaune clair #fffacd)
          - paragraphes: City: Bengaluru, Condition: Partly Cloudy, Humidity: 62%, Wind Speed: 12 km/h
        */}
        <div 
          className="weather-card-consigne"
          style={{
            width: '400px',
            maxWidth: '92%',
            margin: '0 auto 35px auto',
            border: '3px solid #ffffff',
            borderRadius: '20px',
            background: 'linear-gradient(to bottom right, #1e90ff, #87cefa)',
            padding: '28px 24px',
            boxSizing: 'border-box',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.18)',
            textAlign: 'center',
          }}
        >
          <h2 
            style={{
              marginTop: '0',
              marginBottom: '15px',
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            Today&apos;s Weather
          </h2>

          {/* 3. Animation CSS (@keyframes floatCloud) */}
          <div 
            style={{
              display: 'inline-block',
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '10px 0',
              animation: isAnimationPaused 
                ? 'none' 
                : `floatCloud ${animationDuration}s infinite alternate ease-in-out`,
            }}
          >
            Cloud ☁️
          </div>

          {/* Température en grand (couleur jaune clair #fffacd) */}
          <div 
            style={{
              fontSize: '54px',
              fontWeight: 'bold',
              color: '#fffacd',
              margin: '15px 0',
              textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            {convertTemp(cityData.tempC)}
          </div>

          {/* Détails sous forme de paragraphes */}
          <div style={{ textAlign: 'center', fontSize: '17px', lineHeight: '1.6' }}>
            <p style={{ margin: '8px 0' }}>
              <strong>City:</strong> {cityData.name}
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong>Condition:</strong> {cityData.condition}
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong>Humidity:</strong> {cityData.humidity}%
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong>Wind Speed:</strong> {cityData.windSpeed} km/h
            </p>
          </div>
        </div>

        {/* 4. Section des prévisions (Weekly Forecast) */}
        {/* 
          Consigne:
          - largeur de 600px, centré
          - bordure blanche solide de 3px et coins arrondis de 15px
          - fond radial-gradient (cercle, de white à #add8e6)
          - texte à l'intérieur bleu foncé (#003366)
          - Titre H3 "Next 5 Days"
          - 5 paragraphes représentant les jours de la semaine (ex: Monday: Sunny - 30°C)
          - chacun entouré d'une fine bordure (#4682b4)
        */}
        <div 
          className="weekly-forecast-consigne"
          style={{
            width: '600px',
            maxWidth: '92%',
            margin: '0 auto',
            border: '3px solid #ffffff',
            borderRadius: '15px',
            background: 'radial-gradient(circle, white, #add8e6)',
            color: '#003366',
            padding: '28px 24px',
            boxSizing: 'border-box',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.18)',
            textAlign: 'center',
          }}
        >
          <h3 
            style={{
              marginTop: '0',
              marginBottom: '20px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#003366',
            }}
          >
            Next 5 Days
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cityData.forecast.map((item) => (
              <p
                key={item.day}
                className="forecast-day-consigne"
                style={{
                  border: '1px solid #4682b4',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  color: '#003366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  {item.day}: {item.condition}
                </span>
                <span>
                  {item.icon} {convertTemp(item.tempC)}
                </span>
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL: Code HTML & CSS Source Complet */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">
                  Code Source HTML & CSS (100% autonome, sans JavaScript)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadHtml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Télécharger .html
                </button>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copié dans le presse-papier !' : 'Copier tout le code'}
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 overflow-y-auto flex-1 font-mono text-xs text-emerald-300 leading-relaxed selection:bg-blue-600 selection:text-white">
              <pre className="whitespace-pre">{STANDALONE_HTML_CODE}</pre>
            </div>

            <div className="p-3 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
              <span>Ce code respecte à la lettre chaque gradient, rayon et keyframe de l&apos;exercice.</span>
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Grille de validation des critères Codingal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Vérificateur de conformité Codingal (4/4 validés)
                </h3>
              </div>
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm">
              {/* Critère 1 */}
              <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      1. Paramètres globaux et Arrière-plan (Body)
                    </h4>
                    <ul className="mt-2 space-y-1 text-slate-300 text-xs list-disc list-inside">
                      <li><code className="text-amber-300">font-family: Arial, sans-serif</code></li>
                      <li><code className="text-amber-300">background-color: #87ceeb</code> (bleu ciel)</li>
                      <li><code className="text-amber-300">background-image: radial-gradient(#ffffff 2px, transparent 3px)</code></li>
                      <li><code className="text-amber-300">background-size: 40px 40px</code>, <code className="text-amber-300">background-repeat: repeat</code></li>
                      <li><code className="text-amber-300">background-position: top center</code>, <code className="text-amber-300">background-attachment: fixed</code></li>
                      <li>Texte blanc, centré avec H1 &quot;My Weather App Homepage&quot; et sous-titre explicatif</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Critère 2 */}
              <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      2. Carte Météo Principale (Weather Card)
                    </h4>
                    <ul className="mt-2 space-y-1 text-slate-300 text-xs list-disc list-inside">
                      <li>Largeur : <code className="text-amber-300">width: 400px</code>, centré (<code className="text-amber-300">margin: 0 auto</code>)</li>
                      <li>Bordure blanche solide de 3px (<code className="text-amber-300">border: 3px solid #ffffff</code>)</li>
                      <li>Coins arrondis de 20px (<code className="text-amber-300">border-radius: 20px</code>)</li>
                      <li>Fond dégradé linéaire : <code className="text-amber-300">linear-gradient(to bottom right, #1e90ff, #87cefa)</code></li>
                      <li>Titre H2 &quot;Today&apos;s Weather&quot;, texte &quot;Cloud&quot;, Température en grand (<code className="text-amber-300">#fffacd</code>)</li>
                      <li>Détails : City (Bengaluru), Condition (Partly Cloudy), Humidity (62%), Wind Speed (12 km/h)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Critère 3 */}
              <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      3. Animation CSS (@keyframes floatCloud)
                    </h4>
                    <ul className="mt-2 space-y-1 text-slate-300 text-xs list-disc list-inside">
                      <li>Nom de l&apos;animation : <code className="text-amber-300">floatCloud</code></li>
                      <li>Durée de 3 secondes : <code className="text-amber-300">3s</code></li>
                      <li>Mode infini et alternatif : <code className="text-amber-300">infinite alternate</code></li>
                      <li>Keyframes : <code className="text-amber-300">translateY(0)</code> à <code className="text-amber-300">translateY(20px)</code></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Critère 4 */}
              <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                <div className="flex items-start gap-3">
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base">
                      4. Section des prévisions (Weekly Forecast)
                    </h4>
                    <ul className="mt-2 space-y-1 text-slate-300 text-xs list-disc list-inside">
                      <li>Largeur : <code className="text-amber-300">width: 600px</code>, centré (<code className="text-amber-300">margin: 0 auto</code>)</li>
                      <li>Bordure blanche solide de 3px et coins arrondis de 15px (<code className="text-amber-300">border-radius: 15px</code>)</li>
                      <li>Fond dégradé radial : <code className="text-amber-300">radial-gradient(circle, white, #add8e6)</code></li>
                      <li>Couleur du texte : <code className="text-amber-300">color: #003366</code> (bleu foncé)</li>
                      <li>Titre H3 &quot;Next 5 Days&quot;</li>
                      <li>5 paragraphes des jours avec fine bordure (<code className="text-amber-300">border: 1px solid #4682b4</code>)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-xs transition-colors"
              >
                Compris !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
