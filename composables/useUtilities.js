export const useUtilities = ()=> {
  function toTitleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return {
    toTitleCase,
  }
}