package sadi.whitegroup.assignment1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sadi.whitegroup.assignment1.config.Constants;
import sadi.whitegroup.assignment1.controller.vm.ManagedUserVM;
import sadi.whitegroup.assignment1.entity.Authority;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.AuthorityRepository;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.AuthoritiesConstants;
import sadi.whitegroup.assignment1.security.SecurityUtils;
import sadi.whitegroup.assignment1.service.dto.UserDTO;
import sadi.whitegroup.assignment1.service.util.RandomUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
    }

    public User registerUser(ManagedUserVM userVM) {

        User newUser = new User();
        Authority authority = authorityRepository.findOne(AuthoritiesConstants.USER);
        Set<Authority> authorities = new HashSet<>();
        String encryptedPassword = passwordEncoder.encode(userVM.getPassword());

        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userVM.getFirstName());
        newUser.setLastName(userVM.getLastName());
        newUser.setEmail(userVM.getEmail());
        newUser.setPhone(userVM.getPhone());

        authorities.add(authority);
        newUser.setAuthorities(authorities);

        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional.of(userRepository
            .findOne(userDTO.getId()))
            .map(user -> {
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setEmail(userDTO.getEmail());
                user.setPhone(userDTO.getPhone());
                Set<Authority> managedAuthorities = user.getAuthorities();
                managedAuthorities.clear();
                userDTO.getAuthorities().stream()
                    .map(authorityRepository::findOne)
                    .forEach(managedAuthorities::add);
                log.debug("Changed Information for User: {}", user);
                return user;
            })
            .map(UserDTO::new);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User getUserWithAuthorities() {
        return userRepository.findOneWithAuthoritiesByEmail(SecurityUtils.getCurrentUserLogin()).orElse(null);
    }


}
