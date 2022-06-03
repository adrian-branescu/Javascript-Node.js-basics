function add(a, b) {
    if (typeof a === 'object' || typeof b === 'object')
        throw new Error('At least one parameter is object');
    return a + b;
}

export {
    add
}