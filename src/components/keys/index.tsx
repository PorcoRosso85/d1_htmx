export const KeysTest = () => {
  return (
    <html lang="en">
      <head>
        <title>ctrlKey example</title>
      </head>
      <body>
        <p>
          Press any character key, with or without holding down the CTRL key.
          <br />
          You can also use the SHIFT key together with the CTRL key.
        </p>
        <div hx-on:click="alert('Clicked!')">Click</div>
        <button
          hx-trigger="click, keyup[altKey&&key=='Q'] from:body"
          hx-post="/doit"
          hx-confirm="are you sure"
        >
          Do It! (alt-shift-D)
        </button>
      </body>
    </html>
  );
};
