class Storage {
  private storage = window.localStorage;

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  get(key: string): string {
    return this.storage.getItem(key);
  }

  delete(key: string): void {
    this.storage.removeItem(key);
  }

  setSerialize(key: string, value: any): void {
    this.set(key, JSON.stringify(value));
  }

  getUnserialize<T>(key: string): T {
    const data = this.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }
}

export default Storage;
