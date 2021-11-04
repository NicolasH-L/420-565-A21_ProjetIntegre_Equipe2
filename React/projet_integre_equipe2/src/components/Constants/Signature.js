export class Signature {
    static getStudentSignatureStatus(){
        const studentSignatureStatus = "StudentSignature"
        return studentSignatureStatus
    } 

    static getMonitorSignatureStatus(){
        const monitorSignatureStatus = "MonitorSignature"
        return monitorSignatureStatus 
    }

    static getAdminSignatureStatus(){
        const  adminSignatureStatus = "AdminSignature"
        return  adminSignatureStatus
    }

    static getCompleteSignatureStatus(){
        const completeSignatureStatus = "Completed"
        return completeSignatureStatus
    }
}