

//  Interfaces
interface IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T> {
  ok: boolean;
  mensaje: string;
  data?: T;
}

//  Clase Estudiante
class Estudiante implements IEstudiante {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public carrera: string,
    public activo: boolean,
    public promedio: number
  ) {}
}

//  Clase SistemaEstudiantes
class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

  agregar(est: Estudiante): IResultado<Estudiante> {
    if (this.estudiantes.some(e => e.id === est.id)) {
      return { ok: false, mensaje: `ID ${est.id} ya existe.` };
    }
    if (est.edad < 15 || est.edad > 80) return { ok: false, mensaje: 'Edad inválida.' };
    if (est.promedio < 0 || est.promedio > 10) return { ok: false, mensaje: 'Promedio inválido.' };

    this.estudiantes.push(est);
    return { ok: true, mensaje: 'Estudiante agregado', data: est };
  }

  listar(): Estudiante[] {
    return this.estudiantes;
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let est of this.estudiantes) {
      if (est.id === id) return { ok: true, mensaje: 'Encontrado', data: est };
    }
    return { ok: false, mensaje: 'No encontrado' };
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
    if (nuevoPromedio < 0 || nuevoPromedio > 10) return { ok: false, mensaje: 'Promedio inválido' };
    for (let est of this.estudiantes) {
      if (est.id === id) {
        est.promedio = nuevoPromedio;
        return { ok: true, mensaje: 'Promedio actualizado', data: est };
      }
    }
    return { ok: false, mensaje: 'No encontrado' };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let est of this.estudiantes) {
      if (est.id === id) {
        est.activo = activo;
        return { ok: true, mensaje: 'Estado actualizado', data: est };
      }
    }
    return { ok: false, mensaje: 'No encontrado' };
  }

  listarActivos(): Estudiante[] {
    return this.estudiantes.filter(e => e.activo);
  }

  promedioGeneral(): number {
    if (this.estudiantes.length === 0) return 0;
    return parseFloat(
      (this.estudiantes.reduce((acc, e) => acc + e.promedio, 0) / this.estudiantes.length).toFixed(2)
    );
  }
}

//  Funciones
function mostrarMenu(): void {
  console.log(`
=== MINI SISTEMA DE ESTUDIANTES ===
1. Agregar estudiante
2. Listar estudiantes
3. Buscar estudiante por ID
4. Actualizar promedio
5. Cambiar estado
6. Listar activos
7. Promedio general
0. Salir
  `);
}

function ejecutarDemo(sistema: SistemaEstudiantes): void {
  console.log('--- Demo agregando estudiantes ---');
  sistema.agregar(new Estudiante(1, 'Ana', 20, 'Ingeniería', true, 8.5));
  sistema.agregar(new Estudiante(2, 'Luis', 22, 'Medicina', true, 9.2));
  sistema.agregar(new Estudiante(3, 'Carlos', 19, 'Derecho', true, 7.8));

  console.log('\n--- Listando todos ---');
  console.log(sistema.listar());

  console.log('\n--- Buscando ID 2 ---');
  console.log(sistema.buscarPorId(2));

  console.log('\n--- Actualizando promedio ID 3 ---');
  console.log(sistema.actualizarPromedio(3, 9.0));

  console.log('\n--- Cambiando estado ID 1 a inactivo ---');
  console.log(sistema.cambiarEstado(1, false));

  console.log('\n--- Listando activos ---');
  console.log(sistema.listarActivos());

  console.log('\n--- Promedio general ---');
  console.log(sistema.promedioGeneral());
}

//  Ejecutar demo
const sistema = new SistemaEstudiantes();
mostrarMenu();
ejecutarDemo(sistema);
