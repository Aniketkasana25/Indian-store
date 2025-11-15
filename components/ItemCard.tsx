
import React from 'react';
import type { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(item.price);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover"/>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{item.description}</p>
        <p className="text-xl font-bold text-orange-600 mt-4 self-end">{formattedPrice}</p>
      </div>
    </div>
  );
};

export default ItemCard;
