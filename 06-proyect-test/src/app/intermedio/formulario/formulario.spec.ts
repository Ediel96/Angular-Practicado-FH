import { FormBuilder } from '@angular/forms'
import { FormularioRegister } from './formulario'

describe('Formulario', () => {

    let component: FormularioRegister

    beforeEach( () =>{
        component = new FormularioRegister(new FormBuilder());
    });

    it('Debe de crear una formulario con dos campos, email y password', () => {

        expect( component.form.contains('email') ).toBeTruthy();
        expect( component.form.contains('password') ).toBeTruthy();

    });

    it('El email debe de ser obligatorio', () => {

        const control = component.form.get('email');
        control?.setValue('');
        expect( control?.valid ).toBeFalsy();

    })

    it('El email debe de ser un correo valido', () => {

        const control = component.form.get('email');
        control?.setValue('fernado@');
        expect( control?.valid ).toBeFalsy();

    })

})