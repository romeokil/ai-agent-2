import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = ({ onStartPlanning }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 dark:via-black/20 dark:to-black/40"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-8 h-8 bg-white/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-300/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-pink-300/40 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-yellow-300 mr-3 animate-spin" />
          <span className="text-lg font-semibold text-white/90 dark:text-white">Smart Planning Made Easy</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Plan Smarter with{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Weather & Travel
          </span>{' '}
          Insights
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 dark:text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
          Enter your location or let us detect it automatically, pick a date, and instantly get detailed weather, 
          air quality, activities, restaurants, and more.
        </p>
        
        <button
          onClick={onStartPlanning}
          className="group inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50"
        >
          Start Planning
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Hero;