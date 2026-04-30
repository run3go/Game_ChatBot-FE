'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
            <p className="text-sm">화면을 불러오는 중 오류가 발생했습니다.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
            >
              다시 시도
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
