$("#urlSubmit").click(function () {
  const target = $('input[name=url]').val()
  const domain = window.location.hostname

  $.ajax({
    data: { target: target, domain: domain },
    url: '/url',
    type: 'post',
    cache: false,
    success: function (shortenedUrl) {
      if (shortenedUrl) {
        $('#form-url').toggle()
        $('#form-shortened-url').toggle()
        $('#shortenedUrl').val(shortenedUrl)
      }
      else {
        console.log("It's not an URL.")
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`error ${textStatus} errorThrown`);
    }
  })
})