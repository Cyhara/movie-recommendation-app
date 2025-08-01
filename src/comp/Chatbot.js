import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [apiKey] = useState(process.env.REACT_APP_API_KEY);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setChatLog([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { sender: "user", message: userInput },
    ]);

    const response = await generateResponse(userInput);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      response,
    ]);

    setUserInput("");
  };

  const generateResponse = async (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes("popular tv shows")) {
      const tvShows = await getPopularTVShows();
      return {
        sender: "bot",
        message: "Here are some popular TV shows:",
        tvShows,
      };
    } else if (lowerCaseInput.includes("popular movies")) {
      const movies = await getPopularMovies();
      return {
        sender: "bot",
        message: "Here are some popular movies:",
        movies,
      };
    } else if (lowerCaseInput.includes("what companies produced")) {
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
    } else if (lowerCaseInput.includes("companies")) {
      const companies = await getCompanies(lowerCaseInput.replace("companies", "").trim());
      return {
        sender: "bot",
        message: `Here are some companies:`,
        companies,
      };
    } else if (lowerCaseInput.includes("translations")) {
      const query = lowerCaseInput.replace("translations", "").trim();
    const translations = await getTranslations(query);
    return {
      sender: "bot",
      message: `Here are some translations for "${query}":`,
        translations,
      };
    } else if (lowerCaseInput.includes("languages")) {
      const query = lowerCaseInput.replace("languages", "").trim();
      const languages = await getLanguages(query);
      return {
        sender: "bot",
        message: `Here are some languages for "${query}":`,
        languages,
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

  const getPopularTVShows = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
      const tvShows = response.data.results.map((tvShow) => ({
        title: tvShow.name,
        posterPath: tvShow.poster_path,
        posterUrl: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
      }));
      return tvShows;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
      const movies = response.data.results.map((movie) => ({
      title: movie.title,
      posterPath: movie.poster_path,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
    return movies;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getMultiSearchResults = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getCollections = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/collection?api_key=${apiKey}&query=${query}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getCompanies = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/company?api_key=${apiKey}&query=${query}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getTranslations = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&language=en-US`);
    const translations = response.data.results.map((result) => ({
      title: result.title || result.name,
      overview: result.overview,
      language: result.original_language,
    }));
    return translations;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getLanguages = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`);
      const languages = response.data.filter((language) => language.english_name.toLowerCase().includes(query.toLowerCase()));
      return languages.map((language) => ({
        name: language.english_name,
        code: language.iso_639_1,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <div>
      <button className="chatbot-toggle-button" onClick={handleToggle}>
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2>Welcome to the Movie Chatbot!</h2>
            <p>Type a movie title or keyword to get started.</p>
          </div>
          <ul className="chatbot-log">
            {chatLog.map((curElm, index) => (
              <li key={index}>
                <strong>{curElm.sender}:</strong> {curElm.message}
                {curElm.tvShows && (
                  <ul>
                    {curElm.tvShows.map((tvShow, index) => (
                      <li key={index}>
                        <h3>{tvShow.title}</h3>
                        <img src={tvShow.posterUrl} alt={tvShow.title} />
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.movies && (
                  <ul>
                    {curElm.movies.map((movie, index) => (
                      <li key={index}>
                        <h3>{movie.title}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.collections && (
                  <ul>
                    {curElm.collections.map((collection, index) => (
                      <li key={index}>
                        <h3>{collection.name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.companies && (
                  <ul>
                    {curElm.companies.map((company, index) => (
                      <li key={index}>
                        <h3>{company.name}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.translations && (
                  <ul>
                    {curElm.translations.map((translation, index) => (
                      <li key={index}>
                        <h3>{translation}</h3>
                      </li>
                    ))}
                  </ul>
                )}
                {curElm.languages && (
                  <ul>
                    {curElm.languages.map((language, index) => (
                      <li key={index}>
                        <h3>{language.english_name}</h3>
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
                          <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title || result.name} />
                        )}
                        <p>{result.overview}</p>
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