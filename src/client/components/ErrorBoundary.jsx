import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const ErrorButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorDetails = styled.details`
  margin-top: 2rem;
  text-align: left;
  max-width: 800px;
  width: 100%;

  summary {
    cursor: pointer;
    color: #7f8c8d;
    padding: 0.5rem;

    &:hover {
      color: #2c3e50;
    }
  }

  pre {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.9rem;
    color: #2c3e50;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Ups! Nešto je pošlo po zlu</ErrorTitle>
          <ErrorMessage>
            Došlo je do neočekivane greške. Pokušajte osvježiti stranicu ili se
            vratiti na početnu stranicu.
          </ErrorMessage>
          <ErrorButton onClick={this.handleReset}>
            Vrati se na početnu
          </ErrorButton>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>Tehnički detalji (samo u razvoju)</summary>
              <pre>
                <strong>Greška:</strong> {this.state.error.toString()}
                {'\n\n'}
                <strong>Stack trace:</strong>
                {'\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
