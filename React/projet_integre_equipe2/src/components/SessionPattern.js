export class SessionPattern{
    static getSession() {
        let sessionDate = new Date()
        let sessionMonth = sessionDate.getMonth() <= winterDeadLine ? lastMonthOfTheYear : sessionDate.getMonth()
        let sessionYear = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionDate.getFullYear() + 1 : sessionDate.getFullYear()
        let session = sessionMonth >= winterStart && sessionMonth <= lastMonthOfTheYear ? sessionPrefix[0] + sessionYear
            : sessionMonth >= summerStart && sessionMonth <= summerDeadLine ? sessionPrefix[1] + sessionYear : "Erreur"
        return session
    }
}

const sessionPrefix = ["winter", "summer"]
const lastMonthOfTheYear = 11
const winterStart = 8
const winterDeadLine = 1
const summerStart = 2
const summerDeadLine = 5