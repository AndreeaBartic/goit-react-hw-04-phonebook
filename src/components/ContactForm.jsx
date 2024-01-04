import { nanoid } from 'nanoid';
import React, { useState } from 'react';

const INITIAL_STATE = { name: '', number: '' };
const ContactForm = ({ onAddContact }) => {
  const [form, setForm] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: form.name,
      number: form.number,
    };
    onAddContact(newContact);
    setForm({ ...INITIAL_STATE });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            onChange={handleChange}
            value={form.name}
            type="text"
            name="name"
            required
          />
        </label>
        <label>
          Number
          <input
            onChange={handleChange}
            value={form.number}
            type="tel"
            name="number"
            required
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
