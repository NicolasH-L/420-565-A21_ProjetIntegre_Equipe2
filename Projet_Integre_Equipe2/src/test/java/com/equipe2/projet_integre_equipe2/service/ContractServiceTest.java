package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.repository.ContractRepository;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.StampingProperties;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @InjectMocks
    private ContractService contractService;

    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private Document document;
    private List<Contract> contractListByMonitorId = new ArrayList<>();

    @BeforeEach
    void setup() throws IOException {
        monitor = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
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
                .build();

        document = Document.builder()
                .idDocument(1)
                .documentName("DocumentTest")
                .build();

        contract = Contract.builder()
                .idContract(1)
                .internship(internship)
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

        contractListByMonitorId.add(contract);

        String newFilePath = "files/test/Test.pdf";
        String actualNewFilePath = "files/test/Test2.pdf";
        PDDocument document1 = new PDDocument();
        document1.save(newFilePath);
        document1.close();



        PDDocument document2 = new PDDocument();
        document2.save(actualNewFilePath);
        document2.close();
    }

    @AfterEach
    void destroySetup(){
        String newFilePath = "files/test/Test.pdf";
        String actualNewFilePath = "files/test/Test2.pdf";

        File file1 = new File(newFilePath);
        file1.delete();

        File file2 = new File(actualNewFilePath);
        file2.delete();
    }

    @Test
    public void testSaveContract() {
        when(contractRepository.save(contract)).thenReturn(contract);
        Optional<Contract> actualContract = contractService.saveContract(contract);
        assertThat(actualContract.get()).isEqualTo(contract);
    }

    @Test
    public void testSaveContractFails() {
        when(contractRepository.save(contract)).thenReturn(null);
        Optional<Contract> actualContract = contractService.saveContract(contract);
        assertThat(actualContract).isEmpty();
    }

    @Test
    public void testGetContractByStudentId() {
        when(contractRepository.findContractByInternship_Student_Id(student.getId())).thenReturn(contract);
        Optional<Contract> expectedContract = contractService.getContractByStudentId(student.getId());
        assertThat(expectedContract.get()).isEqualTo(contract);
    }

    @Test
    public void testGetContractByStudentIdFails() {
        when(contractRepository.findContractByInternship_Student_Id(student.getId())).thenReturn(null);
        Optional<Contract> expectedContract = contractService.getContractByStudentId(student.getId());
        assertThat(expectedContract).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetContractsByMonitorId() {
        when(contractRepository.findContractsByInternship_Offer_Monitor_Id(monitor.getId())).thenReturn(contractListByMonitorId);
        Optional<List<Contract>> actualContractList = contractService.getContractsByMonitorId(monitor.getId());
        assertThat(actualContractList.get()).isEqualTo(contractListByMonitorId);
        assertThat(actualContractList.get().size()).isEqualTo(contractListByMonitorId.size());
    }

    @Test
    public void testGetContractsByMonitorIdFails() {
        when(contractRepository.findContractsByInternship_Offer_Monitor_Id(0)).thenReturn(null);
        Optional<List<Contract>> actualContractList = contractService.getContractsByMonitorId(0);
        assertThat(actualContractList).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllContract(){
        when(contractRepository.findAll()).thenReturn(getListOfContracts());
        final Optional<List<Contract>> allContracts = contractService.getAllContracts();
        assertThat(allContracts.get().size()).isEqualTo(3);
        assertThat(allContracts.get().get(0).getCompanyResponsability()).isEqualTo("Faire des evaluation1");
    }

    @Test
    public void testGetAllContractFail(){
        when(contractRepository.findAll()).thenReturn(null);
        final Optional<List<Contract>> allContracts = contractService.getAllContracts();
        assertThat(allContracts).isEqualTo(Optional.empty());
    }

    @Test
    public void testCreateFile() throws IOException {
        String newFilePath = "files/test/Test4.pdf";
        contractService.CreateFile(newFilePath,"Contract",contract);
        File file = new File(newFilePath);
        assertThat(file.exists()).isEqualTo(true);
        file.delete();
    }

    @Test
    public void testWriteFile() throws IOException {
        String newFilePath = "files/test/Test.pdf";
        File file = new File(newFilePath);

        contractService.WriteFile(newFilePath,"Contract",contract);

        assertThat(file.length()).isGreaterThan(0);
    }

    @Test
    public void testEditContract() throws IOException {
        String newFilePath = "files/test/Test.pdf";
        String originalFile = "files/originalFiles/contratTemplate.pdf";

        PdfDocument actualPdfDocument = new PdfDocument(new PdfReader(originalFile), new PdfWriter(newFilePath));
        PdfAcroForm form = PdfAcroForm.getAcroForm(actualPdfDocument, false);
        Map<String, PdfFormField> fields = form.getFormFields();

        contractService.EditContract(fields, contract);

        assertThat(fields.get("adminName").getValue().toString()).isEqualTo(contract.getAdminSignature());
    }

    @Test
    public void testGenerateDocument() {
        Optional<byte []> actualBytes = contractService.GenerateDocument("Contract",contract);
        assertThat(actualBytes.get()).isNotNull();
        assertThat(contract.getPdf()).isNotNull();
    }

    @Test
    public void testGenerateDocumentFail() {
        Optional<byte []> actualBytes = contractService.GenerateDocument("Contract",null);
        assertThat(actualBytes).isEmpty();
        assertThat(contract.getPdf()).isNull();
    }

    @Test
    public void testDeleteFile() throws IOException {
        String newFilePath = "files/test/Test3.pdf";
        contractService.CreateFile(newFilePath,"Contrat",contract);
        File file = new File(newFilePath);
        file.delete();
        assertThat(file.exists()).isEqualTo(false);
    }

    private List<Contract> getListOfContracts(){
        List<Contract> contractList = new ArrayList<>();
        contractList.add(Contract.builder()
                .idContract(1)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation1")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        contractList.add(Contract.builder()
                .idContract(2)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation2")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        contractList.add(Contract.builder()
                .idContract(3)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation3")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        return contractList;
    }
}
