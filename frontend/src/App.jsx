import React, { useState } from 'react';
// import { useTheme } from './hooks/useTheme';
import { fetchWeatherData } from './utils/mockApi';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import LoadingState from './components/LoadingState';
import ResultsPage from './components/ResultsPage';

const AppState = 'hero' | 'search' | 'loading' | 'results';

function App() {
  const [currentState, setCurrentState] = useState('hero');
  const [weatherData, setWeatherData] = useState(null);
  const [searchData, setSearchData] = useState({ location: '', date: '', useCurrentLocation: false });

  const handleStartPlanning = () => {
    setCurrentState('search');
  };

  const handleFormSubmit = async (data) => {
    console.log('Form submitted with data in handleFormSubmit in App.jsx:', data);
    setSearchData(data);
    setCurrentState('loading');
    
    try {
      const result = await fetchWeatherData(data);
      setWeatherData(result);
      setCurrentState('results');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // In a real app, you'd show an error state here
      setCurrentState('search');
    }
  };

  const handleBackToSearch = () => {
    setCurrentState('search');
    setWeatherData(null);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'hero':
        return <Hero onStartPlanning={handleStartPlanning} />;
      
      case 'search':
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SearchForm 
              onSubmit={handleFormSubmit} 
              isLoading={false}
            />
          </div>
        );
      
      case 'loading':
        return <LoadingState />;
      
      case 'results':
        return weatherData ? (
          <ResultsPage 
            weatherData={weatherData}
            location={searchData.location}
            date={searchData.date}
            onBack={handleBackToSearch}
          />
        ) : null;
      
      default:
        return <Hero onStartPlanning={handleStartPlanning} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      {renderCurrentState()}
    </div>
  );
}

export default App;