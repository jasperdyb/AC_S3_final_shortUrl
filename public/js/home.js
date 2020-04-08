$("#urlSubmit").click(function () {
  const target = $('input[name=url]').val()
  const domain = window.location.hostname
  const port = window.location.port //for localhost

  $.ajax({
    data: { target: target, domain: domain, port: port },
    url: '/url',
    type: 'post',
    cache: false,
    success: function (shortenedUrl) {
      if (shortenedUrl) {
        $('#form-url').toggle()
        $('#form-shortened-url').toggle()
        $('#shortenedUrl').val(shortenedUrl)
        $("#copyButton").text(shortenedUrl)
      }
      else {
        $('#targetUrl').after(
          '<div class="alert alert-warning alert-dismissible fade show" role="alert">This is not an url.<button class="close" type="button" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div>')
        console.log("It's not an URL.")
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`error ${textStatus} errorThrown`);
    }
  })
})
copyButton

$("#copyButton").click(function () {
  event.preventDefault()
  $("#shortenedUrl").select()
  document.execCommand("Copy")
  $("#shortenedUrl").blur()
  console.log("clicked!")
})

