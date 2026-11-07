import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page empty">
      <h1>Page not found</h1>
      <p>That page doesn't exist or has moved.</p>
      <Link className="btn primary" to="/">Go to the home page</Link>
    </main>
  );
}
