//DEFINICION DE LAS CLASES
class Libro{
    constructor(titulo, autor, isbn){
        this.titulo = titulo
        this.autor = autor
        this.isbn = isbn
    }
}

class UI{

    static mostrarLibros(){
        const libros = Datos.traerLibros();
        libros.forEach((libro) => UI.agregarLibro(libro));
            
    }

    static agregarLibro(libro){
        const lista = document.querySelector('#libro-list');
        const fila = document.createElement('tr');
        fila.innerHTML = 
        `<td> ${libro.titulo}</td> 
        <td> ${libro.autor}</td>
        <td> ${libro.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-small delete">X</a></td>`;
        lista.appendChild(fila);
    }
    static eliminarLibro(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }

    }

    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static limpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';
    }

}

class Datos{

    static traerLibros(){
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];            
        }else{
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }

    static agregarUnLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros',JSON.stringify(libros));
        
    }
    static removerLibro(isbn){
        const libros = Datos.traerLibros();
        console.log(isbn);
        libros.forEach((libro, index) =>{
            if(libro.isbn === isbn){
                libros.splice(index,1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));
    }

}

//Carga de la pagina
document.addEventListener('DOMContentLoaded', UI.mostrarLibros());

//Controlar el evento submit
document.querySelector('#libro-form').addEventListener('submit',(e) => {
e.preventDefault();

//Obtener valores de los campos
const titulo = document.querySelector('#titulo').value;
const autor = document.querySelector('#autor').value;
const isbn = document.querySelector('#isbn').value;

if(titulo === '' || autor === '' || isbn === ''){
    UI.mostrarAlerta('Por favor ingrese todos los datos','danger');
}else{
    const libro = new Libro(titulo, autor, isbn);
    Datos.agregarUnLibro(libro);
    UI.agregarLibro(libro);
    UI.mostrarAlerta('Libro agregado correctamente', 'success');
    UI.limpiarCampos();
}
});

//Eliminar libro
document.querySelector('#libro-list').addEventListener('click', (e) => {

    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
});
