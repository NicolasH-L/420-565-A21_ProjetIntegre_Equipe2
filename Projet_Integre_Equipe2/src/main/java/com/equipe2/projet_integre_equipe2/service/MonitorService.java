package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Builder
@Service
public class MonitorService {

    private MonitorRepository monitorRepository;


}
