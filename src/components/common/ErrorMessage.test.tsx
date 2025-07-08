import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  const defaultProps = {
    message: "Test error message",
  };

  it("renders with required props", () => {
    render(<ErrorMessage {...defaultProps} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("error")).toBeInTheDocument(); // Material icon
  });

  it("renders with custom title", () => {
    const customTitle = "Custom Error Title";
    render(<ErrorMessage {...defaultProps} title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage {...defaultProps} />);

    const retryButton = screen.queryByRole("button", { name: /try again/i });
    expect(retryButton).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("calls onRetry multiple times when retry button is clicked multiple times", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(retryButton);
    fireEvent.click(retryButton);
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(3);
  });

  it("renders with all props provided", () => {
    const onRetry = vi.fn();
    const props = {
      message: "Custom error message",
      title: "Custom Title",
      onRetry,
    };

    render(<ErrorMessage {...props} />);

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("has proper CSS classes for styling", () => {
    render(<ErrorMessage {...defaultProps} />);

    const container = screen.getByText("Test error message").closest("div");
    expect(container).toHaveClass("text-center", "max-w-md");
  });

  it("retry button has proper CSS classes and attributes", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toHaveClass(
      "px-4",
      "py-2",
      "bg-gray-500",
      "text-white",
      "rounded-lg",
      "font-medium",
      "hover:bg-gray-600",
      "transition-colors",
      "duration-200",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-gray-500",
      "focus:ring-offset-2",
      "min-h-[44px]"
    );
  });

  it("renders error icon with proper classes", () => {
    render(<ErrorMessage {...defaultProps} />);

    const errorIcon = screen.getByText("error");
    expect(errorIcon).toHaveClass(
      "material-symbols-outlined",
      "text-6xl",
      "text-red-500",
      "mb-4"
    );
  });

  it("renders title with proper classes", () => {
    render(<ErrorMessage {...defaultProps} />);

    const title = screen.getByText("Something went wrong");
    expect(title).toHaveClass(
      "text-xl",
      "font-semibold",
      "text-gray-900",
      "mb-2"
    );
  });

  it("renders message with proper classes", () => {
    render(<ErrorMessage {...defaultProps} />);

    const message = screen.getByText("Test error message");
    expect(message).toHaveClass("text-gray-600", "mb-6", "leading-relaxed");
  });

  it("handles long error messages", () => {
    const longMessage =
      "This is a very long error message that should still be displayed properly even when it contains a lot of text and potentially wraps to multiple lines in the error display component.";

    render(<ErrorMessage message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it("handles empty message", () => {
    render(<ErrorMessage message="" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    const messageElement = screen.getByText(
      "Something went wrong"
    ).nextElementSibling;
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveTextContent("");
  });

  it("handles special characters in message", () => {
    const specialMessage = "Error: Failed to load data! @#$%^&*()";

    render(<ErrorMessage message={specialMessage} />);

    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });

  it("maintains accessibility", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });

    // Test that button is accessible and focusable
    expect(retryButton).toBeEnabled();
    expect(retryButton).toBeVisible();

    // Test click interaction
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
