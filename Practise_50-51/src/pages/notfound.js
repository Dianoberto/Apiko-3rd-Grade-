const root = document.getElementById("app");

export function NotFound() {
  const layout = `
        <h3>Page was not found</h3>
    `;
  root.innerHTML = layout;
}
