package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import org.springframework.stereotype.Service;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

@Service
public class DocumentService {

    public DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository){
        this.documentRepository = documentRepository;
    }



}
