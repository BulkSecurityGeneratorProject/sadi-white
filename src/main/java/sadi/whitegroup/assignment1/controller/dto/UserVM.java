package sadi.whitegroup.assignment1.controller.dto;

import org.hibernate.validator.constraints.Email;
import sadi.whitegroup.assignment1.security.Role;

import javax.validation.constraints.Size;

public class UserVM extends UserDTO {
   public static final int PASSWORD_MIN_LENGTH = 4;
   public static final int PASSWORD_MAX_LENGTH = 100;


   @Email
   @Size(min = 5, max = 100)
   private String email;

   @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
   private String password;

   public UserVM(String email, String password) {
      this.email = email;
      this.password = password;
   }

//   public UserVM(Long id, String email, String password, String firstName, String lastName, String phone, Role role) {
//      super(id, firstName, lastName, phone, role);
//      this.password = password;
//      this.email = email;
//   }

   @Override
   public String getEmail() {
      return email;
   }
   public void setEmail(String email) {
      this.email = email;
   }
   public String getPassword() {
      return password;
   }

}
