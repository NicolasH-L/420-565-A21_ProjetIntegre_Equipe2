package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.model.Document;
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

    public Optional<Document> getContractDocumentByIdContract(Integer id){
        try{
            return Optional.of(contractRepository.findContractByIdContract(id).getDocument());
        } catch (Exception e){
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
}
