import styles from './page.module.css';

import Alert from '@/components/alert';
import ImagePlaceholder from '@/components/image-placeholder';
import { formatCurrency } from '@/utils';
import { getProduct } from '@/services/firebase-admin.service';
import AddToCart from './add-to-card';

type ProductDetailPageParams = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageParams) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return <Alert>Product not found</Alert>;
  }

  return (
    <div className={styles.productDetailPage}>
      <div className="product-image-column">
        <ImagePlaceholder
          width={600}
          height={450}
          label={product.title}
        />
      </div>
      <div className="product-details-column">
        <h1 className="product-title">{product?.title}</h1>
        <p className="product-description">{product?.description}</p>
        <div className={`${styles.productPrice} mb-4`}>{formatCurrency(product?.price)}</div>

        <AddToCart product={product} />
      </div>
    </div>
  );
};
