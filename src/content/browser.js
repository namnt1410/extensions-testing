function getFileName(src) {
  var filename = src;
  filename = filename.substring(0, (filename.indexOf("#") == -1) ? filename.length : filename.indexOf("#"));
  filename = filename.substring(0, (filename.indexOf("?") == -1) ? filename.length : filename.indexOf("?"));
  filename = filename.substring(filename.lastIndexOf("/") + 1, filename.length);
  return filename;
}

function IsRealImageSrc(src) {
  var filename = getFileName(src);

  return filename.toLowerCase().endsWith(".jpg") ||
      filename.toLowerCase().endsWith(".png") || 
      filename.toLowerCase().endsWith(".gif") || 
      filename.toLowerCase().endsWith(".webp") || 
      filename.toLowerCase().endsWith(".svg"); 
}

function IsErrorImgElement(img) {
  return img.complete && img.src &&
         IsRealImageSrc(img.src) &&
         (img.naturalWidth + img.naturalHeight) === 0;
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll('img').forEach(function(img) {
      if (!img.src)
        return;

      if (IsErrorImgElement(img)) {
        img.style.display = 'none';
      }
        
      img.addEventListener('error', function() {
        if (this.src !== undefined && IsRealImageSrc(this.src)) 
          this.style.display = 'none';
      });
    });
});

window.addEventListener("load", function(event) {
  document.querySelectorAll('img').forEach(function(img) {
    if (IsErrorImgElement(img)) 
      img.style.display = 'none';
  });
});