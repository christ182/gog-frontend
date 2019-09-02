import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Contact your administrator immediately</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
