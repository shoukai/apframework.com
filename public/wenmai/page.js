const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  const label = dark ? themeButton.dataset.toLight : themeButton.dataset.toDark;
  themeButton.setAttribute("aria-label", label);
  themeButton.title = label;
}

setTheme(root.dataset.theme === "dark" ? "dark" : "light");
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  try { localStorage.setItem("wenmai-landing-theme", next); } catch {}
});

const tablist = document.querySelector(".tabs");
const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

function selectTab(index) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(index));
  tab.addEventListener("keydown", (event) => {
    let next;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % tabs.length; break;
      case "ArrowLeft": next = (index + tabs.length - 1) % tabs.length; break;
      case "Home": next = 0; break;
      case "End": next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectTab(next);
    tabs[next].focus();
  });
});

selectTab(0);
tablist.hidden = false;
