import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(key: string, value: any): void {
    key = key + '_' + uuidv4();
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): { key: string; obj: T }[] {
    let tab: { key: string; obj: T }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const strkey = localStorage.key(i);
      if (strkey?.startsWith(key)) {
        const data = JSON.parse(localStorage.getItem(strkey)!);
        tab.push({ key: strkey, obj: data as T });
      }
    }
    return tab;
  }

  remove(key: string): void {
    console.log(key)
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
