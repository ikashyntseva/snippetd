function Tooltip() {
  const template = `<div class='tooltip'>
    <div class='tooltip-content'>Tooltip Content</div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", template);

  this.tooltip = document.querySelector(".tooltip");
  this.tooltip.setTooltipPosition = position => {
    this.tooltip.style.top = position.top;
    this.tooltip.style.left = position.left;
  };
  this.tooltip.setContent = text => {
    this.tooltip.querySelector(".tooltip-content").textContent = text;
  };

  this.tooltip.show = () => this.tooltip.classList.add("shown");
  this.tooltip.hide = () => this.tooltip.classList.remove("shown");

  return this.tooltip;
}

function createTooltip() {
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

  const tooltip = new Tooltip();
  const waitForElementsWithTooltip = setInterval(function() {
    if (document.querySelectorAll("[data-tooltip]").length) {
      const elementsWithTooltip = document.querySelectorAll("[data-tooltip]");
      Array.from(elementsWithTooltip).forEach(el => {
        el.addEventListener("mouseover", ev => {
          const position = calculatePosition(ev.target);
          tooltip.setContent(ev.target.dataset.tooltip);
          tooltip.show();
          tooltip.setTooltipPosition(position);
        });
        el.addEventListener("mouseout", () => {
          tooltip.hide();
        });
      });
      clearInterval(waitForElementsWithTooltip);
    }
  }, 100);
}

createTooltip();
