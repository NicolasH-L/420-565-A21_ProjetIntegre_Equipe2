package com.equipe2.projet_integre_equipe2.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class SessionDateCalculator {

    private LocalDate date;
    private String monthPattern;
    private String yearPattern;
    private String[] sessionPrefix;
    private int lastMonthOfTheYear;
    private int winterStart;
    private int winterDeadline;
    private int summerStart;
    private int summerDeadline;

    public SessionDateCalculator(LocalDate date, String monthPattern, String yearPattern,
                                 String[] sessionPrefix, int lastMonthOfTheYear, int winterStart,
                                 int winterDeadline, int summerStart, int summerDeadline) {
        this.date = date;
        this.monthPattern = monthPattern;
        this.yearPattern = yearPattern;
        this.sessionPrefix = sessionPrefix;
        this.lastMonthOfTheYear = lastMonthOfTheYear;
        this.winterStart = winterStart;
        this.winterDeadline = winterDeadline;
        this.summerStart = summerStart;
        this.summerDeadline = summerDeadline;
    }

    public String formatDate(LocalDate date, String pattern){
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern(pattern);
        String formattedDate = date.format(myFormatObj);
        return formattedDate;
    }

    public String calculateMonth(){
        int month = Integer.parseInt(formatDate(date, monthPattern));
        return month <= winterDeadline ? String.valueOf(lastMonthOfTheYear) : String.valueOf(month);
    }

    public String calculateYear(){
        int month = Integer.parseInt(calculateMonth());
        int year = Integer.parseInt(formatDate(date, yearPattern));
        return month >= winterStart && month <= lastMonthOfTheYear
                ? String.valueOf(year + 1) : String.valueOf(year);
    }

    public String calculateSession(){
        int month = Integer.parseInt(calculateMonth());
        int year = Integer.parseInt(calculateYear());
        return month >= winterStart && month <= lastMonthOfTheYear
                ? sessionPrefix[0] + year
                : month >= summerStart && month <= summerDeadline
                ? sessionPrefix[1] + year : "Erreur";
    }
}
