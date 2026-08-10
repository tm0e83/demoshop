
import styles from './page.module.css';
import PageTitle from '@/components/page-title';
import { getCategory, getCategoryProducts } from '@/services/firebase-admin.service';
import CategoryProductList from './category-product-list';

type CategoryPageParams = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { categoryId } = await params;

  const category = await getCategory(categoryId);
  const products = await getCategoryProducts(categoryId);

  return (
    <div className={styles.category}>
      {category && (
        <div className={styles.categoryPageHeader}>
          <PageTitle center={true}>{category.title}</PageTitle>
          <p className="text-center">{category.description}</p>
        </div>
      )}

      <CategoryProductList products={products} />
    </div>
  );
}