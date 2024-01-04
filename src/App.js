import { useState, useEffect } from "react";
// import "./App.css";
import loadingGif from "./assets/loading.gif";
import Header from './components/Header';
import Next from './components/Buttons/Next';
// import Back from './components/Buttons/Back';
import Modify from './components/Buttons/Modify';
import HistoryConv from "./components/History/HistoryConv";
import Micro from "./assets/micro.svg";
import Stop from './assets/stop.svg';
import history from './assets/history.svg';
import closeHistory from './assets/closeHistory.svg';


function App() {
  const [prompt, updatePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  async function loadInitialQuestion(promptFromServer) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptFromServer }),
      };

      const res = await fetch("http://localhost:5001/ask", requestOptions);
      const data = await res.json();
      console.log("Response from Server:", data);
      setAnswer(data.message.content);
      setConversationHistory([{ prompt: promptFromServer, response: data.message.content }]);
    } catch (error) {
      console.error("Error loading initial question:", error);
    }
  }

  // useEffect pour charger la question au montage du composant
  useEffect(() => {
    async function fetchInitialPrompt() {
      try {
        const response = await fetch("http://localhost:5001/initial-prompt");
        const data = await response.json();
        loadInitialQuestion(data.prompt);
      } catch (error) {
        console.error("Erreur lors de la récupération du prompt initial :", error);
      }
    }
  
    fetchInitialPrompt();
  }, []); 

  const sendPrompt = async () => {
    try {
      setLoading(true);
      const fullPrompt = conversationHistory.map(conv => `Question: ${conv.prompt}\nRéponse: ${conv.response}`).join("\n") + `\nQuestion: ${prompt}`;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt }),
      };

      const res = await fetch("http://localhost:5001/ask", requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setAnswer(data.message.content);
      setConversationHistory([...conversationHistory, { prompt, response: data.message.content }]);
      updatePrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  // fonction pour le bouton entree

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     sendPrompt();
  //   }
  // };

  // fonction pour le bouton envoyer

  const handleSubmit = () => {
    if (!prompt) return;
    sendPrompt();
    console.log('test clique')
  };


  //  fonction pour le textarea 

  const adjustTextAreaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`
  };

  const handleTextChange = (e) => {
    const element = e.target;
    updatePrompt(element.value);
    adjustTextAreaHeight(element);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas prise en charge par ce navigateur.");
      return;
    }

    const newRecognition = new SpeechRecognition();
    newRecognition.lang = 'fr-FR'; // Modifier selon la langue
    newRecognition.interimResults = false;

    newRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      updatePrompt(transcript); // Mettre à jour le prompt
      setIsRecording(false); // Arrêter l'enregistrement
    };

    newRecognition.onerror = (error) => {
      console.error("Erreur de reconnaissance vocale:", error);
      setIsRecording(false);
    };

    newRecognition.start();
    setRecognition(newRecognition);
    setIsRecording(true);
  };

  // Fonction pour arrêter la reconnaissance vocale
  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="app">

        <Header />
        <div className="answer-container">
          {answer && <p>{answer}</p>}
        </div>
        
        <div className="input-container">
          <div className="textarea-vocal-container">
          <textarea
            className="input"
            value={prompt}
            disabled={loading}
            style={{ backgroundImage: loading ? `url(${loadingGif})` : `` }}
            onChange={handleTextChange}
          />
            <Next onClick={handleSubmit}/>
          </div>

          <div className="buttons-container">
            {/* <Back /> */}
            <Modify />
            <button className={isRecording ? "vocal-button-isrecording" : "vocal-button-notrecording"} onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}>
            {isRecording ? 
            <img src={Stop} alt="picto stop" />
            : 
            <img src={Micro} alt="picto micro" />
            }
            </button>
            <button className="button button-open-start" onClick={toggleMenu}>
            {!isMenuOpen ? 
            <img src={history} alt="picto historique" />
            : 
            <img src={closeHistory} alt="picto micro" />
            }
            </button>
          </div>
        </div>

        {/* <button onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}>
        {isRecording ? "Arrêter" : "Parler"}
        </button> */}

        <div className={`conversation-history  ${isMenuOpen ? "button-open" : "button-close"}`}>
          <div className="div-scroll-conrainer">
            {conversationHistory.slice(1).map((exchange, index) => (
              <div key={index}>
            <HistoryConv exchange={exchange} />
            </div>
            ))}
          </div>
        </div>


    </div>
  );
}

export default App;
