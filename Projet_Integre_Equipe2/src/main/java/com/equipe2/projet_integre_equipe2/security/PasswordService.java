package com.equipe2.projet_integre_equipe2.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordService {

   private PasswordEncoder passwordEncoder;

   public PasswordService(){
       this.passwordEncoder = new BCryptPasswordEncoder();
   }

   public String encodePassword(String password) {
       return passwordEncoder.encode(password);
   }

   public boolean matchPassword(String password, String encoded) {
       return passwordEncoder.matches(password, encoded);
   }
}
