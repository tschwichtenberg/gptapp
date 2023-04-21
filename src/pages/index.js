import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputLanguage, setInputLanguage] = useState('javascript');
  const [outputLanguage, setOutputLanguage] = useState('javascript');

  const prompt = `Convert this ${inputLanguage} code to ${outputLanguage}: ${input}`

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "prompt": prompt }),
      });
      const data = await response.json();
      console.log(data)
      setOutput(data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <form onSubmit={handleSubmit}>
          <label>
            Input Language:
          </label>
            <select
              name="inputLanguage"
              value={inputLanguage}
              onChange={(event) => setInputLanguage(event.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c++">C++</option>
            </select>
          <br />
          <div className="input-field">
          <textarea
            name="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter text to translate"
          />
          <div className="submit-button">
            <button type="submit" onClick={handleSubmit}>
              Translate
            </button>
          </div>
        </div>

        </form>
      </div>
      <div style={{ flex: 1 }}>
        <label>
          Output Language:
          <select
            name="outputLanguage"
            value={outputLanguage}
            onChange={(event) => setOutputLanguage(event.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c++">C++</option>
          </select>
        </label>
        <br />
        <div style={{ whiteSpace: 'pre-wrap'}}>{output}</div> 
      </div>
    </div>
  );
}

