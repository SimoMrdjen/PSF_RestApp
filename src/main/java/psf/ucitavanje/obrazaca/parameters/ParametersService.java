package psf.ucitavanje.obrazaca.parameters;

import java.time.LocalDate;
import java.time.Month;

public class ParametersService {

    public static int getCurrentQuarter() {

        Month currentMonth = LocalDate.now().getMonth();

        if (currentMonth.getValue() <= 3) {
            return 5;
        } else if (currentMonth.getValue() <= 6) {
            return 1;
        } else if (currentMonth.getValue() <= 9) {
            return 2;
        } else {
            return 3;
        }
    }
}
