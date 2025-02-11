import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  formData: {
    name: "",
    price: 0,
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: 0, image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();

    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      document.getElementById("add_product_modal").close();
      toast.success("Product added");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status === 429) set({ error: "Too many requests", products: [] });
      else set({ error: "Somthing went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);

      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });

    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      console.log(response);
      set({
        currentProduct: response.data.data,
        error: null,
        formData: response.data.data,
      });
    } catch (err) {
      set({
        currentProduct: null,
        error: "Something went wrong",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
