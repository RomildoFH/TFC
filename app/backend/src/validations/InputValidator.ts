// https://www.w3resource.com/javascript/form/email-validation.php
export default class InputValidator {
  public static validateEmail = (mail: string): boolean => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true);
    }
    return (false);
  };
}
