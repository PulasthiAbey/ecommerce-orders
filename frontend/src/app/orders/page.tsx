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
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <header className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold text-slate-900'>Orders</h1>
          <Link
            href='/orders/new'
            className='inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100 transition'
          >
            + New Order
          </Link>
        </header>

        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <input
            type='text'
            placeholder='Search by Order ID or Description...'
            className='border border-slate-300 rounded-md px-3 py-2 text-sm w-full sm:max-w-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={loadOrders}
            className='inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-100 transition w-max'
          >
            ⟳ Refresh
          </button>
        </div>

        {error && (
          <div className='mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='mt-10 text-center text-slate-500 text-sm'>
            Loading orders…
          </div>
        ) : (
          <div className='overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200'>
            <table className='min-w-full text-sm'>
              <thead className='bg-slate-100'>
                <tr>
                  <th className='px-3 py-2 text-left font-medium text-slate-700'>
                    ID
                  </th>
                  <th className='px-3 py-2 text-left font-medium text-slate-700'>
                    Description
                  </th>
                  <th className='px-3 py-2 text-left font-medium text-slate-700'>
                    Products
                  </th>
                  <th className='px-3 py-2 text-left font-medium text-slate-700'>
                    Created At
                  </th>
                  <th className='px-3 py-2 text-right font-medium text-slate-700'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-4 py-6 text-center text-slate-500'
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <tr
                      key={o.id}
                      className='border-t border-slate-100 hover:bg-slate-50'
                    >
                      <td className='px-3 py-2 align-top text-slate-800'>
                        #{o.id}
                      </td>
                      <td className='px-3 py-2 align-top text-slate-800'>
                        {o.orderDescription}
                      </td>
                      <td className='px-3 py-2 align-top text-slate-700'>
                        {o.orderProducts?.length
                          ? o.orderProducts
                              .map((op) => op.product?.productName)
                              .filter(Boolean)
                              .join(", ")
                          : "—"}
                      </td>
                      <td className='px-3 py-2 align-top text-slate-500'>
                        {o.createdAt
                          ? new Date(o.createdAt).toLocaleString()
                          : "—"}
                      </td>
                      <td className='px-3 py-2 align-top text-right'>
                        <button
                          disabled={deletingId === o.id}
                          onClick={() => handleDelete(o.id)}
                          className='inline-flex items-center rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-60'
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
      </div>
    </div>
  );
}
