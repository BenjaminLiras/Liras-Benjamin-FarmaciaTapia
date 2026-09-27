let currentId = 0;

export function nextId() {
  currentId += 1;
  return currentId;
}
