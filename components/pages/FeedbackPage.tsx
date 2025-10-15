import React, { useState } from 'react';

const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full h-40 border border-gray-700 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-brand-primary focus:outline-none 
                     text-gray-900 dark:text-white bg-white dark:bg-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-secondary transition-all"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
