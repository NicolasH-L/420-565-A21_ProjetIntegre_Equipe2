package com.equipe2.projet_integre_equipe2.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;


public class SessionDateCalculatorTest {


    private SessionDateCalculator sessionDateCalculator;
    private SessionDateCalculator sessionDateCalculator2;
    private SessionDateCalculator sessionDateCalculator3;

    @BeforeEach
    void setup() {
        sessionDateCalculator = new SessionDateCalculator(
                LocalDate.of(2021, 1, 1),
                "MM",
                "yyyy",
                new String[]{"winter", "summer"},
                12,
                9,
                2,
                3,
                6);

        sessionDateCalculator2 = new SessionDateCalculator(
                LocalDate.of(2021, 9, 1),
                "MM",
                "yyyy",
                new String[]{"winter", "summer"},
                12,
                9,
                2,
                3,
                6);

        sessionDateCalculator3 = new SessionDateCalculator(
                LocalDate.of(2021, 5, 1),
                "MM",
                "yyyy",
                new String[]{"winter", "summer"},
                12,
                9,
                2,
                3,
                6);
    }

    @Test
    public void testFormatDate(){
        LocalDate localDate = LocalDate.of(2021, 1, 1);
        assertThat(sessionDateCalculator.formatDate(localDate, "yyyy")).isEqualTo("2021");
        assertThat(sessionDateCalculator.formatDate(localDate, "MM")).isEqualTo("01");
    }

    @Test
    public void testCalculateMonth(){
        assertThat(sessionDateCalculator.calculateMonth()).isEqualTo("12");
        assertThat(sessionDateCalculator2.calculateMonth()).isEqualTo("9");
    }

    @Test
    public void testCalculateYear(){
        assertThat(sessionDateCalculator.calculateYear()).isEqualTo("2022");
        assertThat(sessionDateCalculator2.calculateYear()).isEqualTo("2022");
        assertThat(sessionDateCalculator3.calculateYear()).isEqualTo("2021");
    }

    @Test
    public void testCalculateSession(){
        assertThat(sessionDateCalculator.calculateSession()).isEqualTo("winter2022");
        assertThat(sessionDateCalculator2.calculateSession()).isEqualTo("winter2022");
        assertThat(sessionDateCalculator3.calculateSession()).isEqualTo("summer2021");
    }
}
