package com.equipe2.projet_integre_equipe2.enums;

import java.util.Arrays;
import java.util.List;

public enum EvaluationEnums {

    STUDY_PROGRAM("Technique en Informatique"),
    HIRED("yes"), REJECTED("no"), MAYBE("maybe"),
    FILE_TYPE("Evaluation"), FILE_NAME_START("evaluation-stage-"),
    FILE_TEMPLATE("evaluation-stagiaire-template.pdf"), FORM_EXPECTATION("exp"),
    FORM_HIRE_AGAIN("hireAgain"), FORM_HIRE_DESC("hireDescription"),
    FORM_JOB("jobTitle"), FORM_MONITOR("monitorName"),
    FORM_COMMENTS("comments"), FORM_STUDENT("studentName"), FORM_PROGRAM("studyProgram"),
    FORM_COMPANY("companyName"), FORM_PHONE("telephoneNumber"), FORM_APPRECIATION("appreciations"),
    FORM_DISCUSSED("isDiscussed"),
    FORM_WEEKLY_HOURS("actualWeeklyHours"), FORM_DATE("date"), FORM_ADMIN("adminName"),
    FORM_CHECK("Yes"), NO_COMMENTS("Aucun commentaire");
    private final String STRING_VALUE;

    EvaluationEnums(String value) {
        this.STRING_VALUE = value;
    }

    public String getStringValue() {
        return this.STRING_VALUE;
    }

    public static List<String> getChoices() {
        final String[] CHOICES = new String[]{"a", "b", "c", "d", "e", "f"};
        return Arrays.asList(CHOICES);
    }

    public static List<String> getHeaders() {
        final String[] HEADERS = new String[]{"product", "work", "rel", "person"};
        return Arrays.asList(HEADERS);
    }

    public static List<String> getCapabilityValues(){
        final String [] CAPABILITY_VALUES = new String[]{"1", "2", "3", "4", "5"};
        return Arrays.asList(CAPABILITY_VALUES);
    }

    public static List<String> getAppreciaitionsResults(){
        final String [] APPRECIATION_RESULTS = new String[]{"1", "2", "3", "4", "5"};
        return Arrays.asList(APPRECIATION_RESULTS);
    }
}
