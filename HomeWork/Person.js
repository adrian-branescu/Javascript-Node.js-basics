import { MyError } from "./MyError.js";

export class Person {

    #birthDate;
    #name;

    constructor({ birthDate = Date.now(), name = 'unknown'}) {

        if (new.target === Person) {

            throw new MyError({ 
                code: MyError.ERROR_CODE.ABSTRACT_INSTANCE_NOT_ALLOWED,
                data: { class: Person.name }
            });
        }

        this.#birthDate = birthDate;
        this.#name = name;
    }

    get birthDate() {
        return this.#birthDate;
    }

    get name() {
        return this.#name;
    }

    run() {
        throw new MyError({
            code: MyError.ERROR_CODE.METHOD_NOT_IMPLEMENTED,
            data: { method: this.run.name }
        });
    }
}