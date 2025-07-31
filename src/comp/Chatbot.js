import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [apiKey] = useState(process.env.REACT_APP_API_KEY);
  const [isOpen, setIsOpen] = useState(false);
  const [setCollections] = useState([]);
  const [setCompanies] = useState([]);
  const [setRegions] = useState([]);
  const [setTranslations] = useState([]);
  const [setLanguages] = useState([]);
  const [setJobs] = useState([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setChatLog([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    // Add user's message to chat log
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { sender: "user", message: userInput },
    ]);

    // Get response from TMDB API
    const response = await generateResponse(userInput);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      response,
    ]);

    setUserInput("");
  };

  const generateResponse = async (userInput) => {
  const lowerCaseInput = userInput.toLowerCase();

  if (lowerCaseInput.includes("what companies produced")) {
    const movieName = lowerCaseInput.replace("what companies produced", "").trim();
    const companies = await getCompanies(movieName);
    return {
      sender: "bot",
      message: `Here are some companies that produced "${movieName}":`,
      companies,
    };
  } else if (lowerCaseInput.includes("show me collections of")) {
    const genre = lowerCaseInput.replace("show me collections of", "").trim();
    const collections = await getCollections(genre);
    return {
      sender: "bot",
      message: `Here are some collections of "${genre}":`,
      collections,
    };
  } else if (lowerCaseInput.includes("what regions is") && lowerCaseInput.includes("available in")) {
    const title = lowerCaseInput.replace("what regions is", "").replace("available in", "").trim();
    const regions = await getRegions();
    return {
      sender: "bot",
      message: `Here are some regions where "${title}" is available:`,
      regions,
    };
    }  else if (lowerCaseInput.includes("translations for")) {
    const seriesName = lowerCaseInput.replace("translations for", "").trim();
    const series = await getSeriesId(seriesName);
    if (series && series.id) {
      const translationsResponse = await getTranslations(series.id);
      return translationsResponse;
    } else {
      return {
        sender: "bot",
        message: "Series not found. Please try again.",
      };
    }
} else if (lowerCaseInput.includes("what languages is") && lowerCaseInput.includes("available in")) {
    const title = lowerCaseInput.replace("what languages is", "").replace("available in", "").trim();
    const languages = await getLanguages();
    return {
      sender: "bot",
      message: `Here are some languages where "${title}" is available:`,
      languages,
    };
  } else if (lowerCaseInput.includes("companies")) {
    const companies = await getCompanies(lowerCaseInput.replace("companies", "").trim());
    return {
      sender: "bot",
      message: `Here are some companies:`,
      companies,
    };
  } else if (lowerCaseInput.includes("collections")) {
    const collections = await getCollections(lowerCaseInput.replace("collections", "").trim());
    return {
      sender: "bot",
      message: `Here are some collections:`,
      collections,
    };
  } else if (lowerCaseInput.includes("regions")) {
    const regions = await getRegions();
    return {
      sender: "bot",
      message: `Here are some regions:`,
      regions,
    };
  } else if (lowerCaseInput.includes("translations")) {
    const translations = await getTranslations();
    return {
      sender: "bot",
      message: `Here are some translations:`,
      translations,
    };
  } else if (lowerCaseInput.includes("languages")) {
    const languages = await getLanguages();
    return {
      sender: "bot",
      message: `Here are some languages:`,
      languages,
    };
    } else if (userInput.toLowerCase().includes('jobs')) {
      const jobs = await getJobs();
      return {
        sender: "bot",
        message: `Here are some jobs:`,
        jobs,
      };
    } else {
      const results = await getMultiSearchResults(userInput);
      return {
        sender: "bot",
        message: `Here are some search results for "${userInput}":`,
        results,
      };
    } 
  };

  const getMultiSearchResults = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
      const results = response.data.results;
      return results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getCollections = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/collection?api_key=${apiKey}&query=${query}`);
      const collections = response.data.results;
      setCollections(collections);
      return collections;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const getSeriesId = async (seriesName) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${seriesName}`);
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
  const getCompanies = async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query=${query}`);
    if (response.data.results.length === 0) {
      return {
        sender: "bot",
        message: `No companies found for "${query}".`,
        companies: [],
      };
    } else {
      const companies = response.data.results;
      setCompanies(companies);
      return {
        sender: "bot",
        message: `Here are some companies for "${query}":`,
        companies,
      };
    }
  } catch (error) {
    console.error(error);
    return { 
      sender: "bot",
      message: "Error fetching companies. Please try again",
      companies: [], };
  }
};
  const getRegions = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${apiKey}&language=en`);
      const regions = response.data.results;
      setRegions(regions);
      return regions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getTranslations = async (seriesId) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}/translations?api_key=${apiKey}`);
    const translations = response.data.translations;
    setTranslations(translations);
    return {
      sender: "bot",
      message: `Here are some translations for the series:`,
      translations,
    };
  } catch (error) {
    console.error(error);
    return {
      sender: "bot",
      message: "Error fetching translations. Please try again.",
      translations: [],
    };
  }
};

  const getLanguages = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);
      const languages = response.data;
      setLanguages(languages);
      return languages;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getJobs = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/configuration/jobs?api_key=${apiKey}`);
      const jobs = response.data;
      setJobs(jobs);
      return jobs;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <div>
      <button className="chatbot-toggle-button" onClick={handleToggle} >
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header" >
            <h2>Welcome to the Movie Chatbot!</h2>
            <p>Type a movie title or keyword to get started.</p>
          </div>
          <ul className="chatbot-log" style={{ listStyle: "none", padding: "0", margin: "0", overflowY: "scroll", height: "250px" }}>
            {chatLog.map((curElm, index) => (
              <li key={index}>
                <strong>{curElm.sender}:</strong> {curElm.message}
                {curElm.collections && (
                  <ul>
                    {curElm.collections.map((collection, index) => (
                      <li key={index}>
                        <h3 style={{ margin: "0" }}>{collection.name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.companies && Array.isArray(curElm.companies) && (
                  <ul>
                    {curElm.companies.map((company, index) => (
                      <li key={index}>
                        <h3>{company.name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.regions && (
                  <ul>
                    {curElm.regions.map((region, index) => (
                      <li key={index}>
                        <h3>{region.english_name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.translations && (
                  <ul>
                    {curElm.translations.map((translation, index) => (
                      <li key={index}>
                        <h3 style={{ margin: "0" }}>{translation}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.languages && (
                  <ul>
                    {curElm.languages.map((language, index) => (
                      <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        <h3>{language.english_name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.jobs && (
                  <ul>
                    {curElm.jobs.map((job, index) => (
                      <li key={index}>
                        <h3 style={{ margin: "0" }}>{job.department}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.results && (
                  <ul>
                    {curElm.results.map((result, index) => (
                      <li key={index}>
                        <h3>{result.title || result.name}</h3>
                        {result.poster_path && (
                          <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title || result.name}/>
                        )}
                        <p style={{ fontSize: "14px" }}>{result.overview}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder="Type a movie title..."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;