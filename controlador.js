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

        emisorLRC = calcularLRC(scrambling(stringToASCII(textoMensaje)), emisorVRC);

        renderTable(bloqueAEnviar, 'emisorTableDatos', emisorVRC, emisorLRC); //Renderizar tabla

        //se crean componentes en el emisor para la simulación de errores y la transmisiòn de los datos
        divSimularError = document.getElementById('emisorSimularError');

        divSimularError.innerHTML = '';

        let label = document.createElement('label');
        label.textContent = 'Simular un error: ';

        let select = document.createElement('select');
        select.className = 'emisor-simularErrorSelect';
        select.id = 'errorSelect'; // Asignar un id al select

        let options = [
            { value: 0, text: 'SIN ERROR' },
            { value: 1, text: 'ERROR AISLADO SIMPLE' },
            { value: 2, text: 'ERROR AISLADO DOBLE' }
        ];
        options.forEach(optionData => {
            let option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            select.appendChild(option);
        });

        let buttonSend = document.createElement('button');
        buttonSend.className='emisor-sendDataButton';
        buttonSend.textContent='Enviar';
        // Agregar el evento onClick al botón
        buttonSend.onclick= transmisionDeMensajeAlReceptor;

        divSimularError.appendChild(label);
        divSimularError.appendChild(select);
        divSimularError.appendChild(buttonSend);

        tablaReceptor = document.getElementById( 'receptorTableDatos');
        tablaReceptor.innerHTML='';
        
        divControlarError = document.getElementById('receptorControlarError');
        divControlarError.innerHTML='';

        mensajeError = document.getElementById('mensajeError');
        mensajeError.innerHTML ='';

    }

}

const transmisionDeMensajeAlReceptor = (event) =>{
    event.preventDefault();
    const optionValue = parseInt(document.getElementById('errorSelect').value);
    let posicionesModificadas;

    switch (optionValue) {
        case 0:
            console.log("caso: SIN ERROR");
            sinError(bloqueAEnviar, emisorVRC, emisorLRC);
            break;
        
        case 1:
            console.log("caso: ERROR AISLADO SIMPLE");
            posicionesModificadas = errorAisladoSimple(bloqueAEnviar, emisorVRC, emisorLRC);
            break;

        case 2: 
            console.log("caso: ERROR AISLADO DOBLE");
            posicionesModificadas = errorAisladoDoble(bloqueAEnviar, emisorVRC, emisorLRC);
            break;

        default:
            break;
    }

    renderTable(bloqueRecibido,'receptorTableDatos', receptorVRC, receptorLRC);

    divControlarError = document.getElementById('receptorControlarError');
    divControlarError.innerHTML = '';

    let labelControl = document.createElement('label');
    labelControl.textContent = 'Control de errores: ';

    let buttonControl = document.createElement('button');
    buttonControl.textContent = 'DETECTAR ERRORES';
    buttonControl.onclick = detectarErrores;

    let labelMensajeError = document.getElementById('mensajeError');
    labelMensajeError.textContent = '';

    divControlarError.appendChild(labelControl);
    divControlarError.appendChild(buttonControl);

    if (posicionesModificadas) {
        resaltarErrores(posicionesModificadas);
    }

}

const detectarErrores = () =>{
    let paridad = 0;
    let columnaErrores = [];
    let filaErrores = [];
    let mensajeError = '';

    for (let i = 0; i < receptorLRC.length; i++) {
        paridad = 0;
        
        for (let j = 0; j <= receptorVRC.length; j++) {
            
            if(j == receptorVRC.length){
                
                if(receptorLRC[i]=="1"){
                    paridad++;
                }
            }else{
                if(i == receptorLRC.length-1){
                    
                    if(receptorVRC[j]=="1"){
                        paridad++
                    }
                }else{
                    
                    if(bloqueRecibido[i][j]==1){
                        paridad++;
                    }
                }
                
            }

        }

        if(paridad % 2 != 0) {
            filaErrores.push(i);
        }   
    }

    console.log('filas erroneas: '+filaErrores);

    for (let j = 0; j <= receptorVRC.length; j++) {
        paridad = 0;
        
        for (let i = 0; i < receptorLRC.length; i++) {
            
            if(j == receptorVRC.length){
                
                if(receptorLRC[i]=="1"){
                    paridad++;
                }
            }else{
                if(i == receptorLRC.length-1){
                    
                    if(receptorVRC[j]=="1"){
                        paridad++;
                    }
                }else{
                    
                    if(bloqueRecibido[i][j]=="1"){
                        paridad++;
                    }
                }
            }
        }

        if (paridad % 2 !== 0) {
            columnaErrores.push(j);
        }
    }

    console.log('columnas erroneas: '+columnaErrores);

    if(columnaErrores.length == 0 && filaErrores.length == 0){
        mensajeError = 'No se detectó ningún error.';
    } else {
        if(columnaErrores.length == 1 && filaErrores.length == 1 ){
            mensajeError = `Se detectó un error en la fila: ${filaErrores[0]+1}, columna: ${columnaErrores[0]+1}. Se puede corregir.`;
            resaltarFilasYColumnas(filaErrores, columnaErrores);
        }else{
            mensajeError = 'Se detectó un error, pero no es posible determinar su ubicación exacta. No se puede corregir.'
            resaltarFilasYColumnas(filaErrores, columnaErrores);
        }
    }

    let label = document.getElementById('mensajeError');
    label.textContent= mensajeError;
}