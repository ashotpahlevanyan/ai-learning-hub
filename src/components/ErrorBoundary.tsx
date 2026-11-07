import { Component, type ReactNode } from 'react';

interface State { error: Error | null }

/** Shows a recoverable message instead of a blank page when a view throws (for example a failed chunk load after a deploy). */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const stale = /dynamically imported module|Loading chunk|Importing a module script failed/i.test(this.state.error.message);
    return (
      <main className="page empty" role="alert">
        <h1>Something went wrong</h1>
        <p>{stale ? 'A newer version of the site was published. Reload to get it.' : 'This page hit an error. Your progress is safe; reloading usually fixes it.'}</p>
        <button className="btn primary" onClick={() => location.reload()}>Reload page</button>
      </main>
    );
  }
}
