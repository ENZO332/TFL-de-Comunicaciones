/*{
    "31": "",      "32": " ",     "33": "!",     "34": "\"",    "35": "#",    
    "36": "$",     "37": "%",     "38": "&",     "39": "'",     "40": "(",    
    "41": ")",     "42": "*",     "43": "+",     "44": ",",     "45": "-",    
    "46": ".",     "47": "/",     "48": "0",     "49": "1",     "50": "2",    
    "51": "3",     "52": "4",     "53": "5",     "54": "6",     "55": "7",    
    "56": "8",     "57": "9",     "58": ":",     "59": ";",     "60": "<",    
    "61": "=",     "62": ">",     "63": "?",     "64": "@",     "65": "A",    
    "66": "B",     "67": "C",     "68": "D",     "69": "E",     "70": "F",    
    "71": "G",     "72": "H",     "73": "I",     "74": "J",     "75": "K",    
    "76": "L",     "77": "M",     "78": "N",     "79": "O",     "80": "P",    
    "81": "Q",     "82": "R",     "83": "S",     "84": "T",     "85": "U",    
    "86": "V",     "87": "W",     "88": "X",     "89": "Y",     "90": "Z",    
    "91": "[",     "92": "\\",    "93": "]",     "94": "^",     "95": "_",    
    "96": "`",     "97": "a",     "98": "b",     "99": "c",     "100": "d",    
    "101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",    
    "106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
    "111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",    
    "116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
    "121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",    
    "126": "~",    "127": ""
} referencia de ASCII*/

const convertToBinary= (number) => { //NUMERO DECIMAL A BINARIO
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1;) {
      num = parseInt(num / 2);
      binary = (num % 2) + (binary);
    }
    return binary;
}

const decimalToBinary = (word) =>{ //CADENA DE DECIMALES A CADENA DE BINARIOS

    let wordInASCIIBinary = [];

    for (let i = 0; i < word.length; i++) {
        
        wordInASCIIBinary[i] = convertToBinary(word[i]);
        
    }

    return wordInASCIIBinary;

}

const stringToASCII = (word) => { //CADENA DE CARACTERES A CADENA DE ASCII BINARIO
    let wordInASCIINumber = [];

    for (let i = 0; i < word.length; i++) {

        wordInASCIINumber[i] = word[i].charCodeAt(0);
        
    }

    wordInASCIINumber = decimalToBinary(wordInASCIINumber);

    return wordInASCIINumber;

}

const scrambling = (array) =>{ //los datos se codifican de forma vertical

    let row = "";
    let newList = [];

    for(let j = 0; j < 7; j++){  //se recorren bits de un dato
        
        row ="";
        for (let i = 0; i < array.length; i++) { //se recorren los datos
        
            row = row + array[i][j];
            
        }

        newList[j] = row;

    }

    return newList;

}

const paridad = (string) => {
    
    let count=0;

    for (let i = 0; i < string.length; i++) {
    
        if(string[i]=="1"){
            count++;
        }

    }

    if(count%2 == 0){
        return "0";
    }else{
        return "1";
    }

}

const calcularVRC = (bloqueAEnviar) => {

    const VRC = [];
    let columna;


    for (let j = 0; j <bloqueAEnviar[0].length ; j++){

        columna="";

        for (let i = 0; i < bloqueAEnviar.length; i++) {
            
            columna = columna + bloqueAEnviar[i][j];
            
        }

        VRC[j] = paridad(columna);
    }

    return VRC;

}


const calcularLRC = (bloqueAEnviar, VRC) => {

    const LRC = [];

    for (let i = 0; i < 7 ; i++){

        LRC[i] = paridad(bloqueAEnviar[i]);
        
    }

    LRC[7] = paridad(VRC);

    return LRC;

}

function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función auxiliar para verificar si una posición en la matriz ya fue modificada
const posicionYaModificada = (posicionesModificadas, fila, columna) => {
    return posicionesModificadas.some(pos => pos.fila === fila && pos.columna === columna);
};

const ruidoEnUnBitMatriz = (bloqueAEnviar, m, posicionesModificadas) =>{
    // Crear una copia de la matriz original
    let nuevoBloque = bloqueAEnviar.map(row => [...row]);
    
    let filaAModificar, columnaAModificar;
    
    // Intentar encontrar una posición que no haya sido modificada
    do {
        filaAModificar = random(bloqueAEnviar.length - 1, 0);
        columnaAModificar = random(m - 1, 0);
    } while (posicionYaModificada(posicionesModificadas, filaAModificar, columnaAModificar));

    // Guardar la posición modificada
    posicionesModificadas.push({ fila: filaAModificar, columna: columnaAModificar });

    console.log(`Modificando fila: ${filaAModificar}, columna: ${columnaAModificar}`);   

    // Realizar la modificación en la copia
    nuevoBloque[filaAModificar][columnaAModificar] = (nuevoBloque[filaAModificar][columnaAModificar] == "1") ? "0" : "1";

    return nuevoBloque;  // Devolver la copia modificada
}

const ruidoEnUnBitArray = (array, posicionesModificadas) =>{
    let celdaAModificar;

    // Intentar encontrar una posición que no haya sido modificada
    do {
        celdaAModificar = random(array.length - 1, 0);
    } while (posicionesModificadas.includes(celdaAModificar));

    // Guardar la posición modificada
    posicionesModificadas.push(celdaAModificar);

    console.log(`Modificando índice: ${celdaAModificar}`);

    let fila = [];

    for (let i = 0; i < array.length; i++) {
        if (i == celdaAModificar) {
            fila[i] = (array[i] == "1") ? "0" : "1";
        } else {
            fila[i] = array[i];
        }
    }

    return fila;
}

const sinError = () =>{
    bloqueRecibido = bloqueAEnviar;
    receptorVRC = emisorVRC;
    receptorLRC = emisorLRC;
    return;
}

const errorAisladoSimple = (bloqueAEnviar, VRC, LRC) =>{
    // Estructuras para almacenar posiciones modificadas
    let posicionesModificadas = {
        bloque: [], // Array de objetos con {fila, columna} para las posiciones modificadas en bloqueAEnviar
        VRC: [], // Array con índices modificados en VRC
        LRC: []  // Array con índices modificados en LRC
    };

    // Crear copias profundas para evitar modificar los datos originales
    receptorVRC = [...emisorVRC];  // Copia del array
    receptorLRC = [...emisorLRC];  // Copia del array
    bloqueRecibido = [...bloqueAEnviar];  // Copia superficial de un array unidimensional (si es bidimensional, ver siguiente punto)

    const m = VRC.length;
    let bloqueAModificar = random(2,0);

    switch (bloqueAModificar) {
        case 0:
            console.log("casoBloque");
            bloqueRecibido = ruidoEnUnBitMatriz([...bloqueAEnviar], m, posicionesModificadas.bloque);
            break;
        
        case 1:
            console.log("casoVRC");
            receptorVRC = ruidoEnUnBitArray([...emisorVRC], posicionesModificadas.VRC);
            break;

        case 2: 
            console.log("casoLRC");
            receptorLRC = ruidoEnUnBitArray([...emisorLRC], posicionesModificadas.LRC);
            break;

        default:
            break;
    }

    return posicionesModificadas;
} 

const errorAisladoDoble = (bloque, VRC, LRC) =>{
    // Estructuras para almacenar posiciones modificadas
    let posicionesModificadas = {
        bloque: [], // Array de objetos con {fila, columna} para las posiciones modificadas en bloqueAEnviar
        VRC: [], // Array con índices modificados en VRC
        LRC: []  // Array con índices modificados en LRC
    };

    for (let i = 0; i < 2; i++) {
        const m = VRC.length;
        let bloqueAModificar = random(2,0);

        switch (bloqueAModificar) {
            case 0:
                console.log("casoBloque");
                bloque = ruidoEnUnBitMatriz(bloque, m, posicionesModificadas.bloque);
                break;

            case 1:
                console.log("casoVRC");
                VRC = ruidoEnUnBitArray(VRC, posicionesModificadas.VRC);
                break;

            case 2: 
                console.log("casoLRC");
                LRC = ruidoEnUnBitArray(LRC, posicionesModificadas.LRC);
                break;

            default:
                break;
        }
        
    }

    receptorLRC = LRC;
    receptorVRC = VRC;
    bloqueRecibido = bloque;

    return posicionesModificadas;
    
}

const resaltarErrores = (posicionesModificadas) => {
    // Resaltar errores en el bloque
    posicionesModificadas.bloque.forEach(pos => {
        const { fila, columna } = pos;
        // Selecciona la celda correspondiente en la tabla (ajusta el selector según la estructura de la tabla)
        const celda = document.querySelector(`#receptorTableDatos tr:nth-child(${fila + 1}) td:nth-child(${columna + 2})`);
        if (celda) {
            celda.style.backgroundColor = '#800';
        }
    });

    // Resaltar errores en el VRC
    posicionesModificadas.VRC.forEach(index => {
        // Selecciona la celda correspondiente en la tabla del VRC (ajusta el selector según la estructura de la tabla)
        const celdaVRC = document.querySelector(`#receptorTableDatos tr:last-child td:nth-child(${index + 2})`);
        if (celdaVRC) {
            celdaVRC.style.backgroundColor = '#800';
        }
    });

    // Resaltar errores en el LRC
    posicionesModificadas.LRC.forEach(index => {
        // Selecciona la celda correspondiente en la tabla del LRC (ajusta el selector según la estructura de la tabla)
        const celdaLRC = document.querySelector(`#receptorTableDatos tr:nth-child(${index + 1}) td:last-child`);
        if (celdaLRC) {
            celdaLRC.style.backgroundColor = '#800';
        }
    });
};

const resaltarFilasYColumnas = (filaErrores, columnaErrores) => {
    const tabla = document.getElementById('receptorTableDatos');

    // Resalta todas las filas que contienen errores (color general)
    filaErrores.forEach(fila => {
        for (let col = 0; col < tabla.rows[fila].cells.length; col++) {
            tabla.rows[fila+1].cells[col].classList.add('error-detected'); // Resalta fila
        }
    });

    // Resalta todas las columnas que contienen errores (color general)
    columnaErrores.forEach(columna => {
        for (let fila = 0; fila < tabla.rows.length; fila++) {
            tabla.rows[fila].cells[columna+1].classList.add('error-detected'); // Resalta columna
        }
    });

    // Ahora, resalta las celdas donde se cruzan las filas y columnas con errores
    filaErrores.forEach(fila => {
        columnaErrores.forEach(columna => {
            tabla.rows[fila+1].cells[columna+1].classList.remove('error-detected'); // Elimina el color general
            tabla.rows[fila+1].cells[columna+1].classList.add('exact-error'); // Resalta la celda con un color diferente
        });
    });

    
}

/*
const detectarErrores = () =>{

    

    // Lógica para determinar el tipo de error
    if (celdasDistintasVRC.length === 0 && celdasDistintasLRC.length === 0) {
        mensajeError = 'No se detectó ningún error';
    } else if (celdasDistintasVRC.length === 1 && celdasDistintasLRC.length === 1) {
        mensajeError = `Se detectó un error en la fila: ${celdasDistintasLRC[0]+1}, columna: ${celdasDistintasVRC[0]+1}. Se puede corregir.`;
    } else {
        mensajeError = 'Se detectó un error, pero no es posible determinar su ubicación exacta. No se puede corregir.';
    }

    let label = document.getElementById('mensajeError');
    label.textContent= mensajeError;

}*/

//console.log(random(2,0));

//errorAisladoSimple(scrambling(stringToASCII("ENZO")), calcularVRC(scrambling(stringToASCII("ENZO"))), calcularLRC(scrambling(stringToASCII("ENZO")),calcularVRC(scrambling(stringToASCII("ENZO")))))
//console.log(scrambling(stringToASCII("NIGGA")));


