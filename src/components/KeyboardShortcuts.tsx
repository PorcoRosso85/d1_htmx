export const KeysTest = () => {
  return (
    <html lang="en">
      <head>
        <title>ctrlKey example</title>
      </head>
      <body>
        <button
          hx-trigger="click, keyup[altKey&&shiftKey&&key=='D'] from:body"
          hx-post="/doit"
          hx-confirm="are you sure"
        >
          Do It! (alt-shift-D)
        </button>
      </body>
    </html>
  );
};
