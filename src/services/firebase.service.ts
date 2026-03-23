import type { CategoryType, ProductType, UserType, DiscountType, OrderType } from '@/typings';
import type { DatabaseReference, DataSnapshot } from 'firebase/database';
import { database } from '@/config/firebase';
import { equalTo, get, push, query, orderByChild, ref, serverTimestamp, set, update } from 'firebase/database';

export const createUser = async (user: UserType): Promise<UserType | null> => {
  try {
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, user);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const headerRef = ref(database, 'users');
    const snapshot = await get(headerRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
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
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const categoriesRef: DatabaseReference = ref(database, 'categories');
    const snapshot = await get(categoriesRef);
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as CategoryType[]);
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getCategory = async (categoryId: string): Promise<CategoryType | null> => {
  try {
    const categoryRef: DatabaseReference = ref(database, `categories/${categoryId}`);
    const snapshot = await get(categoryRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting category data:', error);
    throw error;
  }
};

export const addNewCategory = async (category: CategoryType): Promise<CategoryType | null> => {
  try {
    const categoriesRef: DatabaseReference = ref(database, 'categories');
    const newCategoryRef = push(categoriesRef);
    const id = newCategoryRef.key;
    const newCategory = { ...category, id, createdAt: serverTimestamp() };
    await set(newCategoryRef, newCategory);
    const snapshot = await get(newCategoryRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error adding new category:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId: string, updatedData: Partial<CategoryType>): Promise<CategoryType | null> => {
  try {
    const categoryRef: DatabaseReference = ref(database, `categories/${categoryId}`);
    await set(categoryRef, { ...updatedData, id: categoryId });
    const snapshot = await get(categoryRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  try {
    const updates: Record<string, null> = {};
    updates[`categories/${categoryId}`] = null;
    updates[`productsByCategory/${categoryId}`] = null;
    await update(ref(database), updates);
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getProducts = async (productIds: string[] = []): Promise<ProductType[]> => {
  try {
    const productsRef: DatabaseReference = ref(database, 'products');
    const snapshot = await get(productsRef);   
    if (!snapshot.exists()) return [];
    if (productIds.length === 0) return Object.values(snapshot.val()) as ProductType[];
    return (Object.values(snapshot.val()) as ProductType[]).filter((product: ProductType) => productIds.includes(product.id));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProduct = async (productId: string): Promise<ProductType | null> => {
  try {
    const productRef: DatabaseReference = ref(database, `products/${productId}`);
    const snapshot = await get(productRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<ProductType[]> => {
  try {
    const categoryRef: DatabaseReference = ref(database, `productsByCategory/${categoryId}`);
    const snapshot = await get(categoryRef);

    if (!snapshot.exists()) return [];

    const productIds = Object.keys(snapshot.val());
    const productPromises = productIds.map((id) => get(ref(database, `products/${id}`)));
    const productSnapshots = await Promise.all(productPromises);

    return productSnapshots
      .filter((snap) => snap.exists())
      .map((snap) => ({
        id: snap.key,
        ...snap.val(),
      }));
  } catch (error) {
    console.error('Error getting category products:', error);
    throw error;
  }
};

export const addNewProduct = async (product: ProductType): Promise<ProductType | null> => {
  try {
    const productsRef: DatabaseReference = ref(database, 'products');
    const newProductRef = push(productsRef);
    const id = newProductRef.key;
    const newProduct = { ...product, id, createdAt: serverTimestamp() };
    await set(newProductRef, newProduct);

    for (const categoryId of Object.keys(newProduct.categoryIds)) {
      const categoryRef: DatabaseReference = ref(database, `productsByCategory/${categoryId}/${id}`);
      await set(categoryRef, true);
    }

    const snapshot = await get(newProductRef);
    return snapshot.exists() ? snapshot.val() : null;
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
    const productRef = ref(database, `products/${productId}`);

    // load current product
    const snapshot = await get(productRef);
    if (!snapshot.exists()) return null;

    const existingProduct: ProductType = snapshot.val();

    const oldCategories = existingProduct.categoryIds || {};
    const newCategories = updatedData.categoryIds || {};

    const updates: Record<string, ProductType | null | boolean> = {};

    // update product data
    updates[`products/${productId}`] = {
      ...existingProduct,
      ...updatedData,
      id: productId,
    };

    // remove categories
    for (const categoryId of Object.keys(oldCategories)) {
      if (!newCategories[categoryId]) {
        updates[`productsByCategory/${categoryId}/${productId}`] = null;
      }
    }

    // add categories
    for (const categoryId of Object.keys(newCategories)) {
      if (!oldCategories[categoryId]) {
        updates[`productsByCategory/${categoryId}/${productId}`] = true;
      }
    }

    await update(ref(database), updates);

    const updatedSnapshot = await get(productRef);
    return updatedSnapshot.exists() ? updatedSnapshot.val() : null;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const saveOrder = async (orderData: OrderType): Promise<void> => {
  try {
    const ordersRef: DatabaseReference = ref(database, 'orders');
    const newOrderRef = push(ordersRef);
    const orderId = newOrderRef.key;
    await set(newOrderRef, { ...orderData, id: orderId, createdAt: serverTimestamp() });
    const userOrdersRef = ref(database, `userOrders/${orderData.uid}/${orderId}`);
    await set(userOrdersRef, { [orderId]: true });
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<OrderType[] | null> => {
  try {
    const ordersRef: DatabaseReference = ref(database, `orders/${orderId}`);
    const snapshot = await get(ordersRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export const getOrders = async (): Promise<OrderType[]> => {
  try {
    const ordersRef = ref(database, 'orders');
    const snapshot = await get(ordersRef);
    if (!snapshot.exists()) return [];
    const orders = Object.values(snapshot.val()) as OrderType[];

    return orders.sort((orderA, orderB) => Number(orderB.createdAt) - Number(orderA.createdAt));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export const getUserOrders = async (userId: string): Promise<OrderType[]> => {
  try {
    const userOrdersRef = ref(database, `userOrders/${userId}`);
    const snapshot = await get(userOrdersRef);
    if (!snapshot.exists()) return [];
    const orderPromises: Promise<DataSnapshot>[] = [];

    snapshot.forEach((child) => {
      const orderId = child.key;
      const orderRef = ref(database, `orders/${orderId}`);
      orderPromises.push(get(orderRef));
    });

    const orderSnapshots = await Promise.all(orderPromises);
    const orders = orderSnapshots.map((snap) => snap.val() as OrderType);

    return orders.sort((orderA, orderB) => Number(orderB.createdAt) - Number(orderA.createdAt));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export const getDiscountByCode = async (code: DiscountType['code']): Promise<DiscountType | null> => {
  const discountsRef = ref(database, 'discounts');
  const q = query(discountsRef, orderByChild('code'), equalTo(code));
  const snapshot = await get(q);

  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.values(data)[0] as DiscountType | null;
  } else {
    return null;
  }
}