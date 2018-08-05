module.exports.removeCaracteresEspeciais = (cpf) => {
    let newString = '';

    for (cont in cpf) {

        if (cpf[cont] !== '.' && cpf[cont] !== '/' && cpf[cont] !== '-')
            newString = newString + cpf[cont];

    }

    return newString.toString();
}

module.exports.convertToNumberArray = (cpf) => {
    let cpfArray = new Array();

    for (cont in cpf) {

        cpfArray.push(parseInt(cpf[cont]));

    }

    return cpfArray;
}

module.exports.obterDigitoVerificador = (multiplicador, cpf, limite) => {
    let somaCpf = 0;

    for(let cont = 0; cont<limite; cont++) {
      somaCpf = somaCpf + (multiplicador * cpf[cont]);
      multiplicador--;
    }

    let digito = ((somaCpf * 10) % 11) === 10 ? 0 : ((somaCpf * 10) % 11);

    return digito;
}
