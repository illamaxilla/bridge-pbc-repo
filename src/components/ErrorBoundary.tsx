import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      "[ErrorBoundary] Caught error:",
      error.message,
      "\nComponent stack:",
      errorInfo.componentStack
    );
  }

  private handleTryAgain = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div role="alert" aria-live="assertive" className="flex flex-col items-center justify-center min-h-screen px-5 py-10 font-['Inter',sans-serif] text-center">
          <div className="mb-6 text-[48px]" aria-hidden="true">
            &#x26A0;
          </div>
          <h1 className="text-[28px] font-bold mb-3 text-[#1A1A2E]">
            Something went wrong
          </h1>
          <p className="text-base text-[#6B7280] mb-2 max-w-[480px]">
            An unexpected error occurred. You can try again or return to the
            home page.
          </p>
          {this.state.error && (
            <p className="text-sm text-[#9CA3AF] mb-6 max-w-[480px] font-mono break-all">
              {this.state.error.message}
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={this.handleTryAgain}
              className="px-7 py-3 rounded-lg border-none bg-[#1A1A2E] text-white text-[15px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
            <button
              onClick={this.handleGoHome}
              className="px-7 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A1A2E] text-[15px] font-semibold cursor-pointer hover:bg-[#F9FAFB] transition-colors"
            >
              Go home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
