package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.model.evaluation.*;
import com.equipe2.projet_integre_equipe2.service.EvaluationService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.equipe2.projet_integre_equipe2.enums.EvaluationEnums.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(EvaluationController.class)
public class EvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
    void setup() {
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
                .evaluationName(FILE_NAME_START.getStringValue() + student.getMatricule() + "-" + session)
                .contract(contract)
                .session(session)
                .pdf(null)
                .build();
        evaluationListByMonitor = new ArrayList<>();
        evaluationListByMonitor.add(evaluation);
    }

    @Test
    public void testSaveEvaluation() throws Exception {
        when(evaluationService.registerEvaluation(internEvaluation)).thenReturn(Optional.of(evaluation));

        MvcResult result = mockMvc.perform(post("/evaluation/save-evaluation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(evaluation))).andReturn();

        var actualEvaluation = new ObjectMapper().readValue(result.getResponse().getContentAsString(),
                new TypeReference<Evaluation>() {
                });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualEvaluation).isNotNull();
    }

    @Test
    public void testGetEvaluationsByMonitorId() throws Exception {
        when(evaluationService.getEvaluationsByMonitorId(monitor.getId())).thenReturn(Optional.of(evaluationListByMonitor));

        MvcResult result = mockMvc.perform(get("/evaluation/get-all-by-monitor/{idMonitor}", monitor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Evaluation>>() {
        });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(1);
    }

    @Test
    public void testGetAllEvaluations() throws Exception {
        when(evaluationService.getAllEvaluations()).thenReturn(Optional.of(getAllEvaluationsList()));

        MvcResult result = mockMvc.perform(get("/evaluation/get-all-evaluations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Evaluation>>() {
        });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
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
