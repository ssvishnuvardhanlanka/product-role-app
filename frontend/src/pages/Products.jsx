import { useEffect, useState } from 'react';

import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const { user, logoutUser, hasRole } = useAuth();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    details: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState({
    name: '',
    details: '',
  });

  const canCreateOrEdit = hasRole('EDITOR', 'MANAGER', 'ADMIN');
  const canDelete = hasRole('MANAGER', 'ADMIN');

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async () => {
    if (!newProduct.name || !newProduct.details) return;

    await api.post('/products', newProduct);

    setNewProduct({
      name: '',
      details: '',
    });

    fetchProducts();
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditingProduct({
      name: product.name,
      details: product.details,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingProduct({
      name: '',
      details: '',
    });
  };

  const updateProduct = async (id) => {
    await api.patch(`/products/${id}`, editingProduct);
    cancelEdit();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container">
      <div className="topbar">
        <h2>Products</h2>

        <div>
          <span>
            Logged in as <b>{user.username}</b>
          </span>

          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>

      <p>
        Your roles: <b>{user.roles.join(', ')}</b>
      </p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Product Details</th>
            {(canCreateOrEdit || canDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {canCreateOrEdit && (
            <tr>
              <td>New</td>

              <td>
                <input
                  value={newProduct.name}
                  placeholder="Product name"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />
              </td>

              <td>
                <input
                  value={newProduct.details}
                  placeholder="Product details"
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      details: e.target.value,
                    })
                  }
                />
              </td>

              <td>
                <button onClick={createProduct}>Add</button>
              </td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>
                {editingId === product.id ? (
                  <input
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.name
                )}
              </td>

              <td>
                {editingId === product.id ? (
                  <input
                    value={editingProduct.details}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        details: e.target.value,
                      })
                    }
                  />
                ) : (
                  product.details
                )}
              </td>

              {(canCreateOrEdit || canDelete) && (
                <td>
                  {editingId === product.id ? (
                    <>
                      <button onClick={() => updateProduct(product.id)}>
                        Save
                      </button>

                      <button onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {canCreateOrEdit && (
                        <button onClick={() => startEdit(product)}>
                          Edit
                        </button>
                      )}

                      {canDelete && (
                        <button onClick={() => deleteProduct(product.id)}>
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}