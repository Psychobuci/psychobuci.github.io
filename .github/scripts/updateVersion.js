const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const appUrl = JSON.parse(process.env.FIREBASE_APP_URL);

admin.initializeApp({
  credential:
    admin.credential.cert(serviceAccount),

  databaseURL:
    appUrl
});

const db = admin.database();

async function run()
{
  const ref = db.ref("websiteVersion");

  const snapshot = await ref.get();

  const current =
    snapshot.exists()
      ? snapshot.val()
      : 0;

  await ref.set(current + 1);

  process.exit(0);
}

run();