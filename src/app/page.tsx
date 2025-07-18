'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';


export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', requestcal: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, requestcal } = form;

    const { error } = await supabase
      .from('beta_signups')
      .insert([{ name, email, requestcal }]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      alert('Something went wrong. Please try again.');
    } else {
      alert('Thanks for signing up!');
      setForm({ name: '', email: '', requestcal: false });
    }
  };

  return (

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
        {/* Title with animation */}
        <motion.p
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-3sm italic text-gray-400 mb-4"
>
  <TypeAnimation
  sequence ={[
    "A Next-Generation Productivity Tool", 2000,
    "Private Workspace for Big Ideas", 2000,
  ]} ></TypeAnimation>
</motion.p>

        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl font-extrabold text-white z-10"
        >
          ConvoThought
        </motion.h1>

      {/* Typing animation for "shadow" */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-5xl font-bold text-gray-400 mt-2"
      >
        <TypeAnimation
          sequence={[
            'ConvoThought', 1200,
            'ConvoTh', 300,
            'ConvoThat', 800
          ]}
          wrapper="span"
          speed={40}
          style={{ display: 'inline-block' }}
          cursor={true}
        />
      </motion.div>


      <p className="text-center text-lg mt-6 mb-2 text-white">
        Be the first to try it out.
      </p>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 lg:w-1/3 mx-auto p-6 border border-white rounded-xl space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1 text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 bg-black text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1 text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 bg-black text-white border border-white rounded focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>

        {/* RequestCal checkbox */}
        
<div className="flex justify-center mt-4">
  <label className="inline-flex items-center text-sm text-white gap-2">
    <input
      type="checkbox"
      id="requestcal"
      name="requestcal"
      className="accent-white"
    />
    <span>
      Also stay in loop about <span className="font-semibold">RequestCal</span> — a smarter way to schedule.
    </span>
  </label>
</div>

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold font-sans py-2 rounded hover:bg-gray-200 transition"
        >
          Submit
        </button>
      </form>

      <footer className="mt-16 text-sm text-gray-500 text-center space-y-2">
  <p>
    <strong>By <span className="font-medium text-white">Alice S. Kim</span>, Stanford University</strong><br />
    (B.S. Symbolic Systems – AI Computer Science + Psychology)
  </p>
  <div className="flex justify-center gap-4 text-white underline underline-offset-4">
    <a href="https://www.linkedin.com/in/alicesykim" target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>
    
  </div>
</footer>
    </div>
  );
}