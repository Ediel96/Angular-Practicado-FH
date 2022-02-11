
import { Jugador2 } from  './jugador2';

describe('Jugar 2 Emit',()=>{

    let jugador : Jugador2;

    beforeEach(() => jugador = new Jugador2());

    it('Debe de emiti un evento cuado recibe daño' , () =>{

        let nuevoHP = 0;

        jugador.hpCambia.subscribe(hp => {
            let nuevoHP = 0;

            jugador.hpCambia.subscribe(hp => {
                nuevoHP = hp
            })

            jugador.recibeDanio(1000);
            expect( nuevoHP ).toBe(0);
        });
    });

    it('Debe de emiti un evento cuado recibe daño y sobrevivir si es menor de 100' , () =>{

        let nuevoHP = 0;

        jugador.hpCambia.subscribe(hp => {
            let nuevoHP = 0;

            jugador.hpCambia.subscribe(hp =>  nuevoHP = hp )

            jugador.recibeDanio(50);
            expect( nuevoHP ).toBe(50);
        });
    })

})