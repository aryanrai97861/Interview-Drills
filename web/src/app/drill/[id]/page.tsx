"use client";

import { apiFetch } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// @ts-ignore
export default function DrillPage({ params }: any) {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [drill, setDrill] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDrill = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(`/api/drills/${params.id}`);
        setDrill(response.data);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (err) {
        setError('Failed to load drill. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrill();
  }, [params.id]);

  const handleChange = (i: number, v: string) => {
    const copy = [...answers];
    copy[i] = v;
    setAnswers(copy);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const res = await apiFetch('/api/attempts', { 
        method: 'POST', 
        body: JSON.stringify({ drillId: drill._id, answers }) 
      });
      setScore(res.data.score);
    } catch (err) {
      setError('Failed to submit answers. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    const answeredQuestions = answers.filter(answer => answer.trim().length > 0).length;
    return Math.round((answeredQuestions / drill.questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 75) return '🎯';
    if (score >= 60) return '📈';
    return '💪';
  };

  const isSubmitDisabled = answers.every(answer => !answer.trim()) || submitting;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading drill...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !drill) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">{error}</p>
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{drill.title}</h1>
                  <p className="text-gray-500">{drill.questions.length} question{drill.questions.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <button 
                onClick={() => router.back()}
                className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {score === null && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-500">{getProgressPercentage()}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Score Display */}
        {score !== null && (
          <div className={`rounded-xl border-2 p-6 mb-6 ${getScoreColor(score)}`}>
            <div className="flex items-center justify-center text-center">
              <div>
                <div className="text-4xl mb-2">{getScoreEmoji(score)}</div>
                <h2 className="text-2xl font-bold mb-1">Your Score: {score}%</h2>
                <p className="text-sm opacity-75">
                  {score >= 90 ? 'Excellent work!' : 
                   score >= 75 ? 'Great job!' : 
                   score >= 60 ? 'Good effort!' : 'Keep practicing!'}
                </p>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions Section */}
        {score === null && (
          <div className="space-y-6">
            {drill.questions.map((q: any, i: number) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-semibold text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{q.text}</h3>
                    <div className="relative">
                      <textarea 
                        className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                        rows={4}
                        value={answers[i] || ''} 
                        onChange={e => handleChange(i, e.target.value)}
                        placeholder="Type your answer here..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {(answers[i] || '').length} characters
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-red-800 text-sm">{error}</span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {answers.filter(answer => answer.trim().length > 0).length} of {drill.questions.length} questions answered
                </div>
                <button 
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isSubmitDisabled 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Answers
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}