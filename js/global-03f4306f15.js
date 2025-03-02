!function(){"use strict";var r=[],t=[];window.Levenshtein={get:function(e,n){var o,f,i,u,c,h,a=e.length,d=n.length;if(0===a)return d;if(0===d)return a;for(i=0;i<d;++i)r[i]=i,t[i]=n.charCodeAt(i);for(r[d]=d,i=0;i<a;++i){for(f=i+1,u=0;u<d;++u)o=f,h=e.charCodeAt(i)===t[u],(f=r[u]+(h?0:1))>(c=o+1)&&(f=c),f>(c=r[u+1]+1)&&(f=c),r[u]=o;r[u]=f}return f}}}();


/**
 * Anything up here BLOCKS PAGE LOAD - exercise extreme caution.
 * Functions are probably okay - as long as they don't load 3rd party content
 * We're putting global helpers into a custom object to avoid namespace issues
 */

const G_RECAPTCHA_SITE_KEY = "6Lf1FtQZAAAAAKGsW3JoCdtQfzfCb2umWbEoyOjE";

var AsanaTranslations =  {
  emailRegexFail: {
    en: "Something doesn't look right. Please check the email and try again",
    de: "Hier scheint etwas nicht zu stimmen. Bitte prüfen Sie Ihre E-Mail-Adresse und versuchen Sie es erneut.",
    es: "Al parecer, algo no está bien. Verifica tu email e intenta nuevamente.",
    fr: "Il semble y avoir une erreur. Veuillez vérifier votre adresse e-mail, puis réessayer.",
    id: "Sepertinya ada yang tidak beres. Harap periksa email tersebut dan coba lagi",
    it: "Sembra che ci sia un errore. Controlla l'indirizzo email e riprova",
    ja: "どこかに問題があるようです。メールアドレスを確認してもう一度試してください。",
    ko: "문제가 발생했습니다. 이메일을 확인하고 다시 시도하세요",
    nl: "Iets ziet er niet goed uit. Controleer het e-mailadres en probeer het opnieuw",
    pl: "Coś jest nie tak. Sprawdź adres e-mail i spróbuj ponownie.",
    pt: "Parece que algo não está correto. Verifique seu endereço de e-mail e tente novamente.",
    ru: "Что-то не так. Проверьте адрес электронной почты и попробуйте ещё раз",
    sv: "Något verkar ha gått fel. Kontrollera din e-postadress och försök igen",
    "zh-tw": "似乎有地方出錯了。請檢查電子郵件，並再試一次。",
  },
  asanaTip: {
    en: "Asana Tip: ",
    de: "Asana-Tipp: ",
    es: "Consejo de Asana: ",
    fr: "Astuce Asana : ",
    id: "Kiat Asana: ",
    it: "Suggerimento di Asana: ",
    ja: "Asana ヒント: ",
    ko: "Asana 팁: ",
    nl: "Asana-tip: ",
    pl: "Wskazówka Asany: ",
    pt: "Dica da Asana: ",
    ru: "Совет Asana: ",
    sv: "Asana-tips: ",
    "zh-tw": "Asana 提示：",
  },
  getCurrentPageLanguage: function () {
    const defaultLanguage = 'en'
    const languageCodes = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'sv', 'zh-tw']

    var currentPathFirstSegment = window.location.pathname.split('/')[1];

    return languageCodes.indexOf(currentPathFirstSegment) > -1
      ? currentPathFirstSegment
      : defaultLanguage;
  },
  getLanguagePreference: function () {
    const languagePreferenceCookieName = 'lang_pref'
    return AsanaStorage.getCookie(languagePreferenceCookieName) || null;
  },
}

//BEGIN of duplicative email code
//This is to avoid needing imports or changing scripts to modules
//Since this file needs to be migrated anyway, we should not worry much about this duplication
const EMAIL_REGEX = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i;

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

const PERSONAL_DOMAINS = [
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

function isPersonalEmail(email) {
  // technically you can have multiple @'s in an email address
  const parts = email.split("@");

  // get the last chunk, which will be a domain
  const domain = parts[parts.length - 1];

  return PERSONAL_DOMAINS.includes(domain);
}
//END of duplicative email code

/**
 * top-level utilities for all asana sites
 */
var AsanaHelpers = {

  generateNewXsrfToken: function () {
    // Compact UUID4 algorithm from https://gist.github.com/jed/982883
    function b(a) {
      return a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    }

    if (window.crypto && window.crypto.getRandomValues && window.Uint32Array) {
      return crypto.getRandomValues(new Uint32Array(4)).join('-');
    } else {
      // Old browser
      return b();
    }
  },

  /**
   * Return an xsrf token corresponding to the value in the xsrf_token cookie.
   * If there is no cookie then create one.
   */
  getOrCreateXsrfToken: function () {
    var xsrf_token = AsanaStorage.getCookie('xsrf_token');
    if (!xsrf_token) {
      xsrf_token = this.generateNewXsrfToken();
    }
    AsanaStorage.setCookie('xsrf_token', xsrf_token, AsanaStorage.CATEGORY.NECESSARY, 1 / 24, true); // expires in 1hr

    return xsrf_token;
  },

  /**
   * if on localhost, use sandbox, otherwise go to the web app
   * append options for signup, auth, and experiments to url
   */
  appUrl: function (opt_suffix, opt_prefix) {
    if (opt_suffix === undefined) {
      opt_suffix = '';
    }

    if (!opt_prefix) {
      opt_prefix = '';
    } else {
      opt_prefix += '.';
    }

    // Please do not change "false"
    // That is going to be replaced when running the dev server or when the site is built
    // setting the environment variable "IS_SANDBOX" to any value.
    // " and " are part of a template system that takes care of the replacement.
    // It was specially formatted this way to avoid any lint issue.
    // The default value would be "false" if the env variable "IS_SANDBOX" is not set at all
    if (window.location.hostname === 'local.asana.com' && false) {
      return 'https://localhost.asana.com:8180' + opt_suffix;
    } else {
      return 'https://' + opt_prefix + 'app.asana.com' + opt_suffix;
    }
  },

  /**
   * if on i18n page, adjust link with prefix
   */
  asanaDotComUrl: function (english_path) {
    if (english_path === undefined) {
      english_path = '';
    }

    var currentLang = AsanaTranslations.getCurrentPageLanguage();

    return currentLang === 'en' ? english_path : '/' + currentLang + english_path;
  },

  /**
   * tests to see if the browser’s userAgent matches iOS, Android, or IE
   * returns a string which is used in setGlobalClasses() and isMobilePlatform()
   */
  specialPlatform: function () {
    var ua = navigator.userAgent;
    if (ua.match(/(iPhone|iPod|iPad)/)) {
      return 'ios';
    } else if (ua.match(/Android|Pixel/)) {
      return 'android';
    } else if (ua.match(/MSIE/)) {
      return 'ie';
    } else {
      return false;
    }
  },

  /**
   * returns true for either android or ios userAgents
   */
  isMobilePlatform: function () {
    return this.specialPlatform() === 'ios' || this.specialPlatform() === 'android';
  },

  /**
   * returns true if the cookie for logged in exists
   * used in setGlobalClasses()
   */
  isLoggedIn: function () {
    return document.cookie.indexOf('is_logged_in') !== -1;
  },

  // TODO: rename this function - it doesn't answer the question "is the user premium?", instead it does DOM manipulation and sessionStorage changing in case the app has indicated the user is indeed premium
  isPremiumUser: function (data) {
    if (data.user_in_premium_domain || data.user_in_premium_team) {
      document.querySelectorAll(".visible-premium").forEach(function(el){el.style.display = "block"});
      document.querySelectorAll(".hidden-premium").forEach(function(el){el.style.display = "none"});
      
      // The setItem interface was reverted to accept strings only on the 2011 Sept 1st draft to
      // match the behavior of existing implementations, as none of the vendors are interested in
      // supporting storing non-strings
      // https://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
      window.sessionStorage.setItem('isPremium', '1');
    }
  },

  /**
   * sets global classes for specific devices/platforms based on userAgents
   * see specialPlatform(), isMobilePlatform(), and isLoggedIn()
   */
  setGlobalClasses: function () {
    if (this.specialPlatform() === 'ios') {
      document.querySelector("html").classList.add("device-ios");
    }

    if (this.specialPlatform() === 'android') {
      document.querySelector("html").classList.add("device-android");
    }

    if (this.isMobilePlatform()) {
      document.querySelector("html").classList.add("device-mobile");
    }

    if (this.isLoggedIn()) {
      if (window.sessionStorage.isPremium == '1') {
        document.querySelectorAll(".visible-premium").forEach(function(el){el.style.display = "block"});
        document.querySelectorAll(".hidden-premium").forEach(function(el){el.style.display = "none"});
      } else {
        AsanaAppUserInfo.get(this.isPremiumUser);
      }
    }
  },

  /**
   * Enables, disables or toggles background scrolling via class on <html>.
   *
   * @param {boolean|undefined} enable - Optional. True to allow background scroll, False to disable, undefined to toggle.
   * @returns {void}
   */
  setBackgroundScroll: function (enable) {
    var noScrollClass = '-no-scroll';

    // Determine behavior in toggle case
    if (typeof enable === 'undefined') {
      enable = document.querySelector("html").classList.contains(noScrollClass);
    }

    if (enable) {
      document.querySelector("html").classList.remove(noScrollClass);
    } else {
      document.querySelector("html").classList.add(noScrollClass);
    }
  },

  /** Our modals are #anchored elements styled via :target attributes, so you just
   * need to navigate to them! Pass the modal's ID in to simulate visiting that URL
   *
   * Sets currentModal and disables background scrolling.
   *
   * @param {string} modal - Modal name.
   * @param {Object} data - Data from the modal's opener.
   * @param {HTMLElement} opener - Element that triggered modal opening.
   * @returns {void}
   */
  showModal: function (modal, data, opener) {
    AsanaHelpers.currentModal = {
      name: modal,
      element: () => document.getElementById(modal),
      opener: opener,
      data: data || {},
    };
    AsanaHelpers.setBackgroundScroll(false);

    window.location.hash = modal;
  },

  signupModal: {
    init: function () {
      setTimeout(function () {
        var signupBtn = document.querySelector('#signup.modal .js-signup-button');
        var closeTriggers = document.querySelectorAll('#signup.modal [data-modal-close]');

        if (signupBtn && closeTriggers) {
          const clickHandler = AsanaHelpers.signupModal.getSignupClickHandler();
          signupBtn.addEventListener('click', clickHandler);

          closeTriggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
              signupBtn.removeEventListener('click', clickHandler);
            });
          });
        }
      }, 1000);
    },

    getSignupClickHandler: function () {
      return function (event) {
        event.preventDefault();
        try {
          var form = document.querySelector('#signup.modal .signupForm');
          var signupModalContainer = document.querySelector('#signup.modal .modal-container');
          var closeTriggers = document.querySelectorAll('#signup.modal [data-modal-close]');
          var emailInput = form.querySelector('input.signup-email');
          var email = emailInput.value;

          //email validation block taken from signup function
          if (!isValidEmail(email)) {
            var currentLanguage = AsanaTranslations.getCurrentPageLanguage();
            emailInput.setCustomValidity(AsanaTranslations.emailRegexFail[currentLanguage]);
            emailInput.reportValidity();
            console.error('Email not validated because of function above but passed HTML validator.');

            emailInput.addEventListener('input', function inputHandler() {
              emailInput.setCustomValidity('');
              emailInput.removeEventListener('input', inputHandler);
            });
          } else {
            signupModalContainer.classList.add('premium-reminder-modal-transition');
            //overriding sso variable b/c no way to handle callback from signupWithEmail
            AsanaSignupUtils.validateDomain.hasTriedInvalidDomain = true;
            closeTriggers.forEach(function (trigger) {
              trigger.addEventListener('click', function () {
                AsanaHelpers.enterFreeSignupFlow();
                AsanaHelpers.signupWithEmail(form);
              });
            });
          }
        } catch (err) {
          console.warn(err);
        }
      }
    },
  },

  /**
   * When a modal is shown, this contains: {
   *   name: string         Name of the modal
   *   element: HTMLElement The DOM element for the modal
   *   opener: any          Whatever caused the modal to open. Usually this is
   *                        an HTMLAnchorElement, but can be anything if opened
   *                        from code.
   *   data: Object         Any data associated with triggering the modal. If a
   *                        link triggered the modal, this will be the link's
   *                        `.dataset`
   * }
   */
  currentModal: null,

  /**
   * Set of utilities to manage the "tier" property on the ecommerceConfig object.
   * This information is consumed by the signup endpoint.
   * The tier can be set through the user journey via the setTier{TIER_NAME}() method.
   */

  tier: {
    defaultTier: null,

    tierNamesById: {
      'tier-0-free': 'free',
      'tier-starter': 'starter',
      'tier-advanced': 'advanced',
      'tier-2-enterprise': 'enterprise',
    },

    /**
     * Gets the human readable name of the provided tier id
     *
     * @param tierId
     * @return {string|null}
     */
    getTierNameById: function (tierId) {
      return this.tierNamesById[tierId] || null;
    },

    /**
     * Gets the currently set tier id
     *
     * @return {"tier-0-free"|"tier-starter"|"tier-advanced"|"tier-2-enterprise"|null}
     */
    getCurrentTier: function () {
      var config = AsanaStorage.getEcommerceConfig();
      return config['tier'] || this.defaultTier;
    },

    /**
     * Gets the current tier human readable name
     *
     * @return {"free"|"starter"|"advanced"|"enterprise"|null}
     */
    getCurrentTierName: function () {
      return this.getTierNameById(this.getCurrentTier());
    },

    setCurrentTier: function (tierId) {
      if (!this.tierNamesById[tierId] && tierId !== null) {
        window.AsanaErrors.notifyException(tierId + ' is not a valid tierId', 'invalid setCurrentTier param');
        return;
      }

      AsanaStorage.updateEcommerceConfig(function (config) {
        config['tier'] = tierId;
        return config;
      });
    },

    setTierFree: function () {
      this.setCurrentTier('tier-0-free');
    },

    /**
     * @return {boolean}
     */
    isTierFree: function () {
      return this.getCurrentTier() === 'tier-0-free';
    },

    setTierPremium: function () {
      this.setCurrentTier('tier-starter');
    },

    /**
     * @return {boolean}
     */
    isTierPremium: function () {
      return this.getCurrentTier() === 'tier-starter';
    },

    setTierBusiness: function () {
      this.setCurrentTier('tier-advanced');
    },

    /**
     * @return {boolean}
     */
    isTierBusiness: function () {
      return this.getCurrentTier() === 'tier-advanced';
    },

    setTierDefault: function () {
      this.setCurrentTier(this.defaultTier);
    },
  },

  signupEmailType: {
    validEmailTypes: ['personal', 'work'],

    getSignupEmailType: function () {
      var config = AsanaStorage.getEcommerceConfig();
      return config['signup_email_type'] || null;
    },

    setSignupEmailType: function (signupEmailType) {
      if (!this.validEmailTypes.includes(signupEmailType)) {
        window.AsanaErrors.notifyException(
          signupEmailType + ' is not a valid signup email type',
          'invalid setSignupEmailType param',
        );
        return;
      }

      AsanaStorage.updateEcommerceConfig(function (config) {
        config['signup_email_type'] = signupEmailType;
        return config;
      });
    },

    setSignupEmailTypePersonal: function () {
      this.setSignupEmailType('personal');
    },

    /**

     * @return {boolean}
     */
    isSignupEmailTypePersonal: function () {
      return this.getSignupEmailType() === 'personal';
    },

    setSignupEmailTypeWork: function () {
      this.setSignupEmailType('work');
    },

    /**
     * @return {boolean}
     */
    isSignupEmailTypeWork: function () {
      return this.getSignupEmailType() === 'work';
    },
  },

  billableGroupType: {
    CONFIG_KEY: 'billable_group_type',

    validBillableGroupTypes: [
      '', // The org is fully paid
      'org', // The org is partially paid with 5 or more users
      'team', // The org is partially paid with 4 or fewer users
      'new_org', // This is new org
      'workspace', // This is a workspace
    ],

    setUsingEmail: function (email) {
      if (isPersonalEmail(email)) {
        this.setWorkspace();
      } else {
        this.setNewOrg();
      }
    },

    /**
     * @return {null|string}
     */
    get: function () {
      var config = AsanaStorage.getEcommerceConfig();
      return config[this.CONFIG_KEY];
    },

    set: function (billableGroupType) {
      if (!this.validBillableGroupTypes.includes(billableGroupType)) {
        window.AsanaErrors.notifyException(
          billableGroupType + ' is not a valid signup email type',
          'invalid setBillableGroupType param',
        );
        return;
      }

      var config = AsanaStorage.getEcommerceConfig();
      config[this.CONFIG_KEY] = billableGroupType;
      AsanaStorage.setEcommerceConfig(config);
    },

    setFullyPaid: function () {
      this.set('');
    },

    /**
     * @return {boolean}
     */
    isFullyPaid: function () {
      return this.get() === '';
    },

    setTypeOrg: function () {
      this.set('org');
    },

    /**
     * @return {boolean}
     */
    isOrg: function () {
      return this.get() === 'org';
    },

    setTeam: function () {
      this.set('team');
    },

    /**
     * @return {boolean}
     */
    isTeam: function () {
      return this.get() === 'team';
    },

    setNewOrg: function () {
      this.set('new_org');
    },

    /**
     * @return {boolean}
     */
    isNewOrg: function () {
      return this.get() === 'new_org';
    },

    setWorkspace: function () {
      this.set('workspace');
    },

    /**
     * @return {boolean}
     */
    isWorkspace: function () {
      return this.get() === 'workspace';
    },
  },

  /**
   * The default state of signing up for trials is now true. A user at the
   * moment should only signup for trial false if they are in the free tier.
   * isInTrialFlow the variable is passed in when signing up
   */
  trial: {
    isInTrialFlow: true,

    setTrialDefault: function () {
      AsanaHelpers.trial.isInTrialFlow = true;
    },

    setTrialTrue: function () {
      AsanaHelpers.trial.isInTrialFlow = true;
    },

    setTrialFalse: function () {
      AsanaHelpers.trial.isInTrialFlow = false;
    },
  },

  enterFreeSignupFlow: function () {
    AsanaHelpers.trial.setTrialFalse();
    AsanaHelpers.tier.setTierFree();
    var ecommerceConfig = AsanaStorage.getEcommerceConfig();
    ecommerceConfig['free_user'] = true;
    ecommerceConfig['is_trial'] = 'false';
    AsanaStorage.setEcommerceConfig(ecommerceConfig);
  },

  recordPurchaseIntent: function () {
    AsanaHelpers.trial.setTrialFalse();
    var ecommerceConfig = AsanaStorage.getEcommerceConfig();
    ecommerceConfig['free_user'] = false;
    ecommerceConfig['is_purchase'] = true;
    AsanaStorage.setEcommerceConfig(ecommerceConfig);
  },

  recordTrialIntent: function () {
    AsanaHelpers.trial.setTrialTrue();
    var ecommerceConfig = AsanaStorage.getEcommerceConfig();
    ecommerceConfig['free_user'] = false;
    ecommerceConfig['is_trial'] = 'true';
    ecommerceConfig['is_purchase'] = false;
    AsanaStorage.setEcommerceConfig(ecommerceConfig);
  },

  /**
   * Get any page-level metadata that might be available.
   *
   * Metadata can be specified as JSON script blobs anywhere in the page that
   * have a `data-page-metadata` attribute. All such blobs are merged together
   * (in page order) to create the final result. For example:
   *
   *     <script data-page-metadata type="application/json">{
   *       "use_case_segment": "design"
   *     }</script>
   *     <script data-page-metadata type="application/json">{
   *       "custom_landing_page": true
   *     }</script>
   *
   * You can put many properties in each blob. Supporting multiple blobs allows
   * independent components to each add to the page's metadata.
   *
   * @returns {Object}
   */
  getPageMetadata: function () {
    if (!AsanaHelpers._pageMetadata) {
      var metadata = {};
      document.querySelectorAll('[data-page-metadata]').forEach(function(node) {
        try {
          var parsed = JSON.parse(node.textContent);
          Object.assign(metadata, parsed);
        } catch (error) {
          if (console) {
            (console.error || console.log)(
              'Could not parse page metadata: `' + node.textContent + '`',
            );
          }
        }
      });

      // Don't cache the results if the HTML document is still loading; there
      // may be more undiscovered metadata coming in.
      if (document.readyState === 'loading') return metadata;
      AsanaHelpers._pageMetadata = metadata;
    }

    return AsanaHelpers._pageMetadata;
  },

  /**
   * For a user who signs up through a segmented langing page, we want to
   * include a parameter called "use_case_segment" with a different value
   * depending on the landing page. If the page metadata contains a
   * use_case_segment, that will be returned. Otherwise, this checks the URL
   * for values from `userSegmentationValueMap`, which maps URL segments to
   * the value that should be passed to the form.
   * @returns {string}
   */
  getUserSegment: function () {
    var meta = AsanaHelpers.getPageMetadata();
    if (meta.use_case_segment) return meta.use_case_segment;

    var userSegmentationValueMap = {
      'marketing': 'marketing',
      'product-managers': 'product',
      'designers': 'design',
      'engineering': 'engineering',
      'hr': 'hr',
      'it': 'it',
    };

    var checkUrlForMatch = function (keys) {
      var url = window.location.href;
      for (var i = 0; i < keys.length; i++) {
        if (url.indexOf('/teams/' + keys[i]) > -1) {
          return keys[i];
        }
      }
      return null;
    };

    var keys = Object.keys(userSegmentationValueMap);
    var userSegmentationKey = checkUrlForMatch(keys);

    var userSegmentationValue = userSegmentationKey
      ? userSegmentationValueMap[userSegmentationKey]
      : '';

    return userSegmentationValue;
  },

  /**
   * Determine what application template a user might be looking at.
   *
   * For a user who signs up through a template gallery page or in some
   * template-focused context, we want to include a `registered_with_use_case_template` field
   * with the template’s ID. That way, the app can automatically set up with
   * the template when they first log in.
   *
   * @returns {string}
   */
  getUserTemplate: function () {
    return AsanaHelpers.getPageMetadata().registered_with_use_case_template || '';
  },

  /**
   * Begins login modal flow:
   * 1. Pushes a login event to GA
   * 2. If the browser is iOS or Android, just a redirect to the web version. see appURL()
   * 3. Otherwise, show the login modal
   *    and focus the email field unless you’re on IE, which hides the placeholder in the text field onFocus
   * 
   * TODO: Determine if Login Modal flow even exists anymore. The only component calling this is HeaderGuide
   * This function either directs to an app url before a modal is shown, or triggers a modal with hash 'login' 
   * However, GuideModal attaches event listeners to listen to hash changes and when 'login' is used, it redirects the user to /-/login
   * So it appears there are not legitimate flows where a modal will actually show when this function is used.
   */
  showLoginModal: function () {
    if (this.isMobilePlatform()) {
      window.location = AsanaHelpers.appUrl('/');
      return false;
    }

    AsanaHelpers.showModal('login');
    
    // TODO: determine if this block below is ever actually executed. See above notes about Login Modal flow.
    if (!this.specialPlatform()) {
      // ie and mobile prevent the placeholder from being visible and/or pop
      // up a keyboard
      var loginEmailLoginModal = document.querySelector('#login-email-login-modal');
      if (loginEmailLoginModal) loginEmailLoginModal.focus(); 
    }
  },

  /**
   * Callbacks that can be overridden with with component-specific functionality
   * These are global references meant to be overridden with React-specific functionality
   * These can be removed when signup code is all React-ified
   */
  signupPreventedCallbacks: {
    /**
     * Callback to be fired when API returns a rejected signup because of personal email
     */
    personalEmailErrorCallback: function () { },
    /**
     * Callback to be fired when API returns a rejected channel signup 
     */
    partnershipEmailBlockedByChannel: function (blockReason) { },
    /**
     * Callback to be fired when API returns a rejected signup because of an invalid partnership value
     */
    invalidPartnershipErrorCallback: function () { },
    /**
     * Callback to be fired when API returns user_can_self_serve_channel: true for an existing user
     */
    partnershipExistingUserSelfServeCallback: function (userEmail) { },
    /**
     * Callback to be fired when API returns user_can_self_serve_channel: false for an existing user
     */
    partnershipExistingUserSelfServeBlockCallback: function (userEmail) { },
    /**
     * Callback to be fired when API returns user_can_self_serve_channel: false for a new user
     */
    partnershipNewUserSelfServeBlockCallback: function (userEmail) { },
    /**
     * Callback to be fired when signupWithEmail returns early due to an invalid email
     */
    invalidEmailErrorCallback: function () { },
    /**
     * Callback to be fired when signupWithEmail returns early due to an invalid reCAPTCHA token
     */
    invalidRecaptchaErrorCallback: function () { },
  },

  /**
   * Begins the email signup flow, approximately 2/3rds of signups, pushes
   * relevant analytics data. Major updates to this function should include test
   * coverage
   *
   * @param {HTMLElement} form - A DOM node of form element
   * @param {options} [options] - An optional object with additional data
   * @param {boolean} [options.isContentful] - A boolean noting whether the form is from Contentful
   * @param {string} [options.partnershipChannel] - A string identifying the partnership channel if needed
   * @param {string} [options.isAutoSignup] - A boolean noting whether the signup was triggered automatically
   * @param {boolean} [options.supportsPinVerification] - A boolean noting whether the signup supports email verification by PIN

   */
  signupWithEmail: function (form, options) {
    var isContentful = options && options.isContentful;
    var partnershipChannel = options && options.partnershipChannel;
    var isAutoSignup = options && options.isAutoSignup;
    var supportsPinVerification = options && options.supportsPinVerification;

    // this property is used to track signups originating from external pages, such as forms, across the create-account page and the webapp
    // more information can be found here: https://app.asana.com/0/1201398057588196/1201490079187963/f
    var inviteUiSource = AsanaHelpers.getUrlParams.get('invite_ui_source');

    // this property is used to track signups originating from the login page where the user was redirected
    // more information can be found here: https://app.asana.com/0/1199982652463212/1203290381854355/f
    var loginRedirectSource = AsanaHelpers.getUrlParams.get('login_target_url');

    // this property is used to determine if and where we should redirect the user after signup
    // that is initiated from a mobile context
    var redirectUrl = AsanaHelpers.getUrlParams.get('u');

    // START createAccountAutoSignup
    var emailAlreadySubmitted = AsanaHelpers.getUrlParams.get('email_already_submitted');
    // END createAccountAutoSignup

    // temp cond for contentful enabled signup flow
    var email_input = isContentful ? form.querySelector('input[type="text"]') : form.querySelector('.input--email');
    var email = email_input ? email_input.value : '';
    AsanaAnalytics.trackSignupEventsInGtm.storeGtmSignupSubmissionData();

    // temp cond for contentful enabled signup flow
    if (!isContentful) {
      // display error message and cancel form submission if an email suggestion is available
      if (!AsanaSignupUtils.validateDomain.validateEmailSuggestion(form)) {
        AsanaHelpers.signupPreventedCallbacks.invalidEmailErrorCallback();
        return;
      }

      if (!isValidEmail(email)) {
        AsanaHelpers.signupPreventedCallbacks.invalidEmailErrorCallback();
        AsanaSignupUtils.validateDomain.showEmailFormatValidationError(form);
        return;
      }
    }

    // temp cond for contentful enabled signup flow
    if (!isContentful) {
      var button = form.querySelector('.signupForm-submit');
      AsanaSignupUtils.signupButtons.request(button);
    }

    var submitData = {
      email: email.trim(),
      xsrf_token: AsanaHelpers.getOrCreateXsrfToken(),
      extra: JSON.stringify(("getFullVisitAttribution" in AsanaHelpers) ? AsanaHelpers.getFullVisitAttribution() : {}),
      seen_tos: true,
      lang_pref: AsanaTranslations.getLanguagePreference(),
      ref_lang: AsanaTranslations.getCurrentPageLanguage(),
      registered_with_trial: AsanaHelpers.trial.isInTrialFlow.toString(),
      use_case_segment: AsanaHelpers.getUserSegment(),
      registered_with_use_case_template: AsanaHelpers.getUserTemplate(),
      buy_on_static_site_enabled: !AsanaHelpers.isMobilePlatform(),
    };

    /* BEGIN FX Asanadotcom > NUX https://app.asana.com/0/1204894739732349/1204919236662848 */
    let signUpSourcePath = window.location.pathname;
    try {
      // if we're on the create-account page, use the previous page as the sign up source
      // in the case of document.referrer being empty, signUpSourcePath defaults to current url path
      if (signUpSourcePath.startsWith('/create-account')) {
        signUpSourcePath = new URL(document.referrer).pathname;
      }
      // eslint-disable-next-line no-empty
    } catch {}

    submitData.asanadotcom_signup_source = signUpSourcePath;
    /* END FX Asanadotcom > NUX */

    if (inviteUiSource) {
      submitData.invite_ui_source = inviteUiSource;
    }

    if (redirectUrl || loginRedirectSource) {
      submitData.login_redirect_source = redirectUrl || loginRedirectSource;
    }

    if (emailAlreadySubmitted) {
      submitData.is_optimized_signup_flow_enabled = emailAlreadySubmitted;
    }

    // if a user signs up through a partnership page (eg: /align-create-account), add query param
    if (partnershipChannel) {
      submitData.registered_with_channel = partnershipChannel;
    }

    if (supportsPinVerification) {
      submitData.supports_pin_verification = supportsPinVerification;
    }

    var currentTierName = AsanaHelpers.tier.getCurrentTierName();
    if (currentTierName) {
      // endpoint expects a name like "premium" instead of an id like "tier-starter"
      submitData.registered_with_tier = currentTierName;
    } else {
      //sets default (fallback) tier k/v pair in tier object to premium.
      AsanaHelpers.tier.defaultTier = 'tier-starter';
      //sets ecom config "tier" property to default value set above.
      AsanaHelpers.tier.setTierDefault();
      //sets value to fallback
      submitData.registered_with_tier = AsanaHelpers.tier.getCurrentTierName();
    }

    // Check for and add UTM params if they exist
    // Needed for PartnerStack referral tracking
    try {
      var utmMedium = AsanaHelpers.getUrlParams.get('utm_medium');
      var utmSource = AsanaHelpers.getUrlParams.get('utm_source');
      var utmCampaign = AsanaHelpers.getUrlParams.get('utm_campaign');
      var newSubmitExtraData = {};
      if (utmMedium && utmSource && utmCampaign) {
        newSubmitExtraData = JSON.parse(submitData.extra);
        newSubmitExtraData.utm_medium = utmMedium;
        newSubmitExtraData.utm_source = utmSource;
        newSubmitExtraData.utm_campaign = utmCampaign;
        submitData.extra = JSON.stringify(newSubmitExtraData);
      }
    } catch (error) {
      console.error('Failed to add utm parameters to /-/signup.', error);
      window.AsanaErrors.notifyException(error);
    }

    var ecommerceConfig_collectInfoBeforeSignup = AsanaStorage.getEcommerceConfig();
    ecommerceConfig_collectInfoBeforeSignup['buy_on_static_site_enabled'] =
      !AsanaHelpers.isMobilePlatform();
    ecommerceConfig_collectInfoBeforeSignup['is_trial'] = submitData.registered_with_trial;
    AsanaStorage.setEcommerceConfig(ecommerceConfig_collectInfoBeforeSignup);

    /*--- Prepare and make the AJAX request to the /-/signup endpoint ---*/

    // 1. Create xhr object and initialize settings
    var xhr = new XMLHttpRequest();
    xhr.open('POST', AsanaHelpers.appUrl('/-/signup'), true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01');
    xhr.timeout = 30000;
    xhr.withCredentials = true;
    
    // 2. Register the onload function to be called upon receiving response from /-/signup
    xhr.onload = function() {
      // Handle successful (200) responses
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        handleSignupSuccess(data, submitData, isContentful, form);
      } 
      // If response is not 200 handle call our error handler
      else {
        handleSignupWithEmailRequestError(xhr, isContentful, isAutoSignup);
      }
    };
    
    // 3. Register error handler for requests that encounter network errors
    xhr.onerror = function() {
      handleSignupWithEmailRequestError(xhr, isContentful, isAutoSignup);
    };

    // 4. Add the reCAPTCHA token to the request if it exists
    if (options && options.recaptchaToken) {
      submitData["g-recaptcha-enterprise-response"] = options.recaptchaToken;
    }

    // 5. Initiate request
    xhr.send(urlEncodeObject(submitData));

    /**
     * Handler for both network errors and non-200 responses for requests to /-/signup
     * 
     * @param {XMLHttpRequest} xhr   - The XMLHttpRequest object used to make the AJAX call to /-/signup
     * @param {boolean} isContentful - A boolean noting whether the form is from Contentful
     * @param {string} [options.isAutoSignup] - A boolean noting whether the signup was triggered automatically
     */
    function handleSignupWithEmailRequestError(xhr, isContentful, isAutoSignup) {
      if (!isContentful) AsanaSignupUtils.signupButtons.reset();
      AsanaAnalytics.trackSignupEventsInGtm.init(
        'SignupError',
        'Error Couldnt Sign Up',
        xhr.status.toString(),
      );
      
      AsanaHelpers.trial.setTrialDefault();
      
      if (xhr.statusText) {
        window.AsanaErrors.notifyException(
          'Failed signup[refactored] - showing signup failed modal ' + xhr.statusText
        );
      } else {
        window.AsanaErrors.notifyException(
          'Failed signup[refactored] - showing signup failed modal',
        );
      }

      if (isAutoSignup) {
        const signupFailedUrl = window.AsanaHelpers.asanaDotComUrl("/create-account#signup-failed");
        const url = new URL(signupFailedUrl, window.location.origin);
        url.search = window.location.search;

        window.location.href = url.toString();
      } else {
        AsanaHelpers.showModal('signup-failed');
      }
    }

    /**
     * Takes an object and URL encodes it
     * This is used on our submitData so we can send it with Content-Type: "application/x-www-form-urlencoded; charset=UTF-8" to /-/signup
     *
     * @param {object} obj - The object to be URL encoded
     * 
     * @return {string}    - The string containing the URL encoded version of the object
    */
    function urlEncodeObject(obj) {
      var encodedString = '';
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (encodedString.length > 0) {
            encodedString += '&';
          }
          encodedString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }
      }
      return encodedString;
    }

    /**
     * Handler for successful signup requests
     * Called after a successful request to /-/signup endpoint
     *
     * @param {object}             responseData - An object containing data from the response from the /-/signup api
     * @param {boolean|undefined}  responseData.user_is_new - If the user is a new signup
     * @param {boolean|undefined}  responseData.is_personal_email - If the user's email was determined to be a personal email
     * @param {string|undefined}   responseData.email_blocked_by_channel_reason - The reason the user's email was blocked by the partnership channel. Undefined if it was not blocked.
     * @param {boolean|undefined}  responseData.invalid_channel - If signup request contained an invalid partnership channel
     * @param {boolean|undefined}  responseData.user_can_self_serve_channel - If the user can self-serve the partnership channel for signup
     * @param {string|undefined}   responseData.email_domain_provider - The user's email provider
     * @param {boolean|undefined}  responseData.google_sso_required - If Google SSO is required
     * @param {object|undefined}   responseData.saml_sso - An object with data related to SAML
     * @param {string|undefined}   responseData.saml_sso.state - "off", "enabled" or "required"
     * @param {string|undefined}   responseData.saml_sso.sign_on_url - The SAML url
     * @param {string[]|undefined} responseData.billable_group_types_available_for_purchase - "team", "workspace", "new_org"
     * @param {string|undefined}   responseData.encrypted_user_id - The encrypted user id
     * @param {string|null}        responseData.status - "check-email" is signup email was sent, null if not
     * @param {boolean|undefined}  responseData.user_is_claimed - If the user is claimed or not
     * @param {boolean|undefined}  responseData.should_use_pin_verification - If the user can use pin verification
     * @param {object}             submitData - An object containing data which was submitted to /-/signup
     * @param {string}             submitData.registered_with_trial - A stringified version of a boolean indicating if this was a trial signup
     * @param {string}             submitData.email - The email address used in the signup request
     * @param {string|undefined}   submitData.registered_with_channel - The partnership channel for signup, if one exists
     * @param {string|undefined}   submitData.login_redirect_source - url to redirect user to after signup
     * @param {boolean}            isContentful - A boolean noting whether the form is from Contentful
     */
    function handleSignupSuccess(responseData, submitData, isContentful) {
      // If user has invalid email, show them an error message
      const emailDomainProvider = responseData.email_domain_provider;
      if (!isContentful) {
        if (emailDomainProvider === 'invalid') {
          AsanaSignupUtils.signupButtons.reset();
          AsanaAnalytics.trackSignupEventsInGtm.init(
            'SignupError',
            'Error Invalid Email Domain',
            'No Suggestion',
          );
          AsanaHelpers.showModal('signup-failed', {
            is_invalid_email_domain_provider: true,
          });
          AsanaHelpers.trial.setTrialDefault();
          return;
        }
      }

      if (responseData.recaptcha_invalid) {
        AsanaHelpers.signupPreventedCallbacks.invalidRecaptchaErrorCallback();
        return;
      }

      // For partnership signups, check for prevented signups and return if found
      if (submitData.registered_with_channel) {
        // Signup request contained an invalid channel value
        if (responseData.invalid_channel) {
          AsanaAnalytics.trackSignupEventsInGtm.init(
            'SignupError',
            'Error invalid partnership channel',
            'No Suggestion',
          );
          window.AsanaErrors.notify(
            'Failed partnership signup - invalid partnership channel',
          );
          // Run the callback function containing react-specific functionality
          AsanaHelpers.signupPreventedCallbacks.invalidPartnershipErrorCallback();
          return;
        }
        
        // Signup request contained a personal email address, and channel does not allow personal emails
        if (responseData.email_blocked_by_channel_reason) {
          
          let eventMessage = ''
          if (responseData.email_blocked_by_channel_reason === 'personal_email_blocked') eventMessage = 'Error partnership channel does not accept personal emails';
          if (responseData.email_blocked_by_channel_reason === 'non_personal_email_blocked') eventMessage = 'Error partnership blocked non personal email';

          AsanaAnalytics.trackSignupEventsInGtm.init(
            'SignupError',
            eventMessage,
            'No Suggestion',
          );
          window.AsanaErrors.notify(
            'Failed channel signup - ' + responseData.email_blocked_by_channel_reason + ' for channel:' + submitData.registered_with_channel,
          );
          // Run the callback function containing react-specific functionality
          AsanaHelpers.signupPreventedCallbacks.partnershipEmailBlockedByChannel(responseData.email_blocked_by_channel_reason);
          return;
        }

      }

      var googleSSORequired = responseData.google_sso_required;
      var samlSSOState = responseData.saml_sso ? responseData.saml_sso.state : null;
      var samlSSORedirect = responseData.saml_sso ? responseData.saml_sso.sign_on_url : null;
      AsanaSignupUtils.setLoginWithSSOSAMLCookie(
        emailDomainProvider,
        googleSSORequired,
        samlSSOState,
        samlSSORedirect,
      );
      AsanaStorage.setCookie("should_use_pin_verification", responseData.should_use_pin_verification, AsanaStorage.CATEGORY.NECESSARY);

      var billableGroupTypeResponse = responseData.billable_group_types_available_for_purchase;
      if (Array.isArray(billableGroupTypeResponse)) {
        if (billableGroupTypeResponse[0]) {
          AsanaHelpers.billableGroupType.set(billableGroupTypeResponse[0]);
        } else {
          AsanaHelpers.billableGroupType.setFullyPaid();
          AsanaStorage.updateEcommerceConfig(function (config) {
            config['is_trial'] = 'false';
            return config;
          });
        }
      }

      // Signups that are not allowed to buy on AsanaDotCom are defaulted to workspace
      var ecommConfig = AsanaStorage.getEcommerceConfig();
      if (!ecommConfig['buy_on_static_site_enabled']) {
        AsanaHelpers.billableGroupType.setUsingEmail(email);
      }

      // Pass encrypted_user_id received from signup endpoint response to GTM dataLayer
      var encryptedUserId = responseData.encrypted_user_id;
      if (encryptedUserId) {
        AsanaStorage.setEncryptedUserId(encryptedUserId);
        AsanaAnalytics.pushDataLayerVars({ event:"var-event_cd3", cd3: encryptedUserId });
      }

      // Push user's hashed email to GTM dataLayer
      AsanaAnalytics.sendHashedEmailToGTM(submitData.email);

      // responseData.status should almost always equal "check-email"
      if (responseData.status === 'check-email') { 
        if (responseData.user_is_new || !responseData.user_is_claimed) {
          redirectNewUser(responseData, submitData);
        } else {
          handleExistingUser(responseData, submitData);
        }
      }
      // Existing users can use /-/signup to associate domains with a channel
      else if ( submitData.registered_with_channel && responseData.user_is_claimed ) {
        handleExistingUser(responseData, submitData);
      }
      // This else block is just a fail safe
      else { 
        AsanaSignupUtils.signupButtons.reset();
        AsanaHelpers.showModal('signup-failed');
        window.AsanaErrors.notify(
          'Failed signup - request succeeded but responseData.status !== check-email - refactoredSignup',
        );
      }

      /**
       * Redirects a new user
       * Called after a successful request to /-/signup endpoint
       *
       * @param {object}            response - An object containing data from the response from the /-/signup api
       * @param {boolean|undefined} response.user_is_new - If the user is a new signup
       * @param {boolean|undefined} response.is_personal_email - If the user's email was determined to be a personal email
       * @param {boolean|undefined} response.user_can_self_serve_channel - If the user can self-serve the partnership channel for signup
       * @param {object}            submitData - An object containing data which was submitted to /-/signup
       * @param {string|undefined}  submitData.registered_with_trial - A stringified version of a boolean indicating if this was a trial signup
       * @param {string|undefined}  submitData.registered_with_channel - The partnership channel for signup, if one exists
       * @param {string}            submitData.email - The email address used in the signup request
       * @param {string|undefined}  submitData.login_redirect_source - url to redirect user to after signup
       */
      function redirectNewUser(response, submitData) {
        if (submitData.registered_with_channel && !response.user_can_self_serve_channel) {
          AsanaHelpers.signupPreventedCallbacks.partnershipNewUserSelfServeBlockCallback(submitData.email);
          return;
        }
        // If user is unclaimed (unclaimed = has never logged in),
        // treat them as new in terms of messaging, but not analytics
        if (response.user_is_new === true) {
          AsanaAnalytics.trackGTM('all_signup');
          AsanaAnalytics.trackGTM('signup_with_email');
        }
        // Track successful trial signups
        if (submitData.registered_with_trial === 'true') {
          AsanaAnalytics.trackGTM('trial_signup');
        }
        // Set the SignupEmailType in ecomm-config to personal or work and
        // track "email type" specific signup events
        if (response.is_personal_email) {
          AsanaHelpers.signupEmailType.setSignupEmailTypePersonal();
          AsanaAnalytics.trackGTM('signup_with_personal_email');
        } else {
          AsanaHelpers.signupEmailType.setSignupEmailTypeWork();
          AsanaAnalytics.trackGTM('signup_with_work_email');
        }
        AsanaStorage.setUserEmailCookie(submitData.email);
        // Send signup event to Segment
        sendSignupEventToSegment();
        var redirect = AsanaSignupUtils.getConfirmationPageRedirect(submitData.login_redirect_source);
        // Navigate user to confirmation page
        window.location.href = AsanaHelpers.asanaDotComUrl(redirect);
        // Remove all modals from screen
        window.location.hash = '';
      }

      /**
       * For existing users, tracks the event, and redirects to the app with query parameters
       * Called after a successful request to /-/signup endpoint when responseData.user_is_new: false, responseData.user_is_claimed: true
       *
       * @param {object}            responseData - An object containing data from the response from the /-/signup api
       * @param {object}            submitData - An object containing data which was submitted to /-/signup
       * @param {string|undefined}  submitData.registered_with_channel - The partnership channel for signup, if one exists
       * @param {boolean|undefined} responseData.user_can_self_serve_channel - If the user can self-serve the partnership channel for signup
       * @param {string}            submitData.email - The email address used in the signup request
       */
      function handleExistingUser(responseData, submitData) {
        AsanaAnalytics.trackGTM('existing_user_signup');
        AsanaAnalytics.trackSignupEventsInGtm.init('SignupError', 'Existing User');

        if (submitData.registered_with_channel) {
          if (responseData.user_can_self_serve_channel) {
            AsanaHelpers.signupPreventedCallbacks.partnershipExistingUserSelfServeCallback(submitData.email);
            return;
          } else {
            AsanaHelpers.signupPreventedCallbacks.partnershipExistingUserSelfServeBlockCallback(submitData.email);
            return;
          }
        }

        // If an existing user tries to sign up, redirect them to the app login page
        // Include url params for programs and tracking (such as PartnerStack)
        var queryParams = window.location.search;
        window.location = 'https://app.asana.com/-/login' + queryParams;
      }

      /**
       * Defensivly tries to send a signup event to Segment
       */
      function sendSignupEventToSegment() {
        try {
          if (AsanaAnalytics?.SegmentAnalytics?.api?.track && AsanaAnalytics.SegmentAnalytics?.events?.SIGNUP) {
            AsanaAnalytics.SegmentAnalytics.api.track(AsanaAnalytics.SegmentAnalytics.events.SIGNUP);
          }
        } catch (error) {
          console.error('Failed to send signup event to Segment', error);
        }
      }
    }
  },

  // BEGIN mtm_drive_trial_starts_from_logged_in_interstitial_page_gb
  /** Globals for the MTM Drive Trial starts from LIIP experiment
   * https://app.asana.com/0/1208183798724550/1208185721016063
   */
  loggedInInterstitial: {
    /**
     * Callback to be fired when logged in interstitial data fetching is complete.
     * This will be overridden by component-specific functionality.
     */
    liipCallback: function (data) { },
    /**
     * Global variable to store the data fetched from LoggedInInterstitialDataFetcher
     */
    liipData: null,
  },
  // END mtm_drive_trial_starts_from_logged_in_interstitial_page_gb

  // BEGIN trex_trial_awareness_banner_liip_profile_gb
  /** Globals for the TREX trial awareness banner in profile menu experiment
   * https://app.asana.com/0/1208992719002534/1208992719002534
   */
  profileMenuData: {
    /**
     * Callback to be fired when profile menu data fetching is complete.
     * This will be overridden by component-specific functionality.
     */
    profileMenuDataCallback: function (data, fetchError = false) { },
    /**
     * Global variable to store the data fetched from ProfileMenuDataFetcher
     */
    profileMenuData: null,
    /**
     * Whether there was an error when calling /-/dotcom_profile_menu_data
     */
    fetchError: false,
  },
  // END trex_trial_awareness_banner_liip_profile_gb

  startsWith: function (str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
  },

  endsWith: function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  },

  getHash: function () {
    return window.location.hash.substring(1);
  },

  getParameterByName: function (name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  // Functions same as above, but for a url fragment
  getParamsFromUrlFragment: function () {
    var query_string = {};
    var hash = location.hash;
    var vars = hash.slice(1).split('&');

    if (vars.length === 1 && vars[0] === '') return '';

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (typeof query_string[pair[0]] === 'undefined') {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === 'string') {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  },

  // @TODO Revisit when URLSearchParams has better support
  // https://github.com/Asana/asanastatic/pull/269
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  getUrlParams: {
    get: function (name) {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? results : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    has: function (name) {
      return Boolean(this.get(name));
    },
  },

  generateUrlWithParams: function (base, params) {
    var url = base;
    url += '?';
    for (var i = 0; i < params.length; i++) {
      url += encodeURIComponent(params[i].name);
      url += '=';
      url += encodeURIComponent(params[i].value);
      if (i !== params.length - 1) {
        url += '&';
      }
    }
    return url;
  },

  debug: {
    init: function () {
      var lKey = 'L'.charCodeAt(0);
      document.body.addEventListener('keydown', function (event) {
        if (event.keyCode === lKey && event.ctrlKey && event.metaKey && event.altKey) {
          AsanaHelpers.debug.toggleDebugMode();
        }
      });
    },

    toggleDebugMode: function () {
      document.documentElement.classList.toggle('-debug');
    },
  },

};

// Trigger setGlobalClasses once DOM content is loaded
window.addEventListener('DOMContentLoaded', function() {
  AsanaHelpers.setGlobalClasses();
});

/**
 * Executes immediately after entire DOM is loaded
 */
window.addEventListener('load', function () {
  /**
   * Initialize debug tooling to show grid overlay
   */
  AsanaHelpers.debug.init();
});
