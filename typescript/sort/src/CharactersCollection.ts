import { Sorter } from './Sorter';

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    const left = this.data[leftIndex].toLowerCase();
    const right = this.data[rightIndex].toLowerCase();
    return left > right;
  }

  swap(leftIndex: number, rightIndex: number): void {
    const characters = this.data.split('');
    const left = characters[leftIndex];
    characters[leftIndex] = characters[rightIndex];
    characters[rightIndex] = left;
    this.data = characters.join('');
  }
}
