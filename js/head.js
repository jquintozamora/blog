$(function () {
  var socialIconWidth = 25
  $('.toggle-menu').on('click', function () {
    if (!$('.menus').is(':visible')) {
      $('.menus')
        .velocity('stop')
        .velocity('transition.slideDownIn', { duration: 300 })
    } else {
      $('.menus')
        .velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
    }
  })
  $('.toggle-social').on('click', function (e) {
    if (!$('.socialicons').is(':visible')) {
      var leftOffset = e.currentTarget.offsetLeft - socialIconWidth    
      $('.socialicons')
        .velocity('stop')
        .velocity({left: leftOffset})
        .velocity('transition.slideDownIn', { duration: 300 })
    } else {
      $('.socialicons')
        .velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
        .velocity({left: 0})
    }
  })
  $(document).on('click', function (e) {
    var flag = $('.menus')[0].contains(e.target) || $('.toggle-menu')[0].contains(e.target)
    if (!flag && $('.toggle-menu').is(':visible')) {
      $('.menus')
        .velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
    }
    var flagSocial = $('.socialicons')[0].contains(e.target) || $('.toggle-social')[0].contains(e.target)
    if (!flagSocial && $('.toggle-social').is(':visible')) {
      $('.socialicons')
        .velocity('stop')
        .velocity('transition.slideUpOut', { duration: 300 })
        .velocity({left: 0})
    }
  })
})
