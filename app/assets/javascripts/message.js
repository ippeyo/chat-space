$(function(){
  function buildMessageHtml(message){
    var addImage = (message.image.url !== null) ? `<img class = "lower-message__image", src="${message.image.url}">` : '' ;
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
                    <p class = "lower-message__image">
                      ${addImage}
                    </p>
                  <div>
                <div>`
    return html
  }

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      var last_message_id = $('.message').last().data('message-id');
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var insertHTML = buildMessageHtml(message)
          $('.messages').append(insertHTML)
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 5000 );

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
      $("#new_message")[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      leastMessage = data;
    })
    .fail(function(){
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
  });
});