import PCBGenerator from './generators/keyboard.kicad_pcb';
import SchematicsGenerator from './generators/keyboard.sch';
import ProjectGenerator from './generators/keyboard.pro';
import FpLibTableGenerator from './generators/fp-lib-table';
import SymLibTableGenerator from './generators/sym-lib-table';

class KiCad {
    
    /*
    * Generate the set of kicad files given a Keyboard.
    *
    * @param {Keyboard} keyboard The keyboard to generate files from.
    *
    * @return {Object} The generated source files.
    */
    static generate(keyboard) {
        return {
            [`${keyboard.slug}.kicad_pcb`]: new PCBGenerator(keyboard).generate(),
            [`${keyboard.slug}.sch`]: new SchematicsGenerator(keyboard).generate(),
            [`${keyboard.slug}.pro`]: new ProjectGenerator(keyboard).generate(),
            'fp-lib-table': new FpLibTableGenerator(keyboard).generate(),
            'sym-lib-table': new SymLibTableGenerator(keyboard).generate(),
        };
    }
    
}

export default KiCad;
