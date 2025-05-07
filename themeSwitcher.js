const injectMonochromeHomeContent = () => {
  const homeParagraph = document.querySelector(".page-tagline");
  homeParagraph.replaceChildren(
    `Hey! I'm Hanna Harmon. Thanks for visiting my website. Use the buttons below to navigate. When you scroll down, do so within this little screen.`
  );
};
const injectManychromeHomeContent = () => {
  const homeParagraph = document.querySelector(".page-tagline");
  homeParagraph.replaceChildren(
    "Hey! I'm Hanna Harmon. Thanks for visiting my website. If you get bored and are viewing on a computer, feel free to draw in the background with left click. Refresh to clear."
  );
};

themeSwitches[0].addEventListener("click", changeTheme);
themeSwitches[1].addEventListener("click", changeTheme);

function changeTheme() {
  theme = localStorage.getItem("theme");
  theme !== "manychrome" ? goToManychrome() : goToMonochrome();
  checkHomeContent();
  checkMouseListeners();
  location.reload();
}

function checkHomeContent() {
  if (fileName === "index.html" || fileName === "") {
    localStorage.getItem("theme") === "manychrome"
      ? injectManychromeHomeContent()
      : injectMonochromeHomeContent();
  }
}
function checkMouseListeners() {
  if (localStorage.getItem("theme") !== "manychrome")
    addMonochromeMouseListeners();
}
checkHomeContent();
checkMouseListeners();
