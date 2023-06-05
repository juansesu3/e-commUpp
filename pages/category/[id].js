import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
  h1 {
    font-size: 1.5em;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  justify-content: space-between;
  width: 100%;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }

  @media screen and (min-width: 768px) {
    align-items: center;
  }
`;

const CategoryPage = ({
  category,
  subCategories,
  products: originalProducts,
}) => {
  const defaultSorting = "_id-desc";
  const defaultFiltersValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));
  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFiltersValues] = useState(defaultFiltersValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFilterChanged] = useState(filtersValues);

  const handlerFilterChange = (filterName, filterValue) => {
    setFiltersValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFilterChanged(true);
  };

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?${params.toString()}`;
    axios.get(url).then((res) => {
      setProducts(res.data);

      setLoadingProducts(false);
    });
  }, [filtersValues, sort, filtersChanged]);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}: </span>
                <select
                  onChange={(ev) =>
                    handlerFilterChange(prop.name, ev.target.value)
                  }
                  value={filtersValues.find((f) => f.name === prop.name).value}
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sorting:</span>
              <select
                value={sort}
                onChange={(ev) => {
                  setSort(ev.target.value);
                  setFilterChanged(true);
                }}
              >
                <option value="price-asc">price, lowest first</option>
                <option value="price-desc">price, highest first</option>
                <option value="_id-desc">newest first</option>
                <option value="_id-asc">oldest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {loadingProducts && <Spinner fullWidth />}
        {!loadingProducts && (
          <div>
            {products.length > 0 && <ProductsGrid products={products} />}
            {products.length === 0 && <div>Sorry, No products found</div>}
          </div>
        )}
      </Center>
    </>
  );
};

export default CategoryPage;

export const getServerSideProps = async (context) => {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
