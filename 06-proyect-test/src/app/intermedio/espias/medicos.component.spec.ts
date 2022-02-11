import { HttpClient } from '@angular/common/http';
import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { Observable, of, throwError } from 'rxjs';
import { from } from 'rxjs';



describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
    const servicio = new MedicosService(spy);

    beforeEach( () => {
        componente = new MedicosComponent(servicio)
    });

    const medicos = ['medicos1' , 'medicos2', 'medicos3']


    it('Init: Debe de cargar los', () => {
        spyOn(servicio , 'getMedicos').and.callFake( () => {
            return from([medicos])
        });
        
        componente.ngOnInit();
        expect( componente.medicos.length ).toBeGreaterThan(0)
    });

    it('Debe de llmar al servidor para agregar un medico', () => {

        const espia = spyOn(servicio , 'agregarMedico').and.callFake( () => {
            return new Observable;
        });
        
        componente.agregarMedico();

        expect( espia ).toHaveBeenCalled();
    });


    it('Debe de agregar un nuevo medico al arreglo de merdico',()=>{
        const medico = {id :1 , nombre:'Juan'};

        spyOn(servicio, 'agregarMedico')
            .and.returnValue(from([medico]));

        componente.agregarMedico();

        expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);
    });

    it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio', ()=>{

        const miError = 'No se puede agrefar el medico';

        spyOn(servicio, 'agregarMedico').and.returnValue( throwError(miError) )

        componente.agregarMedico();

        expect( componente.mensajeError ).toBe(miError)
    });

    it('Debe de llamar al servidoer para borrar un medico',() =>{

        spyOn( window , 'confirm').and.returnValue(true);

        const espia = spyOn(servicio, 'borrarMedico')
            .and.returnValue(new Observable);

        componente.borrarMedico('1');

        expect(espia).toHaveBeenCalledWith('1')
    })

});
