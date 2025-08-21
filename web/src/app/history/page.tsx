"use client";

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function History() {
  console.log("History component function body — render start");
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('History useEffect mount - fetching attempts');
    let mounted = true;
    apiFetch('/api/attempts?limit=25')
      .then((res) => {
        console.log('History fetch response', res);
        if (!mounted) return;
        setAttempts(res.data || []);
      })
      .catch((err) => {
        console.log('History fetch error', err);
        if (!mounted) return;
        setAttempts([]);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  console.log('History render attempts count', attempts.length, 'loading:', loading);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recent Attempts</h1>
              <p className="text-gray-600">Track your progress and performance over time</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Client Active
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading your attempts...</p>
            </div>
          </div>
        ) : attempts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No attempts yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">Start taking some drills to see your performance history here.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">{attempts.length}</div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)}%
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.max(...attempts.map(a => a.score))}%
                </div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
            </div>

            {/* Attempts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {attempts.map((a: any, index: number) => (
                  <div 
                    key={a._id} 
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              Drill {String(a.drillId)}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <time className="text-sm text-gray-500" dateTime={a.createdAt}>
                                {new Date(a.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </time>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                Attempt #{attempts.length - index}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(a.score)}`}>
                          {a.score >= 90 ? '🏆' : a.score >= 75 ? '🎯' : a.score >= 60 ? '📈' : '💪'} {a.score}%
                        </div>
                        <div className={`w-2 h-8 rounded-full ${getScoreBadgeColor(a.score)}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {attempts.length === 25 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">Showing your 25 most recent attempts</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}