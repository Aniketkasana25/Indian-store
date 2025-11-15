
import React from 'react';
import type { Item } from '../types';
import AddItemForm from './AddItemForm';
import ItemCard from './ItemCard';

interface DashboardProps {
  items: Item[];
  onAddItem: (item: Omit<Item, 'id'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ items, onAddItem }) => {
  return (
    <div className="min-h-screen bg-orange-50 p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-brand text-5xl font-bold text-orange-800 text-center">Indian Emporium Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <div className="sticky top-8">
                <AddItemForm onAddItem={onAddItem} />
            </div>
        </div>
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Inventory</h2>
            {items.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {items.map(item => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">Your inventory is empty.</p>
                    <p className="text-gray-400 mt-2">Add a new item using the form on the left.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
