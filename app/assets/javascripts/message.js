$(function(){ 
  console.log(last_message_id);

  function buildHTML(message){
    if ( message.image ) {
      var html =
      last_message_id = $('.message:last').data("message-id");
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
  setInterval(reloadMessages, 7000);
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
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
    contentType: false
  })
    .done(function(messages) {
      if (messages.length !== 0) {
        
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(data) {
      alert("メッセージ送信に失敗しました");
  });
})
