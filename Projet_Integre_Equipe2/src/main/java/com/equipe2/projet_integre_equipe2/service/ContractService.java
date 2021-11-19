package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.ContractRepository;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class ContractService {

    public ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public Optional<Contract> saveContract(Contract contract) {
        try {
            return Optional.of(contractRepository.save(contract));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Contract> getContractByStudentId(Integer id) {
        try {
            return Optional.of(contractRepository.findContractByInternship_Student_Id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getContractsByMonitorId(Integer id) {
        try {
            return Optional.of(contractRepository.findContractsByInternship_Offer_Monitor_Id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getAllContracts() {
        try {
            return Optional.of(contractRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getAllContractsByMonitorIdAndStatus(Integer id, String status) {
        try {
            return Optional.of(contractRepository.findContractsByInternship_Offer_Monitor_IdAndInternship_Status(id, status));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<byte[]> generateDocument(String fileType, Contract contract) {
        try {
            String newFilePath = "files/userFiles/" + contract.getIdContract() + ".pdf";
            createFile(newFilePath, fileType, contract);
            byte[] contractBytes = Files.readAllBytes(Paths.get(newFilePath));
            deleteFile(newFilePath);
            contract.setPdf(contractBytes);
            contractRepository.save(contract);
            return Optional.of(contractBytes);
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public void createFile(String newFilePath, String fileType, Contract contract) throws IOException {
        File file = new File("files/userFiles/");
        if (file.exists()) {
            PDDocument document = new PDDocument();
            document.save(newFilePath);
            writeFile(newFilePath, fileType, contract);
            document.close();
        } else {
            new File("files/userFiles/").mkdirs();
            createFile(newFilePath, fileType, contract);
        }
    }

    public void writeFile(String newFilePath, String fileType, Contract contract) throws IOException {
        String originalFilePath = "";
        if (fileType.equals("Contract")) {
            originalFilePath = "files/originalFiles/contratTemplate.pdf";

            PdfDocument pdf =
                    new PdfDocument(new PdfReader(originalFilePath), new PdfWriter(newFilePath));
            PdfAcroForm form = PdfAcroForm.getAcroForm(pdf, true);
            Map<String, PdfFormField> fields = form.getFormFields();

            editContract(fields, contract);

            form.flattenFields();
            pdf.close();
        }
    }

    public void editContract(Map<String, PdfFormField> fields, Contract contract) {
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

    public void deleteFile(String newFilePath) {
        File deleteFile = new File(newFilePath);
        deleteFile.delete();
    }
}
