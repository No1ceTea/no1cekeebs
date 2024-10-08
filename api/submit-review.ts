import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, keyboardModel, experience, reason } = req.body;

      // Validation des données
      if (!name || !email || !keyboardModel || !experience || !reason) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      // Insérer les données dans Vercel Postgres
      await sql`
        INSERT INTO keyboard_reviews (name, email, keyboard_model, experience, reason)
        VALUES (${name}, ${email}, ${keyboardModel}, ${experience}, ${reason})
      `;

      // Envoyez une réponse de succès
      res.status(200).json({ message: 'Votre candidature a été soumise avec succès !' });
    } catch (error) {
      console.error('Erreur lors du traitement de la candidature:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors du traitement de votre candidature.' });
    }
  } else {
    // Méthode non autorisée si ce n'est pas une requête POST
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
}
