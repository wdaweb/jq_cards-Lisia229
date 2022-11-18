$(".mask").hide();

// 移動步數
let score = 0

// 產生卡片
for (let i = 0; i < 16; i++) {
  $('#gamecontent').append(`
    <div class="card card-close">
      <div class="card-front"></div>
      <div class="card-back"></div>
    </div>
  `)
}
for (let i = 0; i < $('.card').length; i++) {
  // 決定數字
  const num = i % ($('.card').length / 2) + 1
  $('.card').eq(i).find('.card-front').css('background-image', `url(../images/${num}H.jpg)`)
  $('.card').eq(i).attr('data-num', num)

  // 打散
  const target = Math.round(Math.random() * ($('.card').length - 1))
  $('.card').eq(target).insertAfter($('.card').eq(i))
}

$('#gamecontent').on('click', '.card', function () {
  // 最多一次翻兩張，且這張牌還沒翻開
  if ($('.card:not(.card-close)').length < 2 &&
    $(this).hasClass('card-close') &&
    !$(this).hasClass('card-ok')
  ) {
    $(this).removeClass('card-close')
  }

  // 如果翻兩張了
  if ($('.card:not(.card-close)').length === 2) {
    score++
    // 如果數字一樣
    if ($('.card:not(.card-close)').eq(0).attr('data-num') === $('.card:not(.card-close)').eq(1).attr('data-num')) {
      // 用 card-ok 標記已完成
      $('.card:not(.card-close)').addClass('card-ok')
      $('.card:not(.card-close)').fadeTo(1000, 0.4)
    }

    // 不管數字一不一樣都將卡片翻回來
    setTimeout(() => {
      $('.card:not(.card-close)').addClass('card-close')
      if ($('.card-ok').length === $('.card').length) {
        Swal.fire({
          icon: 'success',
          title: '恭喜過關',
          text: `總共移動了${score}步`
        }).then(() => {
          $('.card').fadeTo(0,0)
          $(".mask").show();
        })
      }
    }, 1000)
  }
  console.log(clockId)
})