import { Client } from "@colyseus/core";
import { characterJSON } from "../types";

export class Character {
    // basic info
    name: string;
    description: string;
    image: string;
    client: Client;
    color: string;

    // D&D stats
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

    // D&D skills
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    sleightOfHand: number;
    stealth: number;
    survival: number;

    constructor(name: string, description: string, client: Client) {
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
        let info: characterJSON = {
            name: this.name,
            description: this.description,
            color: this.color
        }
        return info;
    }

    // setters
    setName(name: string) {
        this.name = name;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setImage(image: string) {
        this.image = image;
    }

    // setup d&d stats
    setStats(strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number) {
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
    }
}