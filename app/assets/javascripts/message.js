$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message--list">
          <div class="message--member">
            <div class="message--writer">
              ${message.user_name}
            </div>
            &nbsp;
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message--detail">
            ${message.content}
          </div>
          <img class="input-box__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
        `<div class="message--list">
          <div class="message--member">
            <div class="message--writer">
              ${message.user_name}
            </div>
            &nbsp;
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message--detail">
            ${message.content}
          </div>
        </div>`
      return html;
    };
  }

  $(".new_message").on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message--field').append(html);
      $('.message--field').animate({ scrollTop: $('.message--field')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});