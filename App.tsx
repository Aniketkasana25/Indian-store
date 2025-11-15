
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import type { Item } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddItem = (newItemData: Omit<Item, 'id'>) => {
    const newItem: Item = {
      ...newItemData,
      id: crypto.randomUUID(),
    };
    setItems(prevItems => [newItem, ...prevItems]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {isLoggedIn ? (
        <Dashboard items={items} onAddItem={handleAddItem} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
