
export function GetDistance(x1: number, y1: number, x2: number, y2: number) {
    let xDist = x1 - x2;
    let yDist = y1 - y2;
    xDist *= xDist;
    yDist *= yDist;

    let result = Math.sqrt(xDist + yDist);
    return result;
}

export function Collide(object1: any, object2: any) {
    let dist = GetDistance(object1.x, object1.y, object2.x, object2.y);
    if (dist < object1.radius + object2.radius) {
        return true;
    }
    else {
        return false;
    }
}

export function CollideCoords(x1:number, y1:number, x2:number, y2:number, maxdist:number) {
    let dist = GetDistance(x1, y1, x2, y2);

    if (dist < maxdist) {
        return true;
    }
    else {
        return false;
    }
}

export function GetRandom(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ChooseRandom(array: any) {
    let chance = 100 / array.length;
    let roll = GetRandom(0, 100);

    for (let i = 0; i < array.length; i++) {
        if (i * chance < roll && roll < (i + 1) * chance) {
            return array[i];
        }
    }
}

export function ChooseRandomUnevenChances(array: any, chances: any) {
    if (array.length === chances.length) {
        let totalChance = 0;
        let maxChance = 0;
        for (let i = 0; i < chances.length; i++) {
            maxChance += chances[i];
        }
        let roll = GetRandom(0, maxChance);
        for (let i = 0; i < array.length; i++) {
            if (totalChance < roll && roll < totalChance + chances[i]) {
                return array[i];
            }
            else {
                totalChance += chances[i];
            }
        }
    }
}

export function RemoveFromArray(element: any, array: any) {
    array = array.filter( (c: any) => {
        return c != element;
    })
    return array;
}
