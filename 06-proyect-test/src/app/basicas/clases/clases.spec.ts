import { Jugador } from "./clases"


describe('Prueba de clase', ()=>{

    const jugador = new Jugador(); 

    beforeAll( ()=>{
        // console.log('beforeAll');
    });

    beforeEach( ()=>{
        // console.log('beforeEach');
    });

    afterAll( ()=>{
        // console.log('afterAll');
    });

    afterEach( ()=>{
        // console.log('afterEach');
        jugador.hp = 100;
    });

    it('Debe de retorna 80 de hp, se recive de daño',() => {
        // const jugador = new Jugador();
        // jugador 
        const resp = jugador.recibeDanio(20);

        expect( resp ).toBe(80)
    })

    // xit satar una prueba o xdescribe
    it('Debe de retorna 50 de hp, si recibe 50 de daño',() => {
        // const jugador = new Jugador();
        const resp = jugador.recibeDanio(50);

        expect( resp ).toBe(50);
    })

})


/*

    Para probar grafica mente cuaton llevo de la aplicacion.
    ng test --code--coverage

*/
