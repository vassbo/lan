export function process() {
  return {
    PASSWORD: import.meta.env.VITE_PASSWORD || "dev",
    KEY: import.meta.env.VITE_KEY || "dev",
  }
}
