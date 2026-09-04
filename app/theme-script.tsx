const themeBootstrap = `(() => {
  const requestedTheme = new URLSearchParams(window.location.search).get("theme");
  document.documentElement.dataset.theme = requestedTheme === "classic" ? "classic" : "mint";
})();`;

export function ThemeScript() {
  return (
    <script
      id="theme-bootstrap"
      dangerouslySetInnerHTML={{ __html: themeBootstrap }}
    />
  );
}
