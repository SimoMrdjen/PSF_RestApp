package psf.ucitavanje.obrazaca.kontni_plan;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class KontniPlanService {

    private final KontniPlanRepository repository;

    public List<Integer> getKontniPlan() {
        return repository.findAll()
                .stream()
                .map(KontniPlan::getSubKonto)
                .collect(Collectors.toList());
    }
}
