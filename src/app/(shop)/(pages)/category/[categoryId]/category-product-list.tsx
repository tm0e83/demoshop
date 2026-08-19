'use client';


import styles from './page.module.css';

import { useQueryState, parseAsFloat } from 'nuqs';
import { useMemo } from 'react';
import { Search } from 'lucide-react';
import Alert from '@/components/alert';
import BaseInput from '@/components/input';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';
import RangeSlider from '@/components/range-slider';
import { ProductType } from '@/typings';

export default function CategoryProductList({ products }: { readonly products: ProductType[] }) {
  const [searchTerm, setSearchTerm] = useQueryState('search', { defaultValue: '' });
  const [selectedMinPrice, setSelectedMinPrice] = useQueryState('minprice', parseAsFloat);
  const [selectedMaxPrice, setSelectedMaxPrice] = useQueryState('maxprice', parseAsFloat);

  // useMemo for performance optimizations
  const lowestPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.min(...products.map((product: ProductType) => product.price));
  }, [products]);

  // useMemo for performance optimizations
  const highestPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.max(...products.map((product: ProductType) => product.price));
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
      products.filter((product: ProductType) => {
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
    <>
      {products && products.length > 0 ? (
        <div className={styles.categoryPageContents}>
          <div className={styles.productFilters}>
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
                <label htmlFor={`minRange-${lowestPrice}-${highestPrice}`} className='d-block text-center'>Price</label>
                <RangeSlider
                  key={`${lowestPrice}-${highestPrice}`}
                  id={`${lowestPrice}-${highestPrice}`}
                  min={lowestPrice}
                  max={highestPrice}
                  step={0.01}
                  onChange={handlePriceRangeChange}
                />
              </div>
            )}
          </div>

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
      ) : (
        <div className="no-results">
          <Alert type="info">No products found for this category.</Alert>
        </div>
      )}
    </>
  );
}