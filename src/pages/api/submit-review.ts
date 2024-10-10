import type { APIRoute } from 'astro';
import { sql } from '@vercel/postgres';

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, { method: 'POST' });
  const data = await response.json();
  return data.success;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { pseudo, email, keyboardToReview, recaptchaToken } = body;

    // Validation des données
    if (!pseudo || !email || !keyboardToReview || !recaptchaToken) {
      return new Response(JSON.stringify({ message: 'Tous les champs sont requis.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Vérification du reCAPTCHA
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return new Response(JSON.stringify({ message: 'La vérification reCAPTCHA a échoué. Veuillez réessayer.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insérer les données dans Vercel Postgres
    await sql`
      INSERT INTO keyboard_reviews (pseudo, email, keyboard_to_review)
      VALUES (${pseudo}, ${email}, ${keyboardToReview})
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