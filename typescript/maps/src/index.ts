// import { Business } from './Business';
import { Business } from './Business';
import { CustomMap } from './CustomMap';
import { User } from './User';

const customMap = new CustomMap('map');

const business = new Business();
const user = new User();

customMap.addMarker(business);
customMap.addMarker(user);
