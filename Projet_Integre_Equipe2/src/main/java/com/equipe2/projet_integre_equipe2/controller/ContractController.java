package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://10.10.68.10:3000"})
@RequestMapping("/contract")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PostMapping("/save-contract")
    public ResponseEntity<Contract> createContract(@RequestBody Contract contract) {
        return contractService.saveContract(contract)
                .map(contract1 -> ResponseEntity.status(HttpStatus.CREATED).body(contract1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Contract()));
    }

    @GetMapping("/get-contract/{id}/session/{session}")
    public ResponseEntity<Contract> getContractByStudentIdAndSession(@PathVariable Integer id, @PathVariable String session) {
        return contractService.getContractByStudentIdAndSession(id, session)
                .map(contracts1 -> ResponseEntity.status(HttpStatus.OK).body(contracts1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-by-monitor/{id}")
    public ResponseEntity<List<Contract>> getContractsByMonitorId(@PathVariable Integer id) {
        return contractService.getContractsByMonitorId(id)
                .map(contracts1 -> ResponseEntity.status(HttpStatus.OK).body(contracts1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-contracts")
    public ResponseEntity<List<Contract>> getAllContracts() {
        return contractService.getAllContracts()
                .map(contract1 -> ResponseEntity.status(HttpStatus.OK).body(contract1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-by-monitor/{id}/status/{status}")
    public ResponseEntity<List<Contract>> getAllContractsByMonitorIdAndStatus(@PathVariable Integer id, @PathVariable String status) {
        return contractService.getAllContractsByMonitorIdAndStatus(id, status)
                .map(contract1 -> ResponseEntity.status(HttpStatus.OK).body(contract1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-by-student/{id}")
    public ResponseEntity<List<Contract>> getAllContractsByStudentId(@PathVariable Integer id){
        return contractService.getAllStudentContractsByStudentId(id)
                .map(contract1 -> ResponseEntity.status(HttpStatus.OK).body(contract1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PostMapping("/get-contract-pdf")
    public ResponseEntity<byte[]> getContractPdf(@RequestBody Contract contract) {
        return contractService.generateDocument("Contract", contract)
                .map(contract1 -> ResponseEntity.status(HttpStatus.OK).body(contract1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
