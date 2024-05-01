import firebase from '../firebase.js';
import Product from '../models/productModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'UserPost'), data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await getDocs(collection(db, 'UserPost'));
    const productArray = [];
    if (products.empty) {
      res.status(400).send('No Products found');
    } else {
      products.forEach((doc) => {
        const product = new Product(
          doc.id,
          doc.data().category,
          doc.data().city,
          doc.data().createdAt,
          doc.data().desc,
          doc.data().image,
          doc.data().title,
          doc.data().userEmail,
          doc.data().userImage,
          doc.data().userName
        );
        productArray.push(product);
      });
      res.status(200).send(productArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = doc(db, 'UserPost', id);
    const data = await getDoc(product);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = doc(db, 'UserPost', id);
    await updateDoc(product, data);
    res.status(200).send('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedProduct = await getDoc(doc(db, 'UserPost', id));
    await deleteDoc(doc(db, 'UserPost', id));
    res.status(200).send(`product deleted successfully: ${deletedProduct.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

