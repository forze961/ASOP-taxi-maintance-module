/**
 * helpers without business logic
 */

export function getCurrentDate() {
  const date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}
