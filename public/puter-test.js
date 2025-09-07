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

    // Try to extract text from response
    let responseText = 'No response text found';

    if (response) {
      if (response.message?.content) {
        if (Array.isArray(response.message.content)) {
          responseText = response.message.content
            .filter(item => item && typeof item === 'object' && item.type === 'text')
            .map(item => item && typeof item === 'object' && item.text ? item.text : '')
            .join('');
        } else if (typeof response.message.content === 'string') {
          responseText = response.message.content;
        }
      } else if (response.choices && response.choices[0]?.message?.content) {
        responseText = response.choices[0].message.content;
      } else if (response.content) {
        responseText = response.content;
      } else if (typeof response === 'string') {
        responseText = response;
      } else if (response.text) {
        responseText = response.text;
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
