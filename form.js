const generarlegajo = () => {
    let legajo = Math.floor(Math.random()*(99999-9999+1)+9999);
    return legajo;
}    

const addStudent = (event) =>{
    event.preventDefault(); //para que al clickear el submit la pagina no se actualice
    
    const student = {
        name: document.getElementById('textName').value,
        lastname: document.getElementById('textLastname').value, 
    }

    student.legajo = generarlegajo();

    let students = getArray('students');

    students.push(student);

    localStorage.setItem('students', JSON.stringify(students));

    console.log(students);

    const table = {
        activePage: 1,
        from: 0,
        limit: 3,
        pages: Number,
        activeLimit: Number
    }

    table.activeLimit= table.limit;
    table.pages = students.length / table.limit;

    localStorage.setItem('table', JSON.stringify(table));

    console.log(table);

    document.getElementById('textName').value = null; //se borra el interior del campo de texto
    document.getElementById('textLastname').value = null;

    /*window.location.href = './student.html'; //permite la navegacion*/
}

const funcion = () =>{
    alert('entro')
}