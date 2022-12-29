import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userVeggieInput, setUserVeggieInput] = useState('');
  const [userAdditionalInput, setUserAdditionalInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    const userCombinedInput = `${userVeggieInput}, ${userAdditionalInput}`;
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userCombinedInput }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);

    var element = document.getElementById("output-id");
    element.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"nearest"
    });
  }

  const onUserChangedVeggieText = (event) => {
    setUserVeggieInput(event.target.value);
  };

  const onUserChangedAdditionalText = (event) => {
    setUserAdditionalInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Plant-Based Recipe Generator | olafsonfarms</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Plant-Based Recipe Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Use AI to generate plant-based recipes based on the ingredients you grow in your backyard garden.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <h3>Enter a comma-separated list of the ingredients that you can harvest today:</h3> 
          <textarea 
            className="prompt-box" 
            placeholder="Write your list here..."
            value={userVeggieInput}
            onChange={onUserChangedVeggieText}
          />
          <span/>
          <span/>
          <h3>And add any additional ingredients that you'd like to use from home:</h3>
          <textarea 
            className="prompt-box" 
            placeholder=""
            value={userAdditionalInput}
            onChange={onUserChangedAdditionalText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output" id="output-id">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Your Custom Recipe</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="email-footer">
        <a 
          href="https://bio.link/barrettolafson"
          target="_blank"
        >
          bio.link/barrettolafson
        </a>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
