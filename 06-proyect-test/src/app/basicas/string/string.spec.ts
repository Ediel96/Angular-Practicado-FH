//deccibe('Pruebas string')
//it('bebe regresar un string')

import { mensaje } from "./string"

describe('Prebas de string', () =>{


    it('debe de regresar un string', ()=>{
        const resp = mensaje('Hamilton');
        expect(typeof resp ).toBe('string')
    })

    it('debe de regresar un saluvo con el nombre enviado', ()=>{
        const resp = mensaje('Hamilton');
        // expect( resp ).toBe('Saludo Hamilton'); // que sea exactamente la respuesta
        expect( resp ).toContain('Hamilton');// que contenga mi nombre

    })

})