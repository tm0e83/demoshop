
'use client';

import styles from './page.module.css';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation'
import { Search } from 'lucide-react';
import { useCategory, useCategoryProducts } from '@/hooks';
import Alert from '@/components/alert';
import BaseInput from '@/components/input';
import Card from '@/components/card/card';
import PageTitle from '@/components/page-title';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';
import RangeSlider from '@/components/range-slider';

export default function CategoryPage() {
  const params = useParams();
  const rawCategoryId = params.categoryId;
  const categoryId: string | undefined = Array.isArray(rawCategoryId)
    ? rawCategoryId[0]
    : rawCategoryId;
  const { category } = useCategory(categoryId || '');
  const { products } = useCategoryProducts(categoryId);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);

  // useMemo for performance optimizations
  const lowestPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.min(...products.map((product) => product.price));
  }, [products]);

  // useMemo for performance optimizations
  const highestPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.max(...products.map((product) => product.price));
  }, [products]);

  const effectiveMinPrice =
    selectedMinPrice === null
      ? lowestPrice
      : Math.max(lowestPrice, Math.min(selectedMinPrice, highestPrice));

  const effectiveMaxPrice =
    selectedMaxPrice === null
      ? highestPrice
      : Math.max(lowestPrice, Math.min(selectedMaxPrice, highestPrice));

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          searchTerm.trim() === '' ||
          product.title.toLowerCase().includes(searchTerm);

        const matchesPrice =
          product.price >= effectiveMinPrice && product.price <= effectiveMaxPrice;

        return matchesSearch && matchesPrice;
      }),
    [products, searchTerm, effectiveMinPrice, effectiveMaxPrice]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setSelectedMinPrice(min);
    setSelectedMaxPrice(max);
  };

  return (
    <div className={styles.category}>
      {category && (
        <div className="category-page-header">
          <PageTitle center={true}>{category.title}</PageTitle>
          <p className="text-center">{category.description}</p>
        </div>
      )}

      {products && products.length > 0 ? (
        <>
          <div className="category-page-contents">
            <Card className="product-filters">
              <div>
                <div className="input-wrap">
                  <BaseInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search size={16} />
                </div>
              </div>

              {lowestPrice !== highestPrice && (
                <div>
                  <label htmlFor="" className='d-block text-center'>Price</label>
                  <RangeSlider
                    key={`${lowestPrice}-${highestPrice}`}
                    min={lowestPrice}
                    max={highestPrice}
                    step={0.01}
                    onChange={handlePriceRangeChange}
                  />
                </div>
              )}
            </Card>

            {filteredProducts.length > 0 ? (
              <ProductList>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </ProductList>
            ) : (
            <div className="no-results">
              <Alert type="info" className="flex-1">No products found matching the search and filter criteria.</Alert>
            </div>
            )}
          </div>
        </>
      ) : (
        <div className="no-results">
          <Alert type="info">No products found for this category.</Alert>
        </div>
      )}
    </div>
  );
}