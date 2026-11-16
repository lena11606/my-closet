"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type ClothingItem = {
  id: string;
  brand: string;
  type: string;
  size: string;
  color: string;
  link: string;
};

export default function InventoryPage() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [link, setLink] = useState("");

  async function loadItems() {
    const { data, error } = await supabase
      .from("clothing_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    setItems(data as ClothingItem[]);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!brand.trim() || !type.trim() || !size.trim()) {
      alert("Brand, Type, and Size are required.");
      return;
    }

    const { error } = await supabase
      .from("clothing_items")
      .insert({ brand, type, size, color, link });

    if (error) {
      console.error(error);
      return;
    }

    setBrand("");
    setType("");
    setSize("");
    setColor("");
    setLink("");
    loadItems();
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from("clothing_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }
    loadItems();
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <Link href="/" className="text-sm text-zinc-500 underline">
        ← Back home
      </Link>

      <h1 className="text-2xl font-semibold mb-6 mt-4">Inventory</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-10">
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Type (e.g. T-shirt)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          Add item
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="border rounded px-4 py-3 flex justify-between items-start"
          >
            <div>
              <div className="font-medium">
                {item.brand} — {item.type}
              </div>
              <div className="text-sm text-zinc-600">
                Size {item.size} · {item.color}
              </div>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-sm text-red-600 underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
