import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService";

export const useProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // FUNCIÓN PARA CARGAR PRODUCTOS
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);


  // METODO PARA AGREGAR UN PRODUCTO
  const addProduct = async (product) => {
    try {
      setLoading(true);
      await createProduct(product);
      await loadProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // METODO PARA EDITAR UN PRODUCTO
  const editProduct = async (id, product) => {
    try {
      setLoading(true);
      await updateProduct(id, product);
      await loadProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // METODO PARA ELIMINAR UN PRODUCTO
  const removeProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return {
    products,
    loading,
    addProduct,
    editProduct,
    removeProduct,
    loadProducts
  };
};