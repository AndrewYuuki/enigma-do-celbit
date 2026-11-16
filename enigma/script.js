const AlFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const ROTORES = [
    {fios: 'EKMFLGDQVZNTOWYHXUSPAIBRCJ', entalhe: 16},
    {fios: 'AJDKSIRUXBLHWTMCQGZNPYFVOE', entalhe: 4},
    {fios: 'BDFHJLCPRTXVZNYEIWGAKMUSQO', entalhe:21},
];

const REFLETOR = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

const LAYOUT = ['QWERTZUIO', 'ASDFGHJK', 'PYXCVBNML'];

function girarRotores(posicoes) {
    const direitoNoEntalhe = posicoes[2] === ROTORES[2].entalhe;
    const meioNoEntalhe = posicoes[1] === ROTORES[1].entalhe;
    if (meioNoEntalhe) {
        posicoes[0] = (posicoes[0] + 1) % 26;
        posicoes[1] = (posicoes[1] + 1) % 26;
    } else if (direitoNoEntalhe) {
        posicoes[1] = (posicoes[1] + 1) % 26;
    }
    posicoes[2] = (posicoes[2] + 1) % 26;
}

function passarPeloRotor(n, posicoes, indice, volta){
    const fios = ROTORES[indice].fios;
    const giro = posicoes[indice];
    const entrada = (n + giro) % 26;
    if (!volta) return (AlFABETO.indexOf(fios[entrada]) - giro + 26) % 26;
    return (fios.indexOf(AlFABETO[entrada]) - giro + 26) % 26;
}

function cifrarLetra(n, posicoes){
    const caminho = [AlFABETO[n]];
    for (const rotor of [2, 1, 0]) {
    n = passarPeloRotor(n, posicoes, rotor, false);
    caminho.push(AlFABETO[n]);
    }  
    n = AlFABETO.indexOf(REFLETOR[n]);
    caminho.push(AlFABETO[n]);
    for (const rotor of [0, 1, 2]) {
        n = passarPeloRotor(n, posicoes, rotor, true);
        caminho.push(AlFABETO[n])
    }
    return {letra: AlFABETO[n], caminho: caminho}
} 
