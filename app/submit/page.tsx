"use client";

import { useState } from 'react';

export default function SubmitRecipePage() {
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    ingredients: '',
    instructions: '',
    time: '',
    equipment: '',
    story: '',
    name: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title || !formData.country || !formData.ingredients || !formData.instructions || !formData.time) {
      setMessage('Please complete the required fields before submitting this demo form.');
      return;
    }

    setMessage(
      'This submission is only a demonstration. No personal information was sent, and no recipe was delivered to USF or stored in a public database.',
    );
    setFormData({
      title: '',
      country: '',
      ingredients: '',
      instructions: '',
      time: '',
      equipment: '',
      story: '',
      name: '',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Submission</p>
        <h1 className="text-3xl font-bold text-ink">Submit a recipe</h1>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="mb-5 text-sm text-stone-700">
          This form is a demonstration only. It does not send or store personal information, and it does not create a live public recipe database.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Recipe title*
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Country or cultural origin*
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Ingredients and quantities*
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={4}
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Instructions*
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={5}
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Cooking time*
              <input
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Required equipment
              <input
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Optional personal or cultural story
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              rows={3}
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-stone-700">
            Optional contributor name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 outline-none focus:border-terracotta focus:ring-2 focus:ring-[#f0c5a7]"
            />
          </label>

          <div className="flex items-center justify-between gap-3">
            <button type="submit" className="rounded-xl bg-terracotta px-5 py-3 font-medium text-white transition hover:bg-[#b85d3b]">
              Submit demo
            </button>
            {message && <p className="max-w-xl text-sm text-stone-700">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
