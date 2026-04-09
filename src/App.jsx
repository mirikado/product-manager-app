import { useState, useEffect } from "react";
import { ProductList, AddProductForm } from "./components";
import { useToast } from "./ToastContext";
import SkeletonItem from "./Skeleton";
import { createProduct, deleteProductApi, getProducts, updateProduct } from "./services/productService";
import { useAuth } from "./context/AuthContext";
import ProtectedApp from "./components/auth/ProtectedApp";

function App() {

  const { user, logout } = useAuth();

  const [products, setProducts] = useState(() => {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
  });

  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = async (newProduct) => {
    setLoading(true);
    try {
      const saved = await createProduct(newProduct);
      setProducts(prev => [...prev, saved]);
      showToast(`Đã thêm "${newProduct.name}"`, 'success');
    } catch {
      showToast("Lỗi khi thêm", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteProductApi(id);
      setProducts(products.filter((p) => p.id !== id));
      showToast("Đã xoá sản phẩm", 'error');
    } catch {
      showToast("Lỗi khi xoá", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const total = products.reduce((sum, p) => sum + p.price, 0);

  const handleUpdateProduct = async (updatedProduct) => {
    setLoading(true);
    try {
      await updateProduct(updatedProduct);
      const updatedList = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setProducts(updatedList);
      // đồng thời lưu vào localStorage
      localStorage.setItem("products", JSON.stringify(updatedList));
      showToast(`Đã cập nhật "${updatedProduct.name}"`, 'info');
    } catch {
      showToast("Lỗi khi cập nhật", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedApp>
      <div className="min-h-screen p-4">
        {/* header */}
        <div className="flex justify-between mb-4">
          <p>👋 Xin chào, {user?.username}</p>
          <button onClick={logout}>Logout</button>
        </div>

        {/* app cũ của bạn */}
        <div className="min-h-screen bg-gray-100 px-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center py-4">Quản lý bán hàng</h2>

          <AddProductForm
            onAddProduct={addProduct}
            onUpdateProduct={handleUpdateProduct}
          />

          <p className="text-green-600 font-semibold mt-2">Tổng tiền: {total.toLocaleString("vi-VN")}đ</p>
          <div className="relative my-3">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-2xl px-4 py-3 pl-10 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              🔍
            </span>
          </div>

          {
            filteredProducts.length === 0 ? (
              <p className="text-center mt-4 text-gray-500" >Không tìm thấy sản phẩm</p>
            ) : <>
              {loading ? (
                <>
                  <SkeletonItem />
                  <SkeletonItem />
                  <SkeletonItem />
                </>
              ) : (
                <ProductList
                  products={filteredProducts}
                  onDelete={deleteProduct}
                  onUpdateProduct={handleUpdateProduct}
                  setProductToDelete={setProductToDelete}
                />)}
            </>
          }

          {productToDelete && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white p-4 rounded-2xl w-80">
                <p className="text-center mb-4">
                  Xoá "{productToDelete.name}"?
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setProductToDelete(null)}
                    className="flex-1 border py-2 rounded-xl"
                  >
                    Huỷ
                  </button>

                  <button
                    onClick={() => {
                      deleteProduct(productToDelete.id);
                      setProductToDelete(null);
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedApp>
  );
}

export default App;