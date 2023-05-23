import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

const CategoriesPage = ({ mainCategories, categoriesProducts }) => {
  return (
    <>
      <Header />
      <Center>
        <Title>
          {mainCategories?.map((cat) => (
            <div key={cat._id}>
              <h2>{cat.name}</h2>
              <div>
                {categoriesProducts[cat._id].map((p) => (
                  <div key={p}>{p.title}</div>
                ))}
              </div>
            </div>
          ))}
        </Title>
      </Center>
    </>
  );
};

export const getServerSideProps = async () => {
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; //catId => [products]

  for (const mainCat of mainCategories) {
    const products = await Product.find({ category: mainCat._id }, null, {
      limit: 3,
      sort: { '_id': -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
};
export default CategoriesPage;
