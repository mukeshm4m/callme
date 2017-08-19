export const constants = {

  localStorageUserLoginKey: 'uml-login',
  localStorageLanguageKey: 'uml-Language',
  apiUrl: {
    login: '/login',
    refreshToken: '/refreshtoken',
    clientSideException: 'sendClientSideException',
    forgotPassword: 'forgotpassword'
  },
  
  pageUrl: {
    login: '/login',
    forgotPassword: '/forgotpassword',
    home: '/home'
  },

  apiRequestHeaders: {
    default: {
      contentType: 'application/json',
      source: 'Web',
      requestCode: '123',
      ifModifiedSince: '0',
      cacheControl: 'no-cache',
      pragma: 'no-cache'
    }
  },

  apiRequestHeaderKeys: {
    contentType: 'Content-Type',
    authorization: 'Authorization',
    xAuthorization: 'X_AUTHORIZATION',
    source: 'X_SOURCE',
    requestCode: 'X_REQUEST_CODE',
    authToken: 'X_AUTH_TOKEN',

    ifModifiedSince: 'If-Modified-Since',
    cacheControl: 'Cache-Control',
    pragma: 'Pragma'
  },

  errorCodes: {
    authenticationFailure: "1001",
    accessDenied: "1002",
    requestNotValid: "1003",
    businessRuleFailure: "1004",
    exception: "1005",
    notFound: "1006"
  },

  dateFormats: {
    mmddyyyy: "MM/dd/yyyy",
    yyyyMMddHHmmss: "yyyy-MM-dd HH:mm:ss",
    MMDDYYYYhhmm: "MM/DD/YYYY hh:mm"
  },

  events: {
    navigation: 'navigate'
  },

  toasterConfig: {
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 5000,
    positionClass: 'toast-bottom-right'
  },
  sessionTimeout: {
    timeoutComponentShowTime: 60, //seconds for how long to show component
    showComponentBeforeTime: 100000, // milliseconds before timeout for when to show the component.
    tickTime: 10 // seconds
  },

  options : {
  title: {
    display: true,
    text: 'Listening Duration',
    position: "right"
  },
  animation: {
    numSteps: 8,
    easing: "easeOutBounce"
  },
  toolTip: {
    bodyFontSize: 25
  },
  legend: {
    display: true,
    fullWidth:true,
    reverse:true,
    position: "bottom",
  }
}
};
