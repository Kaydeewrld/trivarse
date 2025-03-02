

//BEGIN of duplicative email code
//This is to avoid needing imports or changing scripts to modules
//Since this file needs to be migrated anyway, we should not worry much about this duplication
const PERSONAL_DOMAINS_SIGNUP = [
  "126.com",
  "163.com",
  "1and1.com",
  "aol.com",
  "aol.it",
  "att.net",
  "bbox.fr",
  "bellsouth.net",
  "bigpond.com",
  "bigpond.com.au",
  "bigpond.net.au",
  "bluewin.ch",
  "btinternet.com",
  "charter.net",
  "comcast.net",
  "cox.net",
  "earthlink.net",
  "email.com",
  "excite.com",
  "facebook.com",
  "fastmail.fm",
  "free.fr",
  "freenet.de",
  "front.ru",
  "frontier.com",
  "frontiernet.net",
  "fuse.net",
  "gmail.com",
  "gmx.at",
  "gmx.com",
  "gmx.de",
  "gmx.fr",
  "gmx.li",
  "gmx.net",
  "googlemail.com",
  "home.nl",
  "home.no.net",
  "home.ro",
  "home.se",
  "hotmail.be",
  "hotmail.co.il",
  "hotmail.co.uk",
  "hotmail.com",
  "hotmail.com.ar",
  "hotmail.com.br",
  "hotmail.com.mx",
  "hotmail.de",
  "hotmail.es",
  "hotmail.fr",
  "hotmail.it",
  "hotmail.kg",
  "hotmail.kz",
  "hotmail.ru",
  "icloud.com",
  "inbox.com",
  "inbox.ru",
  "juno.com",
  "laposte.net",
  "libero.it",
  "list.ru",
  "live.be",
  "live.ca",
  "live.co.uk",
  "live.com",
  "live.com.ar",
  "live.com.au",
  "live.com.mx",
  "live.de",
  "live.fr",
  "live.it",
  "live.nl",
  "livemail.tw",
  "mac.com",
  "mail.com",
  "mail.ru",
  "mailinator.com",
  "me.com",
  "mindspring.com",
  "msn.com",
  "netscape.net",
  "netzero.net",
  "neuf.fr",
  "notmailinator.com",
  "numericable.fr",
  "orange.fr",
  "outlook.com",
  "outlook.com.br",
  "pacbell.net",
  "planet.nl",
  "pobox.com",
  "post.com",
  "post.cz",
  "prodigy.net",
  "prodigy.net.mx",
  "protonmail.com",
  "qq.com",
  "rediffmail.com",
  "roadrunner.com",
  "sbcglobal.net",
  "sfr.fr",
  "shaw.ca",
  "sina.cn",
  "sina.com",
  "sinamail.com",
  "sky.com",
  "sky.com.br",
  "sky.com.mx",
  "skynet.be",
  "spamarrest.com",
  "spamfence.net",
  "spamgourmet.com",
  "t-online.de",
  "telenet.be",
  "telus.net",
  "terra.com.br",
  "tiscali.co.uk",
  "tiscali.it",
  "uol.com.br",
  "usa.net",
  "verizon.net",
  "wanadoo.fr",
  "web.de",
  "windowslive.com",
  "ya.ru",
  "yahoo.ca",
  "yahoo.co.id",
  "yahoo.co.in",
  "yahoo.co.jp",
  "yahoo.co.kr",
  "yahoo.co.nz",
  "yahoo.co.uk",
  "yahoo.com",
  "yahoo.com.ar",
  "yahoo.com.au",
  "yahoo.com.br",
  "yahoo.com.cn",
  "yahoo.com.hk",
  "yahoo.com.is",
  "yahoo.com.mx",
  "yahoo.com.ph",
  "yahoo.com.ru",
  "yahoo.com.sg",
  "yahoo.de",
  "yahoo.dk",
  "yahoo.es",
  "yahoo.fr",
  "yahoo.ie",
  "yahoo.in",
  "yahoo.it",
  "yahoo.jp",
  "yahoo.ru",
  "yahoo.se",
  "yandex.com",
  "yandex.ru",
  "ymail.com",
  "yopmail.com",
  "yopmail.fr",
  "zoho.com",
]
//END of duplicative email code

var AsanaSignupUtils = {

  /**
   * Controls the state of signup buttons as request is made
   *
   * @param {object} element - jQuery object for the element we are working with
   */
  signupButtons: {
    requestClassName: '-request',
    submitButtonClassName: '.signupForm-submit',

    /**
     * signupButtons.request()
     * Applies a class for styling the signup button during a pending request
     * 
     * @param {HTMLAnchorElement|HTMLButtonElement} anchorOrButtonElement - The HTML Anchor or Button Element which initiated the request
     */
    request: function (anchorOrButtonElement) {
      if (anchorOrButtonElement) { anchorOrButtonElement.classList.add(this.requestClassName); }
    },

    /**
     * signupButtons.reset()
     * Removes the pending request styling from signup buttons
     *
     */
    reset: function () {
      var submitButton = document.querySelector(this.submitButtonClassName);
      if (submitButton) submitButton.classList.remove(this.requestClassName);
    }
  },

  validateDomain: {
    failedEnrollment: false,
    levenshteinThreshold: 1,
    hasTriedInvalidDomain: false,
    signupForm: null,
    emailInput: null,
    invalidDomainError: null,
    closeDomainError: null,
    badFormatError: null,
    activeErrorClass: '-active',
    invalidInputClass: '-invalid',

    /**
     * Attaches this object properties to the provided form
     * @param {HTMLFormElement} form
     */
    setFormElements: function (form) {
      this.signupForm = form;
      this.emailInput = this.signupForm.querySelector('input.signup-email');
      this.invalidDomainError = this.signupForm.querySelector('#signup-email__invalid-domain');
      this.closeDomainError = this.signupForm.querySelector('#signup-email__close-domain');
      this.badFormatError = this.signupForm.querySelector('#signup-email__bad_format');
      this.submitButton = this.signupForm.querySelector('.signupForm-submit');

      this.emailInput.addEventListener('input', this.clearErrors.bind(this));
    },

    /**
     * Shows an error message in case an email address has failed basic validation
     * in isValidEmail()
     *
     * @param {HTMLFormElement} form
     * @return {null} Displays error message as side effect
     */
    showEmailFormatValidationError: function (form) {
      this.setFormElements(form);
      this.showError(this.emailInput, this.badFormatError);
    },

    /**
     * Check if the provided form has been submit with an email that is likely to be a misspelled email domain,
     * then show an error with a suggested email.
     *
     * @param {HTMLFormElement} form
     * @return {boolean} returns true if a suggestion exists and an error has been displayed, false if no suggestion
     * is available
     */
    validateEmailSuggestion: function (form) {
      if (this.hasTriedInvalidDomain) return true;

      this.setFormElements(form);
      var closest = this.findClosestDomain(this.emailInput.value, this.levenshteinThreshold);
      if (closest && closest.distance !== 0) {
        this.hasTriedInvalidDomain = true;
        AsanaAnalytics.trackSignupEventsInGtm.init(
          "SignupError",
          "Error Invalid Email Domain",
          "Includes Suggestion"
        );
        this.showSuggestionError(this.emailInput, this.closeDomainError, closest);
        return false;
      }
      return true;
    },

    showSuggestionError: function (invalidInput, errorMessage, closest) {
      try {
        errorMessage.querySelector('.suggested-email').innerText = closest.account + '@' + closest.domain;
      } catch (e) {
        window.AsanaErrors.notify("Email Suggestion failed - could not find .suggested-email selector in error message");
      }
      this.showError(invalidInput, errorMessage);
    },

    showError: function (invalidInput, errorMessage) {
      this.clearErrors();
      invalidInput.classList.add(this.invalidInputClass);
      errorMessage.classList.add(this.activeErrorClass);
    },

    hideError: function (invalidInput, errorMessage) {
      invalidInput.classList.remove(this.invalidInputClass);
      errorMessage.classList.remove(this.activeErrorClass);
    },

    clearErrors: function () {
      this.hideError(this.emailInput, this.invalidDomainError);
      this.hideError(this.emailInput, this.closeDomainError);
      this.hideError(this.emailInput, this.badFormatError);
    },

    findClosestDomain: function (email, threshold) {
      var domain = email.split("@")[1];
      var account = email.split("@")[0];
      if (!domain) return false;

      return PERSONAL_DOMAINS_SIGNUP.reduce(function (closest, current) {
        var distance = window.Levenshtein.get(current, domain);
        if (distance > threshold) return closest;
        if (!closest || distance < closest.distance) return {domain: current, distance: distance, account: account};
        return closest;
      }, false);
    }
  },

  /**
   * sets various domain and sso cookies used by Optimize
   */
  setLoginWithSSOSAMLCookie: function (emailDomainProvider, googleSSORequired, samlSSOState, samlSSORedirect) {

    // Clear existing SSO cookies if present
    AsanaStorage.deleteCookie('sso_status');
    AsanaStorage.deleteCookie('sso_redirect');
    AsanaStorage.deleteCookie("email_domain_provider");

    if (emailDomainProvider) {
      AsanaStorage.setCookie("email_domain_provider", emailDomainProvider, AsanaStorage.CATEGORY.NECESSARY);
    }

    if (googleSSORequired === true) {
      AsanaStorage.setCookie("sso_status", "gsuite_required", AsanaStorage.CATEGORY.NECESSARY);
    } else {
      if (samlSSOState === 'enabled') {
        AsanaStorage.setCookie("sso_status", "saml_optional", AsanaStorage.CATEGORY.NECESSARY);
        AsanaStorage.setCookie("sso_redirect", samlSSORedirect, AsanaStorage.CATEGORY.NECESSARY);
      } else if (samlSSOState === 'required') {
        AsanaStorage.setCookie("sso_status", "saml_required", AsanaStorage.CATEGORY.NECESSARY);
        AsanaStorage.setCookie("sso_redirect", samlSSORedirect, AsanaStorage.CATEGORY.NECESSARY);
      } else if (samlSSOState === 'off') {
        if (emailDomainProvider && emailDomainProvider === 'gsuite') {
          AsanaStorage.setCookie("sso_status", "gsuite_optional", AsanaStorage.CATEGORY.NECESSARY);
        }
      }
    }
  },

  /**
   * Returns the url of the confirmation page the user should be redirected to based on the
   * current tier and email type
   *
   * As of 04/2019, there are 6 pages users get directed to after signup:
   * These are used for marketing tracking purposes. Marketing watches both
   * page views (ie traffic stats to /thanks) and, since this new ecommerce flow,
   * tracks other information about the user that gets collected on the page itself.
   * For more info about this flow, see this task:
   * https://app.asana.com/0/inbox/963821827159036/1119275354323349/1120078175110555
   *
   * @return {string}
   */
  getConfirmationPageRedirect: function (redirect_url) {
    var isPersonalEmail = AsanaHelpers.signupEmailType.isSignupEmailTypePersonal();
    var isWorkEmail = AsanaHelpers.signupEmailType.isSignupEmailTypeWork();
    var redirect_param = redirect_url ? ('?login_redirect_source=' + encodeURIComponent(redirect_url)) : "";
    if (AsanaHelpers.tier.isTierFree() && isWorkEmail) return "/thanks" + redirect_param;
    if (AsanaHelpers.tier.isTierFree() && isPersonalEmail) return "/thank" + redirect_param;
    if (AsanaHelpers.tier.isTierPremium() && isWorkEmail) return "/thank-you" + redirect_param;
    if (AsanaHelpers.tier.isTierPremium() && isPersonalEmail) return "/thankyou" + redirect_param;
    if (AsanaHelpers.tier.isTierBusiness() && isWorkEmail) return "/confirm" + redirect_param;
    if (AsanaHelpers.tier.isTierBusiness() && isPersonalEmail) return "/confirmation" + redirect_param;
    return "/thank"; // Fallback url
  },
};
