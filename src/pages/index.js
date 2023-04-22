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
      const response = await fetch('api/openai', {
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
    <>
    <div className='header'>Code Translator</div>
    <br/>
    <div style={{ display: 'flex' }}>
      <div className="input-box" style={{ flex: 1 }}>
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
              <option value="java">Java</option>
              <option value="c++">C++</option>
              <option value="c#">C#</option>
            </select>
          <br />
          <div className="input-field">
          <textarea
            name="input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter code to translate"
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
              <option value="java">Java</option>
              <option value="c++">C++</option>
              <option value="c#">C#</option>
          </select>
        </label>
        <textarea
          name="output"
          value={output}
          className='output-field'
        ></textarea>
      </div>
    </div>
  </>
  );
}

