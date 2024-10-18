import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [flavors, setFlavors] = useState([]);
  const [newFlavor, setNewFlavor] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedFlavors = JSON.parse(localStorage.getItem('flavors')) || [];
    setFlavors(storedFlavors);
  }, []);

  const addOrUpdateFlavor = () => {
    const trimmedFlavor = newFlavor.trim();

    if (flavors.some(flavor => flavor === trimmedFlavor && editingIndex === null)) {
      alert('Flavor name already exists!');
      return;
    }

    if (editingIndex !== null) {
      const updatedFlavors = flavors.map((flavor, index) => 
        index === editingIndex ? trimmedFlavor : flavor
      );
      setFlavors(updatedFlavors);
      localStorage.setItem('flavors', JSON.stringify(updatedFlavors));
      setEditingIndex(null);
    } else {
      const updatedFlavors = [...flavors, trimmedFlavor];
      setFlavors(updatedFlavors);
      localStorage.setItem('flavors', JSON.stringify(updatedFlavors));
    }
    setNewFlavor('');
  };

  const editFlavor = (index) => {
    setNewFlavor(flavors[index]);
    setEditingIndex(index);
  };

  const handleDeleteClick = (index) => {
    if (editingIndex !== null) {
      alert('You cannot delete a flavor while editing. Please finish editing first.');
      return;
    }
    deleteFlavor(index);
  };

  const deleteFlavor = (index) => {
    const updatedFlavors = flavors.filter((_, i) => i !== index);
    setFlavors(updatedFlavors);
    localStorage.setItem('flavors', JSON.stringify(updatedFlavors));
  };

  const clearFlavors = () => {
    localStorage.removeItem('flavors');
    setFlavors([]);
  };

  return (
    <div className="container">
      <h1>Jelly Bean Flavors</h1>
      <input
        type="text"
        placeholder="Name"
        value={newFlavor}
        onChange={e => setNewFlavor(e.target.value)}
      />
      <button onClick={addOrUpdateFlavor}>
        {editingIndex !== null ? 'Update Flavor' : 'Add Flavor'}
      </button>
      <button onClick={clearFlavors}>Clear All Flavors</button>
      <ul>
        {flavors.map((flavor, index) => (
          <li key={index}>
            {flavor}
            <div>
              <button onClick={() => editFlavor(index)}>Edit</button>
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
