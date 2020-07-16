import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';
import { NumbersCollection } from './NumbersCollection';

const charactersCollection = new CharactersCollection('Xaayb');
const numbersCollection = new NumbersCollection([50, 3, -5, 0]);

// note: you cannot make an instance of an abstract class
//  calling new Sorter(linkedList) will throw an error

const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

charactersCollection.sort();
numbersCollection.sort();
linkedList.sort();

console.log(numbersCollection.data);
console.log(charactersCollection.data);
linkedList.print();
