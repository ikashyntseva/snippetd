function Tooltip(el) {
  const tooltip = create();

  function create() {
    const div = document.createElement("div");

    div.innerHTML = `<div class='tooltip-content'></div>`;
    div.classList.add("tooltip");

    return document.body.appendChild(div);
  }

  function calculatePosition(el) {
    const top = `${el.offsetTop +
      el.offsetHeight / 2 -
      tooltip.offsetHeight / 2}px`;
    const left = `${el.offsetWidth + 50}px`;

    return {
      top,
      left
    };
  }

  tooltip.setTooltipPosition = function setTooltipPosition(el) {
    const { top, left } = calculatePosition(el);

    this.style.top = top;
    this.style.left = left;
  };

  tooltip.setContent = function setContent(el) {
    const text = el.dataset.tooltip || "";

    this.querySelector(".tooltip-content").textContent = text;
  };

  tooltip.show = function show() {
    this.classList.add("shown");
  };

  tooltip.hide = function hide() {
    this.classList.remove("shown");
  };

  tooltip.init = function init(el) {
    this.setContent(el);
    this.setTooltipPosition(el);
    this.show();
  };

  tooltip.init(el);

  return tooltip;
}

const waitForElementsWithTooltip = setInterval(() => {
  if (document.querySelectorAll("[data-tooltip]").length) {
    const elementsWithTooltip = document.querySelectorAll("[data-tooltip]");
    let tooltip;

    Array.from(elementsWithTooltip).forEach(el => {
      el.addEventListener("mouseover", ev => {
        tooltip = new Tooltip(ev.target);
      });
      el.addEventListener("mouseout", tooltip.hide);
    });
    clearInterval(waitForElementsWithTooltip);
  }
}, 100);
