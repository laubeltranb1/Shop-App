import { Layout } from "../../Components/Layout";
import { Card } from "../../Components/Card";
import { ProductDetails } from "../../Components/ProductDetails";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);
  const renderView = () => {
    if (context.filteredProducts?.length > 0) {
      return context.filteredProducts?.map((product) => (
        <Card key={product.id} data={product} />
      ));
    } else {
      return <div>No results ☹️</div>;
    }
  };

  return (
    <Layout>
      <div className="flex  items-center justify-center w-80 relative mb-4">
        <h1 className="font-medium text-xl">Exclusive Products</h1>
      </div>
      <input
        type="text"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        placeholder="Search a product..."
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetails />
    </Layout>
  );
}

export default Home;
