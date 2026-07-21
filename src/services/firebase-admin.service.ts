import type { CategoryType, ProductType } from '@/typings';
import type { Query, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from '@/config/firebase-admin';

export const getProduct = async (productId: string): Promise<ProductType | null> => {
  try {
    const snapshot = await db.collection('products').doc(productId).get();
    if (!snapshot.exists) return null;

    const data = snapshot.data()!;

    return {
      ...data,
      id: snapshot.id,
      createdAt: data.createdAt.toMillis(),
    } as ProductType;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

export const getLatestProducts = async (maxResults: number = 0): Promise<ProductType[]> => {
  try {
    let productsRef = db.collection('products') as Query;

    if (maxResults > 0) {
      productsRef = productsRef.limit(maxResults);
    }

    const snapshot = await productsRef.get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as ProductType;
    });
  } catch (error) {
    console.error('Error getting limited products:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const snapshot = await db.collection("categories").get();

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
      id: doc.id,
    })) as CategoryType[];
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};