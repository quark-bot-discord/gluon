class CommandChoice {

    constructor() {

    }

    setName(name) {

        this.name = name;

        return this;

    }

    setValue(value) {

        this.value = value;

        return this;

    }

    toJSON() {

        return {
            name: this.name,
            value: this.value
        };

    }

}

module.exports = CommandChoice;