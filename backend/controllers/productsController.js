// CRUD operations:

import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
                SELECT * FROM products
                ORDER BY created_at DESC
                `;

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if ((!name || !price, !image)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newProduct = await sql`
    INSERT INTO products (name, price, image)
    VALUES (${name}, ${price}, ${image})
    RETURNING *
  `;

    console.log(newProduct);

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products
    WHERE id = ${id}
  `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error getting product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    UPDATE products
    SET name = ${req.body.name}, price = ${req.body.price}, image = ${req.body.image}
    WHERE id = ${id}
    RETURNING *
  `;

    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *
  `;

    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};
