import React from 'react';

export default class TestEvaluator {
  constructor(test, answers) {
    this.test = test;
    this.answers = answers;
    this.result = {
      score: 0,
      totalScore: test.totalScore,
      scoreByType: {},
      answers: [],
      passed: false
    };
  }

  evaluate() {
    let totalScore = 0;
    const scoresByType = {};

    this.test.questions.forEach((question, index) => {
      const answer = this.answers[index];
      const evaluation = this.evaluateQuestion(question, answer);
      
      totalScore += evaluation.score;
      
      // Accumulate scores by question type
      if (!scoresByType[question.type]) {
        scoresByType[question.type] = {
          score: 0,
          total: 0,
          count: 0
        };
      }
      scoresByType[question.type].score += evaluation.score;
      scoresByType[question.type].total += question.points;
      scoresByType[question.type].count += 1;

      this.result.answers.push(evaluation);
    });

    // Calculate percentage scores by type
    Object.keys(scoresByType).forEach(type => {
      const typeStats = scoresByType[type];
      this.result.scoreByType[type] = Math.round((typeStats.score / typeStats.total) * 100);
    });

    this.result.score = totalScore;
    this.result.passed = (totalScore / this.test.totalScore * 100) >= this.test.passingScore;

    return this.result;
  }

  evaluateQuestion(question, answer) {
    switch (question.type) {
      case 'multiple':
        return this.evaluateMultipleChoice(question, answer);
      case 'single':
        return this.evaluateSingleChoice(question, answer);
      case 'text':
        return this.evaluateTextAnswer(question, answer);
      case 'code':
        return this.evaluateCodeAnswer(question, answer);
      default:
        throw new Error(`Unknown question type: ${question.type}`);
    }
  }

  evaluateMultipleChoice(question, answer) {
    const result = {
      correct: false,
      score: 0,
      userAnswer: Array.isArray(answer) ? answer.map(i => question.options[i]).join(', ') : 'Non répondu',
      correctAnswer: question.correctAnswer.map(i => question.options[i]).join(', ')
    };

    if (!answer) return result;

    // Convert arrays to sets for comparison
    const correctSet = new Set(question.correctAnswer);
    const answerSet = new Set(answer);

    // Check if the sets are equal
    const isEqual = correctSet.size === answerSet.size && 
      [...correctSet].every(value => answerSet.has(value));

    if (isEqual) {
      result.correct = true;
      result.score = question.points;
    } else {
      // Partial credit for partially correct answers
      const correctCount = answer.filter(a => correctSet.has(a)).length;
      const incorrectCount = answer.length - correctCount;
      const partialScore = Math.max(0, 
        (correctCount / correctSet.size) - (incorrectCount / correctSet.size)
      ) * question.points;
      
      result.score = Math.round(partialScore);
      result.partialCredit = result.score > 0;
    }

    return result;
  }

  evaluateSingleChoice(question, answer) {
    const result = {
      correct: false,
      score: 0,
      userAnswer: answer !== undefined ? question.options[answer] : 'Non répondu',
      correctAnswer: question.options[question.correctAnswer]
    };

    if (answer === question.correctAnswer) {
      result.correct = true;
      result.score = question.points;
    }

    return result;
  }

  evaluateTextAnswer(question, answer) {
    const result = {
      correct: false,
      score: 0,
      userAnswer: answer || 'Non répondu',
      correctAnswer: question.correctAnswer
    };

    if (!answer) return result;

    // Normalize answers for comparison
    const normalizedAnswer = answer.toLowerCase().trim();
    const normalizedCorrect = question.correctAnswer.toLowerCase().trim();

    if (normalizedAnswer === normalizedCorrect) {
      result.correct = true;
      result.score = question.points;
    } else {
      // Check for partial matches using keywords
      const keywords = question.keywords || [];
      if (keywords.length > 0) {
        const matchedKeywords = keywords.filter(keyword => 
          normalizedAnswer.includes(keyword.toLowerCase())
        );
        
        if (matchedKeywords.length > 0) {
          result.score = Math.round((matchedKeywords.length / keywords.length) * question.points);
          result.partialCredit = true;
        }
      }
    }

    return result;
  }

  evaluateCodeAnswer(question, answer) {
    const result = {
      correct: false,
      score: 0,
      userAnswer: answer || 'Non répondu',
      correctAnswer: question.correctAnswer
    };

    if (!answer) return result;

    // Basic code evaluation (can be extended with actual code execution)
    const normalizedAnswer = answer.replace(/\s+/g, ' ').trim();
    const normalizedCorrect = question.correctAnswer.replace(/\s+/g, ' ').trim();

    if (normalizedAnswer === normalizedCorrect) {
      result.correct = true;
      result.score = question.points;
    } else {
      // Check for partial correctness using key elements
      const keyElements = question.keyElements || [];
      if (keyElements.length > 0) {
        const matchedElements = keyElements.filter(element => 
          normalizedAnswer.includes(element)
        );
        
        if (matchedElements.length > 0) {
          result.score = Math.round((matchedElements.length / keyElements.length) * question.points);
          result.partialCredit = true;
        }
      }
    }

    return result;
  }
}
