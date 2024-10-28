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

const random = (max, min) => {
    let num = Math.floor(Math.random()*(max-min+1)+min);
    return num;
}

const ruidoEnUnBitMatriz = (bloqueAEnviar, m) =>{
    
    const filaAModificar = random(bloqueAEnviar.length-1,0);

    const columnaAModificar = random(m-1,0);

    console.log(filaAModificar)

    console.log(columnaAModificar)

    for (let i = 0; i < bloqueAEnviar.length; i++) {

        let fila = "";

        for(let j = 0; j < m; j++){  //se recorren bits de un dato

            if(i==filaAModificar && j==columnaAModificar){

                if(bloqueAEnviar[i][j]=="1"){

                    fila = fila + "0";

                }else{
                    fila = fila + "1";
                }

            }else{
                fila = fila + bloqueAEnviar[i][j];
            }
        }

        bloqueAEnviar[i]=fila;
    }
    
    
    return bloqueAEnviar;
}

const ruidoEnUnBitArray = (array) =>{
    const celdaAModificar = random(array.length-1,0);

    console.log(celdaAModificar);

    let fila = [];

    for(let i = 0; i < array.length; i++){  //se recorren bits de un dato

        if(i==celdaAModificar){

            if(array[i]=="1"){

                fila[i] = "0";

            }else{
                fila[i] = "1";
            }

        }else{
            fila[i] = array[i];
        }
    }

    array = fila;

    return array;
}

const errorAisladoSimple = (bloqueAEnviar, VRC, LRC) =>{

    const m = VRC.length;
    let bloqueAModificar = random(2,0);

    switch (bloqueAModificar) {
        case 0:
            console.log("casoBloque");
            bloqueRecibido = ruidoEnUnBitMatriz(bloqueAEnviar, m);
            receptorVRC = emisorVRC;
            receptorLRC = emisorLRC;
            break;
        
        case 1:
            console.log("casoVRC");
            receptorVRC = ruidoEnUnBitArray(VRC);
            bloqueRecibido = bloqueAEnviar;
            receptorLRC = emisorLRC;
            break;

        case 2: 
            console.log("casoLRC");
            receptorLRC = ruidoEnUnBitArray(LRC);
            receptorVRC = emisorVRC;
            receptorLRC = emisorLRC;
            break;

        default:
            break;
    }
    


} 

//console.log(random(2,0));

errorAisladoSimple(scrambling(stringToASCII("ENZO")), calcularVRC(scrambling(stringToASCII("ENZO"))), calcularLRC(scrambling(stringToASCII("ENZO")),calcularVRC(scrambling(stringToASCII("ENZO")))))
//console.log(scrambling(stringToASCII("NIGGA")));


