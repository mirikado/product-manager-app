// const BASE_URL = "http://localhost:3000/products";
const KEY = "products"; // dùng localStorage để lưu trữ dữ liệu tạm thời, sau này có backend thì sẽ đổi sang API thật sự

export const getProducts = async () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];

  // API thật sự sẽ như thế này, nhưng do mình chưa có backend nên tạm thời sẽ dùng localStorage để lưu trữ dữ liệu

  // const res = await fetch(BASE_URL);
  // return res.json();
};

export const createProduct = async (product) => {
  const newProduct = { ...product, id: Date.now() };
  const products = await getProducts();
  const updatedProducts = [...products, newProduct];
  localStorage.setItem(KEY, JSON.stringify(updatedProducts));
  return newProduct;

  // API thật sự sẽ như thế này, nhưng do mình chưa có backend nên tạm thời sẽ dùng localStorage để lưu trữ dữ liệu 

  // const res = await fetch(BASE_URL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(product),
  // });
  // return res.json();
};

export const updateProduct = async (product) => {
  const products = await getProducts();
  const updatedProducts = products.map((p) =>
    p.id === product.id ? product : p
  );
  localStorage.setItem(KEY, JSON.stringify(updatedProducts));
  return product;

  // API thật sự sẽ như thế này, nhưng do mình chưa có backend nên tạm thời sẽ dùng localStorage để lưu trữ dữ liệu 

  // const res = await fetch(`${BASE_URL}/${product.id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(product),
  // });
  // return res.json();
};

export const deleteProductApi = async (id) => {
  const products = await getProducts();
  const updatedProducts = products.filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updatedProducts));

  // API thật sự sẽ như thế này, nhưng do mình chưa có backend nên tạm thời sẽ dùng localStorage để lưu trữ dữ liệu

  // await fetch(`${BASE_URL}/${id}`, {
  //   method: "DELETE",
  // });
};