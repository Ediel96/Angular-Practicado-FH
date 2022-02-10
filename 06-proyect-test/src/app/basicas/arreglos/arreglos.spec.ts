import { obtenerRobots } from "./arreglos"


describe('Prueba de arreglos', ()=>{

    it('Debe de retornar al menos 3 robots',()=>{
        const res = obtenerRobots();
        // expect(res.length).toBe(3); //Que se igual a tres.
        expect(res.length).toBeGreaterThanOrEqual(3); //igual o mayor a tres 
    })

    it('Debe de existir megan o ultron',()=>{
        const res = obtenerRobots();
        expect(res).toContain('MeganMan'); //igual o mayor a tres 
        expect(res).toContain('Ultron'); //igual o mayor a tres 

    })

})