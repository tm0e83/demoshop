import type { DocumentData } from 'firebase/firestore';
import type { CategoryType, ProductType, UserType, DiscountType, OrderType } from '@/typings';
import { db } from '@/config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Firestore Timestamps aren't plain serializable objects (Redux complains),
// so convert them to milliseconds before data leaves the service layer.
const normalizeTimestamps = (data: DocumentData, fields: string[]): DocumentData => {
  const normalized = { ...data };
  for (const field of fields) {
    if (normalized[field] instanceof Timestamp) {
      normalized[field] = normalized[field].toMillis();
    }
  }
  return normalized;
};

// `birthdate` is stored as a Firestore Timestamp; convert it to the
// `YYYY-MM-DD` string the rest of the app (forms, display) expects.
const normalizeUser = (data: DocumentData): DocumentData => {
  const normalized = normalizeTimestamps(data, ['createdAt']);
  if (normalized.birthdate instanceof Timestamp) {
    normalized.birthdate = normalized.birthdate.toDate().toISOString().split('T')[0];
  }
  return normalized;
};

// Order items embed a product snapshot, which has its own `createdAt`
// Timestamp (see saveOrder).
const normalizeOrder = (data: DocumentData): DocumentData => {
  const normalized = normalizeTimestamps(data, ['createdAt']);
  normalized.items = (normalized.items ?? []).map((item: DocumentData) => normalizeTimestamps(item, ['createdAt']));
  return normalized;
};

export const createUser = async (user: UserType): Promise<UserType | null> => {
  try {
    const userRef = doc(db, 'users', user.id);
    await setDoc(userRef, { ...user, birthdate: Timestamp.fromDate(new Date(user.birthdate)) });
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? (normalizeUser(snapshot.data()) as UserType) : null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map((doc) => normalizeUser(doc.data()) as UserType);
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

export const getCustomers = async (): Promise<UserType[]> => {
  const users = await getUsers();
  return users.filter((user: UserType) => user.role === 'customer');
};

export const getUser = async (userId: string): Promise<UserType | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'users', userId));
    return snapshot.exists() ? (normalizeUser(snapshot.data()) as UserType) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    return snapshot.docs.map((doc) => normalizeTimestamps(doc.data(), ['createdAt']) as CategoryType);
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getCategory = async (categoryId: string): Promise<CategoryType | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'categories', categoryId));
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as CategoryType) : null;
  } catch (error) {
    console.error('Error getting category data:', error);
    throw error;
  }
};

export const addNewCategory = async (category: CategoryType): Promise<CategoryType | null> => {
  try {
    const newCategoryRef = doc(collection(db, 'categories'));
    const newCategory = { ...category, id: newCategoryRef.id, createdAt: serverTimestamp() };
    await setDoc(newCategoryRef, newCategory);
    const snapshot = await getDoc(newCategoryRef);
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as CategoryType) : null;
  } catch (error) {
    console.error('Error adding new category:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId: string, updatedData: Partial<CategoryType>): Promise<CategoryType | null> => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, { ...updatedData, id: categoryId });
    const snapshot = await getDoc(categoryRef);
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as CategoryType) : null;
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getProducts = async (productIds: string[] = []): Promise<ProductType[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    const products = snapshot.docs.map((doc) => normalizeTimestamps(doc.data(), ['createdAt']) as ProductType);
    if (productIds.length === 0) return products;
    return products.filter((product) => productIds.includes(product.id));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProduct = async (productId: string): Promise<ProductType | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'products', productId));
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as ProductType) : null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
  try {
    const q = query(collection(db, 'products'), where('categoryIds', 'array-contains', categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeTimestamps(doc.data(), ['createdAt']) as ProductType);
  } catch (error) {
    console.error('Error getting category products:', error);
    throw error;
  }
};

export const addNewProduct = async (product: ProductType): Promise<ProductType | null> => {
  try {
    const newProductRef = doc(collection(db, 'products'));
    const newProduct = { ...product, id: newProductRef.id, createdAt: serverTimestamp() };
    await setDoc(newProductRef, newProduct);
    const snapshot = await getDoc(newProductRef);
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as ProductType) : null;
  } catch (error) {
    console.error('Error adding new product:', error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  updatedData: Partial<ProductType>
): Promise<ProductType | null> => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, { ...updatedData, id: productId });
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? (normalizeTimestamps(snapshot.data(), ['createdAt']) as ProductType) : null;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const saveOrder = async (orderData: OrderType): Promise<void> => {
  try {
    const newOrderRef = doc(collection(db, 'orders'));
    await setDoc(newOrderRef, {
      ...orderData,
      id: newOrderRef.id,
      createdAt: serverTimestamp(),
      items: orderData.items.map((item) => ({
        ...item,
        createdAt: Timestamp.fromMillis(item.createdAt),
      })),
    });
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<OrderType | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'orders', orderId));
    return snapshot.exists() ? (normalizeOrder(snapshot.data()) as OrderType) : null;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const getOrders = async (): Promise<OrderType[]> => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeOrder(doc.data()) as OrderType);
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const getUserOrders = async (userId: string): Promise<OrderType[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('uid', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => normalizeOrder(doc.data()) as OrderType);
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const getDiscountByCode = async (code: DiscountType['code']): Promise<DiscountType | null> => {
  try {
    const q = query(collection(db, 'discounts'), where('code', '==', code), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return normalizeTimestamps(snapshot.docs[0].data(), ['validFrom', 'validUntil']) as DiscountType;
  } catch (error) {
    console.error('Error getting discount:', error);
    throw error;
  }
};
