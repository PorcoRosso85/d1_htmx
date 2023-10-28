export const LazyLoading = () => {
  const script = `
  .htmx-settling img {
    opacity: 0;
  }
  img {
   transition: opacity 300ms ease-in;
  }
  `;

  return (
    <>
      <script>{script}</script>
      <div hx-get="/example/img" hx-trigger="load">
        <img
          alt="Result loading..."
          class="htmx-indicator"
          width="150"
          src="https://htmx.org/img/bars.svg"
        />
      </div>
    </>
  );
};
