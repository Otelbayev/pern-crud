import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCart from "../components/ProductCart";
import AddProductModal from "../components/AddProductModal";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_product_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add button
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex items-center flex-col justify-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-semibold">No products found</div>
            <p>Get start by adding your first product to the invetory</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid gris-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
