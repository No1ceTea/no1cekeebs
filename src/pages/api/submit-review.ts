import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { pseudo, email, profileDescription, keyboardToReview } = body;

    // Validation des données
    if (!pseudo || !email || !profileDescription || !keyboardToReview) {
      return new Response(JSON.stringify({ message: 'Tous les champs sont requis.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insérer les données dans Vercel Postgres
    await sql`
      INSERT INTO keyboard_reviews (pseudo, email, profile_description, keyboard_to_review)
      VALUES (${pseudo}, ${email}, ${profileDescription}, ${keyboardToReview})
    `;

    return new Response(JSON.stringify({ message: 'Votre candidature a été soumise avec succès !' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erreur lors du traitement de la candidature:', error);
    return new Response(JSON.stringify({ message: 'Une erreur est survenue lors du traitement de votre candidature.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};