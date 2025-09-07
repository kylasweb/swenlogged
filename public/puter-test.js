// Simple test script to verify Puter.js AI functionality
// This can be run in the browser console

async function testPuterAI() {
  console.log('Testing Puter.js AI service...');

  // Check if Puter.js is loaded
  if (!window.puter || !window.puter.ai) {
    console.error('Puter.js not loaded or AI service not available');
    return;
  }

  console.log('Puter.js is available, testing AI chat...');

    try {
      const testPrompt = 'What is shipping?';
      console.log('Sending test prompt:', testPrompt);

      const response = await window.puter.ai.chat(testPrompt, {
        testMode: true,
        model: 'gpt-4o-mini'
      });

      console.log('Raw response:', response);

      // Defensive extraction (JS-friendly version of centralized parser)
      let responseText = 'No response text found';

      if (response) {
        try {
          // OpenAI-like choices
          if (Array.isArray(response.choices) && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
            const content = response.choices[0].message.content;
            if (typeof content === 'string') responseText = content;
            else if (Array.isArray(content)) {
              responseText = (content || [])
                .filter(item => item && typeof item === 'object' && 'type' in item && item.type === 'text')
                .map(item => item && typeof item === 'object' && 'text' in item ? item.text : '')
                .join(' ')
                .trim();
            }
          }

          // Puter.js streaming parts
          if ((!responseText || responseText === 'No response text found') && response.message && response.message.content) {
            const content = response.message.content;
            if (typeof content === 'string') responseText = content;
            else if (Array.isArray(content)) {
              responseText = (content || [])
                .filter(item => item && typeof item === 'object' && 'type' in item && item.type === 'text')
                .map(item => item && typeof item === 'object' && 'text' in item ? item.text : '')
                .join(' ')
                .trim();
            }
          }

          // Top-level fallbacks
          if ((!responseText || responseText === 'No response text found') && response.content) responseText = response.content;
          if ((!responseText || responseText === 'No response text found') && response.text) responseText = response.text;
          if ((!responseText || responseText === 'No response text found') && typeof response === 'string') responseText = response;
        } catch (err) {
          console.error('Error parsing AI response in puter-test.js:', err);
        }
      }

      console.log('Extracted response text:', responseText);

    // Check if it's lorem ipsum
    const lowerResponse = responseText.toLowerCase();
    const isLoremIpsum = lowerResponse.includes('lorem ipsum') ||
                        lowerResponse.includes('dolor sit amet') ||
                        lowerResponse.includes('consectetur adipiscing');

    console.log('Is lorem ipsum?', isLoremIpsum);

    return {
      success: true,
      response: responseText,
      isLoremIpsum,
      rawResponse: response
    };

  } catch (error) {
    console.error('AI test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Auto-run the test
testPuterAI().then(result => {
  console.log('Test completed:', result);
});

// Make the function available globally for manual testing
window.testPuterAI = testPuterAI;
