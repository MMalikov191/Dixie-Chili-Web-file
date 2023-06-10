import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function ContactCard({ contact }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleFind = () => {
    axios
      .get('http://localhost:3333/contacts')
      .then((res) => {
        const contacts = res.data;
        const contactDetails = contacts.map((contact) => `${contact.name}: ${contact.email}`).join('\n');
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<pre>${contactDetails}</pre>`);
        newWindow.document.close();
      })
      .catch((error) => {
        toast.error('Failed to find contacts!');
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3333/contacts/${contact.id}`)
      .then((res) => {
        toast.success('Contact deleted successfully!');
        console.log('Contact deleted successfully!');
      })
      .catch((error) => {
        toast.error('Failed to delete contact!');
        console.error(error);
      });
  };

  const handleEdit = () => {
    const updatedContact = {
      name: name,
      address: address,
      phone: phone,
      email: email,
    };

    axios
      .put(`http://localhost:3333/contacts/${contact.id}`, updatedContact)
      .then((res) => {
        toast.success('Contact updated successfully!');
        console.log('Contact updated successfully!');
      })
      .catch((error) => {
        toast.error('Failed to update contact!');
        console.error(error);
      });
  };

  const handleSave = () => {
    const newContact = {
      name: name,
      address: address,
      phone: phone,
      email: email,
    };

    axios
      .post('http://localhost:3333/contacts', newContact)
      .then((res) => {
        toast.success('Contact saved successfully!');
        console.log('Contact saved successfully!');
      })
      .catch((error) => {
        toast.error('Failed to save contact!');
        console.error(error);
      });
  };

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header-title">
          <h1>Crystal's Numbers</h1>
        </div>
      </div>

      <div className="contact-page">
        <h2>Contact Details</h2>
        <div className="form-wrapper">
          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </div>
        <div className="buttons-wrapper">
          <button onClick={handleFind}>Find</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactCard;
