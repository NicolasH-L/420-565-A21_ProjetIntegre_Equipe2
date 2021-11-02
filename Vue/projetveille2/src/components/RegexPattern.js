export class RegexPattern{

    static getPatternEmail(){
        return patternEmail
    } 

    static getPatternName(){
        return patternName
    }

    static getPatternCompany(){
        return patternCompany
    }

    static getPatternPassword(){
        return patternPassword
    }

    static getPatternMatricule(){
        return patternMatricule
    }

    static getPatternGeneral(){
        return patternGeneral
    }

    static getPatternNumber(){
        return patternNumber
    }

}
export default new RegexPattern
  // eslint-disable-next-line no-useless-escape   
 const patternEmail = /^([a-zA-Z0-9]+[\._:$!%\-+]{0,1}([a-zA-Z0-9])+)+@(([a-zA-Z0-9])+[\.\-]{0,1}([a-zA-Z0-9])+)+\.[a-zA-Z0-9]{2,4}$/
 // eslint-disable-next-line no-useless-escape
 const patternName = /^([a-zA-ZéÉèÈïÏêÊ])(([a-zA-ZéÉèÈïÏêÊ]*|\-)[a-zA-ZéÉèÈïÏêÊ])*[a-zA-ZéÉèÈïÏêÊ]*$/
 const patternCompany = /^[^ ]+([ ]{0,1}[^ ]+)+$/
 const patternPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
 const patternMatricule = /^[0-9]{7}$/
 const patternGeneral = /^[^ ]+([ ]{0,1}[^ ]+)+$/
 const patternNumber = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/
