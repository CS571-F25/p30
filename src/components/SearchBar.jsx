import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const submit = e => {
    e.preventDefault()
    if (!q) return
    onSearch(q.toUpperCase())
    setQ('')
  }
  return (
    <form onSubmit={submit} style={{ marginBottom: '1rem' }}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="type code (ex: AAPL)"
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          marginRight: '0.5rem'
        }}
      />
      <button style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}>
        add
      </button>
    </form>
  )
}