$(function(){ 
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
});