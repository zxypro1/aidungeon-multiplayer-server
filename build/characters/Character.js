"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
    // getters
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getImage() {
        return this.image;
    }
    // setters
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setImage(image) {
        this.image = image;
    }
    // setup d&d stats
    setStats(strength, dexterity, constitution, intelligence, wisdom, charisma) {
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
    }
}
exports.Character = Character;
