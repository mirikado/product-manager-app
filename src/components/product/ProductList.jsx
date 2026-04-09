import ProductItem from "./ProductItem";

export default function ProductList({ products, onUpdateProduct, onDelete, setProductToDelete }) {
  return (
    <ul>
      {products.map((p) => (
        <ProductItem
          key={p.id}
          product={p}
          onDelete={() => onDelete(p.id)}
          onUpdateProduct={onUpdateProduct}
          setProductToDelete={setProductToDelete}
        />
      ))}
    </ul>
  );
}