export function getCookie(cookieName) {
    cookieName = `${cookieName}=`;
    let cookieData = document.cookie;
  
    let cookieValue = "";
    let start = cookieData.indexOf(cookieName);
  
    if (start !== -1) {
      start += cookieName.length;
      let end = cookieData.indexOf(";", start);
      if (end === -1) end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
    }
    
    return unescape(cookieValue);
  }
  
  
  export function deleteCookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }