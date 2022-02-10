import {usuarioIngresado} from './boolean'

describe('debe de retornar un boolean', ()=>{
    it('debe retornar true', ()=>{
        const res = usuarioIngresado();

        // expect( res ).not.toBeTruthy();// esperon un false
        expect( res ).toBeTruthy();// esperon un true
    })
})