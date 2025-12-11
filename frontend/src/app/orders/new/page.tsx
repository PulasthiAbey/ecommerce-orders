"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/libs/api";
import type { Product } from "@/types/order";

export default function NewOrderPage() {
  const router = useRouter();

  const [orderDescription, setOrderDescription] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        const data = await apiGet<Product[]>("/api/products");
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  const toggleProduct = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderDescription.trim()) {
      setError("Order description is required");
      return;
    }

    if (selectedIds.length === 0) {
      setError("Select at least one product");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await apiPost("/api/orders", {
        orderDescription,
        productIds: selectedIds,
      });

      router.push("/orders");
    } catch (err) {
      console.error(err);
      setError("Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/orders");
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-xl mx-auto px-4 py-8'>
        <button
          type='button'
          onClick={() => router.push("/orders")}
          className='mb-4 text-sm text-sky-700 hover:underline'
        >
          ← Back to Orders
        </button>

        <h1 className='text-2xl font-semibold text-slate-900 mb-4'>
          Book Order
        </h1>

        {error && (
          <div className='mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-5 bg-white border border-slate-200 rounded-lg p-5 shadow-sm'
        >
          <div>
            <label className='block text-sm font-medium text-slate-800 mb-1'>
              Order Description
            </label>
            <input
              type='text'
              className='block w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              placeholder='e.g. Laptop order for client'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-800 mb-1'>
              Products
            </label>

            {loadingProducts ? (
              <div className='text-sm text-slate-500'>Loading products…</div>
            ) : (
              <div className='border border-slate-200 rounded-md max-h-56 overflow-y-auto bg-slate-50 px-3 py-2 space-y-2'>
                {products.length === 0 ? (
                  <div className='text-sm text-slate-500'>
                    No products available
                  </div>
                ) : (
                  products.map((p) => (
                    <label
                      key={p.id}
                      className='flex items-center gap-2 text-sm text-slate-800'
                    >
                      <input
                        type='checkbox'
                        className='h-4 w-4'
                        checked={selectedIds.includes(p.id)}
                        onChange={() => toggleProduct(p.id)}
                      />
                      <span>
                        {p.productName}
                        {p.productDescription && (
                          <span className='ml-1 text-xs text-slate-500'>
                            – {p.productDescription}
                          </span>
                        )}
                      </span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          <div className='flex gap-3 pt-2'>
            <button
              type='submit'
              disabled={submitting}
              className='inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60'
            >
              {submitting ? "Booking…" : "Book Order"}
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
