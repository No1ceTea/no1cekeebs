import React, { useState } from 'react';

export default function KeyboardReviewForm() {
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    profileDescription: '',
    keyboardToReview: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This line is crucial
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage(data.message || 'Votre candidature a été soumise avec succès !');
        setFormData({
          pseudo: '',
          email: '',
          profileDescription: '',
          keyboardToReview: ''
        });
      } else {
        setSubmitMessage(data.message || 'Une erreur est survenue lors de la soumission. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 p-6">
      <h2 className="text-2xl font-medium mb-6 text-center">Formulaire de review</h2>
      
      <div className="mb-4">
        <label htmlFor="pseudo" className="block mb-2 font-medium text-orange-500">Pseudo</label>
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-orange-500">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="profileDescription" className="block mb-2 font-medium text-orange-500">Description rapide de ton profile</label>
        <textarea
          id="profileDescription"
          name="profileDescription"
          value={formData.profileDescription}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="keyboardToReview" className="block mb-2 font-medium text-orange-500">Clavier que tu aimerais review</label>
        <input
          type="text"
          id="keyboardToReview"
          name="keyboardToReview"
          value={formData.keyboardToReview}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Soumettre la candidature'}
      </button>

      {submitMessage && (
        <p className={`mt-4 text-center ${submitMessage.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}