import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TestScoring({ testResult, test }) {
  const totalScore = testResult.score;
  const maxScore = test.totalScore;
  const percentageScore = Math.round((totalScore / maxScore) * 100);
  const passed = percentageScore >= test.passingScore;

  const chartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [percentageScore, 100 - percentageScore],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            {passed ? (
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            ) : (
              <XCircleIcon className="h-12 w-12 text-red-500" />
            )}
          </div>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            {passed ? 'Test Réussi' : 'Test Non Réussi'}
          </h3>
          <p className="text-sm text-gray-500">
            Score minimum requis: {test.passingScore}%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Graphique de score */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto">
              <Doughnut data={chartData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-900">{percentageScore}%</span>
                  <span className="block text-sm text-gray-500">Score Total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Détails du Score</h4>
              <dl className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Points Obtenus</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{totalScore}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Points Maximum</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{maxScore}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500">Performance par Type</h4>
              <div className="mt-2 space-y-2">
                {Object.entries(testResult.scoreByType).map(([type, score]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{type}</span>
                    <span className="text-sm font-medium text-gray-900">{score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Détail des réponses */}
        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Détail des Réponses</h4>
          <div className="space-y-4">
            {testResult.answers.map((answer, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900">
                      Question {index + 1}
                    </h5>
                    <p className="mt-1 text-sm text-gray-500">
                      {test.questions[index].text}
                    </p>
                    <div className="mt-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-500">Votre réponse:</span>
                        <p className="mt-1 text-gray-900">{answer.userAnswer}</p>
                      </div>
                      {!answer.correct && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-gray-500">Réponse correcte:</span>
                          <p className="mt-1 text-gray-900">{answer.correctAnswer}</p>
                        </div>
                      )}
                      {test.questions[index].explanation && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-gray-500">Explication:</span>
                          <p className="mt-1 text-gray-900">{test.questions[index].explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {answer.correct ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Points: {answer.score} / {test.questions[index].points}
                  </span>
                  {answer.partialCredit && (
                    <span className="text-yellow-600">Crédit partiel</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
