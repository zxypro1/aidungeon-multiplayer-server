"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
class Character {
    constructor(name, description, client) {
        this.name = name;
        this.description = description;
        this.client = client;
        // pick a random light color
        this.color = 'hsl(' + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)';
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
    getClient() {
        return this.client;
    }
    getInfo() {
        let info = {
            name: this.name,
            description: this.description,
            color: this.color
        };
        return info;
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
