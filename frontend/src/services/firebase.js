import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eduvision-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eduvision-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eduvision-resumes.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "12345",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:12345:web:12345"
};

// Handle mock auth mode if api keys are empty
const isMock = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes("your_");

let authInstance = null;

if (!isMock) {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    authInstance = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed, switching to Mock Auth:", error);
  }
}

export const auth = authInstance;

export const registerUser = async (email, password, displayName) => {
  if (isMock || !auth) {
    console.log("[Mock Auth] Success registration for:", email);
    const mockUser = {
      uid: `stud_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      email: email,
      displayName: displayName || email.split("@")[0],
      token: "mock-jwt-auth-token-12345"
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  }
  
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }
  const token = await credential.user.getIdToken();
  const user = {
    uid: credential.user.uid,
    email: credential.user.email,
    displayName: displayName || credential.user.displayName || email.split("@")[0],
    token: token
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const loginUser = async (email, password) => {
  if (isMock || !auth) {
    console.log("[Mock Auth] Success login for:", email);
    const mockUser = {
      uid: "stud_001",
      email: email,
      displayName: "Alex Mercer",
      token: "mock-jwt-auth-token-12345"
    };
    localStorage.setItem("user", JSON.stringify(mockUser));
    return mockUser;
  }
  
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const token = await credential.user.getIdToken();
  const user = {
    uid: credential.user.uid,
    email: credential.user.email,
    displayName: credential.user.displayName || email.split("@")[0],
    token: token
  };
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const logoutUser = async () => {
  localStorage.removeItem("user");
  if (!isMock && auth) {
    await signOut(auth);
  }
};
