const admin = require('firebase-admin');

const initializeFirebase = () => {
  // Parse the private key correctly, handling both JSON-escaped and raw PEM formats
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.startsWith('{')
    ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
    : process.env.FIREBASE_PRIVATE_KEY;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
};

const generateAuthToken = async (uid) => {
  try {
    // Generar custom token
    const customToken = await admin.auth().createCustomToken(uid);
    
    // Obtener el ID token
    const userRecord = await admin.auth().getUser(uid);
    if (!userRecord) {
      throw new Error('Usuario no encontrado en Firebase');
    }

    // Establecer claims personalizados si es necesario
    await admin.auth().setCustomUserClaims(uid, {
      role: 'internal_service'
    });

    return customToken;
  } catch (error) {
    throw new Error(`Error generando token: ${error.message}`);
  }
};

module.exports = { initializeFirebase, admin, generateAuthToken };