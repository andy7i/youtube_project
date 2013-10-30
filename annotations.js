

/*
You can fetch annotations using these urls:
Published version: https://www.youtube.com/annotations_invideo/read2?features=1&legacy=1&video_id=X

Draft version: https://www.youtube.com/annotations_auth/read2?video_id=X&auth_token=Y&draft=1
You can get the auth_token by looking at the source of the edit annotations page.
*/

function setLinkDisplay () {
  var link = document.getElementById("link");
  var vidId = youtube_parser(link.value);
  if (vidId) {
    //link.value = "";
    var fieldID = document.getElementById("extractedId");
    fieldID.value = vidId;
  }
  return vidId;
}

function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match&&match[7].length==11){
      return match[7];
  }else{
      alert("Url incorrect");
  }
}

var openLink = function() {
  var id = setLinkDisplay();
  var link = document.getElementById('linktest');
  if (id) {
    link.href="https://www.youtube.com/annotations_invideo?features=1&legacy=1&video_id="+id;
    window.open("view-source:https://www.youtube.com/annotations_invideo?features=1&legacy=1&video_id="+id);
  }
}

var getAnnotations = function() {
  var id = setLinkDisplay();
  if (id) {
    var yahooApiUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22https%3A%2F%2Fwww.youtube.com%2Fannotations_invideo%3Ffeatures%3D1%26legacy%3D1%26video_id%3D"+id+"%22&format=json&diagnostics=true&callback=" ;

    $.ajax({
      type: "GET",
      url: yahooApiUrl,
      dataType: "json",
      success: jsonParser
     });

    function jsonParser(data) {
      annoData_JSON = data.query.results.document.annotations.annotation;
      document.getElementById('extractedAnnotations').value = JSON.stringify(annoData_JSON);
      document.getElementById('extractedAnnotations').value += "\n \n" + JSON.stringify(annoData_JSON[0]);
      //alert(annoData_JSON.length);
      
    }
  }
}
