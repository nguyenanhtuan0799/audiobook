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
  apiKey: "AIzaSyDuPReToWsngvdVEoq_Tk5ekzOks0DdLwM",
  authDomain: "dtstore-1b23d.firebaseapp.com",
  projectId: "dtstore-1b23d",
  // databaseURL: "",
  storageBucket: "dtstore-1b23d.appspot.com",
  messagingSenderId: "73199860427",
  appId: "1:73199860427:web:d4acb159e538339656f94e",
  measurementId: "G-36F656J6D1",
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

    const categoryRefs = await Promise.all(categoryRefPromises);

    docSnap.docs.forEach((doc, i) => {
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
      return {
        ...docSnap.data(),
        categoryRef: categoryRef.data(),
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
