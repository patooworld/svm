import { useState, useRef, useEffect } from 'react';
import generateContent from './api'; // Import API function
import './styles.css'; // Add style import

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const scrollRef = useRef();

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setApiError(null); // Reset any previous error
    setOutputText(''); // Reset previous output

    try {
      // Simulate API call (replace with actual API call later)
        const resp = await generateContent({
            text: inputText,
          functionDeclarations: null,
          file: null
          });

      // Process API response (assuming the response.text() method exists)
        if (resp && resp.text) {
            setOutputText(resp.text());
        } else {
          throw new Error("Invalid API response");
        }


    } catch (error) {
      console.error('Error during API call:', error);
      setApiError(`Error generating response: ${error.message}`);
      setOutputText('');
    } finally {
      setIsLoading(false);
        scrollRef.current.scrollTo({top: 0});
    }
  };

  // Optional: Auto-focus on text input when component mounts
  useEffect(() => {
    // Find the textarea using its ref and focus on it (may be different depending on exact HTML)
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.focus();
    }
  }, []);


    return (
        <main className="app-container"> {/* Added a main container for layout */}
            <section className="input-section"> {/* Separated input area */}
                <textarea
                    className="input-textarea"
                    placeholder="Enter your text prompt..."
                    value={inputText}
                    onChange={handleInputChange}
                    rows="5"
                />
                <button
                    className="generate-button"
                    onClick={handleGenerate}
                    disabled={isLoading || !inputText.trim()}
                >
                    {isLoading ? 'Generating...' : 'Generate'}
                </button>

            </section>
            <div className="tools">
                <section className="output-section" ref={scrollRef}> {/* Added output section */}
                    {isLoading && (
                        <div className="loading-indicator">
                            Waiting for model<span>...</span>
                        </div>
                    )}
                    {apiError && (
                        <div className="error-message">{apiError}</div>
                    )}
                    {outputText && !isLoading && (
                        <div className="output-text">
                            {outputText}
                        </div>
                    )}

                </section>
            </div>
        </main>
    );
}