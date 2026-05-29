import React from 'react';
import { booksData } from '../data/booksData'; // Ensure path is correct based on your folder structure

const Books = () => {
  return (
    <div className="books-container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Recommended Books</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Curated resources for your mental well-being and growth.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {booksData.map((book) => (
          <div 
            key={book.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px', 
              width: '250px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <img 
              src={book.imageUrl} 
              alt={book.title} 
              style={{ width: '100%', borderRadius: '4px', marginBottom: '10px' }} 
            />
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>
              {book.category}
            </span>
            <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{book.title}</h3>
            <p style={{ fontSize: '14px', color: '#555', fontStyle: 'italic' }}>
              by {book.author}
            </p>
            <p style={{ fontSize: '14px', color: '#333', marginBottom: '15px' }}>
              {book.description}
            </p>
            <a 
              href={book.link} 
              style={{ 
                display: 'block', 
                textAlign: 'center', 
                backgroundColor: '#007BFF', 
                color: 'white', 
                padding: '8px', 
                textDecoration: 'none', 
                borderRadius: '4px' 
              }}
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;