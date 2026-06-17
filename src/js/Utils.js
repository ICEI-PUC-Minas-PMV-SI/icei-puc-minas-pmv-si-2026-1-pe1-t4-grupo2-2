import { ManagerLocalStorage } from "./ManagerLocalStorage.js";

export class Utils {
    static generateUniqueId = () => {
        const id = Math.floor(Math.random() * 900) + 100;

        return ManagerLocalStorage.idExists("pedidos", id) ? this.generateId() : id;
    }
    
    static isOnlyDigits = (str) => str.length > 0 && [...str].every(char => /\d/.test(char));

}