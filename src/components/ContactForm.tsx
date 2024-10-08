import React, { useState } from 'react';

export default function KeyboardReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    keyboardModel: '',
    experience: '',
    reason: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Votre candidature a été soumise avec succès !');
        setFormData({
          name: '',
          email: '',
          keyboardModel: '',
          experience: '',
          reason: ''
        });
      } else {
        alert('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 p-6">
      <h2 className="text-2xl font-medium mb-6 text-center">Formulaire de review</h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium text-orange-500">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
        <label htmlFor="keyboardModel" className="block mb-2 font-medium text-orange-500">Modèle de clavier</label>
        <input
          type="text"
          id="keyboardModel"
          name="keyboardModel"
          value={formData.keyboardModel}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="experience" className="block mb-2 font-medium text-orange-500">Expérience avec les claviers</label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Sélectionnez votre niveau d'expérience</option>
          <option value="débutant">Débutant</option>
          <option value="intermédiaire">Intermédiaire</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="reason" className="block mb-2 font-medium text-orange-500">Pourquoi voulez-vous faire cette review ?</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Soumettre la candidature
      </button>
    </form>
  );
}