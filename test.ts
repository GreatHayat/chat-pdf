export const code = `
# Hello, Markdown!\n

> This is a test blog post to check the app functionality

I know the following languages
- Python
- JavaScript

\`\`\`Do you have any questions?\`\`\`
To generate a linked list in Python, you can use the following code:

\`\`\`jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
\`\`\`

This code defines two classes: \`Node\` and \`LinkedList\`. The \`Node\` class represents each node in the linked list, with its data and a reference to the next node. The \`LinkedList\` class represents the linked list itself, with methods to add nodes and display the list.

In the example usage, we create a \`LinkedList\` object, add three nodes to it, and then display the linked list. The output will be \`1 -> 2 -> 3 -> None\`.

Let me know if you need further assistance!
`;

export const testMessage = { role: "user", content: code };
