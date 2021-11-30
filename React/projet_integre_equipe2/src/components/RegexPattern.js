export class RegexPattern {

    static getPatternEmail() {
        return patternEmail
    }

    static getPatternName() {
        return patternName
    }

    static getPatternPassword() {
        return patternPassword
    }

    static getPatternMatricule() {
        return patternMatricule
    }

    static getPatternGeneral() {
        return patternGeneral
    }

    static getPatternNumber() {
        return patternNumber
    }

    static getPatternTelephone() {
        return patternTelephone
    }
}

const patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/
const patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/
const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
const patternMatricule = /^[0-9]{7}$/
const patternGeneral = /^.+([\s]{0,1}.+)+$/
const patternNumber = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/
const patternTelephone = /^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/
