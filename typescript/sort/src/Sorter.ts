// abstract class
//  can't be used to create an object directly
//  only used as a parent class
//  can contain real implementation for some methods
// the implemented methods can refer to other methods that don't actually exist yet (we still have to provide names and types for the un-implemented methods)
// can make child classes promise to implement some other method

export abstract class Sorter {
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract length: number;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
