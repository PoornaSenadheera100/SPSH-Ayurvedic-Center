import React, { useState } from 'react';

function AddItem() {
  const [itemCode,setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQty,setItemQty] = useState('');
  const [itemDesc,setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemImage, setItemImage] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission and save the data to your database or perform any other actions you want.
    console.log('Item Code:', itemCode);
    console.log('Item Name:', itemName);
    console.log('Item Quantity :',itemQty);
    console.log('Item Description:',itemDesc);
    console.log('Item Price:',itemPrice);
    console.log('Item Image:', itemImage);
  };

  const ItemNameChange = (event) => {
    
    setItemName(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setItemImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input type="text" id="productName" name="productName" value={productName} onChange={ItemNameChange} />
        </div>
        <div>
          <label htmlFor="productImage">Product Image</label>
          <input type="file" id="productImage" name="productImage" onChange={handleProductImageChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddItem;
