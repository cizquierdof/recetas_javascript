/****************************
 * Métodos de array útiles
 * que no modifican el array original
 * *************************/

const items = [
    { name: 'Bici', price: 100 },
    { name: 'Tele', price: 200 },
    { name: 'Album', price: 10 },
    { name: 'Libro', price: 5 },
    { name: 'Teléfono', price: 500 },
    { name: 'ordenador', price: 1000 },
    { name: 'teclado', price: 25 },
]


/*************** 1. Filter ***************/

//devuelve los elementos cuyo precio es menor o igual a 100
const elementosFiltrados = items.filter((e) => {
    return e.price <= 100
});

console.log('Filtrado', elementosFiltrados);

/***************** 2. Map***************** */

//recorre el array y realiza una operación por cada elemento
const elementosModificados = items.map((e) => {
    return { name: e.name, price: e.price * 2 }
})

const names = items.map(e => {
    return e.name
})

//esto si que modifica el array original
items.map(e => {
    e.price = e.price * 2
})

console.log('nombres', names);
console.log('Modificados', elementosModificados);
console.log('Items', items);

/********************** 3. Find***************** */

//encuentra un elemento que cumple una condición
const encontrado = items.find(e => {
    return e.name === 'Libro'
})

//si más de uno cumplee la condición devuelve el primero que encuentra
const barato = items.find(e => {
    return e.price < 100
})

console.log('primer barato', barato);
console.log('Encontrado', encontrado)

/****************************** 4. Foreach**********************/

//recorre todo el array
items.forEach(e => {
    console.log('Nombre:', e.name, ', precio: ', e.price);
})

/****************************** 5. Some*************************/

//devuelve true si algún elemento cumple la condición


console.log('¿Hay items de 75?', items.some(e => e.price === 75));
console.log('¿Hay items <100?', items.some(e => e.price < 100));

/**************************** 6. every******************* */

//devuelve true si la condiciòn se cumple para todos los elementos
console.log('¿todos tienen precio', items.every(e => e.price));
console.log('¿alguno superior a 3000', items.every(e => e.price > 3000));

/******************************** 7. Reduce *********************/

//devuelve una combinación de las operaciones que se hacen 

const total = items.reduce(
    (acc, e) => {
        console.log('acc:', acc, 'name:', e.name, 'price: ', e.price);
        return e.price + acc
    }, 0);
console.log('Total: ', total);

/********************************* 8. Includes *********************/

//comprueba si un array contiene lo que se le pasa como parámetro, es más para arrays sencillas

const numbers = [1, 3, 4, 7, 9, 11];

console.log('contiene el 5?', numbers.includes(5))
console.log('contiene el 7?', numbers.includes(7))