export default class KeyValue<K, V> {
    private store: Map<K, V>;
  
    constructor() {
      this.store = new Map<K, V>();
    }
  
    set(key: K, value: V): void {
      this.store.set(key, value);
    }
  
    get(key: K): V | undefined {
      return this.store.get(key);
    }
  
    has(key: K): boolean {
      return this.store.has(key);
    }
  
    delete(key: K): void {
      this.store.delete(key);
    }
  
    clear(): void {
      this.store.clear();
    }
  
    keys(): K[] {
      return [...this.store.keys()];
    }
  
    values(): V[] {
      return [...this.store.values()];
    }
  
    entries(): [K, V][] {
      return [...this.store.entries()];
    }
  }