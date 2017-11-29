package sadi.whitegroup.assignment1.service;

/**
 * Service for sending emails.
 * <p>
 * We use the @Async annotation to send emails asynchronously.
 */
//@Service
public class MailService {
//
//    private static final String USER = "user";
//    private static final String BASE_URL = "baseUrl";
//    private final Logger log = LoggerFactory.getLogger(MailService.class);
//    private final JavaMailSender javaMailSender;
//
//    private final MessageSource messageSource;
//
//    private final SpringTemplateEngine templateEngine;
//
//    public MailService(JavaMailSender javaMailSender,
//                       MessageSource messageSource, SpringTemplateEngine templateEngine) {
//        this.javaMailSender = javaMailSender;
//        this.messageSource = messageSource;
//        this.templateEngine = templateEngine;
//    }
//
//    @Async
//    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
//        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
//            isMultipart, isHtml, to, subject, content);
//
//        // Prepare message using a Spring helper
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        try {
//            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, CharEncoding.UTF_8);
//            message.setTo(to);
//            message.setFrom("Admin@localhost");
//            message.setSubject(subject);
//            message.setText(content, isHtml);
//            javaMailSender.send(mimeMessage);
//            log.debug("Sent email to User '{}'", to);
//        } catch (Exception e) {
//            if (log.isDebugEnabled()) {
//                log.warn("Email could not be sent to user '{}'", to, e);
//            } else {
//                log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
//            }
//        }
//    }
//
//    @Async
//    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
//        Locale locale = Locale.forLanguageTag("en");
//        Context context = new Context(locale);
//        context.setVariable(USER, user);
//        context.setVariable(BASE_URL, "http://127.0.0.1:8080");
//        String content = templateEngine.process(templateName, context);
//        String subject = messageSource.getMessage(titleKey, null, locale);
//        sendEmail(user.getEmail(), subject, content, false, true);
//
//    }
//
//    @Async
//    public void sendActivationEmail(User user) {
//        log.debug("Sending activation email to '{}'", user.getEmail());
//        sendEmailFromTemplate(user, "activationEmail", "email.activation.title");
//    }
//
//    @Async
//    public void sendCreationEmail(User user) {
//        log.debug("Sending creation email to '{}'", user.getEmail());
//        sendEmailFromTemplate(user, "creationEmail", "email.activation.title");
//    }
//
//    @Async
//    public void sendPasswordResetMail(User user) {
//        log.debug("Sending password reset email to '{}'", user.getEmail());
//        sendEmailFromTemplate(user, "passwordResetEmail", "email.reset.title");
//    }
}
