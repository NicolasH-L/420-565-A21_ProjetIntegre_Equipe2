package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.repository.StudentOfferRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StudentOfferServiceTest {

    @Mock
    private StudentOfferRepository studentOfferRepository;

    @InjectMocks
    private StudentOfferService studentOfferService;

    private Offer offer;

    private Document document;
    private Document document2;

    private Student student;
    private Student student2;

    private StudentOffer studentOffer;

    private List<StudentOffer> studentOfferList;

    @BeforeEach
    void setup() {
        offer = Offer.builder()
                .idOffer(1)
                .companyName("test")
                .address("Montreal")
                .salary("111111111111")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Autonome")
                .jobSchedules("Temps plein")
                .workingHours("666666666")
                .monitorEmail("cegep@email.com")
                .isValid(true)
                .state("")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .build();

        document = Document.builder()
                .documentName("CVExemple")
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .build();

        document2 = Document.builder()
                .documentName("CVExemple2")
                .student(null)
                .data("test2".getBytes(StandardCharsets.UTF_8))
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        student2 = Student.studentBuilder()
                .id(2)
                .firstName("didi")
                .lastName("coco")
                .matricule("1234588")
                .password("didi1*")
                .isCvValid(true)
                .build();

        studentOffer = StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .build();

        studentOfferList = new ArrayList<>();
        studentOfferList.add(studentOffer);

    }

    @Test
    public void testApplyInternship() {
        when(studentOfferRepository.save(studentOffer)).thenReturn(studentOffer);
        Optional<StudentOffer> actualApplication = studentOfferService.saveStudentOffer(studentOffer);
        assertThat(actualApplication.get()).isEqualTo(studentOffer);
    }

    @Test
    public void testFailedApplyInternship() {
        when(studentOfferRepository.save(studentOffer)).thenReturn(null);
        Optional<StudentOffer> actualApplication = studentOfferService.saveStudentOffer(studentOffer);
        assertThat(actualApplication).isEqualTo(Optional.empty());
    }

    @Test
    public void testStudentAppliedToOffer(){
        Student newStudent = Student.studentBuilder()
                .id(9)
                .build();
        when(studentOfferRepository.existsStudentOfferByOffer_IdOfferAndStudent_Id(offer.getIdOffer(),newStudent.getId())).thenReturn(false);
        Optional<Boolean> actualStudentNotAppliedToOffer = studentOfferService.isStudentAppliedToOffer(offer.getIdOffer(), newStudent.getId());
        assertThat(actualStudentNotAppliedToOffer.get()).isFalse();
    }

    @Test
    public void testStudentAppliedToOfferFails(){
        when(studentOfferRepository.existsStudentOfferByOffer_IdOfferAndStudent_Id(offer.getIdOffer(),student.getId())).thenReturn(true);
        Optional<Boolean> actualStudentAlreadyAppliedToOffer = studentOfferService.isStudentAppliedToOffer(offer.getIdOffer(), student.getId());
        assertThat(actualStudentAlreadyAppliedToOffer.get()).isTrue();
    }

    @Test
    public void testGetAllStudentOffersByOffer_IdOffer() {
        when(studentOfferRepository.saveAll(getListOfStudentOffersByIdOffer())).thenReturn(getListOfStudentOffersByIdOffer());
        when(studentOfferRepository.findAllByOffer_IdOffer(offer.getIdOffer())).thenReturn(getListOfStudentOffersByIdOffer());
        final Optional<List<StudentOffer>> expectedStudentOfferList = Optional.of(studentOfferRepository.saveAll(getListOfStudentOffersByIdOffer()));
        final Optional<List<StudentOffer>> actualStudentOfferList = studentOfferService.getAllStudentOffersByOffer_IdOffer(offer.getIdOffer());
        assertThat(actualStudentOfferList.get().size()).isEqualTo(expectedStudentOfferList.get().size());
        assertThat(actualStudentOfferList.get().size()).isEqualTo(2);
    }

    @Test
    public void testGetAllStudentOffersByOffer_IdOfferFails() {
        when(studentOfferRepository.saveAll(getListOfStudentOffersByIdOffer())).thenReturn(getListOfStudentOffersByIdOffer());
        when(studentOfferRepository.findAllByOffer_IdOffer(offer.getIdOffer())).thenReturn(null);
        studentOfferRepository.saveAll(getListOfStudentOffersByIdOffer());
        final Optional<List<StudentOffer>> studentOfferList = studentOfferService.getAllStudentOffersByOffer_IdOffer(offer.getIdOffer());
        assertThat(studentOfferList).isEmpty();
    }

    @Test    
    public void testSetInterviewDate(){
        LocalDate expectedDate = LocalDate.now();
        studentOffer.setInterviewDate(expectedDate.toString());
        when(studentOfferRepository.save(studentOffer)).thenReturn(studentOffer);
        StudentOffer actualStudentOffer = studentOfferService.saveStudentOffer(studentOffer).get();
        LocalDate actualDate = LocalDate.parse(actualStudentOffer.getInterviewDate());
        assertThat(actualStudentOffer).isEqualTo(studentOffer);
        assertThat(actualDate).isEqualTo(expectedDate);
    }

    @Test
    public void testGetAllStudentOffersByStudentId(){
        when(studentOfferRepository.findStudentOffersByStudent_Id(student.getId())).thenReturn(studentOfferList);
        Optional<List<StudentOffer>> actualStudentOfferList = studentOfferService.getAllStudentOfferByStudentId(student.getId());
        assertThat(actualStudentOfferList.get().size()).isEqualTo(studentOfferList.size());
        assertThat(actualStudentOfferList.get().get(0).getStudent()).isEqualTo(student);
        assertThat(actualStudentOfferList.get()).isEqualTo(studentOfferList);
    }

    @Test
    public void testGetAllStudentOffersByStudentIdFails(){
        int invalidId = 999;
        when(studentOfferRepository.findStudentOffersByStudent_Id(invalidId)).thenReturn(null);
        Optional<List<StudentOffer>> actualStudentOfferList = studentOfferService.getAllStudentOfferByStudentId(invalidId);
        assertThat(actualStudentOfferList).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllStudentsOfferAcceptedIsTrue(){
        when(studentOfferRepository.findStudentOffersByIsAcceptedTrue()).thenReturn(getListOfStudentsOffer());
        Optional<List<StudentOffer>> actualStudentOffers = studentOfferService.getAllAcceptedStudentOffers();
        assertThat(actualStudentOffers.get().size()).isEqualTo(3);
        assertThat(actualStudentOffers.get().get(0).getIsAccepted()).isTrue();
    }

    @Test
    public void testGetAllStudentsOfferAcceptedIsTrueFails(){
        when(studentOfferRepository.findStudentOffersByIsAcceptedTrue()).thenReturn(null);
        Optional<List<StudentOffer>> actualStudentOffers = studentOfferService.getAllAcceptedStudentOffers();
        assertThat(actualStudentOffers).isEmpty();
    }

    private List<StudentOffer> getListOfStudentOffersByIdOffer() {
        List<StudentOffer> studentOfferList = new ArrayList<>();
        studentOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .build());
        studentOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document2)
                .student(student2)
                .build());
        return  studentOfferList;
    }

    private List<StudentOffer> getListOfStudentsOffer() {
        List<StudentOffer> studentsOfferList = new ArrayList<>();
        studentsOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .isAccepted(true)
                .build());
        studentsOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .isAccepted(true)
                .build());
        studentsOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .isAccepted(true)
                .build());
        return studentsOfferList;
    }
}
