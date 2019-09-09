$(function(){
  function buildMessageHtml(message){
    var addImage = (message.image !== null) ? `<img class = "lower-message__image", src="${message.image.url}">` : '' 
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <p class = "user-image">
                      ${addImage}
                    </p>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildMessageHtml(data);
      $('.messages').append(html);
      $('.input-box__text')[0].reset();
      $('.input-box__image__file')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      leastMessage = data;
    })
    .fail(function(){
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
  })
})