export class ManagerLocalStorage {
    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static getAllKeys() {
        return Object.keys(localStorage);
    }

    static getAllItems() {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            items[key] = JSON.parse(localStorage.getItem(key));
        }
        return items;
    }

    static updateItem(key, newValue) {
        if (localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(newValue));
        } else {
            throw new Error(`Item com a chave "${key}" não encontrado.`);
        }
    }

    static idExists(entity, id) {
        const items = ManagerLocalStorage.getItem(entity);

        if (!items) return false;

        for(let i = 0; i < items.length; i++) {
            if(items[i].id === id) {
                return true;
            }
        }

        return false;
    }
}