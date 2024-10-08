export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, keyboardModel, experience, reason } = req.body;

      // Ici, vous pouvez ajouter une logique de validation des données
      if (!name || !email || !keyboardModel || !experience || !reason) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }

      // Ici, vous pouvez ajouter la logique pour sauvegarder les données
      // Par exemple, les enregistrer dans une base de données, envoyer un email, etc.
      console.log('Nouvelle candidature reçue:', { name, email, keyboardModel, experience, reason });

      // Simulons un délai pour montrer le comportement de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));

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