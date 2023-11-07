export function addClassNamesToElement(element, ...classNames) {
  classNames.forEach((className) => {
    if (typeof className === "string") {
      const classesToAdd = className.split(" ").filter((n) => n !== "");
      element.classList.add(...classesToAdd);
    }
  });
}
