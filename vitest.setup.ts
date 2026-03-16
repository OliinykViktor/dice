import "@testing-library/jest-dom/vitest";

function createStorageMock() {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = String(value);
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}

Object.defineProperty(window, "localStorage", {
  value: createStorageMock(),
  configurable: true,
});
