import React, { useState, useEffect } from 'react';
import { XMarkIcon, ClockIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function TestTaking({ test, onSubmit, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(test.duration * 60); // en secondes
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(answers);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
    setIsSubmitting(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = () => {
    const question = test.questions[currentQuestion];

    switch (question.type) {
      case 'multiple':
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={(answers[currentQuestion] || []).includes(index)}
                  onChange={(e) => {
                    const currentAnswers = answers[currentQuestion] || [];
                    if (e.target.checked) {
                      handleAnswer([...currentAnswers, index]);
                    } else {
                      handleAnswer(currentAnswers.filter(i => i !== index));
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-uims-red focus:ring-uims-red"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'single':
        return (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  checked={answers[currentQuestion] === index}
                  onChange={() => handleAnswer(index)}
                  className="h-4 w-4 border-gray-300 text-uims-red focus:ring-uims-red"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            placeholder="Votre réponse..."
          />
        );

      case 'code':
        return (
          <div className="space-y-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <pre className="text-sm">{question.codeTemplate}</pre>
            </div>
            <textarea
              value={answers[currentQuestion] || question.codeTemplate || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm font-mono"
              placeholder="Votre code..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{test.title}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <ClockIcon className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">
                Question {currentQuestion + 1} sur {test.questions.length}
              </h4>
              <span className="text-sm text-gray-500">
                {test.questions[currentQuestion].points} points
              </span>
            </div>

            <p className="text-gray-700 mb-4">
              {test.questions[currentQuestion].text}
            </p>

            {renderQuestion()}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                currentQuestion === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Précédent
            </button>

            {currentQuestion === test.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Terminer le test'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Suivant
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
