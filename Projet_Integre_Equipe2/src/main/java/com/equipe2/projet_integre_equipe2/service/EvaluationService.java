package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.model.evaluation.*;
import com.equipe2.projet_integre_equipe2.repository.EvaluationRepository;
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

import static com.equipe2.projet_integre_equipe2.enums.EvaluationEnums.*;

@Service
public class EvaluationService {

    public EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    public Optional<Evaluation> registerEvaluation(InternEvaluation internEvaluation) {
        try {
            Evaluation evaluation = generateDocument(FILE_TYPE.getStringValue(), internEvaluation).get();
            return Optional.of(evaluationRepository.save(evaluation));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Evaluation>> getEvaluationsByMonitorId(Integer monitorId) {
        try {
            return Optional.of(evaluationRepository.findEvaluationsByContract_Internship_Offer_Monitor_Id(monitorId));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Evaluation>> getAllEvaluations() {
        try {
            return Optional.of(evaluationRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Evaluation> generateDocument(String fileType, InternEvaluation internEvaluation) {
        try {
            Evaluation evaluation = new Evaluation();
            final Student STUDENT = internEvaluation.getContract().getInternship().getStudent();
            final String SESSION = internEvaluation.getContract().getSession();
            final String FILE_NAME = FILE_NAME_START.getStringValue() + STUDENT.getMatricule() + "-" + SESSION;
            final String NEW_FILE_PATH = "files/userFiles/" + FILE_NAME + ".pdf";
            evaluation.setSession(SESSION);
            evaluation.setEvaluationName(FILE_NAME);
            evaluation.setContract(internEvaluation.getContract());

            createFile(NEW_FILE_PATH, fileType, internEvaluation);
            byte[] evaluationPdfBytes = Files.readAllBytes(Paths.get(NEW_FILE_PATH));
            deleteFile(NEW_FILE_PATH);
            evaluation.setPdf(evaluationPdfBytes);

            return Optional.of(evaluation);
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public void createFile(String newFilePath, String fileType, InternEvaluation internEvaluation) throws IOException {
        File file = new File("files/userFiles/");
        if (file.exists()) {
            PDDocument document = new PDDocument();
            document.save(newFilePath);
            writeFile(newFilePath, fileType, internEvaluation);
            document.close();
        } else {
            new File("files/userFiles/").mkdirs();
            createFile(newFilePath, fileType, internEvaluation);
        }
    }

    public void writeFile(String newFilePath, String fileType, InternEvaluation internEvaluation) throws IOException {
        String originalFilePath = "";
        if (fileType.equals(FILE_TYPE.getStringValue())) {
            originalFilePath = "files/originalFiles/" + FILE_TEMPLATE.getStringValue();
            PdfDocument pdf =
                    new PdfDocument(new PdfReader(originalFilePath), new PdfWriter(newFilePath));
            PdfAcroForm form = PdfAcroForm.getAcroForm(pdf, true);
            Map<String, PdfFormField> fields = form.getFormFields();
            editContract(fields, internEvaluation);
            form.flattenFields();
            pdf.close();
        }
    }

    public void editContract(Map<String, PdfFormField> fields, InternEvaluation internEvaluation) {
        Contract contract = internEvaluation.getContract();
        Internship internship = contract.getInternship();
        Offer offer = internship.getOffer();

        fields.get(FORM_STUDENT.getStringValue()).setValue(contract.getStudentSignature());
        fields.get(FORM_PROGRAM.getStringValue()).setValue(STUDY_PROGRAM.getStringValue());
        fields.get(FORM_COMPANY.getStringValue()).setValue(offer.getCompanyName());
        fields.get(FORM_MONITOR.getStringValue()).setValue(contract.getMonitorSignature());
        fields.get(FORM_JOB.getStringValue()).setValue(offer.getCompanyName());
        fields.get(FORM_PHONE.getStringValue()).setValue(offer.getMonitor().getTelephoneNumber());
        fields.get(FORM_WEEKLY_HOURS.getStringValue()).setValue(internEvaluation.getActualWeeklyHours().toString());
        fields.get(FORM_ADMIN.getStringValue()).setValue(contract.getAdminSignature());

        setBehaviors(fields, internEvaluation);
        setAppreciations(fields, internEvaluation);
        setHireAgain(fields, internEvaluation);

    }


    private void setBehaviors(Map<String, PdfFormField> fields, InternEvaluation internEvaluation) {
        List<String> choices = getChoices();
        List<String> headers = getHeaders();
        List<Behavior> behaviors = internEvaluation.getBehaviors();

        for (int i = 0; i < behaviors.size(); i++) {
            List<Capability> capabilities = behaviors.get(i).getCapabilities();
            for (int j = 0; j < capabilities.size(); j++) {
                fields.get(headers.get(i) + "-" + choices.get(j) + "-" + capabilities.get(j).getValue()).setValue(FORM_CHECK.getStringValue());
            }

            String comments = (behaviors.get(i).getComments() == "" || behaviors.get(i).getComments() == null) ? NO_COMMENTS.getStringValue() : behaviors.get(i).getComments();
            fields.get(FORM_COMMENTS.getStringValue() + "-" + (i + 1)).setValue(comments);
        }

    }

    private void setAppreciations(Map<String, PdfFormField> fields, InternEvaluation internEvaluation) {
        Appreciation appreciation = internEvaluation.getAppreciation();
        String expectationValue = appreciation.getExpectationResult();
        String discussValue = appreciation.isDiscussed() ? "1" : "2";

        fields.get(FORM_EXPECTATION.getStringValue() + "-" + expectationValue).setValue(FORM_CHECK.getStringValue());
        fields.get(FORM_APPRECIATION.getStringValue()).setValue(appreciation.getAppreciations());
        fields.get(FORM_DISCUSSED.getStringValue() + "-" + discussValue).setValue(FORM_CHECK.getStringValue());

    }

    private void setHireAgain(Map<String, PdfFormField> fields, InternEvaluation internEvaluation) {
        ReHireIntern reHireIntern = internEvaluation.getReHireIntern();
        String hireAgain = reHireIntern.getHireAgain() == HIRED.getStringValue() ? "1" :
                reHireIntern.getHireAgain() == REJECTED.getStringValue() ? "2" : "3";

        fields.get(FORM_HIRE_AGAIN.getStringValue() + "-" + hireAgain).setValue(FORM_CHECK.getStringValue());
        fields.get(FORM_HIRE_DESC.getStringValue()).setValue(reHireIntern.getDescription());
        fields.get(FORM_DATE.getStringValue()).setValue(reHireIntern.getDate());
    }

    public void deleteFile(String newFilePath) {
        File deleteFile = new File(newFilePath);
        deleteFile.delete();
    }

}
