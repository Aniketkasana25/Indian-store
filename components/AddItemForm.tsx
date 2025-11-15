import React, { useState, useRef } from 'react';
import type { Item } from '../types';
import { generateDescriptionFromImage } from '../services/geminiService';
import { SparklesIcon, SpinnerIcon, ImageIcon } from './icons';

interface AddItemFormProps {
  onAddItem: (item: Omit<Item, 'id'>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGenerateDescription = async () => {
    if (!imageBase64 || !imageFile) {
        alert("Please upload an image first.");
        return;
    }
    setIsGenerating(true);
    // extract base64 data from data URL
    const base64Data = imageBase64.split(',')[1];
    const generatedDesc = await generateDescriptionFromImage(base64Data, imageFile.type);
    setDescription(generatedDesc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price);

    if (!name || !price || isNaN(numericPrice) || numericPrice < 0 || !imageBase64) {
        alert("Please fill in all fields with valid data: item name, a non-negative price, and an image.");
        return;
    }

    onAddItem({
      name,
      description,
      price: numericPrice,
      imageUrl: imageBase64,
    });
    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setImageFile(null);
    setImageBase64(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Item</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Item Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price (INR)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"/>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Item Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                {imageBase64 ? (
                    <img src={imageBase64} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
                ) : (
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} ref={fileInputRef} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
         <button type="button" onClick={handleGenerateDescription} disabled={!imageBase64 || isGenerating} className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            {isGenerating ? (
                <>
                    <SpinnerIcon className="animate-spin h-4 w-4" />
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <SparklesIcon className="h-4 w-4" />
                    <span>Generate with AI</span>
                </>
            )}
        </button>
      </div>

      <button type="submit" className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
        Add Item to Store
      </button>
    </form>
  );
};

export default AddItemForm;