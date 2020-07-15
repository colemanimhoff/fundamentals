import faker from 'faker';

import { Markable } from './CustomMap';

export class Business implements Markable {
  businessName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.businessName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }
  markerContent(): string {
    return `
      <div>
        <h2>Business Name: ${this.businessName}</h2>
        <h3>Catch Phrase: ${this.catchPhrase}<h3>
      </div>
    `;
  }
}
