import * as firebase from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { omit } from "lodash";

const firebaseConfig = {
  apiKey: "AIzaSyB5Xf2NkihwnhFJr0rLfmE-GGCjELM53Do",
  authDomain: "audiobook-78e9a.firebaseapp.com",
  projectId: "audiobook-78e9a",
  storageBucket: "audiobook-78e9a.appspot.com",
  messagingSenderId: "865004479225",
  appId: "1:865004479225:web:efe4544000020124dfb828",
  measurementId: "G-61748RRWNH",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const logoutGoogle = () => {
  return signOut(auth)
    .then((result) => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .catch((e) => console.log(e));
};

const ProductCollection = collection(db, "products");
const CategoriesCollection = collection(db, "categories");
const AuthorCollection = collection(db, "author");

const OrderCollection = collection(db, "orders");
// const OptionCollection = db.collection('options');
// const GiftCollection = db.collection('gifts');
// const BannerCollection = db.collection('banners');
// const SettingCollection = db.collection('settings');

export const getProductsAPI = async () => {
  try {
    const docRef = ProductCollection;
    const docSnap = await getDocs(docRef);
    const list = [];
    const categoryRefPromises = docSnap.docs.map(async (doc) => {
      return getDoc(doc.data().categoryRef);
    });
    const authorRefPromises = docSnap.docs.map(async (doc) => {
      return getDoc(doc.data().authorRef);
    });

    const categoryRefs = await Promise.all(categoryRefPromises);
    const authorRefs = await Promise.all(authorRefPromises);

    docSnap.docs.forEach((doc, i) => {
      list.push({
        ...doc.data(),
        categoryRef: categoryRefs[i].data(),
        authorRef: authorRefs[i].data(),
        id: doc.id,
      });
    });

    return list;
  } catch (err) {
    console.log(err);
  }
};
export const getCategoriesAPI = async () => {
  try {
    const docRef = CategoriesCollection;
    const docSnap = await getDocs(docRef);
    const list = [];
    docSnap.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    if (docSnap) {
      return list;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAuthorAPI = async () => {
  try {
    const docRef = AuthorCollection;
    const docSnap = await getDocs(docRef);
    const list = [];
    docSnap.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    if (docSnap) {
      return list;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProductsLatest = async () => {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("createAt", "desc"),
      limit(8)
    );
    const list = [];
    const querySnapshot = await getDocs(q);

    const categoryRefPromises = querySnapshot.docs.map(async (doc) => {
      return getDoc(doc.data().categoryRef);
    });

    const categoryRefs = await Promise.all(categoryRefPromises);

    querySnapshot.docs.forEach((doc, i) => {
      list.push({
        ...doc.data(),
        categoryRef: categoryRefs[i].data(),
        id: doc.id,
      });
    });

    return list;
  } catch (err) {
    console.log(err);
  }
};

export const getProductsHot = async () => {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("view", "desc"),
      limit(8)
    );
    const list = [];
    const querySnapshot = await getDocs(q);

    const categoryRefPromises = querySnapshot.docs.map(async (doc) => {
      return getDoc(doc.data().categoryRef);
    });

    const categoryRefs = await Promise.all(categoryRefPromises);

    querySnapshot.docs.forEach((doc, i) => {
      list.push({
        ...doc.data(),
        categoryRef: categoryRefs[i].data(),
        id: doc.id,
      });
    });

    return list;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductView = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const docRef = await updateDoc(productRef, {
      view: increment(1),
    });
    if (docRef) {
      return docRef?.id;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProductsByCatAPI = async (catId) => {
  try {
    if (catId) {
      const catRef = doc(db, `categories/${catId}`);

      const q = query(
        collection(db, "products"),
        where("categoryRef", "==", catRef),
        orderBy("createAt", "desc")
      );
      const list = [];
      const querySnapshot = await getDocs(q);

      const categoryRefPromises = querySnapshot.docs.map(async (doc) => {
        return getDoc(doc.data().categoryRef);
      });

      const categoryRefs = await Promise.all(categoryRefPromises);

      querySnapshot.docs.forEach((doc, i) => {
        list.push({
          ...doc.data(),
          categoryRef: categoryRefs[i].data(),
          id: doc.id,
        });
      });

      return list;
    } else {
      const q = query(collection(db, "products"), orderBy("createAt", "desc"));
      const list = [];
      const querySnapshot = await getDocs(q);

      const categoryRefPromises = querySnapshot.docs.map(async (doc) => {
        return getDoc(doc.data().categoryRef);
      });

      const categoryRefs = await Promise.all(categoryRefPromises);

      querySnapshot.docs.forEach((doc, i) => {
        list.push({
          ...doc.data(),
          categoryRef: categoryRefs[i].data(),
          id: doc.id,
        });
      });

      return list;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProductDetailAPI = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const categoryRef = await getDoc(docSnap.data().categoryRef);
      const authorRef = await getDoc(docSnap.data().authorRef);

      return {
        ...docSnap.data(),
        categoryRef: categoryRef.data(),
        authorRef: authorRef.data(),
        id: docSnap.id,
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};

//order
export const createOrderAPI = async (data) => {
  const docRef = await addDoc(collection(db, "orders"), data);
  if (docRef) {
    return docRef?.id;
  }
};

//news

export const getNewsAPI = async () => {
  try {
    const docRef = collection(db, "news");
    const docSnap = await getDocs(docRef);
    const list = [];
    docSnap.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id });
    });
    if (docSnap) {
      return list;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getNewsDetailAPI = async (newId) => {
  try {
    const docRef = doc(db, "news", newId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getGeneral = async () => {
  try {
    const docRef = doc(db, "general", "XbdYVO6LS3AMQmPKWlXQ");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};
