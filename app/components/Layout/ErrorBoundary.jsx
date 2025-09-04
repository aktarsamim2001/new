"use client";

import React from 'react';
import SkeletonLoader from './SkeletonLoader';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isOffline: false
    };
  }

  componentDidMount() {
    // Add offline/online event listeners
    window.addEventListener('offline', this.handleConnectionChange);
    window.addEventListener('online', this.handleConnectionChange);
    
    // Check initial connection status
    this.handleConnectionChange();
  }

  componentWillUnmount() {
    // Remove event listeners
    window.removeEventListener('offline', this.handleConnectionChange);
    window.removeEventListener('online', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const isOffline = !navigator.onLine;
    this.setState({ isOffline });
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error);
    console.log('Error Info:', errorInfo);
  }

  render() {
    if (this.state.isOffline) {
      return <SkeletonLoader />;
    }

    if (this.state.hasError) {
      return <SkeletonLoader />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
