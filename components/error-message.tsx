"use client"

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const isApiKeyError = message.includes("API key") || message.includes("configuration")

  return (
    <div className="error-message">
      <div className="error-icon">{isApiKeyError ? "🔑" : "⚠️"}</div>
      <p className="error-text">{message}</p>
      {isApiKeyError && (
        <div className="error-details">
          <p style={{ color: "#4ecdc4", fontWeight: "600", marginBottom: "1rem" }}>To fix this issue:</p>
          <ol
            style={{
              textAlign: "left",
              color: "#ccc",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li style={{ marginBottom: "0.5rem" }}>
              Get your free API key from{" "}
              <a
                href="https://www.themoviedb.org/settings/api"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ecdc4", textDecoration: "underline" }}
              >
                TMDB API Settings
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Create a{" "}
              <code style={{ background: "#333", padding: "2px 6px", borderRadius: "3px", color: "#4ecdc4" }}>
                .env.local
              </code>{" "}
              file in your project root
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              Add this line to the file:{" "}
              <code
                style={{
                  background: "#333",
                  padding: "4px 8px",
                  borderRadius: "3px",
                  color: "#4ecdc4",
                  display: "block",
                  marginTop: "0.5rem",
                }}
              >
                TMDB_API_KEY=fbe913b803ddcd111a040aab3e35343b
              </code>
            </li>
            <li>Restart your development server</li>
          </ol>
          <div
            style={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            <p style={{ color: "#888", fontSize: "0.8rem", margin: 0 }}>
              💡 <strong>Tip:</strong> Make sure to use <code style={{ color: "#4ecdc4" }}>TMDB_API_KEY</code> for security.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ErrorMessage
