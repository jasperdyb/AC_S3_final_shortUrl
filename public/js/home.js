$("#urlSubmit").click(function () {
  const target = $('input[name=url]').val()
  const domain = window.location.hostname

  $.ajax({
    data: { target: target, domain: domain },
    url: '/url',
    type: 'post',
    cache: false,
    success: function (shortenedUrl) {
      console.log(shortenedUrl)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`error ${textStatus} errorThrown`);
    }
  })
})