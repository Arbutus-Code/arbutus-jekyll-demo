// Loads the Web3Forms hCaptcha client script
(function() {
  if (document.querySelector('.h-captcha')) {
    var script = document.createElement('script');
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
})();
