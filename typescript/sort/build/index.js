"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharactersCollection_1 = require("./CharactersCollection");
var LinkedList_1 = require("./LinkedList");
var NumbersCollection_1 = require("./NumbersCollection");
var charactersCollection = new CharactersCollection_1.CharactersCollection('Xaayb');
var numbersCollection = new NumbersCollection_1.NumbersCollection([50, 3, -5, 0]);
// note: you cannot make an instance of an abstract class
//  calling new Sorter(linkedList) will throw an error
var linkedList = new LinkedList_1.LinkedList();
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
