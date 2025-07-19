

import { useEffect, useState } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRow, setNewRow] = useState({ title: '', completed: false });
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({ title: '', completed: false });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/todos`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTodos(data);
    } catch {
      setError('Error loading TODOs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = async (e) => {
    e.preventDefault();
    if (!newRow.title.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRow),
      });
      if (!res.ok) throw new Error('Failed to add');
      setNewRow({ title: '', completed: false });
      fetchTodos();
    } catch {
      setError('Error adding TODO');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditRow({ title: todo.title, completed: todo.completed });
  };

  const handleSaveEdit = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRow),
      });
      if (!res.ok) throw new Error('Failed to update');
      setEditId(null);
      setEditRow({ title: '', completed: false });
      fetchTodos();
    } catch {
      setError('Error updating TODO');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchTodos();
    } catch {
      setError('Error deleting TODO');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-app">
      <h1>TODO List</h1>
      <form onSubmit={handleAddRow} className="todo-form">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={newRow.title}
                  onChange={e => setNewRow({ ...newRow, title: e.target.value })}
                  placeholder="Add new TODO"
                  disabled={loading}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={newRow.completed}
                  onChange={e => setNewRow({ ...newRow, completed: e.target.checked })}
                  disabled={loading}
                />
              </td>
              <td>
                <button type="submit" disabled={loading}>Add</button>
              </td>
            </tr>
            {todos.length === 0 && (
              <tr>
                <td colSpan={3}>No TODOs found.</td>
              </tr>
            )}
            {todos.map(todo => (
              <tr key={todo.id}>
                {editId === todo.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editRow.title}
                        onChange={e => setEditRow({ ...editRow, title: e.target.value })}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={editRow.completed}
                        onChange={e => setEditRow({ ...editRow, completed: e.target.checked })}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSaveEdit(todo.id)} disabled={loading}>Save</button>
                      <button onClick={() => setEditId(null)} disabled={loading}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{todo.title}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleEdit({ ...todo, completed: !todo.completed })}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(todo)} disabled={loading}>Edit</button>
                      <button onClick={() => handleDelete(todo.id)} disabled={loading}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
