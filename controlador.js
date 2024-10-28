let bloqueAEnviar = [];
let bloqueRecibido = [];

let emisorLRC = [];
let receptorLRC = [];

let emisorVRC = [];
let receptorVRC = [];

const masDe8Caracteres = (textoMensaje) => { 

    if(textoMensaje.length>8){

        alert('El mensaje ingresado tiene demasiados caracteres')
        return true;

    }else{

        return false;
    }

}

const renderHead = (table, m) => {

    let textoHTML = "";

    let tableHead = document.createElement('thead')
    let rowHead = document.createElement('tr');

    for (let j = 0; j < m+1; j++) {

        if(j==0){

            textoHTML = textoHTML + "<th class='table-th'>&nbsp</th>"

        }else{
            
            textoHTML = textoHTML + "<th class='table-th'>d"+j+"</th>"
        
        }
    
    }

    textoHTML = textoHTML + "<th class='table-th'>LRC</th>"

    rowHead.innerHTML = textoHTML;

    tableHead.appendChild(rowHead);

    table.appendChild(tableHead);

}

const renderBody = (table, bloque, m, VRC, LRC) => {

    let textoHTML = "";
    let fila = 1;

    let tableBody = document.createElement('tbody');

    bloque.map((arrayBit) => { //se repite por cada linea de bits
        
        let rowTable = document.createElement('tr');//se crea fila
        
        for (let j = 0; j < m; j++) {

            if(j==0){
    
                textoHTML = textoHTML + "<td class='table-td'>b"+fila+"</td><td class='table-td'>"+arrayBit[j]+"</td>"
    
            }else{
                
                textoHTML = textoHTML + "<td class='table-td'>"+arrayBit[j]+"</td>"
            
            }
        
        }

        textoHTML = textoHTML + "<td class='table-td'>"+LRC[fila-1]+"</td>"

        rowTable.innerHTML = textoHTML //se insertan elementos en la fila, td es celda de la tabla
        tableBody.appendChild(rowTable); //se agrega la fila al contenido de la tabla

        textoHTML = '';
        fila++;
    });

    let rowTable = document.createElement('tr');//se crea fila

    for (let j = 0; j < m; j++) {

        if(j==0){
    
            textoHTML = textoHTML + "<td class='table-td'>VRC</td><td class='table-td'>"+VRC[j]+"</td>"

        }else{
            
            textoHTML = textoHTML + "<td class='table-td'>"+VRC[j]+"</td>"
        
        }
        
    }
    
    textoHTML = textoHTML + "<td class='table-td'>"+LRC[fila-1]+"</td>"

    rowTable.innerHTML = textoHTML //se insertan elementos en la fila, td es celda de la tabla
    tableBody.appendChild(rowTable); //se agrega la fila al contenido de la tabla

    
    table.appendChild(tableBody);

}


const renderTable = (bloque, idTable, VRC, LRC) => {

    const table = document.getElementById(idTable);
    table.innerHTML = "";

    console.log(bloque);

    let m = bloque[0].length;
    let n = 7;
    
    renderHead(table, m);
  
    renderBody(table, bloque, m, VRC, LRC);

}

const mensajeABloqueDeBits = (event) =>{
    event.preventDefault();

    const textoMensaje = document.getElementById('textMensaje').value;

    if(!masDe8Caracteres(textoMensaje)){

        bloqueAEnviar = scrambling(stringToASCII(textoMensaje));

        emisorVRC = calcularVRC(scrambling(stringToASCII(textoMensaje)));

        console.log("VRC: "+emisorVRC);

        emisorLRC = calcularLRC(scrambling(stringToASCII(textoMensaje)), emisorVRC);

        console.log("LRC: "+emisorLRC);

        renderTable(bloqueAEnviar, 'emisorTableDatos', emisorVRC, emisorLRC); //Renderizar tabla

        divSimularError = document.getElementById('emisorSimularError');

        divSimularError.innerHTML = '';

        let label = document.createElement('label');
        label.innerHTML = `<label class="emisor-simularErrorLabel">Simular error: </label>`

        divSimularError.appendChild(label);

        errorAisladoSimple(bloqueAEnviar, emisorVRC, receptorLRC);
        console.log("Fin de prueba");
        console.log(bloqueRecibido);
        console.log(receptorVRC);
        console.log(emisorLRC);
    }

}

