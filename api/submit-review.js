export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Récupérez les données du corps de la requête
    const { name, email, keyboardModel, experience, reason } = req.body;

    // Ici, vous pouvez traiter les données comme vous le souhaitez
    // Par exemple, les enregistrer dans une base de données, envoyer un email, etc.

    // Pour cet exemple, nous allons simplement les logger
    console.log('Nouvelle candidature reçue:', { name, email, keyboardModel, experience, reason });

    // Envoyez une réponse de succès
    res.status(200).json({ message: 'Candidature reçue avec succès' });
  } else {
    // Méthode non autorisée si ce n'est pas une requête POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}