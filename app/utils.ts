export function onKeySubmit({ key }, onClick: () => void) {
  if (key === "Enter" || key === " ") {
    onClick();
  }
}
