
export default class Evaluations{

    static behaviors(){
        const behaviors = [
            productivity, workQuality, relationsQuality, personalAbilities
        ]
        return behaviors
    }
    
    
    static appreciatiation(){
        const appreciationsGlobale = [
            "Les habiletés démontrées dépassent de beaucoup les attentes",
            "Les habiletés démontrées dépassent les attentes",
            "Les habiletés démontrées répondent pleinement aux attentes",
            "Les habiletés démontrées répondent partiellement aux attentes",
            "Les habiletés démontrées ne répondent pas aux attentes"
        ]
        return appreciationsGlobale
    }

}

const productivity = {
    header: "PRODUCTIVITÉ",
    subHeader: "Capacité d’optimiser son rendement au travail",
    capabilities: [
        "planifier et organiser son travail de façon efficace",
        "comprendre rapidement les directives relatives à son travail",
        "maintenir un rythme de travail soutenu",
        "établir ses priorités",
        "respecter ses échéanciers"
    ]
}

const workQuality = {
    header: "QUALITÉ DU TRAVAIL",
    subHeader: "Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant personnellement des normes de qualité",
    capabilities: [
        "respecter les mandats qui lui ont été confiés",
        "porter attention aux détails dans la réalisation de ses tâches",
        "vérifier son travail, s’assurer que rien n’a été oublié",
        "rechercher des occasions de se perfectionner",
        "faire une bonne analyse des problèmes rencontrés"
    ]
}

const relationsQuality = {
    header: "QUALITÉS DES RELATIONS INTERPERSONNELLES",
    subHeader: "Capacité d’établir des interrelations harmonieuses dans son milieu de travail",
    capabilities: [
        "établir facilement des contacts avec les gens",
        "contribuer activement au travail d’équipe",
        "s’adapter facilement à la culture de l’entreprise",
        "accepter les critiques constructives",
        "être respectueux envers les gens",
        "faire preuve d’écoute active en essayant de comprendre le point de vue de l’autre"
    ]
}

const personalAbilities = {
    header: "HABILETÉS PERSONNELLES",
    subHeader: "Capacité de faire preuve d’attitudes ou de comportements matures et responsables",
    capabilities: [
        "démontrer de l’intérêt et de la motivation au travail",
        "exprimer clairement ses idées",
        "faire preuve d’initiative",
        "travailler de façon sécuritaire",
        "démontrer un bon sens des responsabilités nerequérant qu’un minimum de supervision",
        "être ponctuel et assidu à son travail"
    ]
}