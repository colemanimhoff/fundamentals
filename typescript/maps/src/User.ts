import faker from 'faker';

import { Markable } from './CustomMap';

export class User implements Markable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }
  markerContent(): string {
    return `
    <div>
      <h2>User Name: ${this.name}</h2>
    </div>
    `;
  }
}
