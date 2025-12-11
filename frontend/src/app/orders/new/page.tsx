"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/libs/api";
import type { Product } from "@/types/order";
import toast from "react-hot-toast";

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
        setError(null);
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

      toast.success("Order created successfully");
      router.push("/orders");
    } catch (err) {
      console.error(err);
      setError("Failed to create order");
      toast.error("Failed to create order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/orders");
  };

  const selectedCount = selectedIds.length;

  return (
    <div className='min-h-screen bg-slate-100'>
      <div className='max-w-3xl mx-auto px-4 py-10'>
        <button
          type='button'
          onClick={() => router.push("/orders")}
          className='mb-4 inline-flex items-center gap-1 text-sm text-sky-700 hover:underline'
        >
          <span className='text-base'>←</span>
          <span>Back to Orders</span>
        </button>

        <header className='mb-6'>
          <h1 className='text-2xl font-semibold text-slate-900'>
            Book a New Order
          </h1>
          <p className='mt-1 text-sm text-slate-500'>
            Provide a short description and select one or more products to
            include in this order.
          </p>
        </header>

        {error && (
          <div className='mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800'>
            <span className='mt-0.5 text-lg leading-none'>⚠️</span>
            <div>{error}</div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'
        >
          <div className='space-y-1'>
            <label className='block text-sm font-medium text-slate-800'>
              Order Description
            </label>
            <p className='text-xs text-slate-500 mb-1'>
              A brief note to identify this order (e.g. &quot;Laptop order for
              marketing team&quot;).
            </p>
            <input
              type='text'
              className='block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              placeholder='e.g. Laptop order for client'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <div>
                <label className='block text-sm font-medium text-slate-800'>
                  Products
                </label>
                <p className='text-xs text-slate-500'>
                  Select one or more products to attach to this order.
                </p>
              </div>
              {!loadingProducts && (
                <span className='inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200'>
                  {selectedCount === 0
                    ? "No products selected"
                    : `${selectedCount} selected`}
                </span>
              )}
            </div>

            {loadingProducts ? (
              <div className='space-y-2'>
                <div className='h-9 w-full animate-pulse rounded-md bg-slate-100' />
                <div className='h-9 w-full animate-pulse rounded-md bg-slate-100' />
              </div>
            ) : (
              <div className='mt-1 grid max-h-64 grid-cols-1 gap-2 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-2 sm:grid-cols-2'>
                {products.length === 0 ? (
                  <div className='col-span-full px-2 py-4 text-center text-sm text-slate-500'>
                    No products available. Please seed products in the backend.
                  </div>
                ) : (
                  products.map((p) => {
                    const isSelected = selectedIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type='button'
                        onClick={() => toggleProduct(p.id)}
                        className={`flex h-full w-full flex-col items-start rounded-md border px-3 py-2 text-left text-sm transition shadow-sm ${
                          isSelected
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className='flex w-full items-center justify-between gap-2'>
                          <span className='font-medium text-slate-900'>
                            {p.productName}
                          </span>
                          <span
                            className={`h-4 w-4 rounded-sm border flex items-center justify-center text-[10px] ${
                              isSelected
                                ? "border-sky-500 bg-sky-500 text-white"
                                : "border-slate-300 text-slate-400"
                            }`}
                          >
                            {isSelected ? "✓" : ""}
                          </span>
                        </div>
                        {p.productDescription && (
                          <p className='mt-1 text-xs text-slate-500 line-clamp-2'>
                            {p.productDescription}
                          </p>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className='flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              onClick={handleCancel}
              className='inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting || loadingProducts}
              className='inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60'
            >
              {submitting ? "Booking…" : "Book Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
