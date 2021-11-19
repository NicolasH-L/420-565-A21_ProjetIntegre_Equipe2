
export default class Evaluations{

    static behaviors(){
        const behaviors = [
            productivity, workQuality, relationsQuality, personalAbilities
        ]
        return behaviors
    }

}

const productivity = {
    header: "PRODUCTIVITÉ",
    subHeader: "Capacité d’optimiser son rendement au travail",
    capabilities: [
        {capability:"Planifier et organiser son travail de façon efficace", value: ""},
        {capability:"Comprendre rapidement les directives relatives à son travail", value: ""},
        {capability:"Maintenir un rythme de travail soutenu", value: ""},
        {capability:"Établir ses priorités", value: ""},
        {capability:"Respecter ses échéanciers", value: ""}
    ],
    comments: ""
}

const workQuality = {
    header: "QUALITÉ DU TRAVAIL",
    subHeader: "Capacité de s’acquitter des tâches sous sa responsabilité en s’imposant personnellement des normes de qualité",
    capabilities: [
        {capability:"Respecter les mandats qui lui ont été confiés", value: ""},
        {capability:"Porter attention aux détails dans la réalisation de ses tâches", value: ""},
        {capability:"Vérifier son travail, s’assurer que rien n’a été oublié", value: ""},
        {capability:"Rechercher des occasions de se perfectionner", value: ""},
        {capability:"Faire une bonne analyse des problèmes rencontrés", value: ""}
    ],
    comments: ""
}

const relationsQuality = {
    header: "QUALITÉS DES RELATIONS INTERPERSONNELLES",
    subHeader: "Capacité d’établir des interrelations harmonieuses dans son milieu de travail",
    capabilities: [
        {capability:"Établir facilement des contacts avec les gens", value: ""},
        {capability:"Contribuer activement au travail d’équipe", value: ""},
        {capability:"S’adapter facilement à la culture de l’entreprise", value: ""},
        {capability:"Accepter les critiques constructives", value: ""},
        {capability:"Être respectueux envers les gens", value: ""},
        {capability:"Faire preuve d’écoute active en essayant de comprendre le point de vue de l’autre", value: ""}
    ],
    comments: ""
}

const personalAbilities = {
    header: "HABILETÉS PERSONNELLES",
    subHeader: "Capacité de faire preuve d’attitudes ou de comportements matures et responsables",
    capabilities: [
        {capability:"Démontrer de l’intérêt et de la motivation au travail", value: ""},
        {capability:"Exprimer clairement ses idées", value: ""},
        {capability:"Faire preuve d’initiative", value: ""},
        {capability:"Travailler de façon sécuritaire", value: ""},
        {capability:"Démontrer un bon sens des responsabilités ne requérant qu’un minimum de supervision", value: ""},
        {capability:"Être ponctuel et assidu à son travail", value: ""}
    ],
    comments: ""
}
