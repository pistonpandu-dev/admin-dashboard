import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
}

const app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0]

const adminAuth = getAuth(app)
const adminDb = getFirestore(app)
const adminStorage = getStorage(app)

export { adminAuth, adminDb, adminStorage }
