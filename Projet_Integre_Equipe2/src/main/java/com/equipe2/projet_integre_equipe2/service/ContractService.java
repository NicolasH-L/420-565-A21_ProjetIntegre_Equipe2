package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;


@Service
public class ContractService {

    public ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository){this.contractRepository = contractRepository;}

    public Optional<Contract> saveContract(Contract contract){
        try{
            return Optional.of(contractRepository.save(contract));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Contract> getContractByStudentId(Integer id){
        try{
            return Optional.of(contractRepository.findContractByInternship_Student_Id(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getContractsByMonitorId(Integer id) {
        try{
            return Optional.of(contractRepository.findContractsByInternship_Offer_Monitor_Id(id));
        }catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getAllContracts(){
        try {
            return Optional.of(contractRepository.findAll());
        } catch (Exception e){
            return Optional.empty();
        }
    }
    public byte[] GenerateDocument(String fileType, Contract contract, String matricule) throws IOException { // + params Evaluation
        String newFilePath = "files/userFiles/" + matricule + ".pdf"; // Je definis le lieu de creation du pdf *a mettre dans le app properties*
        CreateFile(newFilePath,fileType,contract); // Je cree le document avec les donnes entrer dedans
        byte[] contractBytes = Files.readAllBytes(Paths.get(newFilePath)); // Je recupere les donnes du pdf
        DeleteFile(newFilePath); // Je supprime le document
        return contractBytes;
    }

    public void CreateFile(String newFilePath ,String fileType, Contract contract) throws IOException {
        PDDocument document = new PDDocument();
        document.save(newFilePath);
        WriteFile(newFilePath,fileType, contract);
    }

    public void WriteFile(String newFilePath, String fileType, Contract contract) throws IOException {
        String originalFilePath = "";
        if (fileType.equals("Contract")){
            originalFilePath = "files/originalFiles/contratTemplate.pdf";

            PdfDocument pdf =
                    new PdfDocument(new PdfReader(originalFilePath), new PdfWriter(newFilePath));
            PdfAcroForm form = PdfAcroForm.getAcroForm(pdf, true);
            Map<String, PdfFormField> fields = form.getFormFields();

            EditContract(fields, contract);

            //form.flattenFields();
            pdf.close();
        }
    }

    public void EditContract(Map<String, PdfFormField> fields, Contract contract){
        Internship internship = contract.getInternship();
        Offer offer = internship.getOffer();
        fields.get("signatureDateAdmin").setValue(contract.getAdminSignature());
        fields.get("adminName").setValue(contract.getAdminSignature());
        fields.get("monitorName").setValue(contract.getMonitorSignature());
        fields.get("studentName").setValue(contract.getStudentSignature());
        fields.get("companyName").setValue(offer.getCompanyName());
        fields.get("offerAddress").setValue(offer.getAddress());
        fields.get("weeksBetweenDates").setValue(String.valueOf(offer.getWeeksBetweenDates()));
        fields.get("startInternshipDate").setValue(offer.getStartInternshipDate());
        fields.get("endInternshipDate").setValue(offer.getEndInternshipDate());
        fields.get("jobSchedules").setValue(offer.getJobSchedules());
        fields.get("workingHours").setValue(offer.getWorkingHours());
        fields.get("salary").setValue(offer.getSalary());
        fields.get("description").setValue(offer.getDescription());
        fields.get("collegeResponsability").setValue(contract.getCollegeResponsability());
        fields.get("companyResponsability").setValue(contract.getCompanyResponsability());
        fields.get("studentResponsability").setValue(contract.getStudentResponsability());
        fields.get("studentSignature").setValue(contract.getStudentSignature());
        fields.get("studentName").setValue(contract.getStudentSignature());
        fields.get("studentSignature").setValue(contract.getStudentSignature());
        fields.get("signatureDateStudent").setValue(contract.getSignatureDateStudent());
        fields.get("monitorName").setValue(contract.getMonitorSignature());
        fields.get("monitorSignature").setValue(contract.getMonitorSignature());
        fields.get("signatureDateMonitor").setValue(contract.getSignatureDateMonitor());
        fields.get("adminName").setValue(contract.getAdminSignature());
        fields.get("adminSignature").setValue(contract.getAdminSignature());
        fields.get("signatureDateAdmin").setValue(contract.getSignatureDateAdmin());
    }

    public void DeleteFile(String newFilePath){
        File deleteFile = new File (newFilePath);
        deleteFile.delete();
    }

}
