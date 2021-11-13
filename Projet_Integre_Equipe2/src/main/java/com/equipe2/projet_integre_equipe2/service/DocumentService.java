package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DocumentService {

    public DocumentRepository documentRepository;

    public StudentRepository studentRepository;

    public DocumentService(DocumentRepository documentRepository, StudentRepository studentRepository){
        this.documentRepository = documentRepository;
        this.studentRepository = studentRepository;
    }

    public Optional<Document> createDocument(MultipartFile multipartFile) {
        try {
            String[] signatureFile = java.net.URLDecoder.decode(multipartFile.getOriginalFilename(),
                    StandardCharsets.UTF_8).replace("\"","").split(":");
            Document document = new Document();
            document.setDocumentName(signatureFile[0]);
            document.setSession(signatureFile[2]);
            document.setData(multipartFile.getBytes());
            document.setStudent(studentRepository.getById(Integer.parseInt(signatureFile[1])));
            document.setIsValid(false);
            document.setIsRefused(false);
            return Optional.of(documentRepository.save(document));
        } catch (Exception exception){
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocumentsByStudentId(Integer idStudent){
        try {
            return Optional.of(documentRepository.findDocumentsByStudent_Id(idStudent));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Document> updateDocumentStatus(Integer idDocument, Boolean isValid){
        try {
            Optional<Document> document = documentRepository.findById(idDocument);
            document.get().setIsValid(isValid);
            document.get().setIsRefused(!isValid);
            return Optional.of(documentRepository.saveAndFlush(document.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocumentsValidByStudentId(Integer idStudent){
        try {
            return Optional.of(documentRepository.findDocumentsByIsValidTrueAndStudent_Id(idStudent));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocuments() {
        try {
            return Optional.of(documentRepository.findAll());
        } catch (Exception e) {
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
