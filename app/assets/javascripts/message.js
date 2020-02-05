$(function(){ 
  // last_message_id = $('.message:last').data("message-id");
  // console.log(last_message_id);
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="first" data-message-id=${message.id}>
          <div class="upper-message">
            <p class="upper-message__user-name">
              ${message.user_name}
            </p>
            <p class="upper-message__date">
              ${message.created_at}
            </p>
          </div>
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      console.log(message)
      var html =
        `<div class="first" data-message-id=${message.id}>
         <div class="upper-message">
            <p class="upper-message__user-name">
              ${message.user_name}
            </p>
            <p class="upper-message__date">
              ${message.created_at}
            </p>
          </div>
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
    })
    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      // console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});