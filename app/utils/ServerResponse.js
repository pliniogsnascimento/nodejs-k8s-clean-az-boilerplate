/**
 * Objeto de resposta do servidor. 
 * @constructor
 * @param {*} data 
 * @param {*} res 
 */
module.exports = function Hateoas(data, res) {
    this.data = data;
    this.links = [];
    this.res = res;

    /**
     * Adiciona um novo valor para data.
     * @param {*} data 
     */
    this.setData = (data) => {
        this.data = data;
        return this;
    }

    /**
     * Adiciona um novo valor para res.
     * @param {*} res 
     */
    this.setRes = (res) => {
        this.res = res;
        return this;
    }

    /**
     * Adiciona links para objeto de resposta do servidor.
     * 
     * @param {*} link 
     */
    this.addLink = (link) => {
        this.links.push(link);
        return this;
    }

    /**
     * Retorna um erro do servidor.
     * O erro deve ser passado no construtor.
     */
    this.internalError = () => {
        this.res.status(500).json(this.data);
    }

    /**
     * Responde a requisição com o status code 200.
     */
    this.ok = () => {
        this.res.status(200).json({
            data: this.data,
            links: this.links
        });
    }

    /**
     * Responde a requisição com o status code 204.
     */
    this.noContent = () => {
        this.res.status(204).send();
    }

    /**
     * Responde a requisição com o status code 400.
     */
    this.badRequest = () => {
        this.res.status(400).json({message: 'Bad request'});
    }

    /**
     * Responde a requisição com o status code 201.
     */
    this.created = () => {
        this.res.status(201).json({
            data: this.data,
            links: this.links
        });
    }
};