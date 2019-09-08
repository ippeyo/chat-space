$(function(){
  function buildMessageHtml(message){
    var img = ""; 
    if(message.image.url !== null){
      var img =  `<img class="lower-message__image" src='${message.image.url}'></img>`;
    }

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
                    </p>`
                      + img
                  + `</div>
                </div>`
                console.log(img);
    return html;
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
      $('.input-box__text').val('');
      $('.input-box__image__file').val('');
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