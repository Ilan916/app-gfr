import './App.css';
import React, { useState, useEffect } from 'react';
import Date from './components/Date'
import Text from './components/Text'
import Radio from './components/Radio'

function App() {

  const [response, setResponse] = useState('');
  const [inputType, setInputType] = useState('text');
  const [prompt, updatePrompt] = useState(undefined);



  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setResponse(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    try {


      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };

      const res = await fetch("http://localhost:5001/ask", requestOptions);

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const { message } = await res.json();
      setResponse(message);
    } catch (err) {
      console.error(err, "err");
    } 
  };

  const renderInput = () => {
    switch (inputType) {
      case 'text':
        return <Text value={response} onChange={(e) => updatePrompt(e.target.value)} onKeyDown={(e) => sendPrompt(e)}/>;
      case 'date':
        return <Date value={response} onChange={(e) => updatePrompt(e.target.value)} onKeyDown={(e) => sendPrompt(e)}/>;
      case 'radio':
        return <Radio value={response} onChange={(e) => updatePrompt(e.target.value)} onKeyDown={(e) => sendPrompt(e)} />;
      default:
        return null;
    }
  };

  return (
    <div>
    <h1>Assistant de Déclaration de Sinistre</h1>
    <button onClick={() => setInputType("text")}>Text</button>
    <button onClick={() => setInputType("radio")}>Radio</button>
    <button onClick={() => setInputType("date")}>Date</button>
    <form>
      {renderInput()}
      <button type="submit">Soumettre</button>
    </form>


    <div className="spotlight__answer">{response && <p>{response}</p>}</div>
  </div>
  );
}

export default App;
