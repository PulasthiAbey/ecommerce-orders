"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiDelete } from "@/libs/api";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadOrders() {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet<Order[]>("/api/order");
      setOrders(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return orders;
    const term = search.toLowerCase();

    return orders.filter((o) => {
      const matchesId = String(o.id).includes(term);
      const matchesDesc = o.orderDescription.toLowerCase().includes(term);
      return matchesId || matchesDesc;
    });
  }, [orders, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete order #${id}?`))
      return;

    try {
      setDeletingId(id);
      await apiDelete(`/api/orders/${id}`);
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='min-h-screen bg-slate-100'>
      <div className='max-w-5xl mx-auto px-4 py-10'>
        {/* Page header */}
        <header className='mb-6'>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <h1 className='text-2xl font-semibold text-slate-900 flex items-center gap-2'>
                Orders
                {!loading && (
                  <span className='inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 border border-slate-200'>
                    {orders.length} total
                  </span>
                )}
              </h1>
              <p className='mt-1 text-sm text-slate-500'>
                View, search, and manage all orders created in the system.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={loadOrders}
                disabled={loading}
                className='hidden sm:inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60 transition'
              >
                ⟳ Refresh
              </button>

              <Link
                href='/orders/new'
                className='inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 transition'
              >
                + New Order
              </Link>
            </div>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className='mb-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800'>
            <span className='mt-0.5 text-lg leading-none'>⚠️</span>
            <div className='flex-1'>
              <p className='font-medium'>Something went wrong</p>
              <p className='text-xs text-red-700'>{error}</p>
            </div>
            <button
              className='text-xs font-medium underline underline-offset-2'
              onClick={loadOrders}
            >
              Retry
            </button>
          </div>
        )}

        {/* Card */}
        <section className='bg-white rounded-xl shadow-sm border border-slate-200'>
          {/* Card header: search + refresh (mobile) */}
          <div className='border-b border-slate-100 px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='relative w-full sm:max-w-md'>
              <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm'>
                🔍
              </span>
              <input
                type='text'
                placeholder='Search by ID or description...'
                className='w-full rounded-md border border-slate-300 bg-slate-50 px-8 py-2 text-sm shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={loadOrders}
              disabled={loading}
              className='inline-flex sm:hidden items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60 transition'
            >
              ⟳ Refresh
            </button>
          </div>

          {/* Table / content */}
          {loading ? (
            // Simple skeleton
            <div className='px-4 py-6 space-y-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='animate-pulse h-9 rounded-md bg-slate-100'
                />
              ))}
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm'>
                <thead className='bg-slate-50 border-b border-slate-200'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      ID
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      Description
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      Products
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      Created At
                    </th>
                    <th className='px-4 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className='px-4 py-10 text-center text-slate-500 text-sm'
                      >
                        <div className='flex flex-col items-center gap-2'>
                          <span className='text-3xl'>🧾</span>
                          <p className='font-medium'>
                            No orders match your search.
                          </p>
                          <p className='text-xs text-slate-400'>
                            Try clearing the search or creating a new order.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((o) => (
                      <tr
                        key={o.id}
                        className='border-t border-slate-100 hover:bg-slate-50 transition'
                      >
                        <td className='px-4 py-3 align-top text-slate-800 whitespace-nowrap'>
                          #{o.id}
                        </td>
                        <td className='px-4 py-3 align-top text-slate-800'>
                          {o.orderDescription}
                        </td>
                        <td className='px-4 py-3 align-top text-slate-700'>
                          {o.orderProducts?.length
                            ? o.orderProducts
                                .map((op) => op.product?.productName)
                                .filter(Boolean)
                                .join(", ")
                            : "—"}
                        </td>
                        <td className='px-4 py-3 align-top text-slate-500 whitespace-nowrap'>
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleString()
                            : "—"}
                        </td>
                        <td className='px-4 py-3 align-top text-right'>
                          <button
                            disabled={deletingId === o.id}
                            onClick={() => handleDelete(o.id)}
                            className='inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-60 transition'
                          >
                            {deletingId === o.id ? "Deleting…" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
