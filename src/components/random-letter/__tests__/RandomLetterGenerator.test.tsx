import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RandomLetterGenerator from '../RandomLetterGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('RandomLetterGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component correctly', () => {
    render(<RandomLetterGenerator />);
    
    // Check if the main elements are rendered
    expect(screen.getByLabelText(/number of letters/i)).toBeInTheDocument();
    expect(screen.getByText(/letter case/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/exclude letters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate random letters/i })).toBeInTheDocument();
  });

  test('generates random letters when button is clicked', () => {
    render(<RandomLetterGenerator />);
    
    // Click the generate button
    fireEvent.click(screen.getByRole('button', { name: /generate random letters/i }));
    
    // Check if the results section appears
    expect(screen.getByText(/generated letters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
  });

  test('handles quantity input changes', () => {
    render(<RandomLetterGenerator />);
    
    const quantityInput = screen.getByLabelText(/number of letters/i);
    
    // Change the quantity
    fireEvent.change(quantityInput, { target: { value: '20' } });
    
    // Check if the value was updated
    expect(quantityInput).toHaveValue(20);
  });

  test('handles case selection changes', () => {
    render(<RandomLetterGenerator />);
    
    // Select uppercase option
    fireEvent.click(screen.getByLabelText(/uppercase/i));
    
    // Generate letters
    fireEvent.click(screen.getByRole('button', { name: /generate random letters/i }));
    
    // We can't directly test the case of generated letters here without mocking Math.random
    // But we can check that the generation happened
    expect(screen.getByText(/generated letters/i)).toBeInTheDocument();
  });

  test('handles excluded letters', () => {
    render(<RandomLetterGenerator />);
    
    // Set excluded letters to all vowels
    fireEvent.change(screen.getByLabelText(/exclude letters/i), { target: { value: 'aeiou' } });
    
    // Generate letters
    fireEvent.click(screen.getByRole('button', { name: /generate random letters/i }));
    
    // Check that generation happened
    expect(screen.getByText(/generated letters/i)).toBeInTheDocument();
  });

  test('handles edge case when all letters are excluded', () => {
    render(<RandomLetterGenerator />);
    
    // Exclude all letters
    fireEvent.change(screen.getByLabelText(/exclude letters/i), { target: { value: 'abcdefghijklmnopqrstuvwxyz' } });
    
    // Generate letters
    fireEvent.click(screen.getByRole('button', { name: /generate random letters/i }));
    
    // Check for the error message
    expect(screen.getByText(/no letters available after exclusions/i)).toBeInTheDocument();
    
    // Copy button should not be present
    expect(screen.queryByRole('button', { name: /copy to clipboard/i })).not.toBeInTheDocument();
  });

  test('copies text to clipboard when copy button is clicked', async () => {
    render(<RandomLetterGenerator />);
    
    // Generate letters
    fireEvent.click(screen.getByRole('button', { name: /generate random letters/i }));
    
    // Click the copy button
    fireEvent.click(screen.getByRole('button', { name: /copy to clipboard/i }));
    
    // Check if clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    
    // Check if the button text changes to "Copied!"
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
    });
  });
});