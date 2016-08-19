utilityApp.factory('Utility', ['$window', function ($window) {

  let getBreakpoint = function () {
    var w = $window.innerWidth;
    if (w < 768) {
      return 'xs';
    } else if (w < 992) {
      return 'sm';
    } else if (w < 1200) {
      return 'md';
    } else {
      return 'lg';
    }
  };


  let getFileType = function(fileName) {
    // From http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
    // it could be
    // return filename.split('.').pop();
    // but for Kamron's sake, I'm going with the more efficient bitwise:
    return fileName.substr((~-fileName.lastIndexOf(".") >>> 0) + 2);
  }

  let isURL = function(url) {
    // From https://www.debuggex.com/r/KaJrYj7vm9pKgOhK and http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
     var re=new RegExp(strRegex);
     return re.test(url);
 }

  return {
    getBreakpoint,
    getFileType,
    isURL,

  }
}]);

// inspired by http://stackoverflow.com/questions/18575582/how-to-detect-responsive-breakpoints-of-twitter-bootstrap-3-using-javascript