// src/firebase/firestore.js
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './config';

/**
 * Fetch all documents from a collection
 * @param {string} collectionName - Name of the Firestore collection
 * @returns {Promise<Array>} Array of documents with id included
 */
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Fetch a single document by ID
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} documentId - ID of the document
 * @returns {Promise<Object>} Document data with id included
 */
export const getDocumentById = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error(`Error fetching document ${documentId}:`, error);
    throw error;
  }
};

/**
 * Query documents with conditions
 * @param {string} collectionName - Name of the Firestore collection
 * @param {Array} conditions - Array of where conditions [field, operator, value]
 * @param {Object} options - Optional sorting and limiting
 * @returns {Promise<Array>} Array of matching documents
 */
export const queryDocuments = async (collectionName, conditions = [], options = {}) => {
  try {
    let q = collection(db, collectionName);
    
    // Apply where conditions
    if (conditions.length > 0) {
      const constraints = conditions.map(([field, operator, value]) => 
        where(field, operator, value)
      );
      q = query(q, ...constraints);
    }
    
    // Apply ordering
    if (options.orderBy) {
      q = query(q, orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
    }
    
    // Apply limit
    if (options.limit) {
      q = query(q, limit(options.limit));
    }
    
    const querySnapshot = await getDocs(q);
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the Firestore collection
 * @param {Object} data - Data to add
 * @returns {Promise<string>} ID of the created document
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Update an existing document
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} documentId - ID of the document
 * @param {Object} data - Data to update
 * @returns {Promise<void>}
 */
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating document ${documentId}:`, error);
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the Firestore collection
 * @param {string} documentId - ID of the document
 * @returns {Promise<void>}
 */
export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${documentId}:`, error);
    throw error;
  }
};

