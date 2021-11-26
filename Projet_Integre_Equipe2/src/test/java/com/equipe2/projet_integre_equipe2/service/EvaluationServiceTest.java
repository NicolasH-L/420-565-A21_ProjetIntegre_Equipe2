package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.model.evaluation.*;
import com.equipe2.projet_integre_equipe2.repository.EvaluationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.equipe2.projet_integre_equipe2.enums.EvaluationEnums.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EvaluationServiceTest {

    @Mock
    private EvaluationRepository evaluationRepository;

    @InjectMocks
    private EvaluationService evaluationService;

    private InternEvaluation internEvaluation;
    private Appreciation appreciation;
    private ReHireIntern reHireIntern;
    private Evaluation evaluation;
    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private String session;
    private List<String> headersList;
    private List<String> capabilityValues;
    private List<String> appreciationResults;
    private List<Evaluation> evaluationListByMonitor;

    @BeforeEach
    void setup() throws IOException {
        session = "winter2022";

        monitor = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
                .telephoneNumber("514-123-1234")
                .build();

        offer = Offer.builder()
                .idOffer(1)
                .companyName("Cegep")
                .address("Montral")
                .salary("19")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Debrouillard")
                .jobSchedules("Temps plein")
                .workingHours("37.5")
                .monitorEmail("toto@toto.toto")
                .isValid(false)
                .state("Invalide")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .monitor(monitor)
                .weeksBetweenDates(0)
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        internship = Internship.builder()
                .idInternship(1)
                .status("completed")
                .offer(offer)
                .student(student)
                .session(session)
                .build();

        contract = Contract.builder()
                .idContract(1)
                .internship(internship)
                .session(session)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build();

        headersList = getHeaders();
        capabilityValues = getCapabilityValues();
        appreciationResults = getAppreciaitionsResults();

        appreciation = Appreciation.builder()
                .expectationResult(appreciationResults.get(0))
                .appreciations("Voici une appreciation")
                .isDiscussed(true)
                .build();
        reHireIntern = ReHireIntern.builder()
                .hireAgain(MAYBE.getStringValue())
                .description("suffisante")
                .date(LocalDate.now().toString())
                .build();

        internEvaluation = InternEvaluation.builder()
                .contract(contract)
                .behaviors(getBehaviorList())
                .actualWeeklyHours(52)
                .appreciation(appreciation)
                .reHireIntern(reHireIntern)
                .build();

        evaluation = Evaluation.builder()
                .idEvaluation(1)
                .evaluationName(FILE_NAME_START.getStringValue()+student.getMatricule()+"-"+session)
                .contract(contract)
                .session(session)
                .pdf(null)
                .build();
        evaluationListByMonitor = new ArrayList<>();
        evaluationListByMonitor.add(evaluation);
    }

    @Test
    void testRegisterEvaluation() {
        evaluation.setPdf(evaluationService.generateDocument(FILE_TYPE.getStringValue(), internEvaluation).get().getPdf());
        when(evaluationRepository.save(evaluation)).thenReturn(evaluation);
        Optional<Evaluation> actual = evaluationService.registerEvaluation(internEvaluation);
        assertThat(actual).isEmpty();
    }

    @Test
    void testRegisterEvaluationFails() {
        lenient().when(evaluationRepository.save(evaluation)).thenReturn(null);
        Optional<Evaluation> actual = evaluationService.registerEvaluation(null);
        assertThat(actual).isEmpty();
    }

    @Test
    void testGenerateDocument() {
        evaluation.setPdf(evaluationService.generateDocument(FILE_TYPE.getStringValue(), internEvaluation).get().getPdf());
        assertThat(evaluation.getPdf()).isNotEmpty();
    }

    @Test
    void testGenerateDocumentFails(){
        Optional<Evaluation> actual = evaluationService.generateDocument(null, internEvaluation);
        assertThat(actual).isEmpty();
    }

    @Test
    void testGetEvaluationsByMonitorId(){
        when(evaluationRepository.findEvaluationsByContract_Internship_Offer_Monitor_Id(monitor.getId())).thenReturn(evaluationListByMonitor);
        Optional<List<Evaluation>> actuals = evaluationService.getEvaluationsByMonitorId(monitor.getId());
        assertThat(actuals.get()).isEqualTo(evaluationListByMonitor);
    }

    @Test
    void testGetEvaluationsByMonitorIdFails(){
        when(evaluationRepository.findEvaluationsByContract_Internship_Offer_Monitor_Id(monitor.getId())).thenReturn(null);
        Optional<List<Evaluation>> actuals = evaluationService.getEvaluationsByMonitorId(monitor.getId());
        assertThat(actuals).isEmpty();
    }

    @Test
    void testGetAllEvaluations() {
        when(evaluationRepository.findAll()).thenReturn(getAllEvaluationsList());
        Optional<List<Evaluation>> allEvaluations = evaluationService.getAllEvaluations();
        assertThat(allEvaluations.get().size()).isEqualTo(2);
        assertThat(allEvaluations.get().get(0).getEvaluationName()).isEqualTo("evaluation-toto");
    }

    @Test
    void testGetAllEvaluationsFails(){
        when(evaluationRepository.findAll()).thenReturn(null);
        Optional<List<Evaluation>> allEvaluations = evaluationService.getAllEvaluations();
        assertThat(allEvaluations).isEmpty();
    }

    @Test
    public void testCreateFile() throws IOException {
        String newFilePath = "files/userFiles/" + evaluation.getEvaluationName() + ".pdf";
        evaluationService.createFile(newFilePath, FILE_TYPE.getStringValue(), internEvaluation);
        File file = new File(newFilePath);
        assertThat(file.exists()).isEqualTo(true);
        file.delete();
    }

    @Test
    public void testCreateFileFail() throws IOException {
        File directory = new File("files/userFiles/");
        directory.delete();
        String newFilePath = "files/userFiles/" + evaluation.getEvaluationName() + ".pdf";
        evaluationService.createFile(newFilePath, FILE_TYPE.getStringValue(), internEvaluation);
        File file = new File(newFilePath);
        assertThat(file.exists()).isEqualTo(true);
        file.delete();
    }

    private List<Evaluation> getAllEvaluationsList() {
        List<Evaluation> evaluationList = new ArrayList<>();
        evaluationList.add(Evaluation.builder()
                .idEvaluation(2)
                .evaluationName("evaluation-toto")
                .session(session)
                .pdf(null)
                .contract(null)
                .build());

        evaluationList.add(Evaluation.builder()
                .idEvaluation(3)
                .evaluationName("evaluation-tata")
                .session(session)
                .pdf(null)
                .contract(null)
                .build());
        return evaluationList;
    }

    private List<Behavior> getBehaviorList() {
        List<Behavior> behaviorList = new ArrayList<>();

        behaviorList.add(Behavior.builder()
                .header(headersList.get(0))
                .capabilities(getCapabilityList())
                .build());

        return behaviorList;
    }

    private List<Capability> getCapabilityList() {
        List<Capability> capabilityList = new ArrayList<>();
        capabilityList.add(Capability.builder()
                .capability("Planifier et organiser son travail de façon efficace")
                .value(capabilityValues.get(0))
                .build());
        capabilityList.add(Capability.builder()
                .capability("Comprendre rapidement les directives relatives à son travail")
                .value(capabilityValues.get(4))
                .build());

        return capabilityList;
    }
}
